import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const SERVICE_OPTIONS = [
  { value: '', label: 'Select Service' },
  { value: 'Brand Strategy', label: 'Brand Strategy' },
  { value: 'Website Design', label: 'Website Design' },
  { value: 'Logo Design', label: 'Logo Design' },
  { value: 'Full Brand Development', label: 'Full Brand Development' },
];

const CONTACT_ENDPOINT = 'http://127.0.0.1:8000/api/contact';

const initialForm = {
  full_name: '',
  email: '',
  phone_number: '',
  company_name: '',
  service: '',
  project_description: '',
};

function getContactApiErrorMessage(result) {
  if (result?.errors && typeof result.errors === 'object') {
    const firstFieldErrors = Object.values(result.errors).find((value) => Array.isArray(value) && value.length > 0);
    if (firstFieldErrors) return firstFieldErrors[0];
  }
  if (result?.message && typeof result.message === 'string') return result.message;
  return 'Unable to send your message. Please try again.';
}

export default function ContactPage() {
  useDocumentTitle('Contact Us | San Jose Logo Design');
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submittedId, setSubmittedId] = useState(null);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setField = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setSubmitted(false);
    setSubmittedId(null);
    setSubmitError('');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitted(false);
    setSubmittedId(null);
    setIsSubmitting(true);

    const body = {
      full_name: form.full_name.trim(),
      email: form.email.trim(),
      phone_number: form.phone_number.trim(),
      company_name: form.company_name.trim(),
      service: form.service,
      project_description: form.project_description.trim(),
    };

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
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
        throw new Error(getContactApiErrorMessage(result));
      }

      if (!result || result.success !== true) {
        throw new Error('Invalid response from server.');
      }

      setSubmitted(true);
      setSubmittedId(result.data?.id ?? null);
      setForm(initialForm);
    } catch (error) {
      setSubmitError(error.message || 'Unable to send your message. Please try again.');
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
            <span className="inner-breadcrumb-tag">Creative Design Studio</span>

            <h1>
              Contact <span>Us</span>
            </h1>

            <div className="inner-breadcrumb-links">
              <Link to="/">Home</Link>
              <i className="fa-solid fa-angle-right" />
              <span>Contact Us</span>
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

      <section className="contact-section">
        <div className="container">
          <div className="row align-items-stretch">
            <div className="col-lg-5 mb-4 mb-lg-0">
              <div className="contact-info-box h-100">
                <h2 className="contact-title">Let’s Build Your Brand</h2>
                <p className="contact-text">
                  One of the top logo design companies in the US, San Jose Logo Design knows what it takes to get the
                  best results for its customer&apos;s brand with prospects. To execute both easily, logo design must be
                  simple but eye catching and stand out. San Jose Logo Design brings excellent branded logo design
                  services on board in the USA.
                </p>

                <div className="contact-info-item">
                  <span className="contact-info-icon" aria-hidden="true">
                    <i className="fa-solid fa-envelope" />
                  </span>
                  <p>
                    <a href="mailto:info@sanjoselogodesign.com">info@sanjoselogodesign.com</a>
                  </p>
                </div>

                <div className="contact-info-item">
                  <span className="contact-info-icon" aria-hidden="true">
                    <i className="fa-solid fa-location-dot" />
                  </span>
                  <p>14A S 1st St, San Jose, CA 95113, USA</p>
                </div>

                <div className="contact-info-item">
                  <span className="contact-info-icon" aria-hidden="true">
                    <i className="fa-solid fa-phone" />
                  </span>
                  <p>
                    <a href="tel:+12144491305">(214) 449-1305</a>
                  </p>
                </div>

                <div className="contact-highlight">
                  <h5>Why Work With Us</h5>
                  <ul>
                    <li>Brand Strategy Experts</li>
                    <li>Creative Website Design</li>
                    <li>Conversion Focused Approach</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="contact-form-box">
                <h3 className="form-title">Start Your Project</h3>

                <form onSubmit={onSubmit}>
                  <div className="row">
                    <div className="col-lg-6 mb-3">
                      <input
                        type="text"
                        name="full_name"
                        className="form-control custom-input"
                        placeholder="Full Name"
                        value={form.full_name}
                        onChange={(e) => setField('full_name', e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-lg-6 mb-3">
                      <input
                        type="email"
                        name="email"
                        className="form-control custom-input"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={(e) => setField('email', e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-lg-6 mb-3">
                      <input
                        type="text"
                        name="phone_number"
                        className="form-control custom-input"
                        placeholder="Phone Number"
                        value={form.phone_number}
                        onChange={(e) => setField('phone_number', e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-lg-6 mb-3">
                      <input
                        type="text"
                        name="company_name"
                        className="form-control custom-input"
                        placeholder="Company Name"
                        value={form.company_name}
                        onChange={(e) => setField('company_name', e.target.value)}
                      />
                    </div>

                    <div className="col-12 mb-3">
                      <select
                        name="service"
                        className="form-control custom-input"
                        value={form.service}
                        onChange={(e) => setField('service', e.target.value)}
                        required
                      >
                        {SERVICE_OPTIONS.map((opt) => (
                          <option key={opt.value || 'empty'} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-12 mb-3">
                      <textarea
                        name="project_description"
                        className="form-control custom-input"
                        rows={5}
                        placeholder="Tell us about your project (at least 10 characters)"
                        value={form.project_description}
                        onChange={(e) => setField('project_description', e.target.value)}
                        required
                        minLength={10}
                      />
                    </div>

                    <div className="col-12">
                      <button type="submit" className="btn contact-btn w-100" disabled={isSubmitting}>
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </button>
                    </div>

                    {submitError && (
                      <div className="col-12 mt-3">
                        <div className="alert alert-danger mb-0" role="alert">
                          {submitError}
                        </div>
                      </div>
                    )}

                    {submitted && (
                      <div className="col-12 mt-3">
                        <div className="alert alert-success mb-0" role="status">
                          Thank you — your inquiry was submitted. We will follow up soon.
                          {submittedId != null && <> Reference #{submittedId}.</>}
                        </div>
                      </div>
                    )}
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
