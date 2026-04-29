const CONTACT_ENDPOINT = 'http://127.0.0.1:8000/api/contact';
const CONTACT_AUTOSAVE_ENDPOINT = 'http://127.0.0.1:8000/api/contact/autosave';

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
 * POST /api/contact — Final submit with validation
 */
export async function postContact(payload, options = {}) {
  const res = await fetch(CONTACT_ENDPOINT, {
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
    throw new Error(getErrorMessage(data, 'Could not submit your request.'));
  }
  return data;
}

/**
 * POST /api/contact/autosave — Auto-save draft (partial data allowed)
 */
export async function autoSaveContact(payload, options = {}) {
  const res = await fetch(CONTACT_AUTOSAVE_ENDPOINT, {
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
    throw new Error(getErrorMessage(data, 'Auto-save failed.'));
  }
  return data;
}