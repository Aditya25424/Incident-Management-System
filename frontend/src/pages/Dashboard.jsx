import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import incidentService from '../services/incidentService';
import IncidentList from '../components/IncidentList';
import Loader from '../components/Loader';

/**
 * Role-aware landing page after login.
 * USER      -> shows incidents they reported.
 * RESOLVER  -> shows incidents assigned to them.
 * ADMIN     -> shows all incidents.
 */
function Dashboard() {
  const { user } = useAuth();
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadDashboardIncidents() {
      setLoading(true);
      setError('');

      try {
        let data;
        if (user.role === 'RESOLVER') {
          data = await incidentService.getMyAssigned();
        } else if (user.role === 'ADMIN') {
          data = await incidentService.getAll();
        } else {
          data = await incidentService.getMyReported();
        }

        if (isMounted) {
          setIncidents(data);
        }
      } catch (err) {
        if (isMounted) {
          setError('Unable to load incidents right now.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadDashboardIncidents();
    return () => {
      isMounted = false;
    };
  }, [user.role]);

  const title =
    user.role === 'RESOLVER'
      ? 'Incidents Assigned to You'
      : user.role === 'ADMIN'
      ? 'All Incidents'
      : 'Your Reported Incidents';

  return (
    <div className="page">
      <div className="page-header">
        <h1>Welcome, {user.name}</h1>
        <p className="page-subtitle">{title}</p>
      </div>

      {loading && <Loader />}
      {error && <div className="alert alert-error">{error}</div>}
      {!loading && !error && (
        <IncidentList incidents={incidents} emptyMessage="Nothing to show here yet." />
      )}
    </div>
  );
}

export default Dashboard;
