import { useLayoutEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { mountLegacyWidgets, teardownLegacyWidgets } from '../../lib/legacyWidgets';
import { HomeLeadPopup } from '../sections/HomeLeadPopup';
import Footer from './Footer';
import Header from './Header';

export default function MainLayout() {
  const { pathname } = useLocation();
  const hideSiteFooter = pathname === '/logo-offer';
  const frameRef = useRef(null);

  useLayoutEffect(() => {
    teardownLegacyWidgets();
    frameRef.current = requestAnimationFrame(() => {
      mountLegacyWidgets();
    });
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      teardownLegacyWidgets();
    };
  }, [pathname]);

  return (
    <>
      <Header />
      <Outlet key={pathname} />
      <HomeLeadPopup autoOpenOnLoad={pathname === '/'} />
      {!hideSiteFooter ? <Footer /> : null}
    </>
  );
}
