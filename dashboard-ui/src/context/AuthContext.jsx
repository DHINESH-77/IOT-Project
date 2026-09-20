import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('crivera_auth_token'));
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('crivera_auth_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoading, setIsLoading] = useState(true);

  // Deep verification on app startup
  useEffect(() => {
    const verifyStoredSession = async () => {
      const storedToken = localStorage.getItem('crivera_auth_token');
      if (!storedToken) {
        setUser(null);
        setToken(null);
        setIsLoading(false);
        return;
      }

      try {
        // 1. Client-side cryptographic expiry validation
        const decoded = jwtDecode(storedToken);
        const currentTime = Date.now() / 1000;
        if (decoded.exp && decoded.exp < currentTime) {
          console.warn('[Security] Cryptographic token expired. Revoking session.');
          logout();
          setIsLoading(false);
          return;
        }

        // 2. Server-side signature & user verification
        const res = await fetch('http://localhost:5000/api/auth/me', {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (res.ok) {
          const json = await res.json();
          if (json.success && json.user) {
            setUser(json.user);
            setToken(storedToken);
            localStorage.setItem('crivera_auth_user', JSON.stringify(json.user));
          } else {
            logout();
          }
        } else {
          // Token signature rejected or revoked by server
          console.warn('[Security] Server rejected token signature. Expelling user.');
          logout();
        }
      } catch (err) {
        console.error('[Security] Session verification error:', err);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    verifyStoredSession();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Authentication failed. Please verify credentials.');
      }

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('crivera_auth_token', data.token);
      localStorage.setItem('crivera_auth_user', JSON.stringify(data.user));
      // Clear legacy mock key
      localStorage.removeItem('gram_seva_admin');

      return { success: true, user: data.user };
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('crivera_auth_token');
    localStorage.removeItem('crivera_auth_user');
    localStorage.removeItem('gram_seva_admin');
  };

  const getAuthHeader = () => {
    const activeToken = token || localStorage.getItem('crivera_auth_token');
    return activeToken ? { Authorization: `Bearer ${activeToken}` } : {};
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(user && token),
        isLoading,
        login,
        logout,
        getAuthHeader,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
