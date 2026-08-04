import { apiUrl, getApiOrigin } from './apiBase';

function getErrorMessage(data, fallback) {
  if (!data) return fallback;
  if (typeof data.message === 'string' && data.message.trim()) return data.message;
  if (data.errors && typeof data.errors === 'object') {
    const first = Object.values(data.errors)[0];
    if (Array.isArray(first) && first[0]) return String(first[0]);
    if (typeof first === 'string') return first;
  }
  return fallback;
}

async function readJsonResponse(res) {
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    throw new Error('Invalid response from server.');
  }
  if (!res.ok) {
    throw new Error(getErrorMessage(data, `Request failed (${res.status})`));
  }
  return data;
}

/** Prefer frontend-relative /assets paths; keep absolute storage URLs as-is. */
function normalizeImage(image) {
  if (!image || typeof image !== 'string') return null;
  try {
    if (image.startsWith('/assets/') || image.startsWith('assets/')) {
      return `/${image.replace(/^\/+/, '')}`;
    }
    const url = new URL(image, getApiOrigin());
    if (url.pathname.startsWith('/assets/')) return url.pathname;
  } catch {
    /* keep original */
  }
  return image;
}

/**
 * GET /api/v1/logo-package-options
 * @returns {Promise<{
 *   industries: Array<{ id: number, name: string }>,
 *   addons: Array<{ id: number, title: string, image: string|null, price: number, compareAt: number|null, skipAddons: boolean }>,
 *   durations: Array<{ id: number, label: string, price: number, included: boolean }>,
 *   logoTypes: Array<{ value: string, label: string }>,
 *   logoFonts: Array<{ value: string, label: string }>,
 *   logoColors: Array<{ value: string, label: string, hex: string }>,
 * }>}
 */
export async function fetchLogoPackageOptions(options = {}) {
  const res = await fetch(apiUrl('/api/v1/logo-package-options'), {
    headers: {
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    signal: options.signal,
  });
  const data = await readJsonResponse(res);
  if (data.success !== true || !data.data) {
    throw new Error(getErrorMessage(data, 'Failed to load logo package options.'));
  }

  const payload = data.data;
  return {
    industries: Array.isArray(payload.industries) ? payload.industries : [],
    addons: (Array.isArray(payload.addons) ? payload.addons : []).map((addon) => ({
      id: addon.id,
      title: addon.title,
      image: normalizeImage(addon.image),
      price: Number(addon.price) || 0,
      compareAt: addon.compareAt != null ? Number(addon.compareAt) : null,
      skipAddons: Boolean(addon.skipAddons),
    })),
    durations: (Array.isArray(payload.durations) ? payload.durations : []).map((d) => ({
      id: d.id,
      label: d.label,
      price: Number(d.price) || 0,
      included: Boolean(d.included),
    })),
    logoTypes: Array.isArray(payload.logoTypes) ? payload.logoTypes : [],
    logoFonts: Array.isArray(payload.logoFonts) ? payload.logoFonts : [],
    logoColors: Array.isArray(payload.logoColors) ? payload.logoColors : [],
  };
}

/**
 * Split free-text competitor references into up to 3 backend fields.
 * @param {string} text
 * @returns {[string|null, string|null, string|null]}
 */
export function splitCompetitorReferences(text) {
  const raw = String(text || '').trim();
  if (!raw) return [null, null, null];
  const parts = raw
    .split(/[\n,]+/)
    .map((p) => p.trim())
    .filter(Boolean)
    .slice(0, 3);
  return [parts[0] || null, parts[1] || null, parts[2] || null];
}

/**
 * POST /api/logo-package-brief
 * @param {Record<string, unknown>} payload
 */
export async function submitLogoPackageBrief(payload, options = {}) {
  const res = await fetch(apiUrl('/api/logo-package-brief'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify(payload),
    signal: options.signal,
  });
  const data = await readJsonResponse(res);
  if (data.success !== true) {
    throw new Error(getErrorMessage(data, 'Could not save logo package brief.'));
  }
  return data;
}
