import { useEffect, useRef, useState } from 'react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useAuth } from '../../context/AuthContext';
import styles from '../../components/dashboard/DashboardUI.module.css';

const API_BASE        = 'https://admin.sanjoselogodesign.com/api';
const AVATAR_MAX_BYTES = 2 * 1024 * 1024;
const AVATAR_ACCEPT    = 'image/jpeg,image/png,image/webp';

function getInitials(name) {
  const parts = String(name || '').trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return 'U';
  return parts.map((w) => w[0]).join('').slice(0, 2).toUpperCase();
}

const CameraIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M4 8h3l2-3h6l2 3h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
    <circle cx="12" cy="14" r="3.25" stroke="currentColor" strokeWidth="1.75" />
  </svg>
);

const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.75" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M3 3l18 18M10.58 10.58A3 3 0 0 0 12 15a3 3 0 0 0 2.42-4.42M9.88 4.24A10.94 10.94 0 0 1 12 4c6.5 0 10 8 10 8a18.82 18.82 0 0 1-4.12 5.12M6.12 6.12A18.73 18.73 0 0 0 2 12s3.5 7 10 7a10.9 10.9 0 0 0 4.24-.88" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
  </svg>
);

const LockIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.75" />
    <path d="M8 11V8a4 4 0 1 1 8 0v3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
  </svg>
);

function PasswordField({ id, label, value, onChange, error, autoComplete, placeholder }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>{label}</label>
      <div className={styles.passwordInputWrap}>
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          className={`${styles.input} ${styles.passwordInput}${error ? ` ${styles.inputError}` : ''}`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
        <button type="button" className={styles.passwordReveal} onClick={() => setVisible((v) => !v)} aria-label={visible ? 'Hide' : 'Show'}>
          {visible ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
      {error && <p className={styles.fieldError} role="alert">{error}</p>}
    </div>
  );
}

const initialPasswordForm = { current_password: '', password: '', password_confirmation: '' };

function validatePasswordForm({ current_password, password, password_confirmation }) {
  const errors = {};
  if (!current_password) errors.current_password = 'Enter your current password';
  if (!password) errors.password = 'Enter a new password';
  else if (password.length < 8) errors.password = 'Password must be at least 8 characters';
  if (!password_confirmation) errors.password_confirmation = 'Confirm your new password';
  else if (password !== password_confirmation) errors.password_confirmation = 'Passwords do not match';
  if (password && current_password && password === current_password) errors.password = 'New password must be different';
  return errors;
}

export default function DashboardProfilePage() {
  useDocumentTitle('Update Profile | Client Dashboard');
  const { user, token, updateUser, authFetch } = useAuth();

  const [form, setForm] = useState({
    name:    user?.name    || '',
    email:   user?.email   || '',
    company: user?.company || '',
    phone:   user?.phone   || '',
  });

  // Keep form in sync if user loads after mount
  useEffect(() => {
    if (user) {
      setForm({
        name:    user.name    || '',
        email:   user.email   || '',
        company: user.company || '',
        phone:   user.phone   || '',
      });
    }
  }, [user?.id]);

  const [saved,        setSaved]        = useState(false);
  const [profileError, setProfileError] = useState('');
  const [loading,      setLoading]      = useState(false);

  // Avatar
  const [avatarFile,    setAvatarFile]    = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [removeAvatar,  setRemoveAvatar]  = useState(false);
  const [avatarError,   setAvatarError]   = useState('');
  const avatarInputRef = useRef(null);

  // Build current avatar URL from stored user
  const storedAvatarUrl = user?.avatar_path
    ? `${API_BASE.replace('/api', '')}/public/storage/${user.avatar_path}`
    : null;

  // Password
  const [passwordForm,    setPasswordForm]    = useState(initialPasswordForm);
  const [passwordErrors,  setPasswordErrors]  = useState({});
  const [passwordSaved,   setPasswordSaved]   = useState(false);
  const [passwordError,   setPasswordError]   = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Revoke blob URL on unmount
  useEffect(() => {
    return () => { if (avatarPreview?.startsWith('blob:')) URL.revokeObjectURL(avatarPreview); };
  }, [avatarPreview]);

  const setField = (key) => (e) => { setForm((f) => ({ ...f, [key]: e.target.value })); setSaved(false); setProfileError(''); };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (!AVATAR_ACCEPT.split(',').includes(file.type)) { setAvatarError('Please choose a JPG, PNG, or WebP image.'); return; }
    if (file.size > AVATAR_MAX_BYTES) { setAvatarError('Image must be 2 MB or smaller.'); return; }
    setAvatarError('');
    setAvatarFile(file);
    setRemoveAvatar(false);
    setSaved(false);
    setAvatarPreview((prev) => { if (prev?.startsWith('blob:')) URL.revokeObjectURL(prev); return URL.createObjectURL(file); });
  };

  const handleAvatarRemove = () => {
    setAvatarFile(null);
    setRemoveAvatar(true);
    setSaved(false);
    setAvatarPreview((prev) => { if (prev?.startsWith('blob:')) URL.revokeObjectURL(prev); return null; });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);
    setProfileError('');

    try {
      const fd = new FormData();
      fd.append('name',    form.name);
      fd.append('email',   form.email);
      fd.append('company', form.company);
      fd.append('phone',   form.phone);
      if (avatarFile)   fd.append('avatar', avatarFile);
      if (removeAvatar) fd.append('remove_avatar', '1');

      const res  = await authFetch('/auth/profile', { method: 'POST', body: fd });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.message || 'Could not save profile.');

      const updated = data.user || data.data || data;
      updateUser(updated);
      setAvatarFile(null);
      setRemoveAvatar(false);
      setSaved(true);
    } catch (err) {
      setProfileError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const setPasswordField = (key) => (e) => {
    setPasswordForm((f) => ({ ...f, [key]: e.target.value }));
    setPasswordErrors((errs) => ({ ...errs, [key]: undefined }));
    setPasswordSaved(false);
    setPasswordError('');
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const errors = validatePasswordForm(passwordForm);
    if (Object.keys(errors).length) { setPasswordErrors(errors); return; }

    setPasswordLoading(true);
    setPasswordSaved(false);
    setPasswordError('');

    try {
      const res  = await authFetch('/auth/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(passwordForm),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.message || 'Could not update password.');
      setPasswordForm(initialPasswordForm);
      setPasswordErrors({});
      setPasswordSaved(true);
    } catch (err) {
      setPasswordError(err.message || 'Something went wrong.');
    } finally {
      setPasswordLoading(false);
    }
  };

  const displayAvatar = avatarPreview || storedAvatarUrl;

  return (
    <div className={`${styles.page} ${styles.profilePageStack}`}>
      <section className={`${styles.panel} ${styles.profilePanel}`}>
        <div className={styles.profileHero}>
          <div className={styles.profileAvatarBlock}>
            <button
              type="button"
              className={styles.profileAvatarBtn}
              onClick={() => avatarInputRef.current?.click()}
              aria-label="Change profile photo"
            >
              {displayAvatar ? (
                <img src={displayAvatar} alt="" className={styles.profileAvatarImg} />
              ) : (
                <span className={styles.profileAvatar}>{getInitials(form.name)}</span>
              )}
              <span className={styles.profileAvatarEditBadge} aria-hidden="true"><CameraIcon /></span>
            </button>
            <input
              ref={avatarInputRef}
              type="file"
              className={styles.profileAvatarInput}
              accept={AVATAR_ACCEPT}
              onChange={handleAvatarChange}
              tabIndex={-1}
              aria-hidden="true"
            />
            {console.log(user)}
            <div className={styles.profilePhotoActions}>
              <button type="button" className={styles.profilePhotoLink} onClick={() => avatarInputRef.current?.click()}>
                {displayAvatar ? 'Change photo' : 'Upload photo'}
              </button>
              {displayAvatar && (
                <button type="button" className={styles.profilePhotoLinkMuted} onClick={handleAvatarRemove}>Remove</button>
              )}
            </div>
            {avatarError && <p className={styles.profileAvatarError} role="alert">{avatarError}</p>}
          </div>
          <div className={styles.profileHeroText}>
            <h2 className={styles.profileName}>{form.name || 'Your Name'}</h2>
            {user?.email && <p className={styles.profileMeta}>{user.email}</p>}
          </div>
        </div>

        <form className={styles.profileForm} onSubmit={handleSubmit}>
          {saved && <div className={styles.alertSuccess} role="status">Profile updated successfully.</div>}
          {profileError && <div className={styles.alertError} role="alert">{profileError}</div>}

          <div className={styles.profileGrid}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="profile-name">Full name</label>
              <input id="profile-name" className={styles.input} value={form.name} onChange={setField('name')} autoComplete="name" />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="profile-email">Email</label>
              <input id="profile-email" type="email" className={styles.input} value={form.email} onChange={setField('email')} autoComplete="email" />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="profile-company">Company</label>
              <input id="profile-company" className={styles.input} value={form.company} onChange={setField('company')} autoComplete="organization" />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="profile-phone">Phone</label>
              <input id="profile-phone" type="tel" className={styles.input} value={form.phone} onChange={setField('phone')} autoComplete="tel" />
            </div>
          </div>

          <div className={styles.profileActions}>
            <button type="submit" className={styles.btnPrimary} disabled={loading}>
              {loading ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        </form>
      </section>

      <section className={`${styles.panel} ${styles.passwordPanel}`} aria-labelledby="change-password-heading">
        <div className={styles.passwordSectionHead}>
          <span className={styles.passwordSectionIcon} aria-hidden="true"><LockIcon /></span>
          <div className={styles.passwordSectionCopy}>
            <h2 id="change-password-heading" className={styles.passwordSectionTitle}>Change password</h2>
            <p className={styles.passwordSectionLead}>Use a strong password you do not use anywhere else.</p>
          </div>
        </div>

        <form className={styles.passwordForm} onSubmit={handlePasswordSubmit}>
          {passwordSaved && <div className={styles.alertSuccess} role="status">Your password has been updated successfully.</div>}
          {passwordError && <div className={styles.alertError} role="alert">{passwordError}</div>}

          <PasswordField
            id="pw-current"
            label="Current password"
            value={passwordForm.current_password}
            onChange={setPasswordField('current_password')}
            error={passwordErrors.current_password}
            autoComplete="current-password"
            placeholder="Enter current password"
          />
          <PasswordField
            id="pw-new"
            label="New password"
            value={passwordForm.password}
            onChange={setPasswordField('password')}
            error={passwordErrors.password}
            autoComplete="new-password"
            placeholder="At least 8 characters"
          />
          <PasswordField
            id="pw-confirm"
            label="Confirm new password"
            value={passwordForm.password_confirmation}
            onChange={setPasswordField('password_confirmation')}
            error={passwordErrors.password_confirmation}
            autoComplete="new-password"
            placeholder="Repeat new password"
          />

          <div className={styles.profileActions}>
            <button type="submit" className={styles.btnPrimary} disabled={passwordLoading}>
              {passwordLoading ? 'Updating…' : 'Update password'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}