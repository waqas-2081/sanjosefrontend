import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './CompletePaymentPage.module.css';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const DEFAULTS = {
  customerName: 'robert',
  email: 'test@gmail.com',
  zip: '59418',
  reference: 'test',
  amount: '1.99',
  nameOnCard: '',
  cardNumber: '',
  agreed: false,
};

function pickFromPaymentState(state) {
  if (!state || typeof state !== 'object') return {};
  const keys = ['customerName', 'email', 'zip', 'reference', 'amount'];
  const out = {};
  for (const k of keys) {
    if (state[k] != null && state[k] !== '') out[k] = String(state[k]);
  }
  return out;
}

export default function CompletePaymentPage() {
  useDocumentTitle('Complete Payment | San Jose Logo Design');
  const location = useLocation();
  const [form, setForm] = useState(() => ({
    ...DEFAULTS,
    ...pickFromPaymentState(location.state),
  }));

  const setField = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Complete payment', form);
  };

  return (
    <>
      <section className="inner-breadcrumb">
        <div className="container-fluid">
          <div className="inner-breadcrumb-mascot" aria-hidden="true">
            <div className="mascot-ring">
              <img src="/assets/images/inner-banner-icon.png" alt="" />
            </div>
          </div>

          <div className="inner-breadcrumb-content">
            <span className="inner-breadcrumb-tag">Checkout</span>
            <h1>
              Complete <span>Payment</span>
            </h1>
            <p>Enter your card details and confirm to finish checkout.</p>
            <div className="inner-breadcrumb-links">
              <Link to="/">Home</Link>
              <i className="fa-solid fa-angle-right" />
              <Link to="/payment-info">Payment Info</Link>
              <i className="fa-solid fa-angle-right" />
              <span>Complete Payment</span>
            </div>
          </div>

          <div className="inner-breadcrumb-bottom">
            <p>
              Copeland Home Services revenue increased by 200% since rebranding
              <span />
              <Link to="/blogs">Read Article</Link>
            </p>
          </div>
        </div>
      </section>

      <section className={`contact-section py-5 ${styles.page} ${styles.surface}`}>
        <div className="container-fluid">
          <div className={styles.wrap}>
            <header className={styles.pageHeader}>
              <h2 className={styles.formTitle}>Complete payment</h2>

            </header>

            <div className={styles.card}>
              <form onSubmit={onSubmit}>
                <div className={styles.columns}>
                  <div className={styles.col}>
                    <div>
                      <label className={styles.label} htmlFor="cp-name">
                        Name
                      </label>
                      <input
                        id="cp-name"
                        type="text"
                        autoComplete="name"
                        className={`${styles.control} ${styles.controlMuted}`}
                        value={form.customerName}
                        onChange={(e) => setField('customerName', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className={styles.label} htmlFor="cp-email">
                        Email
                      </label>
                      <input
                        id="cp-email"
                        type="email"
                        autoComplete="email"
                        className={`${styles.control} ${styles.controlMuted}`}
                        value={form.email}
                        onChange={(e) => setField('email', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className={styles.label} htmlFor="cp-zip">
                        Postal code
                      </label>
                      <input
                        id="cp-zip"
                        type="text"
                        autoComplete="postal-code"
                        className={`${styles.control} ${styles.controlMuted}`}
                        value={form.zip}
                        onChange={(e) => setField('zip', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className={styles.label} htmlFor="cp-ref">
                        Additional info
                      </label>
                      <input
                        id="cp-ref"
                        type="text"
                        className={`${styles.control} ${styles.controlMuted}`}
                        value={form.reference}
                        onChange={(e) => setField('reference', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className={styles.col}>
                    <div>
                      <label className={styles.label} htmlFor="cp-amount">
                        Amount
                      </label>
                      <input
                        id="cp-amount"
                        type="text"
                        inputMode="decimal"
                        className={`${styles.control} ${styles.controlMuted}`}
                        value={form.amount}
                        onChange={(e) => setField('amount', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className={styles.label} htmlFor="cp-card-name">
                        Name on card
                      </label>
                      <input
                        id="cp-card-name"
                        type="text"
                        autoComplete="cc-name"
                        placeholder="Name on Card"
                        className={`${styles.control} ${styles.controlWhite}`}
                        value={form.nameOnCard}
                        onChange={(e) => setField('nameOnCard', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className={styles.label} htmlFor="cp-card-num">
                        Card number
                      </label>
                      <div className={styles.cardNumberWrap}>
                        <div className={styles.cardNumberInner}>
                          <span className={styles.cardNumberIcon} aria-hidden="true">
                            <i className="fa-solid fa-credit-card" />
                          </span>
                          <input
                            id="cp-card-num"
                            type="text"
                            inputMode="numeric"
                            autoComplete="cc-number"
                            placeholder="Card number"
                            className={styles.cardNumberInput}
                            value={form.cardNumber}
                            onChange={(e) => setField('cardNumber', e.target.value)}
                          />
                          <div className={styles.cardNumberTrail} aria-hidden="true">
                            <i className="fa-solid fa-link" title="Link" />
                            <i className="fa-brands fa-cc-visa" />
                            <span className={styles.cardDots}>••••</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.footerBlock}>
                  <label className={styles.agree}>
                    <input
                      type="checkbox"
                      required
                      checked={form.agreed}
                      onChange={(e) => setField('agreed', e.target.checked)}
                    />
                    <span>
                      I agree with the{' '}
                      <Link to="/contact" className={styles.accentLink}>
                        Privacy Policy
                      </Link>
                      {' & '}
                      <Link to="/contact" className={styles.accentLink}>
                        Terms and Condition
                      </Link>
                      .
                    </span>
                  </label>

                  <button type="submit" className={styles.proceedBtn}>
                    Proceed
                    <i className="fa-solid fa-arrow-right-long" aria-hidden="true" />
                  </button>

                  <div className={styles.trustRow}>
                    <div className={styles.stripeLine}>
                      <i className="fa-solid fa-lock" aria-hidden="true" />
                      <span>
                        Secure Payments Powered by <span className={styles.stripeWord}>stripe</span>
                      </span>
                    </div>
                    <div className={styles.sslLine}>
                      <span>Safe and Secure SSL Encrypted</span>
                      <div className={styles.sslIcons} aria-hidden="true">
                        <i className="fa-brands fa-cc-mastercard" />
                        <i className="fa-brands fa-cc-visa" />
                        <i className="fa-brands fa-cc-amex" />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
