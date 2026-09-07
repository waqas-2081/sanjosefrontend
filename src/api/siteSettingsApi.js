import { apiUrl, storageUrl, JSON_HEADERS } from './apiBase';

export const DEFAULT_SITE_SETTINGS = {
  popup_image: null,
  email: 'info@sanjoselogodesign.com',
  phone: '(214) 449-1305',
  location: '14A S 1st St, San Jose, CA 95113, USA',
  social: {
    facebook: 'https://www.facebook.com/SanJoselogodesign',
    instagram: 'https://www.instagram.com/sanjoselogodesign/',
    x: 'https://x.com/SJLogoDesigns',
    linkedin: 'https://www.linkedin.com/company/san-jose-logo-design',
  },
};

/** Build a safe tel: href from display phone text. */
export function toTelHref(phone) {
  const raw = String(phone || '').trim();
  if (!raw) return '#';
  if (/^tel:/i.test(raw)) return raw;
  const digits = raw.replace(/\D/g, '');
  if (!digits) return '#';
  if (digits.length === 10) return `tel:+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `tel:+${digits}`;
  return `tel:+${digits}`;
}

function normalizeSettings(raw) {
  const data = raw && typeof raw === 'object' ? raw : {};
  const social = data.social && typeof data.social === 'object' ? data.social : {};

  const popupRaw = data.popup_image || data.popup_image_url || null;
  const popup_image = popupRaw ? storageUrl(popupRaw) : null;

  return {
    popup_image,
    email: String(data.email || DEFAULT_SITE_SETTINGS.email).trim() || DEFAULT_SITE_SETTINGS.email,
    phone: String(data.phone || DEFAULT_SITE_SETTINGS.phone).trim() || DEFAULT_SITE_SETTINGS.phone,
    location:
      String(data.location || DEFAULT_SITE_SETTINGS.location).trim() || DEFAULT_SITE_SETTINGS.location,
    social: {
      facebook:
        String(social.facebook || DEFAULT_SITE_SETTINGS.social.facebook).trim() ||
        DEFAULT_SITE_SETTINGS.social.facebook,
      instagram:
        String(social.instagram || DEFAULT_SITE_SETTINGS.social.instagram).trim() ||
        DEFAULT_SITE_SETTINGS.social.instagram,
      x:
        String(social.x || social.twitter || DEFAULT_SITE_SETTINGS.social.x).trim() ||
        DEFAULT_SITE_SETTINGS.social.x,
      linkedin:
        String(social.linkedin || DEFAULT_SITE_SETTINGS.social.linkedin).trim() ||
        DEFAULT_SITE_SETTINGS.social.linkedin,
    },
  };
}

export async function fetchSiteSettings() {
  const res = await fetch(apiUrl('/api/v1/site-settings'), { headers: JSON_HEADERS });
  const contentType = res.headers.get('content-type') || '';
  const json = contentType.includes('application/json')
    ? await res.json().catch(() => null)
    : null;

  if (!res.ok || !json) {
    throw new Error(json?.message || 'Unable to load site settings.');
  }

  const payload = json.data && typeof json.data === 'object' ? json.data : json;
  return normalizeSettings(payload);
}
