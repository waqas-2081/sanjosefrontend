import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initGlobalScrollMotion } from '../../lib/globalScrollMotion';
import { resetViewportForSpaNavigation } from '../../lib/resetViewportForSpaNavigation';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    resetViewportForSpaNavigation();
  }, [pathname]);

  /* After paint: avoids forced reflow competing with LCP */
  useEffect(() => {
    let teardown = () => {};
    let idleId;
    let timeoutId;

    const start = () => {
      teardown = initGlobalScrollMotion(document);
    };

    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(start, { timeout: 1200 });
    } else {
      timeoutId = window.setTimeout(start, 1);
    }

    return () => {
      if (idleId != null && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId != null) window.clearTimeout(timeoutId);
      teardown();
    };
  }, [pathname]);

  return null;
}
