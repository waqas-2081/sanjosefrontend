import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initGlobalScrollMotion } from '../../lib/globalScrollMotion';
import { resetViewportForSpaNavigation } from '../../lib/resetViewportForSpaNavigation';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    resetViewportForSpaNavigation();
    const teardownMotion = initGlobalScrollMotion(document);
    return () => {
      teardownMotion();
    };
  }, [pathname]);

  return null;
}
