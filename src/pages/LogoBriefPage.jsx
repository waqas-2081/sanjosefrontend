import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './LogoBriefPage.module.css';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const FONT_STYLES = [
  { id: 'comic',  imageSrc: '/assets/images/logo-brief/fonts/comic.png' },
  { id: 'stencil', imageSrc: '/assets/images/logo-brief/fonts/stencil.png' },
  { id: 'gothic',  imageSrc: '/assets/images/logo-brief/fonts/gothic.png' },
  { id: 'script',  imageSrc: '/assets/images/logo-brief/fonts/script.png' },
  { id: 'handwritten',  imageSrc: '/assets/images/logo-brief/fonts/handwritten.png' },
  { id: 'sans',  imageSrc: '/assets/images/logo-brief/fonts/sans.png' },
  { id: 'serif',  imageSrc: '/assets/images/logo-brief/fonts/serif.png' },
  { id: 'retro',  imageSrc: '/assets/images/logo-brief/fonts/retro.png' },
  { id: 'techno',  imageSrc: '/assets/images/logo-brief/fonts/techno.png' },
  { id: 'narrow',  imageSrc: '/assets/images/logo-brief/fonts/narrow.png' },
];

const LOGO_TYPES = [
  { id: 'symbol', label: 'Symbol or icon' },
  { id: 'letter', label: 'Letter mark' },
  { id: 'character', label: 'Character based' },
  { id: 'word', label: 'Word mark' },
  { id: 'combination', label: 'Combination mark' },
  { id: 'emblem', label: 'Emblem' },
];

const COLOR_SWATCHES = [
  { id: 'Blue', label: 'Blue', imageSrc: '/assets/images/logo-brief/colours/blue.png' },
  { id: 'Yellow', label: 'Yellow', imageSrc: '/assets/images/logo-brief/colours/yellow.png' },
  { id: 'Red', label: 'Red', imageSrc: '/assets/images/logo-brief/colours/red.png' },
  { id: 'Purple', label: 'Purple', imageSrc: '/assets/images/logo-brief/colours/purple.png' },
  { id: 'Green', label: 'Green', imageSrc: '/assets/images/logo-brief/colours/green.png' },
  { id: 'Maroon', label: 'Maroon', imageSrc: '/assets/images/logo-brief/colours/maroon.png' },
  { id: 'Neutrals', label: 'Neutrals', imageSrc: '/assets/images/logo-brief/colours/neutrals.png' },
  { id: 'Aqua', label: 'Aqua', imageSrc: '/assets/images/logo-brief/colours/aqua.png' },
  { id: 'Pink', label: 'Pink', imageSrc: '/assets/images/logo-brief/colours/pink.png' },
  {
    id: "Designer's suggestions",
    label: "Designer's suggestions",
    imageSrc: '/assets/images/logo-brief/colours/designers.png',
  },
];

/** Matches StoreLogoBriefRequest `logo_type` rule. */
const LOGO_TYPE_MAP = {
  symbol: 'symbol_icon',
  letter: 'lettermark',
  character: 'character_based',
  word: 'wordmark',
  combination: 'combination_mark',
  emblem: 'emblem',
};

const LOGO_BRIEF_ENDPOINT = 'http://127.0.0.1:8000/api/logo-brief';

const initialForm = {
  contactName: '',
  email: '',
  logoName: '',
  slogan: '',
  personalPhone: '',
  companyPhone: '',
  industry: '',
  describeBusiness: '',
  logoWants: '',
  competitor1: '',
  competitor2: '',
  competitor3: '',
  logoType: '',
  fontStyle: '',
  fontNotes: '',
  logoColor: '',
  customColorPrimary: '',
  customColorSecondary: '',
};

function buildLogoBriefPayload(form) {
  const fontNotes = form.fontNotes.trim();
  const logoWants = form.logoWants.trim();
  const logo_requirements = fontNotes ? `${logoWants}\n\nFont notes: ${fontNotes}` : logoWants;

  const payload = {
    contact_person_name: form.contactName.trim(),
    email: form.email.trim(),
    personal_phone: form.personalPhone.trim(),
    company_phone: form.companyPhone.trim(),
    logo_name: form.logoName.trim(),
    company_slogan: form.slogan.trim(),
    industry: form.industry.trim(),
    business_description: form.describeBusiness.trim(),
    logo_requirements,
    competitor_reference_1: form.competitor1.trim(),
    competitor_reference_2: form.competitor2.trim(),
    competitor_reference_3: form.competitor3.trim(),
    logo_type: LOGO_TYPE_MAP[form.logoType] || '',
    primary_color: form.customColorPrimary.trim(),
    secondary_color: form.customColorSecondary.trim(),
  };

  if (form.fontStyle) {
    payload.logo_fonts = [form.fontStyle];
  }
  if (form.logoColor) {
    payload.logo_colors = [form.logoColor];
  }

  return payload;
}

function toLogoBriefFormData(payload, files) {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value === '' || value == null) return;
    if (Array.isArray(value)) {
      value.forEach((item) => formData.append(`${key}[]`, item));
      return;
    }
    if (typeof value === 'boolean') {
      formData.append(key, value ? '1' : '0');
      return;
    }
    formData.append(key, String(value));
  });

  files.forEach((file) => {
    formData.append('reference_files[]', file);
  });

  return formData;
}

function getLogoBriefApiErrorMessage(result) {
  if (result?.message && typeof result.message === 'string') return result.message;
  if (result?.errors && typeof result.errors === 'object') {
    const firstFieldErrors = Object.values(result.errors).find((value) => Array.isArray(value) && value.length > 0);
    if (firstFieldErrors) return firstFieldErrors[0];
  }
  return 'Unable to submit logo brief. Please try again.';
}

/** Returns #rrggbb or null if not a hex colour string. */
function normalizeHex6(raw) {
  if (raw == null || typeof raw !== 'string') return null;
  const t = raw.trim();
  const m6 = t.match(/^#([0-9a-fA-F]{6})$/);
  if (m6) return `#${m6[1].toLowerCase()}`;
  const m3 = t.match(/^#([0-9a-fA-F]{3})$/);
  if (m3) {
    const [r, g, b] = m3[1].split('');
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }
  return null;
}

/** Value for <input type="color" /> when stored value is not hex. */
function hexForPickerDisplay(stored) {
  return normalizeHex6(stored) ?? '#cbd5e1';
}

function CustomColorField({ textId, pickerId, labelNode, value, onChange }) {
  const pickerValue = hexForPickerDisplay(value);
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={textId}>
        {labelNode}
      </label>
      <div className={styles.colorPickerRail}>
        <input
          type="color"
          id={pickerId}
          className={styles.colorPickerNative}
          value={pickerValue}
          onChange={(e) => onChange(e.target.value)}
          title="Pick a colour"
          aria-label="Colour picker"
        />
      </div>
      <input
        id={textId}
        type="text"
        className={`form-control custom-input ${styles.colorTextInput}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="#HEX or colour name"
      />
    </div>
  );
}

/** One wide “strip” image per type — file: `/public/assets/images/logo-brief/{typeId}.png` (or `.jpg`). */
function LogoTypeStrip({ typeId }) {
  const base = `/assets/images/logo-brief/${typeId}`;
  return (
    <div className={styles.typeStrip}>
      <img
        src={`${base}.png`}
        alt=""
        className={styles.typeStripImg}
        onError={(e) => {
          const el = e.currentTarget;
          if (el.dataset.fallback === '1') {
            el.style.display = 'none';
            return;
          }
          el.dataset.fallback = '1';
          el.src = `${base}.jpg`;
        }}
      />
    </div>
  );
}

export default function LogoBriefPage() {
  useDocumentTitle('Logo Brief | San Jose Logo Design');
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

  const onFiles = (e) => {
    setFiles(Array.from(e.target.files || []));
    setSubmitted(false);
    setSubmittedBriefId(null);
    setSubmitError('');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitted(false);
    setSubmittedBriefId(null);
    setIsSubmitting(true);

    try {
      const payload = buildLogoBriefPayload(form);
      const formData = toLogoBriefFormData(payload, files);
      const response = await fetch(LOGO_BRIEF_ENDPOINT, {
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
        throw new Error(getLogoBriefApiErrorMessage(result));
      }

      if (!result || result.success !== true) {
        throw new Error('Invalid response from server.');
      }

      setSubmitted(true);
      setSubmittedBriefId(result.data?.id ?? null);
      setForm({ ...initialForm });
      setFiles([]);
      setFileInputKey((k) => k + 1);
    } catch (error) {
      setSubmitError(error.message || 'Unable to submit logo brief. Please try again.');
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
            <span className="inner-breadcrumb-tag">Brand identity</span>
            <h1>
              Logo <span>Brief</span>
            </h1>
            <p>
              Share your story, references, and creative direction so our designers can craft a mark that fits your
              brand and audience.
            </p>
            <div className="inner-breadcrumb-links">
              <Link to="/">Home</Link>
              <i className="fa-solid fa-angle-right" />
              <span>Logo Brief</span>
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
            <h2>Fill your logo brief</h2>
            <p>
              Fields marked with an asterisk (<span className={styles.req}>*</span>) are required. The form mirrors the
              logo intake questions from our studio brief.
            </p>
          </div>

          <form className={styles.formWrap} onSubmit={onSubmit}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Contact</h3>
              <p className={styles.cardHint}>As provided initially — we will use this to reach you about your logo.</p>
              <div className="row">
                <div className="col-md-6">
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="lb-contact-name">
                      Contact person name <span className={styles.req}>*</span>
                    </label>
                    <input
                      id="lb-contact-name"
                      className="form-control custom-input"
                      value={form.contactName}
                      onChange={(e) => setField('contactName', e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="lb-email">
                      Email <span className={styles.req}>*</span>
                    </label>
                    <input
                      id="lb-email"
                      type="email"
                      className="form-control custom-input"
                      value={form.email}
                      onChange={(e) => setField('email', e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="lb-personal-phone">
                      Personal phone <span className={styles.req}>*</span>
                    </label>
                    <input
                      id="lb-personal-phone"
                      type="tel"
                      className="form-control custom-input"
                      value={form.personalPhone}
                      onChange={(e) => setField('personalPhone', e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="lb-company-phone">
                      Company phone <span className={styles.optional}>(optional)</span>
                    </label>
                    <input
                      id="lb-company-phone"
                      type="tel"
                      className="form-control custom-input"
                      value={form.companyPhone}
                      onChange={(e) => setField('companyPhone', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Logo &amp; company</h3>
              <div className="row">
                <div className="col-md-6">
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="lb-logo-name">
                      Logo name <span className={styles.req}>*</span>
                    </label>
                    <input
                      id="lb-logo-name"
                      className="form-control custom-input"
                      value={form.logoName}
                      onChange={(e) => setField('logoName', e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="lb-slogan">
                      Company slogan <span className={styles.optional}>(optional)</span>
                    </label>
                    <input
                      id="lb-slogan"
                      className="form-control custom-input"
                      value={form.slogan}
                      onChange={(e) => setField('slogan', e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="lb-industry">
                      Industry <span className={styles.optional}>(optional)</span>
                    </label>
                    <input
                      id="lb-industry"
                      className="form-control custom-input"
                      value={form.industry}
                      onChange={(e) => setField('industry', e.target.value)}
                      placeholder="e.g. Technology, retail, healthcare"
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="lb-describe">
                      Describe your business <span className={styles.req}>*</span>
                    </label>
                    <textarea
                      id="lb-describe"
                      className="form-control custom-input"
                      rows={4}
                      value={form.describeBusiness}
                      onChange={(e) => setField('describeBusiness', e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="lb-wants">
                      What you want in your logo <span className={styles.req}>*</span>
                    </label>
                    <textarea
                      id="lb-wants"
                      className="form-control custom-input"
                      rows={4}
                      value={form.logoWants}
                      onChange={(e) => setField('logoWants', e.target.value)}
                      required
                      placeholder="Mood, symbols to include or avoid, use cases (web, print, apparel)…"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Competitor references</h3>
         
              <div className="row">
                <div className="col-12">
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="lb-comp1">
                      Competitors reference 1 <span className={styles.req}>*</span>
                    </label>
                    <input
                      id="lb-comp1"
                      className="form-control custom-input"
                      value={form.competitor1}
                      onChange={(e) => setField('competitor1', e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="lb-comp2">
                      Competitors reference 2 <span className={styles.optional}>(optional)</span>
                    </label>
                    <input
                      id="lb-comp2"
                      className="form-control custom-input"
                      value={form.competitor2}
                      onChange={(e) => setField('competitor2', e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="lb-comp3">
                      Competitors reference 3 <span className={styles.optional}>(optional)</span>
                    </label>
                    <input
                      id="lb-comp3"
                      className="form-control custom-input"
                      value={form.competitor3}
                      onChange={(e) => setField('competitor3', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Choose logo type</h3>
             
              <div className={styles.typeGrid}>
                {LOGO_TYPES.map((t, i) => (
                  <label key={t.id} className={styles.typeCard}>
                    <input
                      type="radio"
                      name="logoType"
                      value={t.id}
                      checked={form.logoType === t.id}
                      onChange={() => setField('logoType', t.id)}
                      required={i === 0}
                    />
                    <div className={styles.typeCardInner}>
                      <LogoTypeStrip typeId={t.id} />
                      <span className={styles.typeCardCaption}>{t.label}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Choose logo fonts</h3>
             
              <div className={styles.fontGrid} role="radiogroup" aria-label="Logo font style">
                {FONT_STYLES.map((f) => (
                  <label key={f.id} className={styles.fontCell}>
                    <input
                      type="radio"
                      name="fontStyle"
                      value={f.id}
                      checked={form.fontStyle === f.id}
                      onChange={() => setField('fontStyle', f.id)}
                    />
                    <div className={styles.fontCellInner}>
                      <img src={f.imageSrc} alt={f.label} className={styles.fontCellImg} />
                      <span className={styles.fontCellCaption}>{f.label}</span>
                    </div>
                  </label>
                ))}
              </div>
             
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Choose logo colour</h3>

              <div className={styles.colorSwatchGrid} role="radiogroup" aria-label="Logo colour preference">
                {COLOR_SWATCHES.map((c) => (
                  <label key={c.id} className={styles.colorSwatchCell}>
                    <input
                      type="radio"
                      name="logoColor"
                      value={c.id}
                      checked={form.logoColor === c.id}
                      onChange={() => setField('logoColor', c.id)}
                    />
                    <div className={styles.colorSwatchInner}>
                      <img src={c.imageSrc} alt="" className={styles.colorSwatchImg} />
                      <span className={styles.colorSwatchCaption}>{c.label}</span>
                    </div>
                  </label>
                ))}
              </div>
            
              <div className="row mt-2 gx-md-3">
                <div className="col-md-6">
                  <CustomColorField
                    textId="lb-color-primary"
                    pickerId="lb-color-primary-picker"
                    labelNode={
                      <>
                        Specify your own colour — primary <span className={styles.optional}>(optional)</span>
                      </>
                    }
                    value={form.customColorPrimary}
                    onChange={(v) => setField('customColorPrimary', v)}
                  />
                </div>
                <div className="col-md-6">
                  <CustomColorField
                    textId="lb-color-secondary"
                    pickerId="lb-color-secondary-picker"
                    labelNode={
                      <>
                        Secondary <span className={styles.optional}>(optional)</span>
                      </>
                    }
                    value={form.customColorSecondary}
                    onChange={(v) => setField('customColorSecondary', v)}
                  />
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Reference files</h3>
             
              <div className={styles.fileZone}>
                <label className={styles.label} htmlFor="lb-files">
                  Upload files <span className={styles.optional}>(multiple allowed)</span>
                </label>
                <input
                  key={fileInputKey}
                  id="lb-files"
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
                Thank you — your logo brief was submitted. We will follow up using the email you provided.
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
