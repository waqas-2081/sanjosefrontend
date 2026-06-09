import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useAuth } from '../context/AuthContext';
import styles from './PaymentCompletedPage.module.css';

const API_BASE = 'https://admin.sanjoselogodesign.com/api';
const COUNTDOWN = 10;

export default function PaymentCompletedPage() {
  useDocumentTitle('Payment Completed | San Jose Logo Design');

  const { token }   = useParams();
  const location    = useLocation();
  const navigate    = useNavigate();
  const routeState  = location.state || {};
  const { loginWithToken, isLoggedIn } = useAuth();

  const [info,      setInfo]      = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [fetchErr,  setFetchErr]  = useState('');
  const [countdown, setCountdown] = useState(COUNTDOWN);
  const [autoLogin, setAutoLogin] = useState(false);

  // loginToken is passed from CompletePaymentPage via route state
  const loginToken = routeState.loginToken || null;
  const shouldAutoLogin = !!loginToken && !isLoggedIn;

  useEffect(() => {
    if (routeState.paymentRequestId && routeState.amount) {
      setInfo(routeState);
      setLoading(false);
      return;
    }

    if (!token) {
      setFetchErr('Invalid payment link.');
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const res  = await fetch(`${API_BASE}/payment-requests/by-link/${token}`, {
          headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
        });
        const data = await res.json().catch(() => null);
        if (!res.ok || !data?.success) throw new Error(data?.message || 'Payment not found.');
        const d = data.data;
        setInfo({
          customerName:     d.customer_name || '',
          email:            d.email         || '',
          phone:            d.phone         || '',
          packageName:      d.package_name  || '',
          amount:           d.amount        || '0.00',
          salesAgent:       d.profile       || '',
          paymentMethod:    d.payment_method,
          paymentRequestId: d.id,
          paymentLink:      d.payment_link,
        });
      } catch (err) {
        setFetchErr(err.message || 'Could not load payment details.');
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  // Countdown + auto-login
  useEffect(() => {
    if (loading || !shouldAutoLogin) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setAutoLogin(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [loading, shouldAutoLogin]);

  useEffect(() => {
    if (!autoLogin) return;
    (async () => {
      try {
        await loginWithToken(loginToken);
        navigate('/dashboard', { replace: true });
      } catch {
        navigate('/login', { replace: true });
      }
    })();
  }, [autoLogin]);

  const handleGoNow = async () => {
    try {
      await loginWithToken(loginToken);
      navigate('/dashboard', { replace: true });
    } catch {
      navigate('/login', { replace: true });
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingPage}>
        <span className={styles.spinner} />
        <p>Loading payment details…</p>
      </div>
    );
  }

  if (fetchErr || !info) {
    return (
      <div className={styles.errorPage}>
        <div className={styles.errorBox}>
          <i className="fa-solid fa-circle-exclamation" />
          <h2>Not Found</h2>
          <p>{fetchErr || 'Payment record could not be found.'}</p>
          <Link to="/" className={styles.homeBtn}>Return Home</Link>
        </div>
      </div>
    );
  }

  const {
    customerName, email, phone, packageName, amount,
    salesAgent, paymentMethod, paymentLink,
  } = info;

  const invoiceLink = `/genrate/invoice-${paymentLink || token}`;

  const methodLabel = {
    stripe:  'Card (Stripe)',
    paypal:  'PayPal',
    cashapp: 'Cash App Pay',
    zelle:   'Zelle',
  }[paymentMethod] || paymentMethod;

  const methodIcon = {
    stripe:  'fa-brands fa-cc-stripe',
    paypal:  'fa-brands fa-paypal',
    cashapp: 'fa-solid fa-dollar-sign',
    zelle:   'fa-solid fa-building-columns',
  }[paymentMethod] || 'fa-solid fa-credit-card';

  // SVG ring progress
  const r = 22;
  const circ = 2 * Math.PI * r;
  const progress = shouldAutoLogin ? (countdown / COUNTDOWN) * circ : 0;

  return (
    <>
      <section className="inner-breadcrumb">
        <div className="container-fluid">
          <div className="inner-breadcrumb-content">
            <h1>Payment <span>Completed</span></h1>
            <p>Your payment has been successfully processed.</p>
            <div className="inner-breadcrumb-links">
              <Link to="/">Home</Link>
              <i className="fa-solid fa-angle-right" />
              <span>Payment Completed</span>
            </div>
          </div>
        </div>
      </section>

      <section className={`contact-section py-5 ${styles.page}`}>
        <div className="container-fluid">
          <div className={styles.wrap}>

            {/* ── Success Banner ── */}
            <div className={styles.successBanner}>
              <div className={styles.successIconWrap}>
                <i className="fa-solid fa-circle-check" />
              </div>
              <div className={styles.successText}>
                <h2>Payment Successful!</h2>
                <p>Thank you, <strong>{customerName}</strong>. Your payment has been processed successfully.</p>
              </div>
            </div>

            {/* ── Auto-login countdown banner ── */}
            {shouldAutoLogin && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                background: '#fff',
                border: '1px solid #e8ecf2',
                borderRadius: 16,
                padding: '1rem 1.25rem',
                marginBottom: '1.5rem',
                boxShadow: '0 4px 20px rgba(15,23,42,0.06)',
              }}>
                {/* SVG countdown ring */}
                <svg width="56" height="56" viewBox="0 0 56 56" style={{ flexShrink: 0 }}>
                  <circle cx="28" cy="28" r={r} fill="none" stroke="#e8ecf2" strokeWidth="4" />
                  <circle
                    cx="28" cy="28" r={r}
                    fill="none"
                    stroke="#ff5e2c"
                    strokeWidth="4"
                    strokeDasharray={circ}
                    strokeDashoffset={circ - progress}
                    strokeLinecap="round"
                    transform="rotate(-90 28 28)"
                    style={{ transition: 'stroke-dashoffset 1s linear' }}
                  />
                  <text x="28" y="33" textAnchor="middle" fill="#1a1a2e" fontSize="14" fontWeight="700">{countdown}</text>
                </svg>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: '0 0 0.2rem', fontWeight: 700, color: '#1a1a2e', fontSize: '0.95rem' }}>
                    Your client account is ready
                  </p>
                  <p style={{ margin: 0, color: '#7b7f90', fontSize: '0.88rem' }}>
                    We've created an account for you. Check your email for login credentials.
                    Redirecting to your dashboard in {countdown}s…
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleGoNow}
                  style={{
                    flexShrink: 0,
                    padding: '0.5rem 1.1rem',
                    background: '#ff5e2c',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 10,
                    fontWeight: 600,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                  }}
                >
                  Go now →
                </button>
              </div>
            )}

            <div className={styles.grid}>

              {/* ── Payment Summary Card ── */}
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <i className="fa-solid fa-receipt" />
                  <h3>Payment Summary</h3>
                </div>

                <div className={styles.rows}>
                  {[
                    { label: 'Customer Name', value: customerName,      icon: 'fa-solid fa-user' },
                    { label: 'Email',         value: email || '—',      icon: 'fa-solid fa-envelope' },
                    { label: 'Phone',         value: phone || '—',      icon: 'fa-solid fa-phone' },
                    { label: 'Package',       value: packageName || '—',icon: 'fa-solid fa-box' },
                  ].map(({ label, value, icon }) => (
                    <div key={label} className={styles.row}>
                      <span className={styles.rowLabel}>
                        <i className={icon} /> {label}
                      </span>
                      <span className={styles.rowValue}>{value}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.totalRow}>
                  <span style={{ color: '#000' }}>Amount Paid</span>
                  <span className={styles.totalAmount}>${Number(amount).toFixed(2)}</span>
                </div>
              </div>

              {/* ── Actions Card ── */}
              <div className={styles.actionsCard}>
                <div className={styles.cardHeader}>
                  <i className="fa-solid fa-file-invoice-dollar" />
                  <h3>Your Invoice</h3>
                </div>

                <p className={styles.invoiceNote}>
                  Your official invoice is ready. Click below to open it in a new tab for printing or saving.
                </p>

                <a
                  href={invoiceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.invoiceBtn}
                >
                  <i className="fa-solid fa-file-invoice" />
                  View Invoice
                  <i className="fa-solid fa-arrow-up-right-from-square" />
                </a>

                <div className={styles.divider} />

                {shouldAutoLogin ? (
                  <button type="button" className={styles.invoiceBtn} onClick={handleGoNow} style={{ border: 'none', cursor: 'pointer', textAlign: 'center', justifyContent: 'center', marginTop: '0.75rem' }}>
                    <i className="fa-solid fa-gauge" />
                    Go to Dashboard
                  </button>
                ) : null}

                <Link to="/" className={styles.homeBtn} style={{ marginTop: shouldAutoLogin ? '0.5rem' : '0' }}>
                  <i className="fa-solid fa-house" /> Return to Homepage
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}