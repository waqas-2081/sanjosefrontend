import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './AuthPanel.module.css';
import TextField from './TextField';
import { requestPasswordReset } from '../../api/authApi';

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

function validateEmail(email) {
  if (!email.trim()) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return 'Enter a valid email';
  return undefined;
}

const formVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: 16, transition: { duration: 0.2 } },
};

export default function ForgotPasswordForm({ onSubmit, disabled = false }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError(undefined);
    setStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextError = validateEmail(email);
    if (nextError) {
      setError(nextError);
      return;
    }

    setIsLoading(true);
    setStatus(null);
    try {
      if (onSubmit) {
        await onSubmit(email.trim());
      } else {
        await requestPasswordReset(email.trim());
      }
      setSent(true);
    } catch (err) {
      setStatus({
        type: 'error',
        message: err?.message || 'Could not send reset link. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const busy = disabled || isLoading;

  if (sent) {
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
          <h2 className={styles.formTitle}>Check your inbox</h2>
          <p className={styles.formLead}>
            If an account exists for <strong>{email.trim()}</strong>, we sent a password reset link.
            The email may take a few minutes to arrive — check spam if you do not see it.
          </p>
          <button
            type="button"
            className={styles.submit}
            onClick={() => {
              setSent(false);
              setEmail('');
            }}
          >
            <span className={styles.submitContent}>Send again</span>
          </button>
          <p className={styles.footerNote}>
            <Link to="/login" className={styles.linkBtn}>
              Back to sign in
            </Link>
          </p>
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
      <h2 className={styles.formTitle}>Forgot password?</h2>
      <p className={styles.formLead}>
        Enter the email linked to your account and we will send you a link to reset your password.
      </p>

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
          id="forgot-email"
          name="email"
          label="Email address"
          type="email"
          value={email}
          onChange={handleChange}
          placeholder="you@company.com"
          autoComplete="email"
          error={error}
          disabled={busy}
          icon={<MailIcon />}
        />

        <button type="submit" className={styles.submit} disabled={busy} aria-busy={isLoading}>
          <span className={styles.submitContent}>
            {isLoading ? (
              <>
                <span className={styles.spinner} aria-hidden="true" />
                Sending link…
              </>
            ) : (
              'Send reset link'
            )}
          </span>
        </button>
      </form>

      <p className={styles.footerNote}>
        Remember your password?{' '}
        <Link to="/login" className={styles.linkBtn}>
          Back to sign in
        </Link>
      </p>
    </motion.div>
  );
}
