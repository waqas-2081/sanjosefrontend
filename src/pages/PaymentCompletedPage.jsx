import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import styles from './PaymentCompletedPage.module.css';
import { color } from 'framer-motion';

const API_BASE = 'http://127.0.0.1:8000/api';

export default function PaymentCompletedPage() {
  useDocumentTitle('Payment Completed | San Jose Logo Design');

  const { token } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const routeState = location.state || {};

  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchErr, setFetchErr] = useState('');

  useEffect(() => {
    // If navigated here with state (from CompletePaymentPage on success)
    if (routeState.paymentRequestId && routeState.amount) {
      setInfo(routeState);
      setLoading(false);
      return;
    }

    // Fallback: fetch by token (direct link visit)
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
          throw new Error(data?.message || 'Payment not found.');
        }
        const d = data.data;
        setInfo({
          customerName:     d.customer_name || '',
          email:            d.email || '',
          phone:            d.phone || '',
          packageName:      d.package_name || '',
          amount:           d.amount || '0.00',
          salesAgent:       d.profile || '',
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

            <div className={styles.grid}>

              {/* ── Payment Summary Card ── */}
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <i className="fa-solid fa-receipt" />
                  <h3>Payment Summary</h3>
                </div>

                <div className={styles.rows}>
                  {[
                    { label: 'Customer Name', value: customerName, icon: 'fa-solid fa-user' },
                    { label: 'Email',         value: email || '—',       icon: 'fa-solid fa-envelope' },
                    { label: 'Phone',         value: phone || '—',       icon: 'fa-solid fa-phone' },
                    { label: 'Package',       value: packageName || '—', icon: 'fa-solid fa-box' },
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
                  <span style={{ color: "#000" }}>Amount Paid</span>
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

                <div className={styles.divider} />

                <Link to="/" className={styles.homeBtn}>
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