import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './AuthPanel.module.css';
import TextField from './TextField';
import PasswordField from './PasswordField';
import { resetPassword } from '../../api/authApi';

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.75" />
    <path d="m3 7 9 6 9-6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
  </svg>
);

const CheckIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.75" />
    <path
      d="M8 12.5 10.5 15 16 9.5"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const initialForm = { email: '', password: '', password_confirmation: '' };

function validate({ email, password, password_confirmation }) {
  const errors = {};
  if (!email.trim()) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = 'Enter a valid email';
  if (!password) errors.password = 'Password is required';
  else if (password.length < 8) errors.password = 'Password must be at least 8 characters';
  if (!password_confirmation) errors.password_confirmation = 'Please confirm your password';
  else if (password !== password_confirmation) {
    errors.password_confirmation = 'Passwords do not match';
  }
  return errors;
}

const formVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: 16, transition: { duration: 0.2 } },
};

export default function ResetPasswordForm({
  token = '',
  email: initialEmail = '',
  onSubmit,
  disabled = false,
}) {
  const linkValid = Boolean(token?.trim() && initialEmail?.trim());

  const [form, setForm] = useState({
    ...initialForm,
    email: initialEmail,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [done, setDone] = useState(false);

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
      const payload = {
        token: token.trim(),
        email: form.email.trim(),
        password: form.password,
        password_confirmation: form.password_confirmation,
      };
      if (onSubmit) {
        await onSubmit(payload);
      } else {
        await resetPassword(payload);
      }
      setDone(true);
    } catch (err) {
      setStatus({
        type: 'error',
        message: err?.message || 'Could not reset password. The link may have expired.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const busy = disabled || isLoading;
  const emailLocked = Boolean(initialEmail?.trim());

  if (!linkValid) {
    return (
      <motion.div
        className={styles.formPane}
        variants={formVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h2 className={styles.formTitle}>Invalid reset link</h2>
        <p className={styles.formLead}>
          This password reset link is missing required information or has expired. Request a new
          link to continue.
        </p>
        <Link to="/forgot-password" className={`${styles.submit} ${styles.submitLink}`}>
          <span className={styles.submitContent}>Request new link</span>
        </Link>
        <p className={styles.footerNote}>
          <Link to="/login" className={styles.linkBtn}>
            Back to sign in
          </Link>
        </p>
      </motion.div>
    );
  }

  if (done) {
    return (
      <motion.div
        className={styles.formPane}
        variants={formVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className={styles.successPane}>
          <div className={styles.successIcon} aria-hidden="true">
            <CheckIcon />
          </div>
          <h2 className={styles.formTitle}>Password updated</h2>
          <p className={styles.formLead}>
            Your password has been reset successfully. You can now sign in with your new password.
          </p>
          <Link to="/login" className={`${styles.submit} ${styles.submitLink}`}>
            <span className={styles.submitContent}>Sign in</span>
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={styles.formPane}
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h2 className={styles.formTitle}>Set new password</h2>
      <p className={styles.formLead}>Choose a strong password for your account.</p>

      {status ? (
        <div className={`${styles.alert} ${styles.alertError}`} role="status">
          {status.message}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} noValidate>
        <TextField
          id="reset-email"
          name="email"
          label="Email address"
          type="email"
          value={form.email}
          onChange={setField('email')}
          placeholder="you@company.com"
          autoComplete="email"
          error={errors.email}
          disabled={busy || emailLocked}
          icon={<MailIcon />}
        />

        <PasswordField
          id="reset-password"
          name="password"
          label="New password"
          value={form.password}
          onChange={setField('password')}
          placeholder="At least 8 characters"
          autoComplete="new-password"
          error={errors.password}
          disabled={busy}
        />

        <PasswordField
          id="reset-password-confirm"
          name="password_confirmation"
          label="Confirm new password"
          value={form.password_confirmation}
          onChange={setField('password_confirmation')}
          placeholder="Repeat your password"
          autoComplete="new-password"
          error={errors.password_confirmation}
          disabled={busy}
        />

        <button type="submit" className={styles.submit} disabled={busy} aria-busy={isLoading}>
          <span className={styles.submitContent}>
            {isLoading ? (
              <>
                <span className={styles.spinner} aria-hidden="true" />
                Updating…
              </>
            ) : (
              'Reset password'
            )}
          </span>
        </button>
      </form>

      <p className={styles.footerNote}>
        <Link to="/login" className={styles.linkBtn}>
          Back to sign in
        </Link>
      </p>
    </motion.div>
  );
}
