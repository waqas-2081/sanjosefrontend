import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import styles from './AuthPanel.module.css';
import AuthBackHome from './AuthBackHome';
import LoginForm from './LoginForm';
import ForgotPasswordForm from './ForgotPasswordForm';

const LOGIN_HERO_IMAGE = '/assets/images/login.png';

const BRAND_POINTS = [
  'Professional logo & brand identity design',
  'Custom website design & development',
  'Track projects in your secure client portal',
];

export default function AuthPanel({ onLogin }) {
  const [view, setView] = useState('login');

  return (
    <section className={`${styles.surface} ${styles.splitPage}`} aria-label="Sign in">
      <AuthBackHome />

      <div className={styles.premiumShell}>
        <div className={styles.premiumCard}>
          <div className={styles.brandPane}>
            <div
              className={styles.brandPaneBg}
              style={{ backgroundImage: `url(${LOGIN_HERO_IMAGE})` }}
              aria-hidden="true"
            />
            <div className={styles.brandPaneOverlay} aria-hidden="true" />

            <div className={styles.brandPaneContent}>
              <div className={styles.brandIntro}>
                <Link to="/" className={styles.brandPaneLogo}>
                  <img
                    src="/assets/images/logo/logo-white.png"
                    alt="San Jose Logo Design"
                    className={styles.brandPaneLogoImg}
                  />
                </Link>

                <ul className={styles.brandPoints}>
                  {BRAND_POINTS.map((point) => (
                    <li key={point} className={styles.brandPoint}>
                      <span className={styles.brandPointMark} aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className={styles.formPane}>
            <span className={styles.formEyebrow}>
              <span className={styles.formEyebrowDot} aria-hidden="true" />
              {view === 'login' ? 'Welcome back' : 'Reset password'}
            </span>

            <AnimatePresence mode="wait">
              {view === 'login' ? (
                <LoginForm
                  key="login"
                  onSubmit={onLogin}
                  onForgotClick={() => setView('forgot')}
                />
              ) : (
                <ForgotPasswordForm
                  key="forgot"
                  onBackToLogin={() => setView('login')}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
