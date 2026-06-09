export const PORTFOLIOS_ENDPOINT = 'https://admin.sanjoselogodesign.com/api/v1/portfolios';
export const PORTFOLIO_CATEGORIES_ENDPOINT =
  'https://admin.sanjoselogodesign.com/api/v1/portfolio-categories';

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

async function parseJsonResponse(res) {
  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) return null;
  return res.json().catch(() => null);
}

export async function fetchPortfolioCategories() {
  const res = await fetch(PORTFOLIO_CATEGORIES_ENDPOINT, { headers: JSON_HEADERS });
  const json = await parseJsonResponse(res);
  if (!res.ok || !json || json.success !== true) {
    throw new Error(getApiErrorMessage(json));
  }
  return Array.isArray(json.data) ? json.data : [];
}

export async function fetchPortfolios(category) {
  const url = category
    ? `${PORTFOLIOS_ENDPOINT}?category=${encodeURIComponent(category)}`
    : PORTFOLIOS_ENDPOINT;

  const res = await fetch(url, { headers: JSON_HEADERS });
  const json = await parseJsonResponse(res);
  if (!res.ok || !json || json.success !== true) {
    throw new Error(getApiErrorMessage(json));
  }

  const list = Array.isArray(json.data) ? json.data : [];
  const filtered = category
    ? list.filter((item) => item.category === category)
    : list;

  return filtered
    .filter((item) => item.image)
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
}
