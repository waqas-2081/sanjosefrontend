import styles from './AuthPanel.module.css';

export default function TextField({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  autoComplete,
  error,
  disabled = false,
  icon,
}) {
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <div className={styles.inputWrap}>
        {icon ? <span className={styles.inputIcon}>{icon}</span> : null}
        <input
          id={id}
          name={name}
          type={type}
          className={`${styles.input} ${!icon ? styles.inputNoIcon : ''} ${error ? styles.inputError : ''}`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
        />
      </div>
      {error ? (
        <p id={errorId} className={styles.fieldError} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
