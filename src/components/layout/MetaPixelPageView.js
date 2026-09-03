import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Fires Meta Pixel PageView on SPA route changes (after the initial load
 * handled in public/index.html when analytics scripts load).
 */
export default function MetaPixelPageView() {
  const { pathname, search } = useLocation();
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'PageView');
    }
  }, [pathname, search]);

  return null;
}
