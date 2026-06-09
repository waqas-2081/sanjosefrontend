import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PackageCheckoutModal from '../components/checkout/PackageCheckoutModal';
import {
  normalizeCheckoutPackage,
  packageHashFromPackage,
  readLocationHash,
} from '../lib/packageHash';

const PackageCheckoutContext = createContext(null);

export function PackageCheckoutProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [serviceType, setServiceType] = useState('');
  const registryRef = useRef(new Map());

  const setUrlHash = useCallback(
    (hash, { replace = false } = {}) => {
      const nextHash = hash ? `#${hash}` : '';
      if (location.hash === nextHash) return;
      navigate(
        {
          pathname: location.pathname,
          search: location.search,
          hash: nextHash,
        },
        { replace },
      );
    },
    [location.hash, location.pathname, location.search, navigate],
  );

  const syncFromHash = useCallback(() => {
    const hash = readLocationHash();
    if (!hash) {
      setOpen(false);
      return;
    }

    const entry = registryRef.current.get(hash);
    if (!entry) return;

    setSelectedPackage(entry);
    setServiceType(entry.serviceType);
    setOpen(true);
  }, []);

  const registerPackages = useCallback(
    (svcType, packages) => {
      if (!Array.isArray(packages)) return;
      packages.forEach((pkg) => {
        const normalized = normalizeCheckoutPackage(pkg, svcType);
        if (!normalized.hash) return;
        registryRef.current.set(normalized.hash, normalized);
      });
      if (readLocationHash()) {
        syncFromHash();
      }
    },
    [syncFromHash],
  );

  const openCheckout = useCallback(
    (pkg, svcType = '') => {
      const normalized = normalizeCheckoutPackage(pkg, svcType);
      if (!normalized.hash) return;

      registryRef.current.set(normalized.hash, normalized);
      setSelectedPackage(normalized);
      setServiceType(normalized.serviceType);
      setOpen(true);
      setUrlHash(normalized.hash, { replace: false });
    },
    [setUrlHash],
  );

  const closeCheckout = useCallback(() => {
    setOpen(false);
    setUrlHash('', { replace: true });
  }, [setUrlHash]);

  const clearSelection = useCallback(() => {
    setSelectedPackage(null);
    setServiceType('');
  }, []);

  useEffect(() => {
    syncFromHash();
  }, [location.hash, syncFromHash]);

  useEffect(() => {
    const onHashChange = () => syncFromHash();
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [syncFromHash]);

  const value = useMemo(
    () => ({
      open,
      selectedPackage,
      serviceType,
      openCheckout,
      closeCheckout,
      clearSelection,
      registerPackages,
      packageHashFromPackage,
    }),
    [
      open,
      selectedPackage,
      serviceType,
      openCheckout,
      closeCheckout,
      clearSelection,
      registerPackages,
    ],
  );

  return (
    <PackageCheckoutContext.Provider value={value}>
      {children}
      <PackageCheckoutModal />
    </PackageCheckoutContext.Provider>
  );
}

export function usePackageCheckout() {
  const ctx = useContext(PackageCheckoutContext);
  if (!ctx) {
    throw new Error('usePackageCheckout must be used within PackageCheckoutProvider');
  }
  return ctx;
}
