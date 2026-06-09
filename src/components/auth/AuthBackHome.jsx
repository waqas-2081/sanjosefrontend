import { Link } from 'react-router-dom';
import styles from './AuthPanel.module.css';

function IconHome() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m4 10.5 8-5.5 8 5.5V19a1.5 1.5 0 0 1-1.5 1.5H15v-5.5h-6V20.5H5.5A1.5 1.5 0 0 1 4 19v-8.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AuthBackHome() {
  return (
    <div className={styles.backHomeWrap}>
      <Link to="/" className={styles.backHomeBtn} aria-label="Back to Home">
        <span className={styles.backHomeIcon}>
          <IconHome />
        </span>
        <span className={styles.backHomeText}>Back to Home</span>
        <span className={styles.backHomeTextShort}>Home</span>
      </Link>
    </div>
  );
}
