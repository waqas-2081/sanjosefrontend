import { useEffect, useRef } from 'react';

/**
 * Locks document scroll while `locked` is true (mobile menu open).
 * Preserves scroll position on unlock.
 */
export default function useBodyScrollLock(locked) {
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (!locked || typeof window === 'undefined') return undefined;

    scrollYRef.current = window.scrollY;
    const { body } = document;
    const { style } = body;

    body.classList.add('nav-open');
    style.position = 'fixed';
    style.top = `-${scrollYRef.current}px`;
    style.left = '0';
    style.right = '0';
    style.width = '100%';
    style.overflow = 'hidden';
    style.touchAction = 'none';

    return () => {
      const y = scrollYRef.current;
      body.classList.remove('nav-open');
      style.position = '';
      style.top = '';
      style.left = '';
      style.right = '';
      style.width = '';
      style.overflow = '';
      style.touchAction = '';
      window.scrollTo(0, y);
    };
  }, [locked]);
}
