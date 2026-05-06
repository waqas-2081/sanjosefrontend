import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './CompletePaymentPage.module.css';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

// ── ENV / CONFIG ─────────────────────────────────────────────────────────────
const API_BASE      = 'https://admin.sanjoselogodesign.com/api';
const STRIPE_PK     = process.env.REACT_APP_STRIPE_KEY      || '';
const PAYPAL_CLIENT = process.env.REACT_APP_PAYPAL_CLIENT_ID || '';

// ── HELPERS ───────────────────────────────────────────────────────────────────
async function apiPost(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(data?.message || `Request failed (${res.status})`);
  }
  return data;
}

function loadScript(src, id) {
  return new Promise((resolve, reject) => {
    if (document.getElementById(id)) { resolve(); return; }
    const s = document.createElement('script');
    s.id  = id;
    s.src = src;
    s.onload  = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

// ── STRIPE PANEL ─────────────────────────────────────────────────────────────
function StripePanel({ paymentRequestId, amount, onSuccess, onError }) {
  const mountedRef = useRef(false);
  const intentRef  = useRef(null);
  const cardRef    = useRef(null);
  const [ready,   setReady]   = useState(false);
  const [loading, setLoading] = useState(true);
  const [paying,  setPaying]  = useState(false);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    (async () => {
      try {
        await loadScript('https://js.stripe.com/v3/', 'stripe-js');
        const stripe = window.Stripe(STRIPE_PK);

        const data = await apiPost(`/payment-requests/${paymentRequestId}/stripe/intent`, {});
        intentRef.current = { stripe, clientSecret: data.client_secret };

        const elements = stripe.elements();
        const card = elements.create('card', {
          style: {
            base: {
              color: '#1a1a2e',
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '15px',
              '::placeholder': { color: '#9ca3af' },
            },
            invalid: { color: '#ef4444' },
          },
        });

        card.mount('#stripe-card-element');
        cardRef.current = card;
        card.on('ready',  ()  => { setReady(true); setLoading(false); });
        card.on('change', (e) => { if (e.error) onError(e.error.message); });
      } catch (err) {
        setLoading(false);
        onError(err.message || 'Failed to load Stripe.');
      }
    })();

    return () => { cardRef.current?.unmount(); };
  }, []);

  const handlePay = async () => {
    if (!intentRef.current || paying) return;
    setPaying(true);
    onError('');
    const { stripe, clientSecret } = intentRef.current;

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardRef.current },
      });

      if (error) { onError(error.message); setPaying(false); return; }

      if (paymentIntent.status === 'succeeded') {
        await apiPost(`/payment-requests/${paymentRequestId}/stripe/confirm`, {
          payment_intent_id: paymentIntent.id,
        });
        onSuccess();
      }
    } catch (err) {
      onError(err.message);
      setPaying(false);
    }
  };

  return (
    <div className={styles.payPanel}>
      <div className={styles.panelIcon}>
        <i className="fa-brands fa-cc-stripe" />
        <span>Pay with Card</span>
      </div>

      {loading && (
        <div className={styles.panelLoading}>
          <span className={styles.spinner} /> Loading secure card form…
        </div>
      )}

      <div className={styles.stripeCardWrap} id="stripe-card-element" />

      {ready && (
        <button type="button" className={styles.payBtn} onClick={handlePay} disabled={paying}>
          {paying
            ? <><span className={styles.spinner} /> Processing…</>
            : <><i className="fa-solid fa-lock" /> Pay ${Number(amount).toFixed(2)}</>
          }
        </button>
      )}

      <div className={styles.trustBadge}>
        <i className="fa-solid fa-shield-halved" />
        <span>Secured by Stripe · SSL Encrypted</span>
        <span className={styles.cardIcons}>
          <i className="fa-brands fa-cc-visa" />
          <i className="fa-brands fa-cc-mastercard" />
          <i className="fa-brands fa-cc-amex" />
        </span>
      </div>
    </div>
  );
}

// ── PAYPAL PANEL ─────────────────────────────────────────────────────────────
function PayPalPanel({ paymentRequestId, amount, onSuccess, onError }) {
  const containerRef = useRef(null);
  const rendered     = useRef(false);

  useEffect(() => {
    if (rendered.current) return;
    rendered.current = true;

    (async () => {
      try {
        await loadScript(
          `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT}&currency=USD&intent=capture`,
          'paypal-js',
        );

        window.paypal.Buttons({
          style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'paypal' },
          fundingSource: window.paypal.FUNDING.PAYPAL,

          createOrder: async () => {
            const data = await apiPost(
              `/payment-requests/${paymentRequestId}/paypal/create-order`, {},
            );
            return data.order_id;
          },

          onApprove: async (data) => {
            try {
              await apiPost(`/payment-requests/${paymentRequestId}/paypal/capture`, {
                order_id: data.orderID,
              });
              onSuccess();
            } catch (err) {
              onError(err.message);
            }
          },

          onError:  () => onError('PayPal encountered an error. Please try again.'),
          onCancel: () => onError('Payment cancelled.'),
        }).render(containerRef.current);
      } catch (err) {
        onError(err.message || 'Failed to load PayPal.');
      }
    })();
  }, []);

  return (
    <div className={styles.payPanel}>
      <div className={styles.panelIcon}>
        <i className="fa-brands fa-paypal" />
        <span>Pay with PayPal</span>
      </div>
      <p className={styles.panelHint}>
        Click below to complete your <strong>${Number(amount).toFixed(2)}</strong> payment securely via PayPal.
      </p>
      <div ref={containerRef} className={styles.paypalContainer} />
    </div>
  );
}

// ── CASHAPP PANEL ─────────────────────────────────────────────────────────────
function CashAppPanel({ paymentRequestId, amount, onSuccess, onError }) {
  const mountedRef = useRef(false);
  const intentRef  = useRef(null);
  const [loading, setLoading] = useState(true);
  const [paying,  setPaying]  = useState(false);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    (async () => {
      try {
        await loadScript('https://js.stripe.com/v3/', 'stripe-js');
        const stripe = window.Stripe(STRIPE_PK);

        const data = await apiPost(
          `/payment-requests/${paymentRequestId}/cashapp/intent`, {}
        );
        intentRef.current = { stripe, clientSecret: data.client_secret };

        const elements   = stripe.elements({ clientSecret: data.client_secret });
        const cashAppBtn = elements.create('cashappQr', { style: { type: 'button' } });

        cashAppBtn.mount('#cashapp-btn-element');
        cashAppBtn.on('ready', () => setLoading(false));

        cashAppBtn.on('confirm', async () => {
          try {
            const { error, paymentIntent } = await stripe.confirmCashappPayment(
              data.client_secret
            );
            if (error) {
              onError(error.message);
            } else if (paymentIntent?.status === 'succeeded') {
              await apiPost(
                `/payment-requests/${paymentRequestId}/cashapp/confirm`,
                { payment_intent_id: paymentIntent.id }
              );
              onSuccess();
            }
          } catch (err) {
            onError(err.message);
          }
        });

      } catch (err) {
        setLoading(false);
        intentRef.current = { fallback: true };
      }
    })();
  }, []);

  const handleFallbackPay = async () => {
    if (paying) return;
    setPaying(true);
    onError('');

    try {
      await loadScript('https://js.stripe.com/v3/', 'stripe-js');
      const stripe = window.Stripe(STRIPE_PK);

      const data = await apiPost(
        `/payment-requests/${paymentRequestId}/cashapp/intent`, {}
      );

      const { error, paymentIntent } = await stripe.confirmCashappPayment(
        data.client_secret,
        {
          payment_method: { cashapp: {} },
          return_url: window.location.href,
        }
      );

      if (error) {
        onError(error.message);
      } else if (paymentIntent?.status === 'succeeded') {
        await apiPost(
          `/payment-requests/${paymentRequestId}/cashapp/confirm`,
          { payment_intent_id: paymentIntent.id }
        );
        onSuccess();
      }
    } catch (err) {
      onError(err.message);
    } finally {
      setPaying(false);
    }
  };

  return (
    <div className={styles.payPanel}>
      <div className={styles.panelIcon}>
        <i className="fa-solid fa-dollar-sign" />
        <span>Pay with Cash App</span>
      </div>
      <p className={styles.panelHint}>
        Complete your <strong>${Number(amount).toFixed(2)}</strong> payment securely through Cash App Pay.
      </p>
      {loading && (
        <div className={styles.panelLoading}>
          <span className={styles.spinner} /> Loading Cash App Pay…
        </div>
      )}
      <div id="cashapp-btn-element" className={styles.cashappBtnWrap} />
      {!loading && intentRef.current?.fallback && (
        <button
          type="button"
          className={`${styles.payBtn} ${styles.cashappBtn}`}
          onClick={handleFallbackPay}
          disabled={paying}
        >
          {paying
            ? <><span className={styles.spinner} /> Redirecting to Cash App…</>
            : <><i className="fa-solid fa-dollar-sign" /> Pay ${Number(amount).toFixed(2)} with Cash App</>
          }
        </button>
      )}
    </div>
  );
}

// ── ZELLE PANEL ───────────────────────────────────────────────────────────────
function ZellePanel({ amount }) {
  return (
    <div className={styles.payPanel}>
      <div className={styles.panelIcon}>
        <i className="fa-solid fa-building-columns" />
        <span>Zelle Payment</span>
      </div>
      <div className={styles.zelleInfo}>
        {[
          'Open your bank app and send the amount below via Zelle.',
          'Use the Zelle email or phone number provided by your account manager.',
          'Once sent, your account manager will verify and mark it as approved.',
        ].map((text, i) => (
          <div key={i} className={styles.zelleStep}>
            <span className={styles.zelleNum}>{i + 1}</span>
            <p>{text}</p>
          </div>
        ))}
      </div>
      <div className={styles.zelleAmount}>
        Send: <strong>${Number(amount).toFixed(2)}</strong>
      </div>
      <div className={styles.zellePending}>
        <i className="fa-solid fa-clock" />
        <span>Awaiting admin approval after your transfer</span>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════════════════════════
export default function CompletePaymentPage() {
  useDocumentTitle('Complete Payment | San Jose Logo Design');

  const { token }  = useParams();          // /complete-payment/:token
  const location   = useLocation();
  const navigate   = useNavigate();
  const routeState = location.state || {};

  const [info,     setInfo]     = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [fetchErr, setFetchErr] = useState('');
  const [error,    setError]    = useState('');

  // On success: navigate to /payment-completed/:token passing all info as state
  const handleSuccess = useCallback(() => {
    navigate(`/payment-completed/${token}`, {
      replace: true,
      state: {
        customerName:     info?.customerName     || '',
        email:            info?.email            || '',
        phone:            info?.phone            || '',
        packageName:      info?.packageName      || '',
        amount:           info?.amount           || '0.00',
        salesAgent:       info?.salesAgent       || '',
        paymentMethod:    info?.paymentMethod,
        paymentRequestId: info?.paymentRequestId,
        paymentLink:      token,
      },
    });
  }, [navigate, token, info]);

  const handleError = useCallback((msg) => setError(msg), []);

  useEffect(() => {
    // Same-session navigation: router state has everything, skip the fetch
    if (routeState.paymentRequestId && routeState.paymentMethod && token) {
      setInfo({
        customerName:     routeState.customerName    || '',
        email:            routeState.email           || '',
        phone:            routeState.phone           || '',
        packageName:      routeState.packageName     || '',
        amount:           routeState.amount          || '0.00',
        salesAgent:       routeState.salesAgent      || '',
        paymentMethod:    routeState.paymentMethod,
        paymentRequestId: routeState.paymentRequestId,
        paymentLink:      token,
        alreadyPaid:      false,
      });
      setLoading(false);
      return;
    }

    // Direct link / email / copy-paste: fetch payment details by token
    if (!token) {
      setFetchErr('Invalid payment link.');
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const res = await fetch(`${API_BASE}/payment-requests/by-link/${token}`, {
          headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
        });
        const data = await res.json().catch(() => null);
        if (!res.ok || !data?.success) {
          throw new Error(data?.message || 'Payment link not found.');
        }
        const d = data.data;
        const alreadyPaid = ['paid', 'approved'].includes(d.status);

        // If already paid, send straight to the completed page
        if (alreadyPaid) {
          navigate(`/payment-completed/${token}`, {
            replace: true,
            state: {
              customerName:     d.customer_name  || '',
              email:            d.email          || '',
              phone:            d.phone          || '',
              packageName:      d.package_name   || '',
              amount:           d.amount         || '0.00',
              salesAgent:       d.profile        || '',
              paymentMethod:    d.payment_method,
              paymentRequestId: d.id,
              paymentLink:      d.payment_link,
            },
          });
          return;
        }

        setInfo({
          customerName:     d.customer_name  || '',
          email:            d.email          || '',
          phone:            d.phone          || '',
          packageName:      d.package_name   || '',
          amount:           d.amount         || '0.00',
          salesAgent:       d.profile        || '',
          paymentMethod:    d.payment_method,
          paymentRequestId: d.id,
          paymentLink:      d.payment_link,
          alreadyPaid:      false,
        });
      } catch (err) {
        setFetchErr(err.message || 'Could not load payment details.');
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  // ── Loading state ──
  if (loading) {
    return (
      <div className={styles.loadingPage}>
        <span className={`${styles.spinner} ${styles.spinnerDark}`} />
        <p>Loading payment details…</p>
      </div>
    );
  }

  // ── Invalid link ──
  if (fetchErr || !info) {
    return (
      <div className={styles.errorPage}>
        <div className={styles.errorPageBox}>
          <i className="fa-solid fa-circle-exclamation" />
          <h2>Payment Link Invalid</h2>
          <p>{fetchErr || 'This payment link could not be found.'}</p>
          <Link to="/" className={styles.successHome}>Return Home</Link>
        </div>
      </div>
    );
  }

  const { customerName, email, phone, packageName, amount, paymentMethod, paymentRequestId, salesAgent } = info;

  const methodLabel = {
    stripe:  'Card (Stripe)',
    paypal:  'PayPal',
    cashapp: 'Cash App',
    zelle:   'Zelle',
  }[paymentMethod] || paymentMethod;

  return (
    <>
      <section className="inner-breadcrumb">
        <div className="container-fluid">
          <div className="inner-breadcrumb-content">
            <h1>Complete <span>Payment</span></h1>
            <p>Review your order and complete payment securely.</p>
            <div className="inner-breadcrumb-links">
              <Link to="/">Home</Link>
              <i className="fa-solid fa-angle-right" />
              <span>Complete Payment</span>
            </div>
          </div>
        </div>
      </section>

      <section className={`contact-section py-5 ${styles.page}`}>
        <div className="container-fluid">
          <div className={styles.wrap}>
            <div className={styles.grid}>

              {/* ── Left: Order Summary ── */}
              <div className={styles.summaryCard}>
                <h3 className={styles.summaryTitle}>Order Summary</h3>

                <div className={styles.summaryRows}>
                  {[
                    { label: 'Customer',  value: customerName },
                    { label: 'Email',     value: email || '—' },
                    { label: 'Phone',     value: phone || '—' },
                    { label: 'Package',   value: packageName || '—' },
                    { label: 'Agent',     value: salesAgent || '—' },
                  ].map(({ label, value }) => (
                    <div key={label} className={styles.summaryRow}>
                      <span className={styles.summaryLabel}>{label}</span>
                      <span className={styles.summaryValue}>{value}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.summaryTotal}>
                  <span>Total</span>
                  <span className={styles.summaryAmount}>${Number(amount).toFixed(2)}</span>
                </div>
              </div>

              {/* ── Right: Payment Panel ── */}
              <div className={styles.paymentCard}>
                {error && (
                  <div className={styles.errorBanner} role="alert">
                    <i className="fa-solid fa-circle-exclamation" />
                    {error}
                  </div>
                )}

                {paymentMethod === 'stripe' ? (
                  <StripePanel
                    paymentRequestId={paymentRequestId}
                    amount={amount}
                    onSuccess={handleSuccess}
                    onError={handleError}
                  />
                ) : paymentMethod === 'paypal' ? (
                  <PayPalPanel
                    paymentRequestId={paymentRequestId}
                    amount={amount}
                    onSuccess={handleSuccess}
                    onError={handleError}
                  />
                ) : paymentMethod === 'cashapp' ? (
                  <CashAppPanel
                    paymentRequestId={paymentRequestId}
                    amount={amount}
                    onSuccess={handleSuccess}
                    onError={handleError}
                  />
                ) : (
                  <ZellePanel amount={amount} />
                )}
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}