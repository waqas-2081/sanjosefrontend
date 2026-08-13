const DEFAULT_API_ORIGIN = 'https://admin.sanjoselogodesign.com';

/**
 * Laravel API origin from env (local or production).
 * Strips trailing slashes and a mistaken `/admin` panel suffix.
 */
export function getApiOrigin() {
  const raw = String(process.env.REACT_APP_API_BASE_URL || DEFAULT_API_ORIGIN).trim();
  if (!raw) return DEFAULT_API_ORIGIN;
  return raw.replace(/\/+$/, '').replace(/\/admin$/i, '');
}

/** @param {string} path e.g. `/api/logo-package-brief` or `api/v1/packages` */
export function apiUrl(path) {
  const origin = getApiOrigin();
  const normalized = `/${String(path || '').replace(/^\/+/, '')}`;
  return `${origin}${normalized}`;
}

/** Public storage / uploaded asset URL on the API host (REACT_APP_API_BASE_URL). */
export function storageUrl(path) {
  if (!path) return '';
  const raw = String(path).trim();
  let cleaned = raw;

  if (/^https?:\/\//i.test(raw)) {
    // Always rebuild from REACT_APP_API_BASE_URL — backend APP_URL is often wrong for the SPA.
    const match = raw.match(/\/(?:public\/)?storage\/(.+?)(?:\?.*)?$/i);
    if (match) {
      cleaned = match[1];
    } else {
      try {
        cleaned = new URL(raw).pathname.replace(/^\/+/, '');
      } catch {
        return raw;
      }
    }
  }

  cleaned = cleaned
    .replace(/^\/+/, '')
    .replace(/^public\//i, '')
    .replace(/^storage\//i, '');

  return apiUrl(`/storage/${cleaned}`);
}
