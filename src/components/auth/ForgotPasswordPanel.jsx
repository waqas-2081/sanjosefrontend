import styles from './AuthPanel.module.css';
import AuthBackHome from './AuthBackHome';
import ForgotPasswordForm from './ForgotPasswordForm';

export default function ForgotPasswordPanel({ onSubmit }) {
  return (
    <section className={`${styles.surface} ${styles.page}`} aria-label="Forgot password">
      <AuthBackHome />
      <div className={styles.shell}>
        <div className={styles.card}>
          <ForgotPasswordForm onSubmit={onSubmit} />
        </div>
      </div>
    </section>
  );
}
