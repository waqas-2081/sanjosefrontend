import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { storageUrl } from '../api/apiBase';
import { createPaymentRequest } from '../api/paymentRequestApi';
import { logoCreatorConceptImageUrl, postLogoCreatorCheckoutNotify, postLogoCreatorSelect } from '../api/logoCreatorApi';
import { formatMoney } from '../components/checkout/logoPackageWizardData';
import { CashAppMark, PayPalMark, StripeMark } from '../components/checkout/PaymentMethodIcons';
import LogoAddonMockupGrid from '../components/logo-creator/LogoAddonMockupGrid';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { LOGO_CREATOR_ADDONS } from '../lib/logoAddonCatalog';
import { resetViewportForSpaNavigation } from '../lib/resetViewportForSpaNavigation';
import styles from './LogoCreatorCompletedPage.module.css';

const STORAGE_KEY = 'logoCreatorCompleted';
const AI_LOGO_AGENT = 'AI Logo maker';
const AMOUNT_FILES = 30;
const AMOUNT_EDITS = 50;

function VenmoMark({ active }) {
  return (
    <i
      className={`fa-brands fa-vimeo-v pcm-fa-mark${active ? ' pcm-fa-mark--active' : ''}`}
      aria-hidden="true"
      style={{ color: active ? '#fff' : '#008CFF' }}
    />
  );
}

const PAYMENT_METHODS = [
  { id: 'stripe', label: 'Card', Icon: StripeMark },
  { id: 'paypal', label: 'PayPal', Icon: PayPalMark },
  { id: 'venmo', label: 'Venmo', Icon: VenmoMark },
  { id: 'cashapp', label: 'Cash App', Icon: CashAppMark },
];

const LOGO_OPTIONS = [
  {
    id: 'files',
    title: 'High-Quality Printable Files',
    shortTitle: 'Printable Files',
    description: 'Get the refined logo in print-ready files.',
    amount: AMOUNT_FILES,
  },
  {
    id: 'edits',
    title: 'Need Edits to Your Logo?',
    shortTitle: 'Logo Edits',
    description: 'Request edits to your selected concept.',
    amount: AMOUNT_EDITS,
  },
];

function resolveImageUrl(img) {
  if (!img) return '';
  if (typeof img === 'string') return storageUrl(img);
  if (img.path) return storageUrl(img.path);
  if (img.url) return storageUrl(img.url);
  return '';
}

function readStoredPayload() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    return parsed;
  } catch {
    return null;
  }
}

export function persistLogoCreatorCompleted(payload) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // ignore quota / private mode failures
  }
}

function LogoCard({
  img,
  index,
  businessName,
  selectable,
  selected,
  onSelect,
}) {
  const label = `Concept ${index + 1}`;
  const Wrapper = selectable ? 'button' : 'div';
  const wrapperProps = selectable
    ? {
        type: 'button',
        onClick: () => onSelect(index),
        'aria-pressed': selected,
        'aria-label': `Select ${label}`,
      }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      style={{
        position: 'relative',
        display: 'block',
        width: '100%',
        aspectRatio: '1 / 1',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        borderRadius: 12,
        overflow: 'hidden',
        border: selected
          ? '2px solid #f97316'
          : '2px dashed #94a3b8',
        background: '#f8fafc',
        boxShadow: selected
          ? '0 12px 28px rgba(249, 115, 22, 0.28)'
          : '0 4px 14px rgba(0,0,0,0.06)',
        cursor: selectable ? 'pointer' : 'default',
        outline: 'none',
        transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          zIndex: 1,
          padding: '4px 9px',
          borderRadius: 999,
          background: selected ? 'rgba(249, 115, 22, 0.95)' : 'rgba(17,24,39,0.82)',
          color: '#fff',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>

      {selectable ? (
        <span
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 1,
            width: 26,
            height: 26,
            borderRadius: '50%',
            border: selected ? '2px solid #f97316' : '2px solid #64748b',
            background: selected ? '#f97316' : 'rgba(255,255,255,0.95)',
            color: selected ? '#fff' : 'transparent',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 13,
            fontWeight: 700,
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
          }}
          aria-hidden
        >
          {selected ? '✓' : ''}
        </span>
      ) : null}

      {selectable && !selected ? (
        <span
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            padding: '10px 8px',
            background: 'linear-gradient(transparent, rgba(15,23,42,0.72))',
            color: '#fff',
            fontSize: 13,
            fontWeight: 700,
            textAlign: 'center',
            letterSpacing: '0.02em',
          }}
        >
          Click to select
        </span>
      ) : null}

      {selectable && selected ? (
        <span
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            padding: '10px 8px',
            background: 'linear-gradient(transparent, rgba(249, 115, 22, 0.88))',
            color: '#fff',
            fontSize: 13,
            fontWeight: 700,
            textAlign: 'center',
            letterSpacing: '0.02em',
          }}
        >
          Selected
        </span>
      ) : null}

      <img
        src={img.url}
        alt={`AI logo concept ${index + 1}${businessName ? ` for ${businessName}` : ''}`}
        draggable={false}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center center',
          display: 'block',
          pointerEvents: 'none',
        }}
      />
    </Wrapper>
  );
}

export default function LogoCreatorCompletedPage() {
  useDocumentTitle('Logo Creator Completed | San Jose Logo Design');

  const location = useLocation();
  const navigate = useNavigate();
  const firedRef = useRef(false);

  const payload = useMemo(() => {
    const fromState = location.state?.logoCreatorCompleted ? location.state : null;
    if (fromState?.formData || fromState?.images) {
      return {
        formData: fromState.formData || {},
        images: Array.isArray(fromState.images) ? fromState.images : [],
        formSubmitted: Boolean(fromState.formSubmitted),
        selectedIndex:
          typeof fromState.selectedIndex === 'number' ? fromState.selectedIndex : null,
        sessionToken: fromState.sessionToken || null,
        skipGeneration: Boolean(fromState.skipGeneration),
      };
    }
    return readStoredPayload();
  }, [location.state]);

  const formData = payload?.formData || {};
  const images = useMemo(() => {
    const list = Array.isArray(payload?.images) ? payload.images : [];
    return list
      .map((img, i) => ({
        key: (typeof img === 'object' && (img.path || img.url)) || i,
        url: resolveImageUrl(img),
        raw: img,
      }))
      .filter((img) => img.url)
      .slice(0, 2);
  }, [payload]);

  const [selectedIndex, setSelectedIndex] = useState(() => {
    if (typeof payload?.selectedIndex === 'number' && payload.selectedIndex >= 0) {
      return payload.selectedIndex;
    }
    return null;
  });
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [logoOption, setLogoOption] = useState(null);
  const [selectedAddonIds, setSelectedAddonIds] = useState([]);
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState('');

  const selectedLogoUrl =
    selectedIndex != null && images[selectedIndex] ? images[selectedIndex].url : '';
  const corsLogoUrl =
    selectedIndex != null
      ? logoCreatorConceptImageUrl(payload?.sessionToken, selectedIndex)
      : '';
  const mockupLogoUrls = useMemo(
    () => [corsLogoUrl, selectedLogoUrl].filter(Boolean),
    [corsLogoUrl, selectedLogoUrl],
  );

  useEffect(() => {
    if (!payload?.formSubmitted || firedRef.current) return;
    firedRef.current = true;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'form_submitted_confirmed' });
    console.log('[GTM] form_submitted_confirmed pushed');

    navigate('.', {
      replace: true,
      state: {
        formData: payload.formData,
        images: payload.images,
        formSubmitted: false,
        logoCreatorCompleted: true,
        selectedIndex: payload.selectedIndex ?? null,
        sessionToken: payload.sessionToken || null,
        skipGeneration: Boolean(payload.skipGeneration),
      },
    });
  }, [payload, navigate]);

  useEffect(() => {
    const hasDetails = Boolean(
      formData.businessName || formData.email || formData.slogan || formData.industry
    );
    if (!hasDetails && images.length === 0) {
      navigate('/logo-creator', { replace: true });
    }
  }, [formData, images.length, navigate]);

  const businessName = String(formData.businessName || '').trim();
  const slogan = String(formData.slogan || '').trim();
  const email = String(formData.email || '').trim();
  const phone = String(formData.phone || '').trim();

  const persistSelection = (index) => {
    const next = {
      formData: payload?.formData || formData,
      images: payload?.images || images.map((img) => img.raw),
      formSubmitted: false,
      logoCreatorCompleted: true,
      selectedIndex: index,
      sessionToken: payload?.sessionToken || null,
      skipGeneration: Boolean(payload?.skipGeneration),
    };
    persistLogoCreatorCompleted(next);
    navigate('.', { replace: true, state: next });
  };

  const handleSelectConcept = (index) => {
    setSelectedIndex(index);
    setSelectedAddonIds([]);
    setPayError('');
    persistSelection(index);

    const token = payload?.sessionToken;
    if (typeof token === 'string' && token.length === 64) {
      postLogoCreatorSelect(token, index).catch((err) => {
        console.warn('Could not notify admin of logo selection', err);
      });
    }
  };

  const selectedOption = LOGO_OPTIONS.find((option) => option.id === logoOption) || null;
  const selectedAddons = useMemo(
    () => LOGO_CREATOR_ADDONS.filter((addon) => selectedAddonIds.includes(addon.id)),
    [selectedAddonIds],
  );
  const addonsTotal = selectedAddons.reduce((sum, addon) => sum + Number(addon.price || 0), 0);
  const optionAmount = selectedOption ? Number(selectedOption.amount) : 0;
  const grandTotal = optionAmount + addonsTotal;
  const paymentMeta = PAYMENT_METHODS.find((method) => method.id === paymentMethod) || null;
  const canProceed = Boolean(paymentMethod && selectedOption && selectedIndex != null && grandTotal > 0);

  const toggleAddon = (addon) => {
    if (!addon?.id || paying) return;
    setSelectedAddonIds((prev) => (
      prev.includes(addon.id)
        ? prev.filter((id) => id !== addon.id)
        : [...prev, addon.id]
    ));
  };

  const startCheckout = async () => {
    if (paying || !canProceed) return;
    setPayError('');
    setPaying(true);

    const customerName = businessName || formData.email || 'AI Logo Customer';
    const conceptLabel = `Concept ${selectedIndex + 1}`;
    const baseName = businessName || 'Logo';
    const addonNames = selectedAddons.map((addon) => addon.title);
    const addonsLabel = addonNames.join(', ');
    const packageName = [
      `AI Logo: ${baseName} (${conceptLabel})`,
      selectedOption.shortTitle,
      ...addonNames,
    ].join(' + ');

    try {
      const { id, paymentLink } = await createPaymentRequest({
        salesAgent: AI_LOGO_AGENT,
        customerName,
        email: formData.email?.trim() || null,
        phone: formData.phone?.trim() || null,
        packageName,
        amount: grandTotal,
        paymentMethod,
      });

      const token = payload?.sessionToken;
      if (typeof token === 'string' && token.length === 64) {
        postLogoCreatorCheckoutNotify({
          session_token: token,
          selected_index: selectedIndex,
          logo_option: logoOption,
          payment_method: paymentMethod,
          amount: grandTotal,
          payment_link: paymentLink,
          selected_addons: addonNames,
        }).catch((err) => {
          console.warn('Could not notify admin of logo checkout', err);
        });
      }

      resetViewportForSpaNavigation();
      navigate(`/complete-payment/${paymentLink}`, {
        state: {
          customerName,
          email: formData.email?.trim() || '',
          phone: formData.phone?.trim() || '',
          packageName: `AI Logo: ${baseName} (${conceptLabel}) — ${selectedOption.title}`,
          addons: addonNames,
          addonsLabel,
          amount: String(grandTotal),
          salesAgent: AI_LOGO_AGENT,
          paymentMethod,
          paymentRequestId: id,
          paymentLink,
          serviceType: 'ai-logo',
          logoOption,
          selectedConcept: selectedIndex + 1,
        },
      });
    } catch (err) {
      setPayError(err?.message || 'Unable to start payment. Please try again.');
      setPaying(false);
    }
  };

  const proceedHint = !paymentMethod
    ? 'Select a payment method to continue.'
    : !selectedOption
      ? 'Choose printable files or logo edits to continue.'
      : 'Add any product designs you want, then proceed to payment.';

  const hasSelection = selectedIndex != null;
  const skipGeneration = Boolean(payload?.skipGeneration);

  return (
    <>
      <section className="inner-breadcrumb">
        <div className="container-fluid">
          <div className="inner-breadcrumb-content">
            <h1>
              {skipGeneration ? (
                <>
                  Thank You! Your <span>Request</span> Was Received
                </>
              ) : (
                <>
                  Thank You! Your <span>AI Logos</span> Are Ready
                </>
              )}
            </h1>
            <div className="inner-breadcrumb-links">
              <Link to="/">Home</Link>
              <i className="fa-solid fa-angle-right" />
              <span>Logo Creator Completed</span>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section py-5">
        <div className="container">
          {skipGeneration ? (
            <div className={styles.thanks}>
              <p>
                We received your logo request
                {businessName ? ` for ${businessName}` : ''}. Our team will review your details
                and contact you shortly.
              </p>
              <Link to="/" className={styles.homeBtn} onClick={() => resetViewportForSpaNavigation()}>
                Go to Home
              </Link>
            </div>
          ) : (
            <div className={styles.shell}>
              {images.length > 0 ? (
                <>
                  <p className={styles.hint}>
                    {hasSelection
                      ? `Concept ${selectedIndex + 1} selected — complete your order below`
                      : 'Tap or click a concept to select it'}
                  </p>
                  <div className={styles.conceptGrid}>
                    {images.map((img, i) => (
                      <div key={img.key} style={{ minWidth: 0 }}>
                        <LogoCard
                          img={img}
                          index={i}
                          businessName={businessName}
                          selectable
                          selected={selectedIndex === i}
                          onSelect={handleSelectConcept}
                        />
                      </div>
                    ))}
                  </div>
                </>
              ) : null}

            {hasSelection ? (
                <div className={styles.checkout}>
                  <div className={styles.main}>
                    <div className={styles.panel}>
                      <div className={styles.panelHead}>
                        <span className={styles.step}>1</span>
                        <h3 className={styles.panelTitle}>Select payment method</h3>
                      </div>
                      <div className={styles.methods} role="radiogroup" aria-label="Payment method">
                        {PAYMENT_METHODS.map(({ id, label, Icon }) => {
                          const active = paymentMethod === id;
                          return (
                            <button
                              key={id}
                              type="button"
                              role="radio"
                              aria-checked={active}
                              className={`${styles.methodBtn}${active ? ` ${styles.methodBtnActive}` : ''}`}
                              onClick={() => setPaymentMethod(id)}
                              disabled={paying}
                            >
                              <Icon active={active} />
                              <span className={styles.methodLabel}>{label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {paymentMethod ? (
                      <div className={styles.panel}>
                        <div className={styles.panelHead}>
                          <span className={styles.step}>2</span>
                          <h3 className={styles.panelTitle}>Choose your logo option</h3>
                        </div>
                        <p className={styles.panelSub}>
                          Pick printable files or logo edits. The price is added to your summary.
                        </p>
                        <div className={styles.offerGrid}>
                          {LOGO_OPTIONS.map((option) => {
                            const selected = logoOption === option.id;
                            return (
                              <button
                                key={option.id}
                                type="button"
                                className={`${styles.offerCard}${selected ? ` ${styles.offerCardSelected}` : ''}`}
                                onClick={() => setLogoOption(option.id)}
                                disabled={paying}
                                aria-pressed={selected}
                              >
                                <h3 className={styles.offerTitle}>{option.title}</h3>
                                <p className={styles.offerCopy}>{option.description}</p>
                                <div className={styles.offerMeta}>
                                  <span className={styles.offerPrice}>{formatMoney(option.amount)}</span>
                                  <span className={styles.offerPick}>{selected ? 'Selected' : 'Select'}</span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ) : null}

                    {payError ? (
                      <p role="alert" className={styles.error}>{payError}</p>
                    ) : null}
                  </div>

                  <aside className={styles.sidebar} aria-label="Order summary">
                    <h3 className={styles.sidebarTitle}>Order summary</h3>
                    {selectedLogoUrl ? (
                      <div className={styles.conceptPreview}>
                        <img src={selectedLogoUrl} alt="" />
                        <div>
                          <p className={styles.conceptPreviewName}>
                            {businessName || 'Your logo'}
                          </p>
                          <p className={styles.conceptPreviewMeta}>
                            Concept {selectedIndex + 1}
                          </p>
                        </div>
                      </div>
                    ) : null}

                    <div className={styles.rows}>
                      <div className={`${styles.row}${paymentMeta ? '' : ` ${styles.rowMuted}`}`}>
                        <span className={styles.rowLabel}>Payment</span>
                        <span className={styles.rowValue}>
                          {paymentMeta ? paymentMeta.label : 'Choose a method'}
                        </span>
                      </div>
                      <div className={`${styles.row}${selectedOption ? '' : ` ${styles.rowMuted}`}`}>
                        <span className={styles.rowLabel}>Logo option</span>
                        <span className={styles.rowStack}>
                          <span className={styles.rowValue}>
                            {selectedOption ? selectedOption.shortTitle : 'Choose an option'}
                          </span>
                          {selectedOption ? (
                            <span className={styles.rowValue}>{formatMoney(selectedOption.amount)}</span>
                          ) : null}
                        </span>
                      </div>
                      {selectedAddons.length ? selectedAddons.map((addon) => (
                        <div key={addon.id} className={styles.row}>
                          <span className={styles.rowLabel}>{addon.title}</span>
                          <span className={styles.rowStack}>
                            <span className={styles.rowValue}>{formatMoney(addon.price)}</span>
                            <button
                              type="button"
                              className={styles.removeBtn}
                              onClick={() => toggleAddon(addon)}
                              disabled={paying}
                              aria-label={`Remove ${addon.title}`}
                            >
                              <i className="fa-solid fa-xmark" aria-hidden="true" />
                            </button>
                          </span>
                        </div>
                      )) : (
                        <div className={`${styles.row} ${styles.rowMuted}`}>
                          <span className={styles.rowLabel}>Add-ons</span>
                          <span className={styles.rowValue}>None yet</span>
                        </div>
                      )}
                    </div>

                    <div className={styles.total}>
                      <span className={styles.totalLabel}>Total</span>
                      <span className={styles.totalValue}>{formatMoney(grandTotal)}</span>
                    </div>
                    <button
                      type="button"
                      className={styles.proceedBtn}
                      onClick={startCheckout}
                      disabled={!canProceed || paying}
                      aria-busy={paying}
                    >
                      {paying ? 'Opening checkout…' : 'Proceed to Payment'}
                    </button>
                    {!canProceed ? <p className={styles.proceedHint}>{proceedHint}</p> : null}
                  </aside>

                  <div className={styles.mobileBar}>
                    <div className={styles.mobileTotal}>
                      <span>Total</span>
                      <span>{formatMoney(grandTotal)}</span>
                    </div>
                    <button
                      type="button"
                      className={styles.proceedBtn}
                      onClick={startCheckout}
                      disabled={!canProceed || paying}
                      aria-busy={paying}
                    >
                      {paying ? 'Opening…' : 'Proceed'}
                    </button>
                  </div>
                </div>
            ) : null}

              {images.length > 0 ? (
                <div className={styles.addons}>
                  {hasSelection ? (
                    <div className={styles.panelHead}>
                      <span className={styles.step}>3</span>
                      <h3 className={styles.panelTitle}>Add product designs</h3>
                    </div>
                  ) : (
                    <h3 className={styles.addonsTitle}>Add product designs</h3>
                  )}
                  <p className={styles.panelSub}>
                    {hasSelection
                      ? 'Optional — select as many as you want. Each one is added to your summary.'
                      : 'Select a concept above to preview your logo on these products.'}
                  </p>
                  <LogoAddonMockupGrid
                    logoUrls={mockupLogoUrls}
                    businessName={businessName}
                    slogan={slogan}
                    email={email}
                    phone={phone}
                    selectedIds={selectedAddonIds}
                    onToggle={toggleAddon}
                    disabled={paying}
                    locked={!hasSelection}
                    compact
                  />
                </div>
              ) : null}

              <div className={styles.homeWrap}>
                <Link to="/" className={styles.homeBtn} onClick={() => resetViewportForSpaNavigation()}>
                  Go to Home
                </Link>
              </div>
          </div>
          )}
        </div>
      </section>
    </>
  );
}
