import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from './Loader';

/**
 * Wraps a route element and redirects unauthenticated visitors to
 * /login. Waits for the initial auth-state check (loading) before
 * making a redirect decision, to avoid a flash of the login page for
 * already-authenticated users on a hard refresh.
 */
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
