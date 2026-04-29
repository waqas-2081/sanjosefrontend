import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { postContact, autoSaveContact } from '../api/contactApi';

const AUTOSAVE_DELAY_MS = 3000; // 3 seconds

const initialForm = {
  full_name: '',
  email: '',
  phone_number: '',
  company_name: '',
  project_description: '',
};

export default function ContactPage() {
  useDocumentTitle('Contact Us | San Jose Logo Design');
  
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submittedId, setSubmittedId] = useState(null);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Auto-save states
  const [autoSaveStatus, setAutoSaveStatus] = useState(''); // '' | 'saving' | 'saved' | 'error'
  
  // Refs
  const autoSaveTimerRef = useRef(null);
  const formRef = useRef(form);
  const isAutoSavingRef = useRef(false);
  const mountedRef = useRef(true);

  // Keep formRef updated
  useEffect(() => {
    formRef.current = form;
  }, [form]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
    };
  }, []);

  const setField = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setSubmitted(false);
    setSubmittedId(null);
    setSubmitError('');
    // Clear auto-save status when user starts typing again
    if (autoSaveStatus === 'saved' || autoSaveStatus === 'error') {
      setAutoSaveStatus('');
    }
  };

  // ====== AUTO-SAVE LOGIC ======
  useEffect(() => {
    // Check if form has any data
    const hasAnyData = Object.values(form).some(
      (val) => val !== null && val !== '' && val !== undefined
    );

    if (!hasAnyData || isSubmitting || submitted) {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
        autoSaveTimerRef.current = null;
      }
      if (!hasAnyData) setAutoSaveStatus('');
      return;
    }

    // Clear previous timer
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }

    // Set new timer
    autoSaveTimerRef.current = setTimeout(async () => {
      if (!mountedRef.current) return;
      const currentForm = formRef.current;

      // Build payload with non-empty values only
      const payload = {};
      if (currentForm.full_name?.trim()) payload.full_name = currentForm.full_name.trim();
      if (currentForm.email?.trim()) payload.email = currentForm.email.trim();
      if (currentForm.phone_number?.trim()) payload.phone_number = currentForm.phone_number.trim();
      if (currentForm.company_name?.trim()) payload.company_name = currentForm.company_name.trim();
      if (currentForm.project_description?.trim()) payload.project_description = currentForm.project_description.trim();

      // Only save if there's something
      if (Object.keys(payload).length === 0) return;
      if (isAutoSavingRef.current) return;

      isAutoSavingRef.current = true;
      setAutoSaveStatus('saving');

      try {
        await autoSaveContact(payload);
        if (mountedRef.current) {
          setAutoSaveStatus('saved');
          setTimeout(() => {
            if (mountedRef.current) {
              setAutoSaveStatus((prev) => (prev === 'saved' ? '' : prev));
            }
          }, 2000);
        }
      } catch (err) {
        console.error('Auto-save failed:', err);
        if (mountedRef.current) {
          setAutoSaveStatus('error');
          setTimeout(() => {
            if (mountedRef.current) {
              setAutoSaveStatus((prev) => (prev === 'error' ? '' : prev));
            }
          }, 3000);
        }
      } finally {
        isAutoSavingRef.current = false;
      }
    }, AUTOSAVE_DELAY_MS);

    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
    };
  }, [form, isSubmitting, submitted]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitted(false);
    setSubmittedId(null);
    setIsSubmitting(true);

    // Clear auto-save timer
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
      autoSaveTimerRef.current = null;
    }
    setAutoSaveStatus('');

    const body = {
      full_name: form.full_name.trim(),
      email: form.email.trim(),
      phone_number: form.phone_number.trim(),
      company_name: form.company_name.trim() || null,
      project_description: form.project_description.trim(),
    };

    try {
      const data = await postContact(body);
      setSubmitted(true);
      setSubmittedId(data.data?.id ?? null);
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
                <h2 className="contact-title">Let&apos;s Build Your Brand</h2>
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