import { useEffect, useRef, useState } from 'react';

let cachedIp = null;

/**
 * Returns the visitor's public IP address.
 * Fetched once per page load from api.ipify.org and cached in memory.
 */
export function useClientIp() {
  const [ip, setIp] = useState(cachedIp);
  const fetched = useRef(!!cachedIp);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    fetch('https://api.ipify.org?format=json')
      .then((r) => r.json())
      .then((d) => {
        cachedIp = d.ip || null;
        setIp(cachedIp);
      })
      .catch(() => {
        cachedIp = null;
      });
  }, []);

  return ip;
}