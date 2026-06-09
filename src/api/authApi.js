const AUTH_API_BASE = 'https://admin.sanjoselogodesign.com/api/v1';

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

/**
 * POST /api/v1/forgot-password — request a password reset email
 * @param {string} email
 */
export async function requestPasswordReset(email, options = {}) {
  const res = await fetch(`${AUTH_API_BASE}/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify({ email }),
    signal: options.signal,
  });

  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    throw new Error('Invalid response from server.');
  }

  if (!res.ok || data?.success !== true) {
    throw new Error(getErrorMessage(data, 'Could not send reset link. Please try again.'));
  }

  return data;
}

/**
 * POST /api/v1/reset-password — set a new password using reset token from email
 * @param {{ token: string, email: string, password: string, password_confirmation: string }} payload
 */
export async function resetPassword(payload, options = {}) {
  const res = await fetch(`${AUTH_API_BASE}/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify(payload),
    signal: options.signal,
  });

  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    throw new Error('Invalid response from server.');
  }

  if (!res.ok || data?.success !== true) {
    throw new Error(getErrorMessage(data, 'Could not reset password. Please try again.'));
  }

  return data;
}
