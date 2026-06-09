import React, { useEffect, useState } from 'react';
import { fetchPackagesByServiceType } from '../../api/packagesApi';
import { usePackageCheckout } from '../../context/PackageCheckoutContext';
import { packageHashFromPackage } from '../../lib/packageHash';

function featureText(feat) {
  if (feat == null) return '';
  if (typeof feat === 'string') return feat.trim();
  if (typeof feat === 'object') {
    return String(feat.text || feat.name || feat.label || feat.title || '').trim();
  }
  return String(feat).trim();
}

function normalizeFeatures(features) {
  if (!Array.isArray(features)) return [];
  return features.map(featureText).filter(Boolean);
}

function isFeaturedPackage(pkg) {
  const b = (pkg.badge || '').toLowerCase();
  return b.includes('popular');
}

export default function ServicePackagesSection({ serviceType, title, subtitle, pill }) {
  const { openCheckout, registerPackages } = usePackageCheckout();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchPackagesByServiceType(serviceType);
        if (!cancelled) setPackages(data);
      } catch (e) {
        if (!cancelled) setError(e.message || 'Failed to load packages.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [serviceType]);

  useEffect(() => {
    if (!loading && packages.length > 0) {
      registerPackages(serviceType, packages);
    }
  }, [loading, packages, serviceType, registerPackages]);

  return (
    <section className="packages-section py-5" data-no-motion="true">
      <div className="container">
        <div className="packages-header text-center">
          {pill ? <span className="section-pill">{pill}</span> : null}
          <h2 className="packages-title">{title}</h2>
          <p className="packages-subtitle">{subtitle}</p>
        </div>

        {error ? (
          <p className="text-center text-danger mb-0" role="alert">
            {error}
          </p>
        ) : null}

        <div className="packages-modern-grid">
          {loading ? (
            <div className="col-12 text-center py-4 text-muted">Loading packages…</div>
          ) : packages.length === 0 ? (
            <div className="col-12 text-center py-4 text-muted">No packages available for this service yet.</div>
          ) : (
            packages.map((pkg) => {
              const featured = isFeaturedPackage(pkg);
              const lines = normalizeFeatures(pkg.features);
              const packageHash = packageHashFromPackage(pkg);
              return (
                <article
                  key={pkg.id}
                  id={packageHash || undefined}
                  className={`package-card${featured ? ' featured' : ''}`}
                >
                  <span className="plan-badge">{pkg.badge || 'Plan'}</span>
                  <h3>{pkg.name}</h3>
                  <h2>
                    ${pkg.price} <small>{pkg.price_type}</small>
                  </h2>
                  {lines.length > 0 ? (
                    <ul>
                      {lines.map((line, i) => (
                        <li key={i}>
                          <i className="fa-solid fa-check" /> {line}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <button
                    type="button"
                    className="package-btn"
                    data-package-checkout="true"
                    onClick={() => openCheckout(pkg, serviceType)}
                  >
                    {pkg.button_text || 'Get Started'}
                  </button>
                </article>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
