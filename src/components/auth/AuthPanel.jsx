import styles from './AuthPanel.module.css';
import LoginForm from './LoginForm';

export default function AuthPanel({ onLogin }) {
  return (
    <section className={`${styles.surface} ${styles.page}`} aria-label="Sign in">
      <div className={styles.shell}>
        <div className={styles.card}>
          <LoginForm onSubmit={onLogin} />
        </div>
      </div>
    </section>
  );
}
