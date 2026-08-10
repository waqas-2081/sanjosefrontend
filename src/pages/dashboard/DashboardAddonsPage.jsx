import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchLogoPackageOptions } from '../../api/logoPackageApi';
import { createPaymentRequest } from '../../api/paymentRequestApi';
import { useAuth } from '../../context/AuthContext';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { LOGO_ADDONS as FALLBACK_ADDONS, formatMoney } from '../../components/checkout/logoPackageWizardData';
import ui from '../../components/dashboard/DashboardUI.module.css';
import styles from './DashboardAddonsPage.module.css';

const DEFAULT_SALES_AGENT = 'Sam';
const DEFAULT_PAYMENT_METHOD = 'stripe';

function normalizeAddons(list) {
  return (Array.isArray(list) ? list : [])
    .filter((addon) => addon && !addon.skipAddons && Number(addon.price) > 0)
    .map((addon) => ({
      id: addon.id,
      title: addon.title,
      image: addon.image || null,
      price: Number(addon.price) || 0,
      compareAt: addon.compareAt != null ? Number(addon.compareAt) : null,
    }));
}

export default function DashboardAddonsPage() {
  useDocumentTitle('Add-ons | Client Dashboard');
  const navigate = useNavigate();
  const { user } = useAuth();

  const [addons, setAddons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      setLoading(true);
      setLoadError('');
      try {
        const data = await fetchLogoPackageOptions({ signal: controller.signal });
        setAddons(normalizeAddons(data.addons));
      } catch (err) {
        if (err?.name === 'AbortError') return;
        setAddons(normalizeAddons(FALLBACK_ADDONS));
        setLoadError('Showing available add-ons. Live catalog could not be refreshed.');
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    })();

    return () => controller.abort();
  }, []);

  const selected = useMemo(
    () => addons.find((addon) => String(addon.id) === String(selectedId)) || null,
    [addons, selectedId],
  );

  const handleSelect = (addon) => {
    setSubmitError('');
    setSelectedId((prev) => (String(prev) === String(addon.id) ? null : addon.id));
  };

  const handleCompletePurchase = async () => {
    if (!selected || submitting) return;

    const customerName = String(user?.name || '').trim();
    const email = String(user?.email || '').trim();
    const phone = String(user?.phone || '').trim() || null;

    if (!customerName) {
      setSubmitError('Please update your profile name before completing payment.');
      return;
    }
    if (!email) {
      setSubmitError('Please update your profile email before completing payment.');
      return;
    }
    if (!(selected.price > 0)) {
      setSubmitError('This add-on is not available for purchase.');
      return;
    }

    setSubmitting(true);
    setSubmitError('');

    try {
      const { id, paymentLink } = await createPaymentRequest({
        salesAgent: DEFAULT_SALES_AGENT,
        customerName,
        email,
        phone,
        packageName: selected.title,
        amount: selected.price,
        paymentMethod: DEFAULT_PAYMENT_METHOD,
      });

      navigate(`/complete-payment/${paymentLink}`, {
        state: {
          customerName,
          email,
          phone,
          packageName: selected.title,
          addons: [selected.title],
          addonsLabel: selected.title,
          amount: String(selected.price),
          salesAgent: DEFAULT_SALES_AGENT,
          paymentMethod: DEFAULT_PAYMENT_METHOD,
          paymentRequestId: id,
          paymentLink,
          serviceType: 'addon',
          packageId: selected.id,
        },
      });
    } catch (err) {
      setSubmitError(err.message || 'Unable to start payment. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <div className={`${ui.page} ${styles.page}`}>
      <div className={ui.panel}>
        <div className={ui.panelHead}>
          <h2 className={ui.panelTitle}>Available Add-ons</h2>
          <p className={styles.intro}>
            Select an add-on below, then complete your purchase to continue to payment.
          </p>
        </div>

        <div className={styles.body}>
          {loading && <p className={styles.state}>Loading add-ons…</p>}

          {!loading && loadError && (
            <p className={styles.hint} role="status">{loadError}</p>
          )}

          {!loading && !addons.length && (
            <p className={styles.state}>No add-ons are available right now.</p>
          )}

          {!loading && addons.length > 0 && (
            <div className={styles.grid}>
              {addons.map((addon) => {
                const isSelected = String(selectedId) === String(addon.id);
                return (
                  <button
                    key={addon.id}
                    type="button"
                    className={`${styles.card}${isSelected ? ` ${styles.cardSelected}` : ''}`}
                    onClick={() => handleSelect(addon)}
                    aria-pressed={isSelected}
                  >
                    <div className={styles.media}>
                      {addon.image ? (
                        <img src={addon.image} alt="" loading="lazy" />
                      ) : (
                        <span className={styles.mediaFallback}>Add-on</span>
                      )}
                    </div>
                    <div className={styles.cardBody}>
                      <h3 className={styles.cardTitle}>{addon.title}</h3>
                      <div className={styles.cardFooter}>
                        <div className={styles.priceRow}>
                          <span className={styles.priceNow}>{formatMoney(addon.price)}</span>
                          {addon.compareAt != null && addon.compareAt > addon.price && (
                            <span className={styles.priceWas}>{formatMoney(addon.compareAt)}</span>
                          )}
                        </div>
                        <span className={`${styles.selectBtn}${isSelected ? ` ${styles.selectBtnActive}` : ''}`}>
                          {isSelected ? 'Selected' : 'Select'}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {selected && (
            <div className={styles.actionBar}>
              <div className={styles.actionInfo}>
                <span className={styles.actionLabel}>Selected add-on</span>
                <strong className={styles.actionTitle}>{selected.title}</strong>
                <span className={styles.actionPrice}>{formatMoney(selected.price)}</span>
              </div>
              <button
                type="button"
                className={`${ui.btnPrimary} ${styles.completeBtn}`}
                onClick={handleCompletePurchase}
                disabled={submitting}
              >
                {submitting ? 'Preparing…' : 'Complete Purchase'}
              </button>
            </div>
          )}

          {submitError && (
            <p className={styles.error} role="alert">{submitError}</p>
          )}
        </div>
      </div>
    </div>
  );
}
