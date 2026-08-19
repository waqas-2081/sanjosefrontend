import { apiUrl } from './apiBase';

/** CORS-enabled concept PNG for canvas compositing. */
export function logoCreatorConceptImageUrl(sessionToken, index) {
  if (typeof sessionToken !== 'string' || sessionToken.length !== 64) return '';
  const params = new URLSearchParams({
    session_token: sessionToken,
    index: String(index),
    clean: '2',
  });
  return apiUrl(`/api/logo-creator/image?${params.toString()}`);
}

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

/**
 * POST /api/logo-creator/start — body: { business_name }
 * Matches Laravel route in routes/api.php (logo-creator group).
 */
export async function postLogoCreatorStart(businessName, options = {}) {
  const res = await fetch(apiUrl('/api/logo-creator/start'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify({ business_name: String(businessName).trim() }),
    signal: options.signal,
  });
  const data = await readJsonResponse(res);
  if (data.success !== true) {
    throw new Error(getErrorMessage(data, 'Could not start logo session.'));
  }
  return data;
}

/**
 * POST /api/logo-creator/step — body: { session_token, step, ...fields }
 */
export async function postLogoCreatorStep(payload, options = {}) {
  const res = await fetch(apiUrl('/api/logo-creator/step'), {
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
    throw new Error(getErrorMessage(data, 'Could not save this step.'));
  }
  return data;
}

/**
 * POST /api/logo-creator/generate — body: { session_token, browser_id }
 * Returns up to 2 generated logo image URLs.
 */
export async function postLogoCreatorGenerate(sessionToken, browserId, options = {}) {
  const res = await fetch(apiUrl('/api/logo-creator/generate'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify({
      session_token: sessionToken,
      browser_id: browserId,
    }),
    signal: options.signal,
  });
  const data = await readJsonResponse(res);
  if (data.success !== true) {
    throw new Error(getErrorMessage(data, 'Could not generate logos.'));
  }
  return data;
}

/**
 * POST /api/logo-creator/checkout-notify — notify admin when user proceeds to payment.
 */
export async function postLogoCreatorCheckoutNotify(payload, options = {}) {
  const res = await fetch(apiUrl('/api/logo-creator/checkout-notify'), {
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
    throw new Error(getErrorMessage(data, 'Could not notify admin of checkout.'));
  }
  return data;
}

/**
 * POST /api/logo-creator/select — body: { session_token, selected_index }
 */
export async function postLogoCreatorSelect(sessionToken, selectedIndex, options = {}) {
  const res = await fetch(apiUrl('/api/logo-creator/select'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify({
      session_token: sessionToken,
      selected_index: selectedIndex,
    }),
    signal: options.signal,
  });
  const data = await readJsonResponse(res);
  if (data.success !== true) {
    throw new Error(getErrorMessage(data, 'Could not save logo selection.'));
  }
  return data;
}
