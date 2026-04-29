const PACKAGES_API_BASE = 'http://127.0.0.1:8000/api/v1';

/**
 * @param {string} serviceType Laravel Package::service_type (e.g. logo, website, animation, digital_marketing, seo)
 * @returns {Promise<Array<{ id: number, name: string, badge: string, price: string, price_type: string, features: unknown[], button_text?: string }>>}
 */
export async function fetchPackagesByServiceType(serviceType) {
  const url = `${PACKAGES_API_BASE}/packages?service_type=${encodeURIComponent(serviceType)}`;
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
  });
  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const result = isJson ? await response.json().catch(() => null) : null;

  if (!response.ok || !result || result.success !== true) {
    const msg =
      result?.message ||
      (result?.errors && typeof result.errors === 'object' && Object.values(result.errors).flat()[0]) ||
      'Failed to load packages.';
    throw new Error(typeof msg === 'string' ? msg : 'Failed to load packages.');
  }

  return Array.isArray(result.data) ? result.data : [];
}
