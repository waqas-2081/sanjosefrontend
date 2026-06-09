import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * Authenticated API hook.
 * Usage: const { data, loading, error, refetch } = useApi('/dashboard/payments');
 */
export function useApi(path, { skip = false } = {}) {
  const { authFetch } = useAuth();
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(!skip);
  const [error,   setError]   = useState('');
  const abortRef = useRef(null);

  const fetch_ = useCallback(async () => {
    if (!path) return;
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    setLoading(true);
    setError('');

    try {
      const res  = await authFetch(path, { signal: ctrl.signal });
      const json = await res.json().catch(() => null);
      if (!res.ok) throw new Error(json?.message || `Request failed (${res.status})`);
      setData(json.data ?? json);
    } catch (err) {
      if (err.name !== 'AbortError') setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }, [path, authFetch]);

  useEffect(() => {
    if (!skip) fetch_();
    return () => abortRef.current?.abort();
  }, [fetch_, skip]);

  return { data, loading, error, refetch: fetch_ };
}