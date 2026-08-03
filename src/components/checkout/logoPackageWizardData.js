export const WIZARD_INDUSTRIES = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Food & Beverage',
  'Fashion & Apparel',
  'Real Estate',
  'Fitness & Wellness',
  'Beauty & Cosmetics',
  'Entertainment',
  'Automotive',
  'Sports',
  'Photography',
  'Music',
  'Other',
];

/** Add-ons inspired by toolkit checkout — prices add to package total */
export const LOGO_ADDONS = [
  {
    id: 'skip',
    title: 'No thanks, just my Logo',
    /** Fallback only — wizard prefers selected package `previewImage` */
    image: '/assets/images/portfolio/logo/1.png',
    price: 0,
    compareAt: null,
    skipAddons: true,
  },
  {
    id: 'business-card',
    title: 'Business Card Design',
    image: '/assets/images/addons/addon-business-card.png',
    price: 75,
    compareAt: 100,
  },
  {
    id: 'letterhead',
    title: 'Letterhead Design',
    image: '/assets/images/addons/addon-letterhead.png',
    price: 75,
    compareAt: 100,
  },
  {
    id: 'facebook-cover',
    title: 'Facebook Cover Design',
    image: '/assets/images/addons/addon-facebook-cover.png',
    price: 75,
    compareAt: 100,
  },
  {
    id: 'brand-essentials',
    title: 'Brand Essentials Kit',
    image: '/assets/images/addons/addon-brand-essentials.png',
    price: 150,
    compareAt: 300,
  },
  {
    id: 'virtual-backdrop',
    title: 'Virtual Backdrop',
    image: '/assets/images/addons/addon-virtual-backdrop.png',
    price: 125,
    compareAt: 150,
  },
];

export const LOGO_DURATIONS = [
  { id: '72h', label: '72 Hours Turnover', price: 0, included: true },
  { id: '48h', label: '48 Hours Turnover', price: 100, included: false },
  { id: '24h', label: '24 Hours Turnover', price: 200, included: false },
];

export function parsePackageAmount(price) {
  const raw = String(price ?? '').trim().replace(/,/g, '');
  const num = Number.parseFloat(raw.replace(/[^0-9.]/g, ''));
  return Number.isFinite(num) && num >= 0 ? num : 0;
}

export function formatMoney(amount) {
  return `$${Number(amount || 0).toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}
