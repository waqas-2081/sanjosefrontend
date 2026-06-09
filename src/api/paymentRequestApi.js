const PAYMENT_REQUEST_ENDPOINT = 'https://admin.sanjoselogodesign.com/api/payment-requests';

export function getPaymentRequestApiErrorMessage(result) {
  if (result?.errors && typeof result.errors === 'object') {
    const firstFieldErrors = Object.values(result.errors).find(
      (value) => Array.isArray(value) && value.length > 0,
    );
    if (firstFieldErrors) return firstFieldErrors[0];
  }
  if (result?.message && typeof result.message === 'string') return result.message;
  return 'Unable to submit payment details. Please try again.';
}

/**
 * @param {{
 *   salesAgent: string;
 *   customerName: string;
 *   email?: string | null;
 *   phone?: string | null;
 *   packageName?: string | null;
 *   amount: number;
 *   paymentMethod: string;
 * }} payload
 */
export async function createPaymentRequest(payload) {
  const response = await fetch(PAYMENT_REQUEST_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify({
      profile: payload.salesAgent,
      customer_name: payload.customerName,
      email: payload.email || null,
      phone: payload.phone || null,
      package_name: payload.packageName || null,
      amount: payload.amount,
      payment_method: payload.paymentMethod,
    }),
  });

  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const result = isJson ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    throw new Error(getPaymentRequestApiErrorMessage(result));
  }

  if (!result || result.success !== true) {
    throw new Error('Invalid response from server.');
  }

  const paymentLink = result.data?.payment_link;
  if (!paymentLink) {
    throw new Error('No payment link returned from server.');
  }

  return {
    id: result.data?.id,
    paymentLink,
  };
}
