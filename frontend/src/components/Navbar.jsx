import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Top navigation bar. Shown on every authenticated page. Provides
 * role-aware navigation and a logout action.
 */
function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/dashboard">Incident Management System</Link>
      </div>

      {user && (
        <div className="navbar-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/incidents">Incidents</Link>
          {user.role === 'USER' && <Link to="/report">Report Incident</Link>}
          <span className="navbar-user">
            {user.name} <span className="badge badge-role">{user.role}</span>
          </span>
          <button className="btn btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
