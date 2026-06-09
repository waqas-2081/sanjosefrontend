import { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { createPaymentRequest } from '../../api/paymentRequestApi';
import { usePackageCheckout } from '../../context/PackageCheckoutContext';
import { saveCheckoutCustomer } from '../../lib/checkoutCustomer';
import { CashAppMark, PayPalMark, StripeMark } from './PaymentMethodIcons';
import styles from './PackageCheckoutModal.module.css';

const DEFAULT_SALES_AGENT = 'Sam';

const EMPTY_CONTACT = { fullName: '', email: '', phone: '' };

const PAYMENT_METHODS = [
  { id: 'stripe', label: 'Credit/Debit Card', Icon: StripeMark },
  { id: 'paypal', label: 'PayPal', Icon: PayPalMark },
  { id: 'cashapp', label: 'CashApp', Icon: CashAppMark },
];

function parsePackageAmount(price) {
  const raw = String(price ?? '').trim().replace(/,/g, '');
  const num = Number.parseFloat(raw.replace(/[^0-9.]/g, ''));
  return Number.isFinite(num) && num >= 0.01 ? num : null;
}

function formatDisplayPrice(price, priceType) {
  const num = parsePackageAmount(price);
  const value = num != null ? `$${num.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}` : `$${price}`;
  const suffix = priceType ? String(priceType).trim() : '';
  return { value, suffix };
}

export default function PackageCheckoutModal() {
  const navigate = useNavigate();
  const {
    open,
    selectedPackage,
    serviceType,
    closeCheckout,
    clearSelection,
  } = usePackageCheckout();

  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [contact, setContact] = useState(EMPTY_CONTACT);
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setContactField = (key) => (e) => {
    setContact((c) => ({ ...c, [key]: e.target.value }));
    setFieldErrors((err) => ({ ...err, [key]: undefined }));
    setSubmitError('');
  };

  const priceDisplay = useMemo(() => {
    if (!selectedPackage) return { value: '', suffix: '' };
    return formatDisplayPrice(selectedPackage.price, selectedPackage.price_type);
  }, [selectedPackage]);

  useEffect(() => {
    if (!open) return undefined;
    setPaymentMethod('stripe');
    setContact(EMPTY_CONTACT);
    setFieldErrors({});
    setSubmitError('');
    setIsSubmitting(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape' && !isSubmitting) closeCheckout();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, isSubmitting, closeCheckout]);

  const handleExitComplete = useCallback(() => {
    if (!open) clearSelection();
  }, [open, clearSelection]);

  const handleProceed = async () => {
    if (!selectedPackage || isSubmitting) return;

    const amount = parsePackageAmount(selectedPackage.price);
    if (amount == null) {
      setSubmitError('Invalid package price.');
      return;
    }

    const errors = {};
    const fullName = contact.fullName.trim();
    const email = contact.email.trim();
    const phone = contact.phone.trim();

    if (!fullName) errors.fullName = 'Full name is required';
    if (!email) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email';
    if (!phone) errors.phone = 'Phone number is required';

    if (Object.keys(errors).length) {
      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      saveCheckoutCustomer({ fullName, email, phone });

      const { id, paymentLink } = await createPaymentRequest({
        salesAgent: DEFAULT_SALES_AGENT,
        customerName: fullName,
        email: email || null,
        phone: phone || null,
        packageName: selectedPackage.name,
        amount,
        paymentMethod,
      });

      const navigationState = {
        customerName: fullName,
        email,
        phone,
        packageName: selectedPackage.name,
        amount: String(amount),
        salesAgent: DEFAULT_SALES_AGENT,
        paymentMethod,
        paymentRequestId: id,
        paymentLink,
        serviceType,
        packageId: selectedPackage.id,
      };

      closeCheckout();
      navigate(`/complete-payment/${paymentLink}`, { state: navigationState });
    } catch (err) {
      setSubmitError(err.message || 'Unable to start checkout. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence onExitComplete={handleExitComplete}>
      {open && selectedPackage ? (
        <motion.div
          className={styles.overlay}
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => {
            if (!isSubmitting) closeCheckout();
          }}
        >
          <motion.div
            className={styles.panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="package-checkout-title"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.closeBtn}
              aria-label="Close checkout"
              disabled={isSubmitting}
              onClick={closeCheckout}
            >
              <i className="fa-solid fa-xmark" aria-hidden="true" />
            </button>

            <span className={styles.eyebrow}>Secure checkout</span>
            <h2 id="package-checkout-title" className={styles.title}>
              Complete your order
            </h2>
            <p className={styles.lead}>Review your package and choose how you&apos;d like to pay.</p>

            <div className={styles.summary}>
              <div>
                <p className={styles.summaryName}>{selectedPackage.name}</p>
              </div>
              <p className={styles.summaryPrice}>
                {priceDisplay.value}
                {priceDisplay.suffix ? <small>{priceDisplay.suffix}</small> : null}
              </p>
            </div>

            <div className={styles.fieldGrid}>
              <div className={`${styles.field} ${styles.fieldFull}`}>
                <label className={styles.label} htmlFor="pcm-package">
                  Package name
                </label>
                <input
                  id="pcm-package"
                  className={styles.readonlyInput}
                  value={selectedPackage.name}
                  readOnly
                  tabIndex={-1}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="pcm-price">
                  Package price
                </label>
                <input
                  id="pcm-price"
                  className={styles.readonlyInput}
                  value={
                    priceDisplay.suffix
                      ? `${priceDisplay.value} ${priceDisplay.suffix}`
                      : priceDisplay.value
                  }
                  readOnly
                  tabIndex={-1}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="pcm-name">
                  Full name
                </label>
                <input
                  id="pcm-name"
                  type="text"
                  className={`${styles.input}${fieldErrors.fullName ? ` ${styles.inputError}` : ''}`}
                  value={contact.fullName}
                  onChange={setContactField('fullName')}
                  placeholder="Your full name"
                  autoComplete="name"
                  disabled={isSubmitting}
                />
                {fieldErrors.fullName ? (
                  <span className={styles.fieldError}>{fieldErrors.fullName}</span>
                ) : null}
              </div>
              <div className={`${styles.field} ${styles.fieldFull}`}>
                <label className={styles.label} htmlFor="pcm-email">
                  Email address
                </label>
                <input
                  id="pcm-email"
                  type="email"
                  className={`${styles.input}${fieldErrors.email ? ` ${styles.inputError}` : ''}`}
                  value={contact.email}
                  onChange={setContactField('email')}
                  placeholder="you@company.com"
                  autoComplete="email"
                  disabled={isSubmitting}
                />
                {fieldErrors.email ? (
                  <span className={styles.fieldError}>{fieldErrors.email}</span>
                ) : null}
              </div>
              <div className={`${styles.field} ${styles.fieldFull}`}>
                <label className={styles.label} htmlFor="pcm-phone">
                  Phone number
                </label>
                <input
                  id="pcm-phone"
                  type="tel"
                  className={`${styles.input}${fieldErrors.phone ? ` ${styles.inputError}` : ''}`}
                  value={contact.phone}
                  onChange={setContactField('phone')}
                  placeholder="(555) 000-0000"
                  autoComplete="tel"
                  disabled={isSubmitting}
                />
                {fieldErrors.phone ? (
                  <span className={styles.fieldError}>{fieldErrors.phone}</span>
                ) : null}
              </div>
            </div>

            <div className={styles.divider} aria-hidden="true" />

            <h3 className={styles.methodHeading}>Select payment method</h3>
            <div className={styles.methodGrid} role="radiogroup" aria-label="Payment method">
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
                    disabled={isSubmitting}
                  >
                    <Icon active={active} />
                    <span className={styles.methodLabel}>{label}</span>
                  </button>
                );
              })}
            </div>

            {submitError ? (
              <div className={`${styles.alert} ${styles.alertError}`} role="alert">
                {submitError}
              </div>
            ) : null}

            <button
              type="button"
              className={styles.proceedBtn}
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              onClick={handleProceed}
            >
              {isSubmitting ? (
                <>
                  <span className={styles.spinner} aria-hidden="true" />
                  Processing…
                </>
              ) : (
                <>
                  Proceed
                  <i className="fa-solid fa-arrow-right-long" aria-hidden="true" />
                </>
              )}
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
