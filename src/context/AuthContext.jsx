import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const API_BASE = 'https://admin.sanjoselogodesign.com/api';
const TOKEN_KEY = 'sjld_token';
const USER_KEY  = 'sjld_user';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || null);
  const [user,  setUser]  = useState(() => {
    try { return JSON.parse(localStorage.getItem(USER_KEY) || 'null'); } catch { return null; }
  });
  const [loading, setLoading] = useState(!!localStorage.getItem(TOKEN_KEY));

  // Validate stored token on mount
  useEffect(() => {
    const stored = localStorage.getItem(TOKEN_KEY);
    if (!stored) { setLoading(false); return; }

    fetch(`${API_BASE}/auth/me`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${stored}`,
        'X-Requested-With': 'XMLHttpRequest',
      },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        const u = data.user || data.data || data;
        setUser(u);
        localStorage.setItem(USER_KEY, JSON.stringify(u));
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setToken(null);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const _persist = (tok, usr) => {
    setToken(tok);
    setUser(usr);
    localStorage.setItem(TOKEN_KEY, tok);
    localStorage.setItem(USER_KEY, JSON.stringify(usr));
  };

  const _clear = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  };

  /** Standard email/password login */
  const login = useCallback(async ({ email, password }) => {
    const res  = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) throw new Error(data?.message || 'Invalid email or password.');
    _persist(data.token, data.user);
    return data;
  }, []);

  /** Called after payment — backend returns login_token in payment confirm response */
  const loginWithToken = useCallback(async (loginToken) => {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${loginToken}`,
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
    if (!res.ok) throw new Error('Auto-login failed.');
    const data = await res.json();
    const u = data.user || data.data || data;
    _persist(loginToken, u);
    return u;
  }, []);

  const logout = useCallback(async () => {
    if (token) {
      fetch(`${API_BASE}/auth/logout`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
      }).catch(() => {});
    }
    _clear();
  }, [token]);

  /** Authenticated fetch — sets Bearer header, clears auth on 401 */
  const authFetch = useCallback(async (path, opts = {}) => {
    const tok = localStorage.getItem(TOKEN_KEY);
    const res = await fetch(`${API_BASE}${path}`, {
      ...opts,
      headers: {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...(tok ? { Authorization: `Bearer ${tok}` } : {}),
        ...(opts.headers || {}),
      },
    });
    if (res.status === 401) _clear();
    return res;
  }, []);

  const updateUser = useCallback((updated) => {
    setUser(updated);
    localStorage.setItem(USER_KEY, JSON.stringify(updated));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isLoggedIn: !!token && !!user,
        login,
        loginWithToken,
        logout,
        authFetch,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}