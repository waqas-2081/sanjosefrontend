import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './WebsiteBriefPage.module.css';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const WEBSITE_TYPES = [
  { value: '', label: 'Select type of your website' },
  {
    value: 'informative_no_payment',
    label: 'Informative (without payment integration)',
  },
  {
    value: 'informative_payment',
    label: 'Informative (with payment integration to sell services)',
  },
  {
    value: 'ecommerce',
    label: 'E-commerce (product upload with payment integration)',
  },
  { value: 'web_app', label: 'Web app (with custom dashboard)' },
];

const FEEL_OPTIONS = [
  'Corporate',
  'Fun',
  'Trendy',
  'Friendly',
  'Hi-tech',
  'Minimal',
  'Dark',
  'Light',
];

const ADDON_FEATURES = [
  { id: 'chat', label: 'Chat integration' },
  { id: 'dashboard', label: 'Custom dashboard' },
  { id: 'database', label: 'Database' },
  { id: 'hover', label: 'Hover effects' },
  { id: 'security', label: 'Security encryption' },
  { id: 'auth', label: 'Sign up / Sign in' },
  { id: 'newsletter', label: 'Newsletter' },
  { id: 'content', label: 'Website content' },
  { id: 'ssl', label: 'SSL certification' },
  { id: 'forms', label: 'Custom forms' },
  { id: 'social', label: 'Social media feed' },
  { id: 'seo', label: 'SEO optimization' },
  { id: 'ada', label: 'ADA compliance' },
  { id: 'blogs', label: 'Blogs' },
  { id: 'api', label: '3rd party API' },
  { id: 'marketing', label: 'Digital marketing' },
  { id: 'video', label: 'Videos & animations' },
];

const WEBSITE_TYPE_MAP = {
  informative_no_payment: 'informative_without_payment',
  informative_payment: 'informative_with_payment_services',
  ecommerce: 'ecommerce',
  web_app: 'custom_web_app',
};

const FEEL_VALUE_MAP = {
  Corporate: 'corporate',
  Fun: 'fun',
  Trendy: 'trendy',
  Friendly: 'friendly',
  'Hi-tech': 'hi-tech',
  Minimal: 'minimal',
  Dark: 'dark',
  Light: 'light',
};

// Laravel local app (your admin panel is https://admin.sanjoselogodesign.com/admin — this form posts to the API route instead).
const WEBSITE_BRIEF_ENDPOINT = 'https://admin.sanjoselogodesign.com/api/website-briefs';

const initialForm = {
  fullName: '',
  email: '',
  businessName: '',
  websiteType: '',
  productsShowcase: '',
  servicesShowcase: '',
  futureImagesProductsInfo: '',
  servicesCountPrices: '',
  acceptOnlinePayments: '',
  paymentMedium: '',
  futureImagesServices: '',
  productCategories: '',
  productCount: '',
  productSource: '',
  ecommercePlatform: '',
  webAppPlatform: '',
  businessDescription: '',
  industry: '',
  targetAudience: '',
  feels: [],
  competitors: '',
  hasDomain: '',
  pageCount: '1',
  pageNames: '',
  hasLogo: '',
  revampLogo: '',
  needHosting: '',
  needResponsive: '',
  addons: Object.fromEntries(ADDON_FEATURES.map((a) => [a.id, false])),
};

function toggleFeel(feels, option) {
  return feels.includes(option) ? feels.filter((f) => f !== option) : [...feels, option];
}

function toBooleanOrNull(value) {
  if (value === 'yes') return true;
  if (value === 'no') return false;
  return null;
}

function buildWebsiteBriefPayload(form) {
  return {
    name: form.fullName.trim(),
    email: form.email.trim(),
    business_name: form.businessName.trim(),
    website_type: WEBSITE_TYPE_MAP[form.websiteType] || '',
    products_count: form.productsShowcase.trim(),
    services_count_no_payment: form.servicesShowcase.trim(),
    future_images_products: form.futureImagesProductsInfo.trim(),
    services_count_with_price: form.servicesCountPrices.trim(),
    accept_online_payments: toBooleanOrNull(form.acceptOnlinePayments),
    payment_medium: form.paymentMedium.trim(),
    future_images_services: form.futureImagesServices.trim(),
    business_description: form.businessDescription.trim(),
    business_industry: form.industry.trim(),
    target_audience: form.targetAudience.trim(),
    overall_feel: form.feels.map((feel) => FEEL_VALUE_MAP[feel] || feel.toLowerCase()),
    competitors_references: form.competitors.trim(),
    has_domain: toBooleanOrNull(form.hasDomain),
    pages_count: Number.parseInt(form.pageCount, 10) || 1,
    pages_list: form.pageNames.trim(),
    has_logo: toBooleanOrNull(form.hasLogo),
    wants_logo_revamp: toBooleanOrNull(form.revampLogo),
    needs_hosting: toBooleanOrNull(form.needHosting),
    needs_responsive: toBooleanOrNull(form.needResponsive),
    addon_features: Object.entries(form.addons)
      .filter(([, enabled]) => enabled)
      .map(([addonId]) => addonId),
  };
}

function toFormData(payload, files) {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value === '' || value == null) return;
    if (Array.isArray(value)) {
      value.forEach((item) => formData.append(`${key}[]`, item));
      return;
    }
    // Laravel boolean rule accepts 1/0 (not the strings "true"/"false" from FormData).
    if (typeof value === 'boolean') {
      formData.append(key, value ? '1' : '0');
      return;
    }
    formData.append(key, String(value));
  });

  files.forEach((file) => {
    formData.append('files[]', file);
  });

  return formData;
}

function getApiErrorMessage(result) {
  if (result?.message && typeof result.message === 'string') return result.message;
  if (result?.errors && typeof result.errors === 'object') {
    const firstFieldErrors = Object.values(result.errors).find((value) => Array.isArray(value) && value.length > 0);
    if (firstFieldErrors) return firstFieldErrors[0];
  }
  return 'Unable to submit website brief. Please try again.';
}

export default function WebsiteBriefPage() {
  useDocumentTitle('Website Brief | San Jose Logo Design');
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [files, setFiles] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [submittedBriefId, setSubmittedBriefId] = useState(null);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(0);

  const setField = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setSubmitted(false);
    setSubmittedBriefId(null);
    setSubmitError('');
  };

  const toggleAddon = (id) => {
    setForm((f) => ({
      ...f,
      addons: { ...f.addons, [id]: !f.addons[id] },
    }));
    setSubmitted(false);
    setSubmittedBriefId(null);
    setSubmitError('');
  };

  const onFiles = (e) => {
    setFiles(Array.from(e.target.files || []));
    setSubmitted(false);
    setSubmittedBriefId(null);
    setSubmitError('');
  };

  const websiteType = form.websiteType;

  const typeBlocks = (() => {
    switch (websiteType) {
      case 'informative_no_payment':
        return ['infoBasic'];
      case 'informative_payment':
        return ['infoPay'];
      case 'ecommerce':
        return ['ecom'];
      case 'web_app':
        return ['webapp'];
      default:
        return [];
    }
  })();

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitted(false);
    setSubmittedBriefId(null);
    setIsSubmitting(true);

    try {
      const payload = buildWebsiteBriefPayload(form);
      const formData = toFormData(payload, files);
      const response = await fetch(WEBSITE_BRIEF_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: formData,
      });

      const contentType = response.headers.get('content-type') || '';
      const isJson = contentType.includes('application/json');
      const result = isJson ? await response.json().catch(() => null) : null;

      if (!response.ok) {
        throw new Error(getApiErrorMessage(result));
      }

      if (!result || result.success !== true) {
        throw new Error(
          'Invalid response from server. Ensure Laravel is running and POST /api/website-briefs returns JSON with success: true.'
        );
      }

      setSubmitted(true);
      setSubmittedBriefId(result.brief_id ?? null);
      setForm({ ...initialForm, addons: { ...initialForm.addons } });
      setFiles([]);
      setFileInputKey((k) => k + 1);
      navigate('/thankyou');
    } catch (error) {
      setSubmitError(error.message || 'Unable to submit website brief. Please try again.');
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
            <span className="inner-breadcrumb-tag">Project intake</span>
            <h1>
              Website <span>Brief</span>
            </h1>
            <p>
              Tell us about your business and goals so we can shape a site that fits your brand, audience, and
              technology needs.
            </p>
            <div className="inner-breadcrumb-links">
              <Link to="/">Home</Link>
              <i className="fa-solid fa-angle-right" />
              <span>Website Brief</span>
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

      <section className={`contact-section py-5 ${styles.page}`}>
        <div className="container">
          <div className={styles.intro}>
            <h2>Fill your website brief</h2>
            <p>
              Complete the sections below. Fields change based on the type of website you choose, matching the scope
              questions we use for informative sites, e-commerce, and custom web apps.
            </p>
          </div>

          <form className={styles.formWrap} onSubmit={onSubmit}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Contact &amp; business</h3>
              <p className={styles.cardHint}>We will only use this information to respond to your brief.</p>
              <div className="row">
                <div className="col-md-6">
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="wb-name">
                      Your name?
                    </label>
                    <input
                      id="wb-name"
                      name="fullName"
                      className="form-control custom-input"
                      value={form.fullName}
                      onChange={(e) => setField('fullName', e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="wb-email">
                      Your email address?
                    </label>
                    <input
                      id="wb-email"
                      name="email"
                      type="email"
                      className="form-control custom-input"
                      value={form.email}
                      onChange={(e) => setField('email', e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="wb-business">
                      What is your business name?
                    </label>
                    <input
                      id="wb-business"
                      name="businessName"
                      className="form-control custom-input"
                      value={form.businessName}
                      onChange={(e) => setField('businessName', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Website type</h3>
              <p className={styles.cardHint}>Choose the option that best describes what you want to build.</p>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="wb-type">
                  What is the type of your website?
                </label>
                <select
                  id="wb-type"
                  name="websiteType"
                  className="form-control custom-input"
                  value={form.websiteType}
                  onChange={(e) => setField('websiteType', e.target.value)}
                  required
                >
                  {WEBSITE_TYPES.map((t) => (
                    <option key={t.value || 'empty'} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              {typeBlocks.includes('infoBasic') && (
                <div className="row mt-3">
                  <div className="col-md-6">
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="wb-products-show">
                        How many products would you like to showcase on your website?
                      </label>
                      <input
                        id="wb-products-show"
                        className="form-control custom-input"
                        value={form.productsShowcase}
                        onChange={(e) => setField('productsShowcase', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="wb-services-show">
                        How many services would you like to showcase on your website?
                      </label>
                      <input
                        id="wb-services-show"
                        className="form-control custom-input"
                        value={form.servicesShowcase}
                        onChange={(e) => setField('servicesShowcase', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="wb-future-info">
                        Would you like to add images or products on your website in the future?
                      </label>
                      <textarea
                        id="wb-future-info"
                        className="form-control custom-input"
                        rows={3}
                        value={form.futureImagesProductsInfo}
                        onChange={(e) => setField('futureImagesProductsInfo', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {typeBlocks.includes('infoPay') && (
                <div className="row mt-3">
                  <div className="col-12">
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="wb-services-prices">
                        How many services would you like to have? Do you have prices ready for the services?
                      </label>
                      <textarea
                        id="wb-services-prices"
                        className="form-control custom-input"
                        rows={3}
                        value={form.servicesCountPrices}
                        onChange={(e) => setField('servicesCountPrices', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className={styles.field}>
                      <span className={styles.label}>Would you accept online payments?</span>
                      <div className={styles.radioRow}>
                        <label className={styles.radioLabel}>
                          <input
                            type="radio"
                            name="acceptOnlinePayments"
                            value="yes"
                            checked={form.acceptOnlinePayments === 'yes'}
                            onChange={() => setField('acceptOnlinePayments', 'yes')}
                          />
                          Yes
                        </label>
                        <label className={styles.radioLabel}>
                          <input
                            type="radio"
                            name="acceptOnlinePayments"
                            value="no"
                            checked={form.acceptOnlinePayments === 'no'}
                            onChange={() => setField('acceptOnlinePayments', 'no')}
                          />
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="wb-pay-medium">
                        What will be the medium of accepting payments?
                      </label>
                      <input
                        id="wb-pay-medium"
                        className="form-control custom-input"
                        value={form.paymentMedium}
                        onChange={(e) => setField('paymentMedium', e.target.value)}
                        placeholder="e.g. Stripe, PayPal, bank transfer"
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="wb-future-svc">
                        Would you like to add images or services on your website in the future?
                      </label>
                      <textarea
                        id="wb-future-svc"
                        className="form-control custom-input"
                        rows={3}
                        value={form.futureImagesServices}
                        onChange={(e) => setField('futureImagesServices', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {typeBlocks.includes('ecom') && (
                <div className="row mt-3">
                  <div className="col-md-6">
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="wb-categories">
                        How many categories would you like for your products?
                      </label>
                      <input
                        id="wb-categories"
                        className="form-control custom-input"
                        value={form.productCategories}
                        onChange={(e) => setField('productCategories', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="wb-product-count">
                        How many products would you like on your website?
                      </label>
                      <input
                        id="wb-product-count"
                        className="form-control custom-input"
                        value={form.productCount}
                        onChange={(e) => setField('productCount', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="wb-product-source">
                        Do you currently have the products, or is there a need to acquire them from a source?
                      </label>
                      <textarea
                        id="wb-product-source"
                        className="form-control custom-input"
                        rows={3}
                        value={form.productSource}
                        onChange={(e) => setField('productSource', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className={styles.field}>
                      <span className={styles.label}>Would you accept online payments?</span>
                      <div className={styles.radioRow}>
                        <label className={styles.radioLabel}>
                          <input
                            type="radio"
                            name="acceptOnlinePaymentsEcom"
                            value="yes"
                            checked={form.acceptOnlinePayments === 'yes'}
                            onChange={() => setField('acceptOnlinePayments', 'yes')}
                          />
                          Yes
                        </label>
                        <label className={styles.radioLabel}>
                          <input
                            type="radio"
                            name="acceptOnlinePaymentsEcom"
                            value="no"
                            checked={form.acceptOnlinePayments === 'no'}
                            onChange={() => setField('acceptOnlinePayments', 'no')}
                          />
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="wb-pay-medium-ecom">
                        Payment medium
                      </label>
                      <input
                        id="wb-pay-medium-ecom"
                        className="form-control custom-input"
                        value={form.paymentMedium}
                        onChange={(e) => setField('paymentMedium', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="wb-future-ecom">
                        Would you like to add images or products on your website in the future?
                      </label>
                      <textarea
                        id="wb-future-ecom"
                        className="form-control custom-input"
                        rows={3}
                        value={form.futureImagesProductsInfo}
                        onChange={(e) => setField('futureImagesProductsInfo', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="wb-platform-store">
                        What platform do you require? (WordPress, Shopify, Wix, Squarespace, custom CMS)
                      </label>
                      <input
                        id="wb-platform-store"
                        className="form-control custom-input"
                        value={form.ecommercePlatform}
                        onChange={(e) => setField('ecommercePlatform', e.target.value)}
                        placeholder='Preferred platform or "not sure"'
                      />
                    </div>
                  </div>
                </div>
              )}

              {typeBlocks.includes('webapp') && (
                <div className="row mt-3">
                  <div className="col-12">
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="wb-platform-app">
                        What platform do you require? (Laravel, React, custom CMS, other)
                      </label>
                      <input
                        id="wb-platform-app"
                        className="form-control custom-input"
                        value={form.webAppPlatform}
                        onChange={(e) => setField('webAppPlatform', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className={styles.field}>
                      <span className={styles.label}>Would you accept online payments?</span>
                      <div className={styles.radioRow}>
                        <label className={styles.radioLabel}>
                          <input
                            type="radio"
                            name="acceptOnlinePaymentsApp"
                            value="yes"
                            checked={form.acceptOnlinePayments === 'yes'}
                            onChange={() => setField('acceptOnlinePayments', 'yes')}
                          />
                          Yes
                        </label>
                        <label className={styles.radioLabel}>
                          <input
                            type="radio"
                            name="acceptOnlinePaymentsApp"
                            value="no"
                            checked={form.acceptOnlinePayments === 'no'}
                            onChange={() => setField('acceptOnlinePayments', 'no')}
                          />
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="wb-pay-medium-app">
                        What will be the medium of accepting payments?
                      </label>
                      <input
                        id="wb-pay-medium-app"
                        className="form-control custom-input"
                        value={form.paymentMedium}
                        onChange={(e) => setField('paymentMedium', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Brand &amp; audience</h3>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="wb-desc">
                  Description of your business
                </label>
                <textarea
                  id="wb-desc"
                  className="form-control custom-input"
                  rows={4}
                  value={form.businessDescription}
                  onChange={(e) => setField('businessDescription', e.target.value)}
                  required
                />
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="wb-industry">
                      What is your business industry?
                    </label>
                    <input
                      id="wb-industry"
                      className="form-control custom-input"
                      value={form.industry}
                      onChange={(e) => setField('industry', e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="wb-audience">
                      Who is your target audience?
                    </label>
                    <input
                      id="wb-audience"
                      className="form-control custom-input"
                      value={form.targetAudience}
                      onChange={(e) => setField('targetAudience', e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.field}>
                <span className={styles.label}>What type of overall feel do you want?</span>
                <p className={styles.cardHint} style={{ marginTop: 0 }}>
                  Select any that apply.
                </p>
                <div className={styles.chipGrid}>
                  {FEEL_OPTIONS.map((opt) => (
                    <label key={opt} className={styles.chip}>
                      <input
                        type="checkbox"
                        checked={form.feels.includes(opt)}
                        onChange={() => setField('feels', toggleFeel(form.feels, opt))}
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="wb-competitors">
                  Competitors or reference websites <span className={styles.optional}>(URLs or names)</span>
                </label>
                <textarea
                  id="wb-competitors"
                  className="form-control custom-input"
                  rows={3}
                  value={form.competitors}
                  onChange={(e) => setField('competitors', e.target.value)}
                  placeholder="Links or short notes on what you like about each"
                />
              </div>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Site structure &amp; assets</h3>
              <div className="row">
                <div className="col-md-6">
                  <div className={styles.field}>
                    <span className={styles.label}>Do you have a domain?</span>
                    <div className={styles.radioRow}>
                      <label className={styles.radioLabel}>
                        <input
                          type="radio"
                          name="hasDomain"
                          value="yes"
                          checked={form.hasDomain === 'yes'}
                          onChange={() => setField('hasDomain', 'yes')}
                        />
                        Yes
                      </label>
                      <label className={styles.radioLabel}>
                        <input
                          type="radio"
                          name="hasDomain"
                          value="no"
                          checked={form.hasDomain === 'no'}
                          onChange={() => setField('hasDomain', 'no')}
                        />
                        No
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="wb-pages">
                      How many pages do you want?
                    </label>
                    <input
                      id="wb-pages"
                      type="number"
                      min={1}
                      className="form-control custom-input"
                      value={form.pageCount}
                      onChange={(e) => setField('pageCount', e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="wb-page-names">
                      What pages would you like? Name them here.
                    </label>
                    <textarea
                      id="wb-page-names"
                      className="form-control custom-input"
                      rows={3}
                      value={form.pageNames}
                      onChange={(e) => setField('pageNames', e.target.value)}
                      placeholder="Home, About, Services, Contact, …"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className={styles.field}>
                    <span className={styles.label}>Do you have a website logo?</span>
                    <div className={styles.radioRow}>
                      <label className={styles.radioLabel}>
                        <input
                          type="radio"
                          name="hasLogo"
                          value="yes"
                          checked={form.hasLogo === 'yes'}
                          onChange={() => setField('hasLogo', 'yes')}
                        />
                        Yes
                      </label>
                      <label className={styles.radioLabel}>
                        <input
                          type="radio"
                          name="hasLogo"
                          value="no"
                          checked={form.hasLogo === 'no'}
                          onChange={() => setField('hasLogo', 'no')}
                        />
                        No
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className={styles.field}>
                    <span className={styles.label}>Would you like us to revamp your logo?</span>
                    <div className={styles.radioRow}>
                      <label className={styles.radioLabel}>
                        <input
                          type="radio"
                          name="revampLogo"
                          value="yes"
                          checked={form.revampLogo === 'yes'}
                          onChange={() => setField('revampLogo', 'yes')}
                        />
                        Yes
                      </label>
                      <label className={styles.radioLabel}>
                        <input
                          type="radio"
                          name="revampLogo"
                          value="no"
                          checked={form.revampLogo === 'no'}
                          onChange={() => setField('revampLogo', 'no')}
                        />
                        No
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className={styles.field}>
                    <span className={styles.label}>Do you need website hosting?</span>
                    <div className={styles.radioRow}>
                      <label className={styles.radioLabel}>
                        <input
                          type="radio"
                          name="needHosting"
                          value="yes"
                          checked={form.needHosting === 'yes'}
                          onChange={() => setField('needHosting', 'yes')}
                        />
                        Yes
                      </label>
                      <label className={styles.radioLabel}>
                        <input
                          type="radio"
                          name="needHosting"
                          value="no"
                          checked={form.needHosting === 'no'}
                          onChange={() => setField('needHosting', 'no')}
                        />
                        No
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className={styles.field}>
                    <span className={styles.label}>Do you need a smartphone-responsive website?</span>
                    <div className={styles.radioRow}>
                      <label className={styles.radioLabel}>
                        <input
                          type="radio"
                          name="needResponsive"
                          value="yes"
                          checked={form.needResponsive === 'yes'}
                          onChange={() => setField('needResponsive', 'yes')}
                        />
                        Yes
                      </label>
                      <label className={styles.radioLabel}>
                        <input
                          type="radio"
                          name="needResponsive"
                          value="no"
                          checked={form.needResponsive === 'no'}
                          onChange={() => setField('needResponsive', 'no')}
                        />
                        No
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Add-on features</h3>
              <p className={styles.cardHint}>Check everything you may want as part of the project.</p>
              <div className={styles.addonGrid}>
                {ADDON_FEATURES.map((a) => (
                  <label key={a.id} className={styles.checkLabel}>
                    <input type="checkbox" checked={form.addons[a.id]} onChange={() => toggleAddon(a.id)} />
                    {a.label}
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Reference files</h3>
              <div className={styles.fileZone}>
                <label className={styles.label} htmlFor="wb-files">
                  Upload your reference file <span className={styles.optional}>(you can add multiple files)</span>
                </label>
                <input
                  key={fileInputKey}
                  id="wb-files"
                  name="files"
                  type="file"
                  className={`form-control custom-input mt-2 ${styles.fileInput}`}
                  multiple
                  onChange={onFiles}
                />
                {files.length > 0 && (
                  <ul className={styles.fileList}>
                    {files.map((f) => (
                      <li key={f.name}>{f.name}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className={styles.submitBar}>
              <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit your brief'}
              </button>
            </div>

            {submitError && (
              <div className="alert alert-danger mt-3 mb-0" role="alert">
                {submitError}
              </div>
            )}

            {submitted && (
              <div className={styles.success} role="status">
                Thank you — your brief was submitted. We will follow up using the email you provided.
                {submittedBriefId != null && (
                  <>
                    {' '}
                    Reference #{submittedBriefId}.
                  </>
                )}
              </div>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
