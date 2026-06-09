/**
 * Stable URL hash for package checkout deep links (e.g. /logo-offer#basic).
 */
export function packageHashFromPackage(pkg) {
  if (!pkg) return '';

  const explicit = String(pkg.hash || pkg.anchor || '').trim().replace(/^#/, '');
  if (explicit) return slugifyHash(explicit);

  const fromSlug = String(pkg.slug || '').trim();
  if (fromSlug) return slugifyHash(fromSlug);

  const fromName = String(pkg.name || '').trim();
  if (fromName) {
    const cleaned = fromName
      .replace(/\s+package\s*$/i, '')
      .replace(/\s+plan\s*$/i, '')
      .trim();
    const hash = slugifyHash(cleaned);
    if (hash) return hash;
  }

  if (pkg.id != null) return `package-${pkg.id}`;
  return '';
}

function slugifyHash(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function normalizeCheckoutPackage(pkg, serviceType) {
  const hash = packageHashFromPackage(pkg);
  return {
    id: pkg.id,
    name: pkg.name,
    price: pkg.price,
    price_type: pkg.price_type,
    badge: pkg.badge,
    slug: pkg.slug,
    hash,
    serviceType: serviceType || pkg.serviceType || '',
  };
}

export function readLocationHash() {
  if (typeof window === 'undefined') return '';
  return decodeURIComponent(window.location.hash.replace(/^#/, '')).toLowerCase();
}
