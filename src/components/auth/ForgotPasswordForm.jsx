import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './LoginForm.module.css';
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
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

export default function ForgotPasswordForm({ onSubmit, onBackToLogin, disabled = false }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleBackToLogin = () => {
    if (onBackToLogin) {
      onBackToLogin();
      return;
    }
    navigate('/login');
  };
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
        className={styles.loginForm}
        variants={formVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className={styles.successIcon} aria-hidden="true">
          <CheckIcon />
        </div>
        <h1 className={styles.title}>Check your inbox</h1>
        <p className={styles.lead}>
          If an account exists for <strong>{email.trim()}</strong>, we sent a password reset link.
          The email may take a few minutes to arrive — check spam if you do not see it.
        </p>
        <button
          type="button"
          className={styles.loginSubmit}
          onClick={() => {
            setSent(false);
            setEmail('');
          }}
        >
          <span className={styles.loginSubmitText}>Send again</span>
        </button>
        <p className={styles.footerNote}>
          <button type="button" className={styles.linkBtn} onClick={handleBackToLogin}>
            Back to sign in
          </button>
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={styles.loginForm}
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h1 className={styles.title}>Forgot password?</h1>
      <p className={styles.lead}>
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
          formStyles={styles}
        />

        <button type="submit" className={styles.loginSubmit} disabled={busy} aria-busy={isLoading}>
          <span className={styles.loginSubmitText}>
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
        <button type="button" className={styles.linkBtn} onClick={handleBackToLogin}>
          Back to sign in
        </button>
      </p>
    </motion.div>
  );
}
