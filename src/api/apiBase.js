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

/** Public storage / uploaded asset URL on the API host */
export function storageUrl(path) {
  if (!path) return '';
  const raw = String(path);
  if (/^https?:\/\//i.test(raw)) {
    // Drop mistaken `/public` segment: .../public/storage/... → .../storage/...
    return raw.replace(/\/public\/storage\//i, '/storage/');
  }
  const cleaned = raw
    .replace(/^\/+/, '')
    .replace(/^public\//, '')
    .replace(/^storage\//, '');
  return apiUrl(`/storage/${cleaned}`);
}
