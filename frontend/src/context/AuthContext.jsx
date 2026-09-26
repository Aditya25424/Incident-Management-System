import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from '../config';

const AuthContext = createContext(null);

/**
 * Wraps the app and exposes the current authenticated user, the JWT
 * lifecycle (login/register/logout), and a loading flag so protected
 * routes can wait for the initial session check before redirecting.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const persistSession = useCallback((authResponse) => {
    const currentUser = {
      id: authResponse.userId,
      name: authResponse.name,
      email: authResponse.email,
      role: authResponse.role,
    };

    localStorage.setItem(TOKEN_STORAGE_KEY, authResponse.token);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(currentUser));
    setUser(currentUser);
    return currentUser;
  }, []);

  const login = useCallback(
    async (email, password) => {
      const authResponse = await authService.login(email, password);
      return persistSession(authResponse);
    },
    [persistSession]
  );

  const register = useCallback(
    async (name, email, password, role) => {
      const authResponse = await authService.register({ name, email, password, role });
      return persistSession(authResponse);
    },
    [persistSession]
  );

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    setUser(null);
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
