import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  fetchLogoPackageOptions,
  splitCompetitorReferences,
  submitLogoPackageBrief,
} from '../../api/logoPackageApi';
import { createPaymentRequest } from '../../api/paymentRequestApi';
import { saveCheckoutCustomer } from '../../lib/checkoutCustomer';
import { CashAppMark, PayPalMark, StripeMark } from './PaymentMethodIcons';
import {
  LOGO_ADDONS as FALLBACK_ADDONS,
  LOGO_DURATIONS as FALLBACK_DURATIONS,
  WIZARD_INDUSTRIES as FALLBACK_INDUSTRIES,
  formatMoney,
  parsePackageAmount,
} from './logoPackageWizardData';
import styles from './LogoPackageWizardModal.module.css';

const DEFAULT_SALES_AGENT = 'Sam';

const EMPTY_STEP1 = {
  companyName: '',
  email: '',
  phone: '',
};

const EMPTY_STEP2 = {
  logoName: '',
  slogan: '',
  industry: '',
  businessDescription: '',
  competitors: '',
};

const PAYMENT_METHODS = [
  { id: 'stripe', label: 'Card', Icon: StripeMark },
  { id: 'paypal', label: 'PayPal', Icon: PayPalMark },
  { id: 'cashapp', label: 'CashApp', Icon: CashAppMark },
];

const STEP_META = [
  { id: 1, label: 'Contact' },
  { id: 2, label: 'Brief' },
  { id: 3, label: 'Add-ons' },
];

function fallbackIndustryOptions() {
  return FALLBACK_INDUSTRIES.map((name) => ({ id: name, name }));
}

function pickDefaultDurationId(durations) {
  const included = durations.find((d) => d.included);
  return included?.id ?? durations[0]?.id ?? null;
}

export default function LogoPackageWizardModal({ open, selectedPackage, onClose }) {
  const navigate = useNavigate();
  const bodyRef = useRef(null);
  const [step, setStep] = useState(1);
  const [step1, setStep1] = useState(EMPTY_STEP1);
  const [step2, setStep2] = useState(EMPTY_STEP2);
  const [selectedAddonIds, setSelectedAddonIds] = useState([]);
  const [durationId, setDurationId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [industries, setIndustries] = useState(fallbackIndustryOptions);
  const [addons, setAddons] = useState(FALLBACK_ADDONS);
  const [durations, setDurations] = useState(FALLBACK_DURATIONS);
  const [optionsLoading, setOptionsLoading] = useState(false);
  const [optionsFromApi, setOptionsFromApi] = useState(false);

  const scrollBodyToTop = useCallback(() => {
    const el = bodyRef.current;
    if (!el) return;
    el.scrollTop = 0;
    requestAnimationFrame(() => {
      if (bodyRef.current) bodyRef.current.scrollTop = 0;
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    scrollBodyToTop();
  }, [step, open, scrollBodyToTop]);

  const packageAmount = useMemo(
    () => parsePackageAmount(selectedPackage?.price),
    [selectedPackage],
  );

  const addonsTotal = useMemo(() => {
    return selectedAddonIds.reduce((sum, id) => {
      const addon = addons.find((a) => a.id === id);
      return sum + (addon?.price || 0);
    }, 0);
  }, [selectedAddonIds, addons]);

  const durationTotal = useMemo(() => {
    const d = durations.find((item) => item.id === durationId);
    return d?.price || 0;
  }, [durationId, durations]);

  const defaultDurationId = useMemo(() => pickDefaultDurationId(durations), [durations]);

  const grandTotal = packageAmount + addonsTotal + durationTotal;

  useEffect(() => {
    if (!open) return undefined;

    setStep(1);
    setStep1(EMPTY_STEP1);
    setStep2(EMPTY_STEP2);
    setSelectedAddonIds([]);
    setPaymentMethod('stripe');
    setFieldErrors({});
    setSubmitError('');
    setIsSubmitting(false);
    setOptionsFromApi(false);
    setIndustries(fallbackIndustryOptions());
    setAddons(FALLBACK_ADDONS);
    setDurations(FALLBACK_DURATIONS);
    setDurationId(pickDefaultDurationId(FALLBACK_DURATIONS));

    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const controller = new AbortController();
    setOptionsLoading(true);

    (async () => {
      try {
        const data = await fetchLogoPackageOptions({ signal: controller.signal });
        if (controller.signal.aborted) return;

        const nextIndustries =
          data.industries.length > 0 ? data.industries : fallbackIndustryOptions();
        const nextAddons = data.addons.length > 0 ? data.addons : FALLBACK_ADDONS;
        const nextDurations = data.durations.length > 0 ? data.durations : FALLBACK_DURATIONS;

        setIndustries(nextIndustries);
        setAddons(nextAddons);
        setDurations(nextDurations);
        setDurationId(pickDefaultDurationId(nextDurations));
        setOptionsFromApi(data.addons.length > 0 || data.durations.length > 0);
      } catch (err) {
        if (controller.signal.aborted || err?.name === 'AbortError') return;
        // Keep static fallbacks so checkout still works offline.
        setDurationId(pickDefaultDurationId(FALLBACK_DURATIONS));
      } finally {
        if (!controller.signal.aborted) setOptionsLoading(false);
      }
    })();

    return () => {
      document.body.style.overflow = prev;
      controller.abort();
    };
  }, [open, selectedPackage?.id]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape' && !isSubmitting) onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, isSubmitting, onClose]);

  const setStep1Field = (key) => (e) => {
    setStep1((s) => ({ ...s, [key]: e.target.value }));
    setFieldErrors((err) => ({ ...err, [key]: undefined }));
    setSubmitError('');
  };

  const setStep2Field = (key) => (e) => {
    setStep2((s) => ({ ...s, [key]: e.target.value }));
    setFieldErrors((err) => ({ ...err, [key]: undefined }));
    setSubmitError('');
  };

  const toggleAddon = (addon) => {
    if (addon.skipAddons) {
      setSelectedAddonIds([]);
      return;
    }
    setSelectedAddonIds((prev) => {
      const exists = prev.includes(addon.id);
      if (exists) return prev.filter((id) => id !== addon.id);
      return [...prev, addon.id];
    });
  };

  const validateStep1 = () => {
    const errors = {};
    const companyName = step1.companyName.trim();
    const email = step1.email.trim();
    const phone = step1.phone.trim();
    if (!companyName) errors.companyName = 'Company name is required';
    if (!email) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email';
    if (!phone) errors.phone = 'Mobile number is required';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = () => {
    const errors = {};
    if (!step2.logoName.trim()) errors.logoName = 'Logo name is required';
    if (!step2.industry.trim()) errors.industry = 'Please select an industry';
    if (!step2.businessDescription.trim()) {
      errors.businessDescription = 'Please describe your business';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const goNext = () => {
    setSubmitError('');
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep((s) => Math.min(3, s + 1));
    scrollBodyToTop();
  };

  const goBack = () => {
    setSubmitError('');
    setFieldErrors({});
    setStep((s) => Math.max(1, s - 1));
    scrollBodyToTop();
  };

  const handleProceed = useCallback(async () => {
    if (!selectedPackage || isSubmitting) return;
    if (grandTotal < 0.01) {
      setSubmitError('Invalid total amount.');
      return;
    }

    const companyName = step1.companyName.trim();
    const email = step1.email.trim();
    const phone = step1.phone.trim();

    const addonNames = selectedAddonIds
      .map((id) => addons.find((a) => a.id === id)?.title)
      .filter(Boolean);
    const duration = durations.find((d) => d.id === durationId);
    const durationLabel =
      duration && !duration.included ? duration.label : '';
    const packageName = selectedPackage.name;
    const addonsLabel = addonNames.join(', ');
    const packageNameForApi = [
      packageName,
      ...addonNames,
      durationLabel || null,
    ]
      .filter(Boolean)
      .join(' + ');

    setIsSubmitting(true);
    setSubmitError('');

    try {
      saveCheckoutCustomer({ fullName: companyName, email, phone });

      const [comp1, comp2, comp3] = splitCompetitorReferences(step2.competitors);
      const numericAddonIds = selectedAddonIds
        .map((aid) => Number(aid))
        .filter((aid) => Number.isInteger(aid) && aid > 0);

      // Save brief to admin FIRST (same DB as local admin panel).
      await submitLogoPackageBrief({
        company_name: companyName,
        email,
        phone,
        logo_name: step2.logoName.trim(),
        slogan: step2.slogan.trim() || null,
        industry: step2.industry.trim() || null,
        business_description: step2.businessDescription.trim(),
        competitor_reference_1: comp1,
        competitor_reference_2: comp2,
        competitor_reference_3: comp3,
        package_name: packageName,
        package_price: packageAmount,
        selected_addons: optionsFromApi ? numericAddonIds : [],
        duration_label: duration?.label || null,
        duration_price: duration?.price ?? 0,
        grand_total: grandTotal,
        payment_request_id: null,
      });

      const { id, paymentLink } = await createPaymentRequest({
        salesAgent: DEFAULT_SALES_AGENT,
        customerName: companyName,
        email: email || null,
        phone: phone || null,
        packageName: packageNameForApi,
        amount: grandTotal,
        paymentMethod,
      });

      const navigationState = {
        customerName: companyName,
        email,
        phone,
        packageName,
        addons: addonNames,
        addonsLabel,
        durationLabel,
        amount: String(grandTotal),
        salesAgent: DEFAULT_SALES_AGENT,
        paymentMethod,
        paymentRequestId: id,
        paymentLink,
        serviceType: 'logo',
        packageId: selectedPackage.id,
        logoBrief: {
          logoName: step2.logoName.trim(),
          slogan: step2.slogan.trim(),
          industry: step2.industry.trim(),
          businessDescription: step2.businessDescription.trim(),
          competitors: step2.competitors.trim(),
          addons: addonNames,
          duration: duration?.label || '72 Hours Turnover',
        },
      };

      onClose();
      navigate(`/complete-payment/${paymentLink}`, { state: navigationState });
    } catch (err) {
      setSubmitError(err.message || 'Unable to start checkout. Please try again.');
      setIsSubmitting(false);
    }
  }, [
    selectedPackage,
    isSubmitting,
    grandTotal,
    packageAmount,
    step1,
    step2,
    selectedAddonIds,
    durationId,
    paymentMethod,
    addons,
    durations,
    optionsFromApi,
    onClose,
    navigate,
  ]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && selectedPackage ? (
        <motion.div
          className={styles.overlay}
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => {
            if (!isSubmitting) onClose();
          }}
        >
          <motion.div
            className={styles.panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="logo-wizard-title"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.closeBtn}
              aria-label="Close"
              disabled={isSubmitting}
              onClick={onClose}
            >
              <i className="fa-solid fa-xmark" aria-hidden="true" />
            </button>

            <div className={styles.panelTop}>
              <span className={styles.eyebrow}>Logo package checkout</span>
              <h2 id="logo-wizard-title" className={styles.title}>
                {step === 1 && 'Your details'}
                {step === 2 && 'Logo brief'}
                {step === 3 && 'Add-ons'}
              </h2>
              <p className={styles.lead}>
                {step === 1 && 'Package is locked in — tell us how to reach you.'}
                {step === 2 && 'A few details so designers start with the right direction.'}
                {step === 3 && (
                  <>
                    Need more than a logo? <strong>Bundle &amp; save</strong>.
                  </>
                )}
              </p>

              <div className={styles.steps} aria-label="Checkout steps">
                {STEP_META.map((item) => {
                  const active = step === item.id;
                  const done = step > item.id;
                  return (
                    <span
                      key={item.id}
                      className={`${styles.stepPill}${active ? ` ${styles.stepPillActive}` : ''}${
                        done ? ` ${styles.stepPillDone}` : ''
                      }`}
                    >
                      <span className={styles.stepNum}>{item.id}</span>
                      <span className={styles.stepLabel}>{item.label}</span>
                    </span>
                  );
                })}
              </div>
            </div>

            <div className={styles.body} ref={bodyRef}>
              <div className={styles.summaryBar}>
                <p className={styles.summaryName}>{selectedPackage.name}</p>
                <p className={styles.summaryPrice}>{formatMoney(grandTotal)}</p>
              </div>

              {step === 1 ? (
                <div className={styles.fieldGrid}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="lw-pkg">
                      Package
                    </label>
                    <input
                      id="lw-pkg"
                      className={`${styles.input} ${styles.readonly}`}
                      value={selectedPackage.name}
                      readOnly
                      tabIndex={-1}
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="lw-price">
                      Package price
                    </label>
                    <input
                      id="lw-price"
                      className={`${styles.input} ${styles.readonly}`}
                      value={formatMoney(packageAmount)}
                      readOnly
                      tabIndex={-1}
                    />
                  </div>
                  <div className={`${styles.field} ${styles.fieldFull}`}>
                    <label className={styles.label} htmlFor="lw-company">
                      What is your company&apos;s name?
                    </label>
                    <input
                      id="lw-company"
                      className={`${styles.input}${fieldErrors.companyName ? ` ${styles.inputError}` : ''}`}
                      value={step1.companyName}
                      onChange={setStep1Field('companyName')}
                      placeholder="Your company name"
                      autoComplete="organization"
                      disabled={isSubmitting}
                    />
                    {fieldErrors.companyName ? (
                      <span className={styles.fieldError}>{fieldErrors.companyName}</span>
                    ) : null}
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="lw-email">
                      Your email
                    </label>
                    <input
                      id="lw-email"
                      type="email"
                      className={`${styles.input}${fieldErrors.email ? ` ${styles.inputError}` : ''}`}
                      value={step1.email}
                      onChange={setStep1Field('email')}
                      placeholder="you@company.com"
                      autoComplete="email"
                      disabled={isSubmitting}
                    />
                    {fieldErrors.email ? (
                      <span className={styles.fieldError}>{fieldErrors.email}</span>
                    ) : null}
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="lw-phone">
                      Mobile number
                    </label>
                    <input
                      id="lw-phone"
                      type="tel"
                      className={`${styles.input}${fieldErrors.phone ? ` ${styles.inputError}` : ''}`}
                      value={step1.phone}
                      onChange={setStep1Field('phone')}
                      placeholder="(555) 000-0000"
                      autoComplete="tel"
                      disabled={isSubmitting}
                    />
                    {fieldErrors.phone ? (
                      <span className={styles.fieldError}>{fieldErrors.phone}</span>
                    ) : null}
                  </div>
                </div>
              ) : null}

              {step === 2 ? (
                <div className={styles.fieldGrid}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="lw-logo-name">
                      Logo name
                    </label>
                    <input
                      id="lw-logo-name"
                      className={`${styles.input}${fieldErrors.logoName ? ` ${styles.inputError}` : ''}`}
                      value={step2.logoName}
                      onChange={setStep2Field('logoName')}
                      placeholder="Name to appear in the logo"
                      disabled={isSubmitting}
                    />
                    {fieldErrors.logoName ? (
                      <span className={styles.fieldError}>{fieldErrors.logoName}</span>
                    ) : null}
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="lw-slogan">
                      Company slogan
                    </label>
                    <input
                      id="lw-slogan"
                      className={styles.input}
                      value={step2.slogan}
                      onChange={setStep2Field('slogan')}
                      placeholder="Optional tagline"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className={`${styles.field} ${styles.fieldFull}`}>
                    <label className={styles.label} htmlFor="lw-industry">
                      Industry
                    </label>
                    <select
                      id="lw-industry"
                      className={`${styles.select}${fieldErrors.industry ? ` ${styles.inputError}` : ''}`}
                      value={step2.industry}
                      onChange={setStep2Field('industry')}
                      disabled={isSubmitting || optionsLoading}
                    >
                      <option value="">
                        {optionsLoading ? 'Loading industries…' : 'Select your industry'}
                      </option>
                      {industries.map((item) => (
                        <option key={item.id} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    {fieldErrors.industry ? (
                      <span className={styles.fieldError}>{fieldErrors.industry}</span>
                    ) : null}
                  </div>
                  <div className={`${styles.field} ${styles.fieldFull}`}>
                    <label className={styles.label} htmlFor="lw-desc">
                      Describe your business
                    </label>
                    <textarea
                      id="lw-desc"
                      className={`${styles.textarea}${
                        fieldErrors.businessDescription ? ` ${styles.inputError}` : ''
                      }`}
                      value={step2.businessDescription}
                      onChange={setStep2Field('businessDescription')}
                      placeholder="What you do, who you serve, tone of the brand…"
                      disabled={isSubmitting}
                    />
                    {fieldErrors.businessDescription ? (
                      <span className={styles.fieldError}>{fieldErrors.businessDescription}</span>
                    ) : null}
                  </div>
                  <div className={`${styles.field} ${styles.fieldFull}`}>
                    <label className={styles.label} htmlFor="lw-comp">
                      Competitors reference
                    </label>
                    <textarea
                      id="lw-comp"
                      className={styles.textarea}
                      value={step2.competitors}
                      onChange={setStep2Field('competitors')}
                      placeholder="Sites or brands you like / compete with (optional)"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              ) : null}

              {step === 3 ? (
                <>
                  <h3 className={styles.sectionTitle}>Add-ons</h3>
                  <p className={styles.sectionSub}>
                    Need more than a logo? <strong>Bundle &amp; save</strong>. Selected items add to your
                    payment total.
                  </p>

                  {optionsLoading ? (
                    <p className={styles.sectionSub}>Loading add-ons…</p>
                  ) : (
                    <div className={styles.addonGrid}>
                      {addons.map((addon) => {
                        const selected = addon.skipAddons
                          ? selectedAddonIds.length === 0
                          : selectedAddonIds.includes(addon.id);
                        const addonImage =
                          addon.skipAddons && selectedPackage?.previewImage
                            ? selectedPackage.previewImage
                            : addon.image;
                        return (
                          <article
                            key={addon.id}
                            className={`${styles.addonCard}${selected ? ` ${styles.addonCardSelected}` : ''}`}
                          >
                            <div className={styles.addonMedia}>
                              <img src={addonImage || ''} alt="" loading="lazy" />
                            </div>
                            <div className={styles.addonBody}>
                              <h4 className={styles.addonTitle}>{addon.title}</h4>
                              <div className={styles.addonFooter}>
                                {addon.skipAddons ? (
                                  <span className={styles.addonPriceNow}>—</span>
                                ) : (
                                  <div className={styles.addonPrice}>
                                    <span className={styles.addonPriceNow}>
                                      +{formatMoney(addon.price)}
                                    </span>
                                    {addon.compareAt ? (
                                      <span className={styles.addonPriceWas}>
                                        {formatMoney(addon.compareAt)}
                                      </span>
                                    ) : null}
                                  </div>
                                )}
                                <button
                                  type="button"
                                  className={`${styles.addonBtn}${
                                    selected ? ` ${styles.addonBtnActive}` : ''
                                  }${addon.skipAddons ? ` ${styles.addonBtnGhost}` : ''}`}
                                  onClick={() => toggleAddon(addon)}
                                  disabled={isSubmitting}
                                >
                                  {addon.skipAddons
                                    ? selected
                                      ? 'Selected'
                                      : 'Continue'
                                    : selected
                                      ? 'Added'
                                      : 'Add'}
                                </button>
                              </div>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  )}

                  <div className={styles.durationBlock}>
                    <h3 className={styles.sectionTitle}>Duration</h3>
                    <p className={styles.sectionSub}>Express logo delivery (optional)</p>
                    {durations.map((item) => (
                      <div key={item.id} className={styles.durationRow}>
                        <span className={styles.durationLabel}>{item.label}</span>
                        {item.included ? (
                          <span className={styles.includedTag}>Included</span>
                        ) : (
                          <>
                            <span className={`${styles.durationPrice} ${styles.durationPriceAccent}`}>
                              +{formatMoney(item.price)}
                            </span>
                            <button
                              type="button"
                              className={`${styles.toggle}${
                                durationId === item.id ? ` ${styles.toggleOn}` : ''
                              }`}
                              role="switch"
                              aria-checked={durationId === item.id}
                              aria-label={item.label}
                              onClick={() =>
                                setDurationId((prev) =>
                                  prev === item.id ? defaultDurationId : item.id,
                                )
                              }
                              disabled={isSubmitting || optionsLoading}
                            >
                              <span className={styles.toggleKnob} />
                            </button>
                          </>
                        )}
                      </div>
                    ))}
                  </div>

                  <h3 className={styles.sectionTitle} style={{ marginTop: 22 }}>
                    Payment method
                  </h3>
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
                          disabled={isSubmitting}
                        >
                          <Icon active={active} />
                          <span className={styles.methodLabel}>{label}</span>
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : null}

              {submitError ? (
                <div className={styles.alert} role="alert">
                  {submitError}
                </div>
              ) : null}
            </div>

            <div className={styles.footer}>
              <div className={styles.totalWrap}>
                <span className={styles.totalLabel}>Order total</span>
                <span className={styles.totalValue}>{formatMoney(grandTotal)}</span>
              </div>
              <div className={styles.footerActions}>
                {step < 3 ? (
                  <button type="button" className={styles.btnPrimary} onClick={goNext}>
                    Next
                    <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                  </button>
                ) : (
                  <button
                    type="button"
                    className={styles.btnPrimary}
                    onClick={handleProceed}
                    disabled={isSubmitting || optionsLoading}
                    aria-busy={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className={styles.spinner} aria-hidden="true" />
                        Processing…
                      </>
                    ) : (
                      <>
                        Pay {formatMoney(grandTotal)}
                        <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                      </>
                    )}
                  </button>
                )}
                {step > 1 ? (
                  <button
                    type="button"
                    className={styles.btnSecondary}
                    onClick={goBack}
                    disabled={isSubmitting}
                  >
                    Back
                  </button>
                ) : (
                  <button
                    type="button"
                    className={styles.btnSecondary}
                    onClick={onClose}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
