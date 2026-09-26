import { useEffect, useState } from 'react';
import incidentService from '../services/incidentService';
import IncidentList from '../components/IncidentList';
import Loader from '../components/Loader';

/**
 * Full incident listing, available to every authenticated role.
 */
function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadIncidents() {
      try {
        const data = await incidentService.getAll();
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

    loadIncidents();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <h1>All Incidents</h1>
      </div>

      {loading && <Loader />}
      {error && <div className="alert alert-error">{error}</div>}
      {!loading && !error && (
        <IncidentList incidents={incidents} emptyMessage="No incidents have been reported yet." />
      )}
    </div>
  );
}

export default Incidents;
