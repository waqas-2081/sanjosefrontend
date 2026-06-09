import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { DASHBOARD_NAV, PAGE_META } from './dashboardNav';
import { useAuth } from '../../context/AuthContext';
import { IconHome, IconMenu } from './icons';
import styles from './DashboardLayout.module.css';

const MOTION_CLASSES = [
  'section-motion-target',
  'is-revealed',
  'section-motion-item',
  'section-motion-card',
  'section-motion-media',
  'section-motion-icon',
  'section-motion-button',
];

function stripScrollMotion(root) {
  if (!root) return;
  root.querySelectorAll('.section-motion-target').forEach((el) => {
    MOTION_CLASSES.forEach((cls) => el.classList.remove(cls));
    el.querySelectorAll('[class*="section-motion"]').forEach((node) => {
      MOTION_CLASSES.forEach((cls) => node.classList.remove(cls));
    });
  });
}

function getInitials(name) {
  const parts = String(name || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (!parts.length) return 'U';
  return parts.map((w) => w[0]).join('').slice(0, 2).toUpperCase();
}

export default function DashboardLayout() {
  const { pathname } = useLocation();
  const navigate     = useNavigate();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const scrollRef = useRef(null);

  const meta = PAGE_META[pathname] || { title: 'Dashboard', subtitle: '' };

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  useEffect(() => {
    closeSidebar();
  }, [pathname, closeSidebar]);

  /* Site scroll-motion runs before dashboard paints; strip it so forms stay visible */
  useLayoutEffect(() => {
    stripScrollMotion(scrollRef.current);
    const frame = requestAnimationFrame(() => stripScrollMotion(scrollRef.current));
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 992px)');
    const syncBodyScroll = () => {
      if (sidebarOpen) {
        document.body.style.overflow = 'hidden';
        return;
      }
      document.body.style.overflow = mq.matches ? 'hidden' : '';
    };
    syncBodyScroll();
    mq.addEventListener('change', syncBodyScroll);
    return () => {
      mq.removeEventListener('change', syncBodyScroll);
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // User display
  const displayName    = user?.name || 'Client';
  const avatarInitials = getInitials(displayName);
  const avatarUrl      = user?.avatar_path
    ? `https://admin.sanjoselogodesign.com/public/storage/${user.avatar_path}`
    : null;

  return (
    <div className={styles.root} data-no-motion="true">
      <button
        type="button"
        className={`${styles.overlay} ${sidebarOpen ? styles.overlayOpen : ''}`}
        aria-label="Close menu"
        onClick={closeSidebar}
      />

      <div className={styles.shell}>
        <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
          <Link to="/" className={styles.sidebarBrand} onClick={closeSidebar}>
            <img
              src="/assets/images/logo/logo-white.png"
              alt="San Jose Logo Design"
              className={styles.brandLogo}
            />
          </Link>

          <nav className={styles.nav} aria-label="Dashboard">
            {DASHBOARD_NAV.map((item, i) => {
              if (item.section) {
                return (
                  <span key={`sec-${item.section}-${i}`} className={styles.navLabel}>
                    {item.section}
                  </span>
                );
              }
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                  }
                  onClick={closeSidebar}
                >
                  <span className={styles.navIcon}>
                    <Icon />
                  </span>
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <div className={styles.sidebarFooter}>
            <Link to="/" className={styles.sidebarHomeBtn} onClick={closeSidebar}>
              <span className={styles.sidebarHomeIcon}>
                <IconHome />
              </span>
              Home
            </Link>
            <button
              type="button"
              className={styles.logoutBtn}
              onClick={handleLogout}
            >
              Sign out
            </button>
          </div>
        </aside>

        <div className={styles.main}>
          <header className={styles.topbar}>
            <button
              type="button"
              className={styles.menuBtn}
              aria-label="Open menu"
              onClick={() => setSidebarOpen(true)}
            >
              <IconMenu />
            </button>
            <h1 className={styles.pageTitle}>{meta.title}</h1>
            {meta.subtitle ? <p className={styles.pageSubtitle}>{meta.subtitle}</p> : null}
            <div className={styles.topbarRight}>
              <Link
                to="/"
                className={styles.homeBtn}
                onClick={closeSidebar}
                aria-label="Back to Home"
              >
                <span className={styles.homeBtnIcon}>
                  <IconHome />
                </span>
                <span className={styles.homeBtnText}>Back to Home</span>
              </Link>
              <Link to="/dashboard/profile" className={styles.userChip} onClick={closeSidebar}>
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={displayName}
                    className={styles.userAvatar}
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <span className={styles.userAvatar}>{avatarInitials}</span>
                )}
                <span className={styles.userName}>{displayName}</span>
              </Link>
            </div>
          </header>

          <main className={styles.content}>
            <div
              ref={scrollRef}
              className={styles.contentScroll}
              data-no-motion="true"
              data-dashboard-scroll="true"
            >
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}