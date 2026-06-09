import styles from './AuthPanel.module.css';
import AuthBackHome from './AuthBackHome';
import ResetPasswordForm from './ResetPasswordForm';

export default function ResetPasswordPanel({ token, email, onSubmit }) {
  return (
    <section className={`${styles.surface} ${styles.page}`} aria-label="Reset password">
      <AuthBackHome />
      <div className={styles.shell}>
        <div className={styles.card}>
          <ResetPasswordForm token={token} email={email} onSubmit={onSubmit} />
        </div>
      </div>
    </section>
  );
}
