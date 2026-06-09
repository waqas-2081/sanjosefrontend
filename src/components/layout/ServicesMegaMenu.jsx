import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { SERVICES_NAV } from '../../data/servicesNav';
import styles from './ServicesMegaMenu.module.css';

/** Short grace period so cursor can cross trigger → panel without flicker */
const HOVER_CLOSE_MS = 100;

const ChevronIcon = () => (
  <svg className={styles.chevron} width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M5 12h14M13 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

function MobileServicesList({ onLinkClick }) {
  return (
    <ul className={styles.mobileList}>
      {SERVICES_NAV.map((service) => (
        <li key={service.id}>
          <Link to={service.path} className={styles.mobileLink} onClick={onLinkClick}>
            {service.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function MegaContent({ onLinkClick, className = '' }) {
  return (
    <div className={className}>
      <div className={styles.grid}>
        {SERVICES_NAV.map((service) => (
          <Link
            key={service.id}
            to={service.path}
            className={styles.card}
            onClick={onLinkClick}
          >
            <div className={styles.thumb}>
              <img src={service.image} alt="" loading="lazy" decoding="async" />
            </div>
            <div className={styles.cardBody}>
              <h4 className={styles.cardTitle}>{service.name}</h4>
              <p className={styles.cardDesc}>{service.description}</p>
              <span className={styles.cardArrow} aria-hidden="true">
                <ArrowIcon />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function ServicesMegaMenu({ open, onToggle, onClose }) {
  const menuId = useId();
  const triggerRef = useRef(null);
  const panelRef = useRef(null);
  const closeTimerRef = useRef(null);
  const isDesktop = useMediaQuery('(min-width: 992px)');
  const [hoverOpen, setHoverOpen] = useState(false);

  const isOpen = isDesktop ? hoverOpen : open;

  const cancelScheduledClose = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const openMenu = useCallback(() => {
    if (!isDesktop) return;
    cancelScheduledClose();
    setHoverOpen(true);
  }, [isDesktop, cancelScheduledClose]);

  const closeMenu = useCallback(() => {
    cancelScheduledClose();
    setHoverOpen(false);
    onClose?.();
  }, [onClose, cancelScheduledClose]);

  const scheduleClose = useCallback(() => {
    if (!isDesktop) return;
    cancelScheduledClose();
    closeTimerRef.current = setTimeout(() => {
      setHoverOpen(false);
      closeTimerRef.current = null;
    }, HOVER_CLOSE_MS);
  }, [isDesktop, cancelScheduledClose]);

  const getRelatedNode = useCallback((e) => {
    const target = e.relatedTarget ?? e.nativeEvent?.relatedTarget;
    return target instanceof Node ? target : null;
  }, []);

  const isMovingBetweenZones = useCallback((relatedTarget) => {
    if (!(relatedTarget instanceof Node)) return false;
    if (triggerRef.current?.contains(relatedTarget)) return true;
    if (panelRef.current?.contains(relatedTarget)) return true;
    return false;
  }, []);

  const handleTriggerLeave = useCallback(
    (e) => {
      if (!isDesktop) return;
      if (isMovingBetweenZones(getRelatedNode(e))) {
        cancelScheduledClose();
        return;
      }
      scheduleClose();
    },
    [isDesktop, isMovingBetweenZones, getRelatedNode, scheduleClose, cancelScheduledClose]
  );

  const handlePanelLeave = useCallback(
    (e) => {
      if (!isDesktop) return;
      if (isMovingBetweenZones(getRelatedNode(e))) {
        cancelScheduledClose();
        return;
      }
      scheduleClose();
    },
    [isDesktop, isMovingBetweenZones, getRelatedNode, scheduleClose, cancelScheduledClose]
  );

  const handleLinkClick = useCallback(() => {
    closeMenu();
  }, [closeMenu]);

  const handleTriggerClick = (e) => {
    if (!isDesktop) {
      e.preventDefault();
      onToggle?.();
    }
  };

  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeMenu();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, closeMenu]);

  useEffect(() => {
    if (!isDesktop) setHoverOpen(false);
  }, [isDesktop]);

  useEffect(() => {
    const header = document.querySelector('.main-header');
    if (!header || !isDesktop) return undefined;

    const syncTop = () => {
      const rect = header.getBoundingClientRect();
      document.documentElement.style.setProperty('--mega-top', `${rect.bottom}px`);
    };

    syncTop();
    window.addEventListener('resize', syncTop);
    window.addEventListener('scroll', syncTop, { passive: true });

    return () => {
      window.removeEventListener('resize', syncTop);
      window.removeEventListener('scroll', syncTop);
    };
  }, [isDesktop]);

  useEffect(() => () => cancelScheduledClose(), [cancelScheduledClose]);

  return (
    <li
      className={`has-mega-menu ${styles.wrap}${isOpen ? ` ${styles.isOpen}` : ''}${!isDesktop && open ? ' is-open' : ''}`}
    >
      {isDesktop ? (
        <>
          <button
            ref={triggerRef}
            type="button"
            className={`${styles.trigger} mega-menu-trigger`}
            aria-expanded={isOpen}
            aria-haspopup="true"
            aria-controls={menuId}
            onMouseEnter={openMenu}
            onMouseLeave={handleTriggerLeave}
            onFocus={openMenu}
          >
            Services
            <ChevronIcon />
          </button>

          <div
            ref={panelRef}
            id={menuId}
            className={`${styles.panel}${isOpen ? ` ${styles.panelOpen}` : ''}`}
            role="region"
            aria-label="Services menu"
            aria-hidden={!isOpen}
            onMouseEnter={openMenu}
            onMouseLeave={handlePanelLeave}
          >
            <span className={styles.hoverBridge} aria-hidden="true" />
            <div className={styles.panelInner}>
              <MegaContent onLinkClick={handleLinkClick} />
            </div>
          </div>
        </>
      ) : (
        <>
          <button
            type="button"
            className={`${styles.trigger} mega-menu-trigger`}
            aria-expanded={isOpen}
            aria-haspopup="true"
            aria-controls={menuId}
            onClick={handleTriggerClick}
          >
            Services
            <ChevronIcon />
          </button>
          <div
            id={menuId}
            className={`${styles.mobilePanel}${isOpen ? ` ${styles.mobilePanelOpen}` : ''}`}
            role="region"
            aria-label="Services menu"
            aria-hidden={!isOpen}
          >
            <div className={styles.mobilePanelCollapse}>
              <div className={styles.mobilePanelInner}>
                <MobileServicesList onLinkClick={handleLinkClick} />
              </div>
            </div>
          </div>
        </>
      )}
    </li>
  );
}
