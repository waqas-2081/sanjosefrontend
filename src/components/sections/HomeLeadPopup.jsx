import { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { postBrandingBrief, autoSaveBrandingBrief } from '../../api/brandingBriefApi';

const OPEN_DELAY_MS = 3500;
const AUTOSAVE_DELAY_MS = 3000; // 3 seconds

const emptyForm = {
  fullName: '',
  email: '',
  phone: '',
  message: '',
};

function isQuoteTrigger(node) {
  if (!node) return false;
  if (node.dataset?.popupTrigger === 'quote') return true;
  if (node.classList?.contains('quote-trigger')) return true;

  const text = (node.textContent || '').replace(/\s+/g, ' ').trim().toUpperCase();
  return (
    text === 'GET A QUOTE' ||
    text.includes('GET A QUOTE') ||
    text === 'REQUEST A QUOTE' ||
    text.includes('REQUEST A QUOTE')
  );
}

function FloatingOrbs() {
  return (
    <>
      <motion.span
        className="home-lead-popup__orb home-lead-popup__orb--one"
        animate={{ x: [0, 14, 0], y: [0, -8, 0] }}
        transition={{ duration: 7, ease: 'easeInOut', repeat: Infinity }}
      />
      <motion.span
        className="home-lead-popup__orb home-lead-popup__orb--two"
        animate={{ x: [0, -10, 0], y: [0, 10, 0] }}
        transition={{ duration: 8.5, ease: 'easeInOut', repeat: Infinity }}
      />
      <motion.span
        className="home-lead-popup__orb home-lead-popup__orb--three"
        animate={{ x: [0, 12, 0], y: [0, 14, 0] }}
        transition={{ duration: 9, ease: 'easeInOut', repeat: Infinity }}
      />
    </>
  );
}

export function HomeLeadPopup({ autoOpenOnLoad = false }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  
  // Auto-save states
  const [autoSaveStatus, setAutoSaveStatus] = useState(''); // '' | 'saving' | 'saved' | 'error'
  
  // Refs for auto-save logic
  const autoSaveTimerRef = useRef(null);
  const formRef = useRef(form);
  const isAutoSavingRef = useRef(false);
  
  const leftImage = useMemo(() => `${process.env.PUBLIC_URL || ''}/assets/images/popup.png`, []);

  // Keep formRef updated with latest form values
  useEffect(() => {
    formRef.current = form;
  }, [form]);

  // Reset form when popup closes
  useEffect(() => {
    if (open) return;
    setForm(emptyForm);
    setSubmitting(false);
    setSubmitError('');
    setSubmitSuccess('');
    setAutoSaveStatus('');
    
    // Clear any pending auto-save timer
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
      autoSaveTimerRef.current = null;
    }
  }, [open]);

  // Auto-open on load
  useEffect(() => {
    if (!autoOpenOnLoad) return undefined;
    const timer = window.setTimeout(() => setOpen(true), OPEN_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [autoOpenOnLoad]);

  // Quote trigger click handler
  useEffect(() => {
    const onQuoteTriggerClick = (event) => {
      const trigger = event.target?.closest?.('a, button');
      if (!trigger || !isQuoteTrigger(trigger)) return;
      if (trigger.closest('.home-lead-popup__panel')) return;
      event.preventDefault();
      setOpen(true);
    };

    document.addEventListener('click', onQuoteTriggerClick, true);
    return () => document.removeEventListener('click', onQuoteTriggerClick, true);
  }, []);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSubmitError('');
    setSubmitSuccess('');
    // Clear auto-save status when user starts typing
    if (autoSaveStatus === 'saved' || autoSaveStatus === 'error') {
      setAutoSaveStatus('');
    }
  };

  // ====== AUTO-SAVE LOGIC ======
  useEffect(() => {
    // Don't auto-save if popup is not open or form is completely empty
    const { fullName, email, phone, message } = form;
    const hasAnyData = fullName || email || phone || message;
    
    if (!open || !hasAnyData) {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
        autoSaveTimerRef.current = null;
      }
      setAutoSaveStatus('');
      return;
    }

    // Don't set new timer if currently submitting
    if (submitting) return;

    // Clear previous timer
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }

    // Set new timer for auto-save after 3 seconds of inactivity
    autoSaveTimerRef.current = setTimeout(async () => {
      const currentForm = formRef.current;
      
      // Double-check there's still data to save
      if (!currentForm.fullName && !currentForm.email && !currentForm.phone && !currentForm.message) {
        return;
      }

      // Prevent concurrent auto-saves
      if (isAutoSavingRef.current) return;
      
      isAutoSavingRef.current = true;
      setAutoSaveStatus('saving');
      
      try {
        const payload = {};
        if (currentForm.fullName.trim()) payload.full_name = currentForm.fullName.trim();
        if (currentForm.email.trim()) payload.email = currentForm.email.trim();
        if (currentForm.phone.trim()) payload.phone = currentForm.phone.trim();
        if (currentForm.message.trim()) payload.message = currentForm.message.trim();
        
        // Only send if there's actual data
        if (Object.keys(payload).length > 0) {
          await autoSaveBrandingBrief(payload);
          setAutoSaveStatus('saved');
          
          // Hide "saved" indicator after 2 seconds
          setTimeout(() => {
            setAutoSaveStatus((prev) => (prev === 'saved' ? '' : prev));
          }, 2000);
        }
      } catch (err) {
        console.error('Auto-save failed:', err);
        setAutoSaveStatus('error');
        
        // Hide "error" indicator after 3 seconds
        setTimeout(() => {
          setAutoSaveStatus((prev) => (prev === 'error' ? '' : prev));
        }, 3000);
      } finally {
        isAutoSavingRef.current = false;
      }
    }, AUTOSAVE_DELAY_MS);

    // Cleanup on unmount or dependency change
    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
    };
  }, [form, open, submitting]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess('');
    
    // Clear auto-save timer since we're doing final submit
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
      autoSaveTimerRef.current = null;
    }
    setAutoSaveStatus('');
    
    const full_name = form.fullName.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const message = form.message.trim();
    
    if (!full_name || !email || !phone || !message) {
      setSubmitError('Please fill in all fields.');
      return;
    }
    
    setSubmitting(true);
    try {
      const data = await postBrandingBrief({
        full_name,
        email,
        phone,
        message,
      });
      setSubmitSuccess(data.message || 'Thank you! Your request has been submitted.');
      setForm(emptyForm);
      window.setTimeout(() => setOpen(false), 2800);
    } catch (err) {
      setSubmitError(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Escape key & scroll lock
  useEffect(() => {
    if (!open) return undefined;
    const onEsc = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    window.addEventListener('keydown', onEsc);
    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      window.removeEventListener('keydown', onEsc);
    };
  }, [open]);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="home-lead-popup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="home-lead-popup__panel"
              initial={{ opacity: 0, y: 36, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 26, scale: 0.95 }}
              transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <FloatingOrbs />

              <button
                type="button"
                className="home-lead-popup__close"
                onClick={() => setOpen(false)}
                aria-label="Close popup form"
              >
                <i className="fa-solid fa-xmark" aria-hidden />
              </button>

              <div className="home-lead-popup__media">
                <motion.img
                  src={leftImage}
                  alt="Branding showcase"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 15, ease: 'easeInOut', repeat: Infinity }}
                />
              </div>

              <div className="home-lead-popup__form-wrap">
                <motion.p
                  className="home-lead-popup__eyebrow"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08, duration: 0.44 }}
                >
                  Premium Branding Kit
                </motion.p>
                <motion.h2
                  className="home-lead-popup__title"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.14, duration: 0.44 }}
                >
                  Let&apos;s Build Something Powerful
                </motion.h2>
                <motion.p
                  className="home-lead-popup__sub"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.44 }}
                >
                  Share your idea and our team will connect with you quickly.
                </motion.p>

                <form className="home-lead-popup__form" onSubmit={handleSubmit} noValidate>
                  {submitError ? (
                    <div className="home-lead-popup__alert home-lead-popup__alert--error" role="alert">
                      {submitError}
                    </div>
                  ) : null}
                  {submitSuccess ? (
                    <div className="home-lead-popup__alert home-lead-popup__alert--success" role="status">
                      {submitSuccess}
                    </div>
                  ) : null}
                  
                  
                  <input
                    type="text"
                    name="full_name"
                    autoComplete="name"
                    placeholder="Full Name"
                    value={form.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    disabled={submitting}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    disabled={submitting}
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    disabled={submitting}
                    required
                  />
                  <textarea
                    name="message"
                    placeholder="Briefly describe your project..."
                    rows={4}
                    value={form.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    disabled={submitting}
                    required
                  />
                  <motion.button
                    type="submit"
                    className="home-lead-popup__submit"
                    disabled={submitting}
                    whileHover={submitting ? undefined : { scale: 1.02 }}
                    whileTap={submitting ? undefined : { scale: 0.98 }}
                  >
                    <span>{submitting ? 'Submitting…' : 'Submit Request'}</span>
                    {!submitting ? (
                      <motion.i
                        className="fa-solid fa-arrow-right"
                        aria-hidden
                        animate={{ x: [0, 6, 0] }}
                        transition={{ duration: 1.15, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    ) : null}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .home-lead-popup {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: grid;
          place-items: center;
          padding: max(18px, env(safe-area-inset-top, 0px)) max(18px, env(safe-area-inset-right, 0px))
            max(18px, env(safe-area-inset-bottom, 0px)) max(18px, env(safe-area-inset-left, 0px));
          background: radial-gradient(circle at 20% 20%, rgba(255, 136, 56, 0.16), transparent 46%),
            rgba(3, 8, 15, 0.78);
          backdrop-filter: blur(7px);
          -webkit-backdrop-filter: blur(7px);
        }

        .home-lead-popup__panel {
          width: min(1040px, 100%);
          max-height: calc(100dvh - 12px);
          overflow: hidden;
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          border-radius: 24px;
          position: relative;
          border: 1px solid rgba(255, 255, 255, 0.16);
          background: linear-gradient(140deg, rgba(16, 22, 33, 0.98), rgba(18, 25, 38, 0.94));
          box-shadow: 0 40px 95px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.06);
        }

        .home-lead-popup__orb {
          position: absolute;
          border-radius: 999px;
          pointer-events: none;
          filter: blur(8px);
          opacity: 0.4;
        }

        .home-lead-popup__orb--one {
          width: 180px;
          height: 180px;
          right: -40px;
          top: -40px;
          background: radial-gradient(circle, rgba(255, 133, 50, 0.62), transparent 70%);
        }

        .home-lead-popup__orb--two {
          width: 140px;
          height: 140px;
          left: 40%;
          bottom: -50px;
          background: radial-gradient(circle, rgba(61, 196, 130, 0.56), transparent 70%);
        }

        .home-lead-popup__orb--three {
          width: 110px;
          height: 110px;
          right: 35%;
          top: 45%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.38), transparent 70%);
        }

        .home-lead-popup__close {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 38px;
          height: 38px;
          border: 0;
          border-radius: 10px;
          color: #fff;
          display: grid;
          place-items: center;
          background: rgba(255, 107, 26, 0.94);
          box-shadow: 0 10px 24px rgba(255, 107, 26, 0.4);
          z-index: 2;
          transition: transform 0.26s ease, filter 0.26s ease;
        }

        .home-lead-popup__close:hover {
          transform: translateY(-2px);
          filter: saturate(1.08);
        }

        .home-lead-popup__media {
          position: relative;
          min-height: 100%;
          overflow: hidden;
        }

        .home-lead-popup__media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .home-lead-popup__media-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(6, 11, 19, 0.14), rgba(6, 11, 19, 0.8));
        }

        .home-lead-popup__media-copy {
          position: absolute;
          left: 22px;
          right: 22px;
          bottom: 22px;
          z-index: 1;
        }

        .home-lead-popup__media-copy small {
          display: inline-block;
          margin-bottom: 8px;
          color: #ffbf8e;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-weight: 600;
        }

        .home-lead-popup__media-copy h3 {
          margin: 0;
          color: #fff;
          font-size: clamp(1.35rem, 2.1vw, 2rem);
          line-height: 1.28;
          font-weight: 700;
          max-width: 16ch;
        }

        .home-lead-popup__form-wrap {
          padding: 30px 24px 14px;
          position: relative;
          z-index: 1;
        }

        .home-lead-popup__eyebrow {
          margin: 0 0 6px;
          color: #ff9b58;
          font-size: 0.78rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 700;
        }

        .home-lead-popup__title {
          margin: 0;
          color: #fff;
          font-size: clamp(1.55rem, 2.5vw, 2.35rem);
          line-height: 1.2;
          font-weight: 800;
        }

        .home-lead-popup__sub {
          margin: 10px 0 18px;
          color: rgba(255, 255, 255, 0.78);
          font-size: 0.95rem;
          line-height: 1.6;
          max-width: 48ch;
        }

        .home-lead-popup__alert {
          padding: 10px 12px;
          border-radius: 10px;
          font-size: 0.88rem;
          line-height: 1.45;
        }
        .home-lead-popup__alert--error {
          background: rgba(255, 80, 80, 0.12);
          border: 1px solid rgba(255, 140, 120, 0.35);
          color: #ffc9c9;
        }
        .home-lead-popup__alert--success {
          background: rgba(72, 196, 130, 0.14);
          border: 1px solid rgba(100, 210, 150, 0.45);
          color: #c8f5dc;
        }
        .home-lead-popup__alert--saving {
          background: rgba(250, 176, 5, 0.12);
          border: 1px solid rgba(250, 176, 5, 0.35);
          color: #ffe7a5;
        }
        .home-lead-popup__alert--saved {
          background: rgba(72, 196, 130, 0.14);
          border: 1px solid rgba(100, 210, 150, 0.45);
          color: #c8f5dc;
        }

        .home-lead-popup__form {
          display: grid;
          gap: 11px;
        }

        .home-lead-popup__form input,
        .home-lead-popup__form textarea {
          width: 100%;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(255, 255, 255, 0.06);
          color: #fff;
          padding: 13px 14px;
          outline: none;
          transition: border-color 0.24s ease, box-shadow 0.24s ease, background-color 0.24s ease;
        }
        .home-lead-popup__form input:disabled,
        .home-lead-popup__form textarea:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .home-lead-popup__form input::placeholder,
        .home-lead-popup__form textarea::placeholder {
          color: rgba(255, 255, 255, 0.58);
        }

        .home-lead-popup__form input:focus,
        .home-lead-popup__form textarea:focus {
          border-color: rgba(255, 137, 62, 0.85);
          background: rgba(255, 255, 255, 0.09);
          box-shadow: 0 0 0 3px rgba(255, 122, 40, 0.18);
        }

        .home-lead-popup__form textarea {
          min-height: 96px;
          resize: vertical;
        }

        .home-lead-popup__submit {
          margin-top: 0;
          border: 0;
          border-radius: 12px;
          min-height: 52px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
          color: #fff;
          font-size: 1rem;
          font-weight: 700;
          background: linear-gradient(135deg, #ff6b1a, #ff8d3e 58%, #f46f1f);
          box-shadow: 0 16px 34px rgba(255, 107, 26, 0.45);
          transition: box-shadow 0.32s ease, filter 0.32s ease;
        }

        .home-lead-popup__submit:hover:not(:disabled) {
          box-shadow: 0 20px 40px rgba(255, 107, 26, 0.55);
          filter: saturate(1.04);
        }
        .home-lead-popup__submit:disabled {
          opacity: 0.75;
          cursor: not-allowed;
          filter: grayscale(0.08);
        }

        @media (max-width: 920px) {
          .home-lead-popup__panel {
            grid-template-columns: 1fr;
            max-width: 640px;
          }

          .home-lead-popup__media {
            height: 260px;
          }

          .home-lead-popup__media-copy h3 {
            max-width: 24ch;
          }
        }

        @media (max-width: 560px) {
          .home-lead-popup {
            padding: max(10px, env(safe-area-inset-top, 0px))
              max(10px, env(safe-area-inset-right, 0px))
              max(10px, env(safe-area-inset-bottom, 0px))
              max(10px, env(safe-area-inset-left, 0px));
          }

          .home-lead-popup__panel {
            grid-template-columns: 1fr;
            border-radius: 16px;
          }

          .home-lead-popup__media {
            display: none;
          }

          .home-lead-popup__form-wrap {
            padding: 22px 14px 10px;
          }

          .home-lead-popup__title {
            font-size: clamp(1.35rem, 7vw, 1.8rem);
          }

          .home-lead-popup__form input,
          .home-lead-popup__form textarea {
            font-size: 16px;
          }
        }
      `}</style>
    </>
  );
}