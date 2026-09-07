import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  DEFAULT_SITE_SETTINGS,
  fetchSiteSettings,
  toTelHref,
} from '../api/siteSettingsApi';

const SiteSettingsContext = createContext(null);

export function SiteSettingsProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULT_SITE_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const next = await fetchSiteSettings();
        if (!cancelled) {
          setSettings(next);
          setError('');
        }
      } catch (err) {
        if (!cancelled) {
          setError(err?.message || 'Unable to load site settings.');
          // Keep DEFAULT_SITE_SETTINGS so UI never breaks.
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(
    () => ({
      settings,
      loading,
      error,
      email: settings.email,
      phone: settings.phone,
      location: settings.location,
      popupImage: settings.popup_image,
      social: settings.social,
      phoneHref: toTelHref(settings.phone),
      emailHref: `mailto:${settings.email}`,
    }),
    [settings, loading, error]
  );

  return (
    <SiteSettingsContext.Provider value={value}>{children}</SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  const ctx = useContext(SiteSettingsContext);
  if (!ctx) {
    // Safe fallback if a component is rendered outside the provider.
    return {
      settings: DEFAULT_SITE_SETTINGS,
      loading: false,
      error: '',
      email: DEFAULT_SITE_SETTINGS.email,
      phone: DEFAULT_SITE_SETTINGS.phone,
      location: DEFAULT_SITE_SETTINGS.location,
      popupImage: DEFAULT_SITE_SETTINGS.popup_image,
      social: DEFAULT_SITE_SETTINGS.social,
      phoneHref: toTelHref(DEFAULT_SITE_SETTINGS.phone),
      emailHref: `mailto:${DEFAULT_SITE_SETTINGS.email}`,
    };
  }
  return ctx;
}
