import { useEffect, useState } from 'react';
import { fetchPortfolios } from '../lib/portfolioApi';

export function usePortfolioByCategory(category) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(Boolean(category));
  const [error, setError] = useState('');

  useEffect(() => {
    if (!category) {
      setItems([]);
      setLoading(false);
      setError('');
      return undefined;
    }

    let cancelled = false;

    async function load() {
      setLoading(true);
      setError('');
      try {
        const list = await fetchPortfolios(category);
        if (!cancelled) setItems(list);
      } catch (e) {
        if (!cancelled) {
          setError(e.message || 'Unable to load portfolio right now.');
          setItems([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [category]);

  return { items, loading, error };
}
