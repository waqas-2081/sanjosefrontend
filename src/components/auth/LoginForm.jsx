import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './LoginForm.module.css';
import TextField from './TextField';
import PasswordField from './PasswordField';

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.75" />
    <path d="m3 7 9 6 9-6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
  </svg>
);

const initialForm = { email: '', password: '' };

function validate({ email, password }) {
  const errors = {};
  if (!email.trim()) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = 'Enter a valid email';
  if (!password) errors.password = 'Password is required';
  else if (password.length < 6) errors.password = 'Password must be at least 6 characters';
  return errors;
}

const formVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

export default function LoginForm({ onSubmit, onForgotClick, disabled = false }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const setField = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((err) => ({ ...err, [key]: undefined }));
    setStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate(form);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setIsLoading(true);
    setStatus(null);
    try {
      if (onSubmit) {
        await onSubmit({ ...form, remember });
      }
      setStatus({ type: 'success', message: 'Welcome back!' });
    } catch (err) {
      setStatus({
        type: 'error',
        message: err?.message || 'Sign in failed. Please check your credentials.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const busy = disabled || isLoading;

  return (
    <motion.div
      className={styles.loginForm}
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h1 className={styles.title}>Login your account</h1>
      <p className={styles.lead}>Enter your credentials to access your client dashboard.</p>

      {status ? (
        <div
          className={`${styles.alert} ${status.type === 'success' ? styles.alertSuccess : styles.alertError}`}
          role="status"
        >
          {status.message}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} noValidate>
        <TextField
          id="login-email"
          name="email"
          label="Email address"
          type="email"
          value={form.email}
          onChange={setField('email')}
          placeholder="you@company.com"
          autoComplete="email"
          error={errors.email}
          disabled={busy}
          icon={<MailIcon />}
          formStyles={styles}
        />

        <PasswordField
          id="login-password"
          name="password"
          label="Password"
          value={form.password}
          onChange={setField('password')}
          placeholder="Your password"
          autoComplete="current-password"
          error={errors.password}
          disabled={busy}
          formStyles={styles}
          showLockIcon
        />

        <div className={styles.row}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              disabled={busy}
            />
            Remember me
          </label>
          <button type="button" className={styles.forgotLink} onClick={onForgotClick}>
            Forgot Password?
          </button>
        </div>

        <button type="submit" className={styles.loginSubmit} disabled={busy} aria-busy={isLoading}>
          <span className={styles.loginSubmitText}>
            {isLoading ? (
              <>
                <span className={styles.spinner} aria-hidden="true" />
                Signing in…
              </>
            ) : (
              'Login'
            )}
          </span>
        </button>

        <p className={styles.footerNote}>
          Need help?{' '}
          <Link to="/contact-us" className={styles.linkBtn}>
            Contact support
          </Link>
        </p>

      </form>
    </motion.div>
  );
}
