import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { postBlogLead } from '../../api/blogLeadApi';
import { useClientIp } from '../../hooks/useClientIp';

const OPEN_DELAY_MS = 10000;

const emptyForm = {
  name: '',
  email: '',
  phone: '',
};

export default function BlogLeadPopup() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const timerRef = useRef(null);
  const clientIp = useClientIp();

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    timerRef.current = window.setTimeout(() => setOpen(true), OPEN_DELAY_MS);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onEsc = (e) => {
      if (e.key === 'Escape') close();
    };
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    window.addEventListener('keydown', onEsc);
    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
      window.removeEventListener('keydown', onEsc);
    };
  }, [open, close]);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();

    if (!name || !email || !phone) {
      setError('Please fill in all fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await postBlogLead({
        name,
        email,
        phone_number: phone,
        ip_address: clientIp || undefined,
      });
      setSubmitting(false);
      setSuccess(true);
      setForm(emptyForm);
      window.setTimeout(() => close(), 1800);
    } catch (err) {
      setSubmitting(false);
      setError(err.message || 'Unable to submit right now. Please try again.');
    }
  };

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.div
            className="blog-lead-popup"
            role="dialog"
            aria-modal="true"
            aria-labelledby="blog-lead-popup-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
          >
            <motion.div
              className="blog-lead-popup__panel"
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.97 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="blog-lead-popup__glow blog-lead-popup__glow--a" aria-hidden />
              <span className="blog-lead-popup__glow blog-lead-popup__glow--b" aria-hidden />

              <button
                type="button"
                className="blog-lead-popup__close"
                onClick={close}
                aria-label="Close"
              >
                <i className="fa-solid fa-xmark" aria-hidden />
              </button>

              {success ? (
                <motion.div
                  className="blog-lead-popup__success"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="blog-lead-popup__success-icon" aria-hidden>
                    ✓
                  </div>
                  <h2>You&apos;re on the list</h2>
                  <p>Thanks — our team will reach out shortly with next steps.</p>
                </motion.div>
              ) : (
                <>
                  <motion.p
                    className="blog-lead-popup__eyebrow"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06, duration: 0.4 }}
                  >
                    Free design consult
                  </motion.p>
                  <motion.h2
                    id="blog-lead-popup-title"
                    className="blog-lead-popup__title"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12, duration: 0.4 }}
                  >
                    Liked this article? Let's put it to work.
                  </motion.h2>
                  <motion.p
                    className="blog-lead-popup__sub"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18, duration: 0.4 }}
                  >
                    Drop your details and we&apos;ll share a quick branding plan tailored to your
                    business — no obligation.
                  </motion.p>

                  <motion.form
                    className="blog-lead-popup__form"
                    onSubmit={handleSubmit}
                    noValidate
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.24, duration: 0.4 }}
                  >
                    {error ? (
                      <div className="blog-lead-popup__alert" role="alert">
                        {error}
                      </div>
                    ) : null}

                    <label className="blog-lead-popup__field">
                      <span>Name</span>
                      <input
                        type="text"
                        name="name"
                        autoComplete="name"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        disabled={submitting}
                        required
                      />
                    </label>

                    <label className="blog-lead-popup__field">
                      <span>Email</span>
                      <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        placeholder="you@company.com"
                        value={form.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        disabled={submitting}
                        required
                      />
                    </label>

                    <label className="blog-lead-popup__field">
                      <span>Phone Number</span>
                      <input
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        placeholder="(555) 000-0000"
                        value={form.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        disabled={submitting}
                        required
                      />
                    </label>

                    <button
                      type="submit"
                      className="blog-lead-popup__submit"
                      disabled={submitting}
                    >
                      {submitting ? 'Sending…' : (
                        <>
                          Submit Request <span aria-hidden>→</span>
                        </>
                      )}
                    </button>

                    <p className="blog-lead-popup__fineprint">
                      We respect your inbox. No spam — just useful next steps.
                    </p>
                  </motion.form>
                </>
              )}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <style>{`
        .blog-lead-popup {
          position: fixed;
          inset: 0;
          z-index: 10050;
          display: grid;
          place-items: center;
          padding: 20px;
          background: rgba(8, 12, 22, 0.72);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .blog-lead-popup__panel {
          position: relative;
          width: min(580px, 100%);
          overflow: hidden;
          border-radius: 22px;
          padding: 36px 36px 32px;
          color: #f8fafc;
          background:
            radial-gradient(120% 90% at 0% 0%, rgba(245, 158, 11, 0.16), transparent 55%),
            radial-gradient(100% 80% at 100% 100%, rgba(56, 189, 248, 0.1), transparent 50%),
            linear-gradient(160deg, #0f172a 0%, #111827 48%, #0b1220 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow:
            0 28px 80px rgba(0, 0, 0, 0.45),
            0 0 0 1px rgba(245, 158, 11, 0.08) inset;
        }

        .blog-lead-popup__glow {
          position: absolute;
          border-radius: 999px;
          filter: blur(40px);
          pointer-events: none;
          opacity: 0.55;
        }

        .blog-lead-popup__glow--a {
          width: 160px;
          height: 160px;
          top: -60px;
          right: -40px;
          background: rgba(249, 115, 22, 0.35);
        }

        .blog-lead-popup__glow--b {
          width: 140px;
          height: 140px;
          bottom: -50px;
          left: -30px;
          background: rgba(14, 165, 233, 0.25);
        }

        .blog-lead-popup__close {
          position: absolute;
          top: 14px;
          right: 14px;
          z-index: 2;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.06);
          color: #e2e8f0;
          display: grid;
          place-items: center;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.2s ease;
        }

        .blog-lead-popup__close:hover {
          background: rgba(255, 255, 255, 0.12);
          transform: scale(1.04);
        }

        .blog-lead-popup__eyebrow {
          margin: 0 0 10px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #fbbf24;
        }

        .blog-lead-popup__title {
          margin: 0 0 10px;
          font-size: clamp(1.45rem, 3.4vw, 1.85rem);
          line-height: 1.2;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #fff;
        }

        .blog-lead-popup__sub {
          margin: 0 0 22px;
          font-size: 0.95rem;
          line-height: 1.55;
          color: rgba(226, 232, 240, 0.78);
        }

        .blog-lead-popup__form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .blog-lead-popup__field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin: 0;
        }

        .blog-lead-popup__field span {
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: rgba(226, 232, 240, 0.72);
        }

        .blog-lead-popup__field input {
          width: 100%;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(15, 23, 42, 0.65);
          color: #f8fafc;
          padding: 12px 14px;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }

        .blog-lead-popup__field input::placeholder {
          color: rgba(148, 163, 184, 0.75);
        }

        .blog-lead-popup__field input:focus {
          border-color: rgba(251, 191, 36, 0.55);
          box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.15);
          background: rgba(15, 23, 42, 0.9);
        }

        .blog-lead-popup__alert {
          border-radius: 10px;
          padding: 10px 12px;
          font-size: 0.88rem;
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(248, 113, 113, 0.35);
          color: #fecaca;
        }

        .blog-lead-popup__submit {
          margin-top: 4px;
          width: 100%;
          min-height: 52px;
          border: none;
          border-radius: 14px;
          cursor: pointer;
          font-weight: 700;
          font-size: 1rem;
          color: #ffffff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: linear-gradient(180deg, #ff9a3c 0%, #f97316 55%, #ea580c 100%);
          box-shadow: 0 12px 28px rgba(249, 115, 22, 0.35);
          transition: transform 0.2s ease, filter 0.2s ease, opacity 0.2s ease;
        }

        .blog-lead-popup__submit:hover:not(:disabled) {
          transform: translateY(-1px);
          filter: brightness(1.06);
        }

        .blog-lead-popup__submit:disabled {
          opacity: 0.7;
          cursor: wait;
        }

        .blog-lead-popup__fineprint {
          margin: 2px 0 0;
          text-align: center;
          font-size: 0.75rem;
          color: rgba(148, 163, 184, 0.85);
        }

        .blog-lead-popup__success {
          text-align: center;
          padding: 28px 8px 18px;
        }

        .blog-lead-popup__success-icon {
          width: 64px;
          height: 64px;
          margin: 0 auto 16px;
          border-radius: 999px;
          display: grid;
          place-items: center;
          font-size: 1.6rem;
          font-weight: 700;
          color: #fff;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          box-shadow: 0 12px 28px rgba(34, 197, 94, 0.35);
        }

        .blog-lead-popup__success h2 {
          margin: 0 0 8px;
          font-size: 1.55rem;
          font-weight: 800;
          color: #fff;
        }

        .blog-lead-popup__success p {
          margin: 0;
          color: rgba(226, 232, 240, 0.78);
          line-height: 1.5;
        }

        @media (max-width: 480px) {
          .blog-lead-popup {
            padding: 12px;
            align-items: flex-end;
          }

          .blog-lead-popup__panel {
            width: 100%;
            border-radius: 20px 20px 16px 16px;
            padding: 28px 20px 22px;
          }
        }
      `}</style>
    </>
  );
}