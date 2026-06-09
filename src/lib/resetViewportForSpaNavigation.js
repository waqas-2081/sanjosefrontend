/**
 * Clears modal-style document scroll lock and scrolls to top.
 * Call on every pathname change and right before SPA navigates to /logo-creator
 * so the next screen is not stuck showing the previous page under a wrong scroll offset.
 */
export function resetViewportForSpaNavigation() {
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  document.body.style.width = '';
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
}
