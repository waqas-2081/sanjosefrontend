const DEFAULT_API_ORIGIN = 'https://admin.sanjoselogodesign.com';

/** Safe CORS headers — do not add X-Requested-With (it forces a preflight on every GET). */
export const JSON_HEADERS = {
  Accept: 'application/json',
};

export const JSON_POST_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

/**
 * Simple-request POST (no CORS preflight). Cloudflare/WAF on some PCs
 * blocks OPTIONS → "Failed to fetch" / provisional headers.
 */
export const SIMPLE_POST_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded',
};

export function toFormBody(body) {
  const params = new URLSearchParams();
  if (!body || typeof body !== 'object') return params;
  Object.entries(body).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    params.set(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
  });
  return params;
}

export function getNetworkErrorMessage(error, fallback = 'Something went wrong. Please try again.') {
  const msg = String(error?.message || '');
  if (
    error instanceof TypeError ||
    /failed to fetch|networkerror|network error|load failed/i.test(msg)
  ) {
    return 'Connection failed. Please use https://sanjoselogodesign.com, disable any ad-blocker for this site, and try again.';
  }
  return msg || fallback;
}

function isStorefrontHost() {
  if (typeof window === 'undefined') return false;
  const host = String(window.location.hostname || '').replace(/^www\./i, '');
  return host === 'sanjoselogodesign.com';
}

/**
 * Laravel API origin from env (local or production).
 * Strips trailing slashes and a mistaken `/admin` panel suffix.
 */
export function getConfiguredApiOrigin() {
  const raw = String(process.env.REACT_APP_API_BASE_URL || DEFAULT_API_ORIGIN).trim();
  const configured = raw ? raw.replace(/\/+$/, '').replace(/\/admin$/i, '') : DEFAULT_API_ORIGIN;
  return configured || DEFAULT_API_ORIGIN;
}

/**
 * JSON API calls: on the live storefront use same-origin gateway
 * (avoids browser→admin Cloudflare blocks on /api).
 */
export function getApiOrigin() {
  if (isStorefrontHost()) {
    return window.location.origin;
  }
  return getConfiguredApiOrigin();
}

/**
 * Uploaded media always comes from the admin/Laravel host.
 * <img src> does not need CORS, and the storefront /sjld-media proxy often 404s.
 */
export function getStorageOrigin() {
  return getConfiguredApiOrigin();
}

/**
 * Map Laravel API paths onto Cloudflare-safe gateway paths on the storefront.
 * CF WAF often returns 403 HTML for anything under "/api/*".
 */
function toStorefrontPath(path) {
  const normalized = `/${String(path || '').replace(/^\/+/, '')}`;
  if (!isStorefrontHost()) return normalized;

  if (normalized === '/api' || normalized.startsWith('/api/')) {
    return `/sjld-svc${normalized.slice(4) || ''}`;
  }
  return normalized;
}

/** @param {string} path e.g. `/api/logo-package-brief` or `api/v1/packages` */
export function apiUrl(path) {
  const origin = getApiOrigin();
  return `${origin}${toStorefrontPath(path)}`;
}

/** Public storage / uploaded asset URL — always on the admin host. */
export function storageUrl(path) {
  if (!path) return '';
  const raw = String(path).trim();
  let cleaned = raw;

  if (/^https?:\/\//i.test(raw)) {
    // Rebuild from admin origin — backend APP_URL / storefront proxy are often wrong.
    const match = raw.match(/\/(?:public\/)?storage\/(.+?)(?:\?.*)?$/i);
    if (match) {
      cleaned = match[1];
    } else {
      try {
        cleaned = new URL(raw).pathname.replace(/^\/+/, '');
      } catch {
        return raw.replace(/^http:\/\//i, 'https://');
      }
    }
  }

  cleaned = cleaned
    .replace(/^\/+/, '')
    .replace(/^public\//i, '')
    .replace(/^storage\//i, '');

  const origin = getStorageOrigin().replace(/^http:\/\//i, 'https://');
  return `${origin}/storage/${cleaned}`;
}
