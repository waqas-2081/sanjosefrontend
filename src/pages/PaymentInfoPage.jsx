import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './PaymentInfoPage.module.css';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const PAYMENT_REQUEST_ENDPOINT = 'http://127.0.0.1:8000/api/payment-requests';

const PAYMENT_METHODS = [
  { id: 'stripe', label: 'Stripe', iconClass: 'fa-brands fa-cc-stripe' },
  { id: 'paypal', label: 'PayPal', iconClass: 'fa-brands fa-paypal' },
  { id: 'zelle', label: 'Zelle', iconClass: 'fa-solid fa-building-columns' },
  { id: 'cashapp', label: 'CashApp', iconClass: 'fa-solid fa-dollar-sign' },
];

const initialForm = {
  profile: 'Robert',
  customerName: '',
  email: '',
  zip: '',
  reference: '',
  amount: '',
  paymentMethod: 'stripe',
};

function getPaymentRequestApiErrorMessage(result) {
  if (result?.errors && typeof result.errors === 'object') {
    const firstFieldErrors = Object.values(result.errors).find((value) => Array.isArray(value) && value.length > 0);
    if (firstFieldErrors) return firstFieldErrors[0];
  }
  if (result?.message && typeof result.message === 'string') return result.message;
  return 'Unable to submit payment details. Please try again.';
}

export default function PaymentInfoPage() {
  useDocumentTitle('Payment Info | San Jose Logo Design');
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setField = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setSubmitError('');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setIsSubmitting(true);

    const amountRaw = String(form.amount).trim().replace(/,/g, '');
    const amountNum = Number.parseFloat(amountRaw);
    if (!Number.isFinite(amountNum) || amountNum < 0.01) {
      setSubmitError('Please enter a valid amount (at least 0.01).');
      setIsSubmitting(false);
      return;
    }
    if (!form.customerName.trim()) {
      setSubmitError('Customer name is required.');
      setIsSubmitting(false);
      return;
    }

    const body = {
      profile: form.profile.trim() || null,
      customer_name: form.customerName.trim(),
      email: form.email.trim() || null,
      zip_code: form.zip.trim() || null,
      reference_note: form.reference.trim() || null,
      amount: amountNum,
      payment_method: form.paymentMethod,
    };

    try {
      const response = await fetch(PAYMENT_REQUEST_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify(body),
      });

      const contentType = response.headers.get('content-type') || '';
      const isJson = contentType.includes('application/json');
      const result = isJson ? await response.json().catch(() => null) : null;

      if (!response.ok) {
        throw new Error(getPaymentRequestApiErrorMessage(result));
      }

      if (!result || result.success !== true) {
        throw new Error('Invalid response from server.');
      }

      const id = result.data?.id;
      navigate('/complete-payment', {
        state: {
          customerName: form.customerName.trim(),
          email: form.email.trim(),
          zip: form.zip.trim(),
          reference: form.reference.trim(),
          amount: form.amount.trim(),
          profile: form.profile,
          paymentMethod: form.paymentMethod,
          paymentRequestId: id,
        },
      });
    } catch (error) {
      setSubmitError(error.message || 'Unable to submit payment details. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
              Payment <span>Information</span>
            </h1>
            <p>Review your payer details, choose how you would like to pay, then continue.</p>
            <div className="inner-breadcrumb-links">
              <Link to="/">Home</Link>
              <i className="fa-solid fa-angle-right" />
              <span>Payment Info</span>
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
              <h2 className={styles.formTitle}>Payment details</h2>
              
            </header>

            <div className={styles.formCenter}>
              <div className={styles.mainCard}>
                <form onSubmit={onSubmit}>
                  <div className={styles.formGrid}>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="pi-profile">
                        Profile
                      </label>
                      <select
                        id="pi-profile"
                        className={`form-control custom-input ${styles.fieldControl}`}
                        value={form.profile}
                        onChange={(e) => setField('profile', e.target.value)}
                      >
                        <option value="Robert">Robert</option>
                        <option value="Jane">Jane</option>
                        <option value="Business">Business account</option>
                      </select>
                    </div>

                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="pi-name">
                        Customer name
                      </label>
                      <input
                        id="pi-name"
                        type="text"
                        className={`form-control custom-input ${styles.fieldControl}`}
                        autoComplete="name"
                        value={form.customerName}
                        onChange={(e) => setField('customerName', e.target.value)}
                      />
                    </div>

                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="pi-email">
                        Email
                      </label>
                      <input
                        id="pi-email"
                        type="email"
                        className={`form-control custom-input ${styles.fieldControl}`}
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => setField('email', e.target.value)}
                      />
                    </div>

                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="pi-zip">
                        ZIP code
                      </label>
                      <input
                        id="pi-zip"
                        type="text"
                        className={`form-control custom-input ${styles.fieldControl}`}
                        autoComplete="postal-code"
                        value={form.zip}
                        onChange={(e) => setField('zip', e.target.value)}
                      />
                    </div>

                    <div className={`${styles.field} ${styles.fieldFull}`}>
                      <label className={styles.label} htmlFor="pi-ref">
                        Reference / note
                      </label>
                      <input
                        id="pi-ref"
                        type="text"
                        className={`form-control custom-input ${styles.fieldControl}`}
                        value={form.reference}
                        onChange={(e) => setField('reference', e.target.value)}
                      />
                    </div>

                    <div className={`${styles.field} ${styles.fieldFull}`}>
                      <label className={styles.label} htmlFor="pi-amount">
                        Amount
                      </label>
                      <input
                        id="pi-amount"
                        type="text"
                        inputMode="decimal"
                        className={`form-control custom-input ${styles.fieldControl}`}
                        value={form.amount}
                        onChange={(e) => setField('amount', e.target.value)}
                      />
                    </div>

                    <div className={styles.divider} aria-hidden="true" />

                    <h3 className={styles.sectionTitle}>Select payment method</h3>
                    <div className={styles.methodGrid} role="radiogroup" aria-label="Payment method">
                      {PAYMENT_METHODS.map((m) => (
                        <label key={m.id} className={styles.methodCell}>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={m.id}
                            checked={form.paymentMethod === m.id}
                            onChange={() => setField('paymentMethod', m.id)}
                          />
                          <div className={styles.methodInner}>
                            <span className={styles.methodIcon} aria-hidden="true">
                              <i className={m.iconClass} />
                            </span>
                            <span className={styles.methodLabel}>{m.label}</span>
                          </div>
                        </label>
                      ))}
                    </div>

                    {submitError && (
                      <div className={`${styles.field} ${styles.fieldFull}`}>
                        <div className="alert alert-danger mb-0" role="alert">
                          {submitError}
                        </div>
                      </div>
                    )}

                    <div className={styles.proceedWrap}>
                      <button type="submit" className={styles.proceedBtn} disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting…' : 'Proceed'}
                        <i className="fa-solid fa-arrow-right-long" aria-hidden="true" />
                      </button>
                    </div>

                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
