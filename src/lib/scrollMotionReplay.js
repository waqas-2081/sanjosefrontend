const TOP_THRESHOLD_PX = 48;
const LEFT_TOP_THRESHOLD_PX = 140;

/**
 * Runs `callback` when the user returns to the top after scrolling down the page.
 * Does not fire on initial load while already at the top.
 */
export function onScrollTopReplay(callback) {
  let hasScrolledPastTop = false;
  let rafId = 0;

  const onScroll = () => {
    if (window.scrollY > LEFT_TOP_THRESHOLD_PX) {
      hasScrolledPastTop = true;
    }

    if (window.scrollY <= TOP_THRESHOLD_PX && hasScrolledPastTop) {
      hasScrolledPastTop = false;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => callback());
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  return () => {
    window.removeEventListener('scroll', onScroll);
    cancelAnimationFrame(rafId);
  };
}
