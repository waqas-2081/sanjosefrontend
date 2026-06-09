import { useEffect } from 'react';
import styles from './DetailModal.module.css';

export function ModalField({ label, value, fullWidth = false }) {
  if (value === null || value === undefined || value === '') return null;
  return (
    <div className={`${styles.field} ${fullWidth ? styles.fieldFull : ''}`}>
      <span className={styles.fieldLabel}>{label}</span>
      <span className={styles.fieldValue}>{value}</span>
    </div>
  );
}

export function ModalSection({ title, children }) {
  return (
    <div className={styles.section}>
      {title && <h4 className={styles.sectionTitle}>{title}</h4>}
      <div className={styles.sectionBody}>{children}</div>
    </div>
  );
}

export default function DetailModal({ open, onClose, title, loading, error, children }) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handle = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className={styles.body}>
          {loading && (
            <div className={styles.loadState}>
              <span className={styles.spinner} />
              Loading details…
            </div>
          )}
          {!loading && error && (
            <div className={styles.errorState}>
              <i className="fa-solid fa-circle-exclamation" style={{ marginRight: '0.5rem' }} />
              {error}
            </div>
          )}
          {!loading && !error && children}
        </div>
      </div>
    </div>
  );
}