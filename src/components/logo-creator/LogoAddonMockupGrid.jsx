import { useEffect, useMemo, useState } from 'react';
import { formatMoney } from '../checkout/logoPackageWizardData';
import { composeAllLogoAddonMockups } from '../../lib/composeLogoAddonMockup';
import { LOGO_CREATOR_ADDONS } from '../../lib/logoAddonCatalog';
import styles from './LogoAddonMockupGrid.module.css';

export default function LogoAddonMockupGrid({
  logoUrls,
  businessName,
  slogan,
  email,
  phone,
  selectedIds = [],
  onToggle,
  disabled,
  compact = false,
  locked = false,
}) {
  const [previews, setPreviews] = useState({});
  const [composing, setComposing] = useState(false);
  const [composeError, setComposeError] = useState('');

  const urls = useMemo(
    () => (Array.isArray(logoUrls) ? logoUrls : [logoUrls]).filter(Boolean),
    [logoUrls],
  );

  useEffect(() => {
    if (locked || !urls.length) {
      setPreviews({});
      setComposing(false);
      setComposeError('');
      return undefined;
    }

    let cancelled = false;
    setComposing(true);
    setComposeError('');
    setPreviews({});

    composeAllLogoAddonMockups({
      logoUrls: urls,
      businessName,
      slogan,
      email,
      phone,
    })
      .then((result) => {
        if (cancelled) return;
        setPreviews(result.previews || {});
      })
      .catch((err) => {
        if (cancelled) return;
        console.warn('Could not compose logo add-on mockups', err);
        setComposeError('Showing blank templates. Personalized previews could not be generated.');
      })
      .finally(() => {
        if (!cancelled) setComposing(false);
      });

    return () => {
      cancelled = true;
    };
  }, [urls, businessName, slogan, email, phone, locked]);

  const selectionDisabled = disabled || locked;

  return (
    <section className={compact ? styles.sectionCompact : styles.section} aria-label="Logo product add-ons">
      {compact ? null : (
        <>
          <h2 className={styles.heading}>See your logo on products</h2>
          <p className={styles.subhead}>
            {locked
              ? 'Select a concept above to preview your logo on these products.'
              : 'Personalized previews of your selected concept. Add as many as you like.'}
          </p>
        </>
      )}
      <div className={styles.grid}>
        {LOGO_CREATOR_ADDONS.map((addon) => {
          const preview = locked ? addon.template : (previews[addon.id] || addon.template);
          const ready = !locked && Boolean(previews[addon.id]);
          const selected = !locked && selectedIds.includes(addon.id);
          return (
            <article
              key={addon.id}
              className={`${styles.card}${selected ? ` ${styles.cardSelected}` : ''}${locked ? ` ${styles.cardLocked}` : ''}`}
            >
              <div className={styles.media}>
                <img
                  src={preview}
                  alt={`${addon.title} preview${businessName ? ` for ${businessName}` : ''}`}
                  loading="lazy"
                  className={locked ? styles.mediaBlurred : undefined}
                />
                {locked ? (
                  <div className={styles.lockedOverlay}>Select a concept</div>
                ) : null}
                {!locked && composing && !ready ? (
                  <div className={styles.pending}>Applying logo…</div>
                ) : null}
              </div>
              <div className={styles.body}>
                <h3 className={styles.title}>{addon.title}</h3>
                <div className={styles.footer}>
                  <div>
                    <span className={styles.priceNow}>{formatMoney(addon.price)}</span>
                    {addon.compareAt ? (
                      <span className={styles.priceWas}>{formatMoney(addon.compareAt)}</span>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    className={`${styles.addBtn}${selected ? ` ${styles.addBtnActive}` : ''}`}
                    onClick={() => onToggle?.(addon)}
                    disabled={selectionDisabled}
                    aria-pressed={selected}
                  >
                    {selected ? 'Added' : 'Add'}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      {!locked && composeError ? <p className={styles.error}>{composeError}</p> : null}
    </section>
  );
}
