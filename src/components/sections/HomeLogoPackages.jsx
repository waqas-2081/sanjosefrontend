import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPackagesByServiceType } from '../../api/packagesApi';
import LogoPackageWizardModal from '../checkout/LogoPackageWizardModal';
import { packageHashFromPackage } from '../../lib/packageHash';
import styles from './HomeLogoPackages.module.css';

const SERVICE_TYPE = 'logo';
const PACKAGE_LIMIT = 3;
const FEATURE_LIMIT = 5;

const CARD_IMAGES = [
  '/assets/images/portfolio/logo/1.png',
  '/assets/images/portfolio/logo/7.png',
  '/assets/images/portfolio/logo/10.png',
];

/** Higher score = more “main” selling points for the home cards */
const FEATURE_PRIORITY = [
  { re: /concept/i, score: 100 },
  { re: /designer/i, score: 95 },
  { re: /revision/i, score: 90 },
  { re: /turnaround|tat|hrs\.?/i, score: 85 },
  { re: /ownership|copyright/i, score: 80 },
  { re: /format|jpeg|png|pdf|eps|svg|\.ai|final file/i, score: 75 },
  { re: /consultation|brand/i, score: 70 },
  { re: /stationary|letterhead|business card|flyer|brochure/i, score: 65 },
  { re: /icon/i, score: 60 },
  { re: /guarantee|money\s*back|satisfaction/i, score: 20 },
];

function featureText(feat) {
  if (feat == null) return '';
  if (typeof feat === 'string') return feat.trim();
  if (typeof feat === 'object') {
    return String(feat.text || feat.name || feat.label || feat.title || '').trim();
  }
  return String(feat).trim();
}

function featureScore(line) {
  let score = 40;
  for (const rule of FEATURE_PRIORITY) {
    if (rule.re.test(line)) score = Math.max(score, rule.score);
  }
  return score;
}

/** Keep only the 5 strongest feature points per package */
function normalizeFeatures(features) {
  if (!Array.isArray(features)) return [];
  return features
    .map(featureText)
    .filter(Boolean)
    .map((line, index) => ({ line, index, score: featureScore(line) }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, FEATURE_LIMIT)
    .sort((a, b) => a.index - b.index)
    .map((item) => item.line);
}

function displayName(name) {
  return String(name || 'Package')
    .replace(/\s+logo\s*$/i, '')
    .replace(/\s+package\s*$/i, '')
    .trim()
    .toUpperCase();
}

function formatPrice(price) {
  const raw = String(price ?? '').trim();
  if (!raw) return '$0';
  if (raw.startsWith('$')) return raw;
  return `$${raw}`;
}

export function HomeLogoPackages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [wizardPackage, setWizardPackage] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchPackagesByServiceType(SERVICE_TYPE);
        if (!cancelled) setPackages(Array.isArray(data) ? data.slice(0, PACKAGE_LIMIT) : []);
      } catch (e) {
        if (!cancelled) setError(e.message || 'Failed to load packages.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className={styles.section} data-no-motion="true" aria-labelledby="home-logo-packages-title">
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            Logo Packages
          </span>
          <h2 id="home-logo-packages-title" className={styles.title}>
            Choose Your <span className={styles.titleAccent}>Identity</span>
          </h2>
          <p className={styles.subtitle}>
            Three curated logo packages — same plans we offer on logo design — crafted for startups,
            rebrands, and brands that want a lasting first impression.
          </p>
        </header>

        <div className={styles.grid}>
          {loading ? (
            <p className={styles.status}>Loading packages…</p>
          ) : error ? (
            <p className={`${styles.status} ${styles.error}`} role="alert">
              {error}
            </p>
          ) : packages.length === 0 ? (
            <p className={styles.status}>No packages available right now.</p>
          ) : (
            packages.map((pkg, index) => {
              const featured = index === 1;
              const lines = normalizeFeatures(pkg.features);
              const packageHash = packageHashFromPackage(pkg);
              const imageSrc = CARD_IMAGES[index % CARD_IMAGES.length];

              return (
                <article
                  key={pkg.id}
                  id={packageHash || undefined}
                  className={`${styles.card}${featured ? ` ${styles.cardFeatured}` : ''}`}
                >
                  <div className={styles.media}>
                    <img
                      src={imageSrc}
                      alt=""
                      className={styles.mediaImg}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className={styles.body}>
                    <p className={styles.kicker}>Logo Design</p>
                    <h3 className={styles.name}>{displayName(pkg.name)}</h3>

                    <div className={styles.priceRow}>
                      <span className={styles.price}>{formatPrice(pkg.price)}</span>
                    </div>

                    <button
                      type="button"
                      className={styles.cta}
                      onClick={() => setWizardPackage({ ...pkg, previewImage: imageSrc })}
                    >
                      {pkg.button_text || 'Start Now'}
                      <span className={styles.ctaArrow} aria-hidden="true">
                        →
                      </span>
                    </button>

                    {lines.length > 0 ? (
                      <ul className={styles.features}>
                        {lines.map((line) => (
                          <li key={line} className={styles.feature}>
                            <span className={styles.bullet} aria-hidden="true" />
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </article>
              );
            })
          )}
        </div>

        <div className={styles.foot}>
          <Link to="/logo-design-services" className={styles.footLink}>
            View all logo design packages →
          </Link>
        </div>
      </div>

      <LogoPackageWizardModal
        open={Boolean(wizardPackage)}
        selectedPackage={wizardPackage}
        onClose={() => setWizardPackage(null)}
      />
    </section>
  );
}
