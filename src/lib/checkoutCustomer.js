import { DASHBOARD_USER } from '../data/dashboardMockData';

const STORAGE_KEY = 'sanjose_checkout_customer';

const DEFAULT_CUSTOMER = {
  fullName: DASHBOARD_USER.name,
  email: DASHBOARD_USER.email,
  phone: DASHBOARD_USER.phone,
};

export function getCheckoutCustomer() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_CUSTOMER };
    const parsed = JSON.parse(raw);
    return {
      fullName: String(parsed.fullName || parsed.name || DEFAULT_CUSTOMER.fullName).trim(),
      email: String(parsed.email || DEFAULT_CUSTOMER.email).trim(),
      phone: String(parsed.phone || DEFAULT_CUSTOMER.phone).trim(),
    };
  } catch {
    return { ...DEFAULT_CUSTOMER };
  }
}

export function saveCheckoutCustomer({ fullName, email, phone }) {
  const payload = {
    fullName: String(fullName || '').trim(),
    email: String(email || '').trim(),
    phone: String(phone || '').trim(),
  };
  if (!payload.fullName && !payload.email) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* ignore quota errors */
  }
}
