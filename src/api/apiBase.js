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

/**
 * Laravel API origin from env (local or production).
 * Strips trailing slashes and a mistaken `/admin` panel suffix.
 */
export function getApiOrigin() {
  const raw = String(process.env.REACT_APP_API_BASE_URL || DEFAULT_API_ORIGIN).trim();
  const configured = raw ? raw.replace(/\/+$/, '').replace(/\/admin$/i, '') : DEFAULT_API_ORIGIN;

  // Production storefront: call same origin so Cloudflare WAF on admin.*
  // cannot block the browser (the server-side proxy forwards to Laravel).
  if (typeof window !== 'undefined') {
    const host = String(window.location.hostname || '').replace(/^www\./i, '');
    if (host === 'sanjoselogodesign.com') {
      return window.location.origin;
    }
  }

  return configured || DEFAULT_API_ORIGIN;
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
