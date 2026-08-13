import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { storageUrl } from '../api/apiBase';
import { createPaymentRequest } from '../api/paymentRequestApi';
import { postLogoCreatorSelect } from '../api/logoCreatorApi';
import { CashAppMark, PayPalMark, StripeMark } from '../components/checkout/PaymentMethodIcons';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { resetViewportForSpaNavigation } from '../lib/resetViewportForSpaNavigation';

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

function OfferCard({
  title,
  description,
  buttonLabel,
  amount,
  onPay,
  busy,
  busyLabel,
}) {
  return (
    <div
      style={{
        background: '#fff7ed',
        border: '1px solid #fed7aa',
        borderRadius: 14,
        padding: '18px 20px',
        textAlign: 'center',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 14,
      }}
    >
      <div>
        <h3
          style={{
            margin: '0 0 8px',
            fontSize: 20,
            fontWeight: 800,
            color: '#c2410c',
          }}
        >
          {title}
        </h3>
        <p
          style={{
            margin: 0,
            color: '#57534e',
            lineHeight: 1.55,
            fontSize: 15,
          }}
        >
          {description}{' '}
          <strong>${Number(amount).toFixed(2)}</strong>.
        </p>
      </div>
      <button
        type="button"
        onClick={onPay}
        disabled={busy}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 48,
          width: '100%',
          maxWidth: 320,
          borderRadius: 10,
          padding: '12px 20px',
          background: 'linear-gradient(135deg, #f59e0b, #f97316)',
          color: '#ffffff',
          fontWeight: 700,
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 10px 25px rgba(249, 115, 22, 0.35)',
          cursor: busy ? 'wait' : 'pointer',
          opacity: busy ? 0.85 : 1,
        }}
      >
        {busy ? busyLabel : buttonLabel}
      </button>
    </div>
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
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [payingOption, setPayingOption] = useState(null); // 'files' | 'edits' | null
  const [payError, setPayError] = useState('');

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
    setPayError('');
    persistSelection(index);

    const token = payload?.sessionToken;
    if (typeof token === 'string' && token.length === 64) {
      postLogoCreatorSelect(token, index).catch((err) => {
        console.warn('Could not notify admin of logo selection', err);
      });
    }
  };

  const startPayment = async (option) => {
    if (payingOption || selectedIndex == null) return;
    setPayError('');
    setPayingOption(option);

    const customerName = businessName || formData.email || 'AI Logo Customer';
    const amount = option === 'edits' ? AMOUNT_EDITS : AMOUNT_FILES;
    const conceptLabel = `Concept ${selectedIndex + 1}`;
    const baseName = businessName || 'Logo';
    const packageName =
      option === 'edits'
        ? `AI Logo Edit Payment: ${baseName} (${conceptLabel})`
        : `AI Logo Payment: ${baseName} (${conceptLabel})`;

    try {
      const { id, paymentLink } = await createPaymentRequest({
        salesAgent: AI_LOGO_AGENT,
        customerName,
        email: formData.email?.trim() || null,
        phone: formData.phone?.trim() || null,
        packageName,
        amount,
        paymentMethod,
      });

      resetViewportForSpaNavigation();
      navigate(`/complete-payment/${paymentLink}`, {
        state: {
          customerName,
          email: formData.email?.trim() || '',
          phone: formData.phone?.trim() || '',
          packageName,
          amount: String(amount),
          salesAgent: AI_LOGO_AGENT,
          paymentMethod,
          paymentRequestId: id,
          paymentLink,
          serviceType: 'ai-logo',
          logoOption: option,
          selectedConcept: selectedIndex + 1,
        },
      });
    } catch (err) {
      setPayError(err?.message || 'Unable to start payment. Please try again.');
      setPayingOption(null);
    }
  };

  const hasSelection = selectedIndex != null;
  const isBusy = payingOption != null;
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
            <div
              style={{
                maxWidth: 640,
                margin: '0 auto',
                textAlign: 'center',
              }}
            >
              <p style={{ fontSize: 18, color: '#334155', lineHeight: 1.6, marginBottom: 28 }}>
                We received your logo request
                {businessName ? ` for ${businessName}` : ''}. Our team will review your details
                and contact you shortly.
              </p>
              <Link
                to="/"
                className="px-4"
                onClick={() => resetViewportForSpaNavigation()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: 46,
                  borderRadius: 10,
                  paddingTop: 10,
                  paddingBottom: 10,
                  background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                  color: '#ffffff',
                  fontWeight: 700,
                  textDecoration: 'none',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: '0 10px 25px rgba(249, 115, 22, 0.35)',
                }}
              >
                Go to Home
              </Link>
            </div>
          ) : (
            <div
            style={{
              maxWidth: 820,
              margin: '0 auto',
              width: '100%',
            }}
          >
            {images.length > 0 ? (
              <>
                <p
                  style={{
                    textAlign: 'center',
                    margin: '0 0 14px',
                    color: '#64748b',
                    fontSize: 15,
                    fontWeight: 600,
                  }}
                >
                  {hasSelection
                    ? `Concept ${selectedIndex + 1} selected — choose an option below`
                    : 'Tap or click a concept to select it'}
                </p>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 16,
                    marginBottom: 28,
                    width: '100%',
                  }}
                >
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
              <>
                <div
                  style={{
                    background: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: 14,
                    padding: '16px 18px',
                    marginBottom: 16,
                    width: '100%',
                    boxSizing: 'border-box',
                  }}
                >
                  <h3
                    style={{
                      margin: '0 0 12px',
                      fontSize: 14,
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: '#6b7280',
                      textAlign: 'center',
                    }}
                  >
                    Select payment method
                  </h3>
                  <div
                    role="radiogroup"
                    aria-label="Payment method"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
                      gap: 10,
                    }}
                  >
                    {PAYMENT_METHODS.map(({ id, label, Icon }) => {
                      const active = paymentMethod === id;
                      return (
                        <button
                          key={id}
                          type="button"
                          role="radio"
                          aria-checked={active}
                          onClick={() => setPaymentMethod(id)}
                          disabled={isBusy}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 6,
                            minHeight: 72,
                            padding: '10px 8px',
                            borderRadius: 12,
                            border: active ? '2px solid #f97316' : '1px solid #e5e7eb',
                            background: active
                              ? 'linear-gradient(135deg, #f59e0b, #f97316)'
                              : '#f8fafc',
                            color: active ? '#fff' : '#334155',
                            cursor: isBusy ? 'not-allowed' : 'pointer',
                            boxShadow: active
                              ? '0 8px 20px rgba(249, 115, 22, 0.28)'
                              : 'none',
                          }}
                        >
                          <Icon active={active} />
                          <span style={{ fontSize: 13, fontWeight: 700 }}>{label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 16,
                    marginBottom: 24,
                    width: '100%',
                  }}
                >
                  <OfferCard
                    title="High-Quality Printable Files"
                    description="To get the refined logo in printable files, click the button below and pay"
                    buttonLabel="Pay $30.00 for High-Quality Files"
                    amount={AMOUNT_FILES}
                    onPay={() => startPayment('files')}
                    busy={isBusy}
                    busyLabel={
                      payingOption === 'files' ? 'Opening checkout…' : 'Please wait…'
                    }
                  />
                  <OfferCard
                    title="Need Edits to Your Logo?"
                    description="If you want any edits to your selected logo, click the button below and pay"
                    buttonLabel="Pay $50.00 for Logo Edits"
                    amount={AMOUNT_EDITS}
                    onPay={() => startPayment('edits')}
                    busy={isBusy}
                    busyLabel={
                      payingOption === 'edits' ? 'Opening checkout…' : 'Please wait…'
                    }
                  />
                </div>
                {payError ? (
                  <p
                    role="alert"
                    style={{
                      margin: '0 0 16px',
                      color: '#b91c1c',
                      fontSize: 14,
                      textAlign: 'center',
                    }}
                  >
                    {payError}
                  </p>
                ) : null}
              </>
            ) : null}

            <div className="d-flex justify-content-center">
              <Link
                to="/"
                className="px-4"
                onClick={() => resetViewportForSpaNavigation()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: 46,
                  borderRadius: 10,
                  paddingTop: 10,
                  paddingBottom: 10,
                  background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                  color: '#ffffff',
                  fontWeight: 700,
                  textDecoration: 'none',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: '0 10px 25px rgba(249, 115, 22, 0.35)',
                }}
              >
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
