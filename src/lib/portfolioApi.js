import { apiUrl, storageUrl } from '../api/apiBase';

export function getPortfoliosEndpoint() {
  return apiUrl('/api/v1/portfolios');
}

export function getPortfolioCategoriesEndpoint() {
  return apiUrl('/api/v1/portfolio-categories');
}

/** @deprecated use getPortfoliosEndpoint() — kept for callers that read at call-time */
export const PORTFOLIOS_ENDPOINT = getPortfoliosEndpoint();
export const PORTFOLIO_CATEGORIES_ENDPOINT = getPortfolioCategoriesEndpoint();

const JSON_HEADERS = {
  Accept: 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
};

export function getApiErrorMessage(result) {
  if (result?.message && typeof result.message === 'string') return result.message;
  return 'Unable to load portfolio right now.';
}

export function isVideoUrl(url) {
  if (!url || typeof url !== 'string') return false;
  return /\.(mp4|webm|ogg)(\?|$)/i.test(url);
}

/** Drop mistaken `/public` from admin storage URLs (same as add-ons). */
function normalizePortfolioImage(image) {
  if (!image || typeof image !== 'string') return null;
  const raw = image.trim();
  if (!raw) return null;
  return storageUrl(raw);
}

async function parseJsonResponse(res) {
  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) return null;
  return res.json().catch(() => null);
}

export async function fetchPortfolioCategories() {
  const res = await fetch(getPortfolioCategoriesEndpoint(), { headers: JSON_HEADERS });
  const json = await parseJsonResponse(res);
  if (!res.ok || !json || json.success !== true) {
    throw new Error(getApiErrorMessage(json));
  }
  return Array.isArray(json.data) ? json.data : [];
}

export async function fetchPortfolios(category) {
  const base = getPortfoliosEndpoint();
  const url = category
    ? `${base}?category=${encodeURIComponent(category)}`
    : base;

  const res = await fetch(url, { headers: JSON_HEADERS });
  const json = await parseJsonResponse(res);
  if (!res.ok || !json || json.success !== true) {
    throw new Error(getApiErrorMessage(json));
  }
  const list = Array.isArray(json.data) ? json.data : [];
  return list.map((item) => ({
    ...item,
    image: normalizePortfolioImage(item?.image),
  }));
}
