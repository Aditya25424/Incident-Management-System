import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import incidentService from '../services/incidentService';
import SeverityBadge from '../components/SeverityBadge';
import StatusBadge from '../components/StatusBadge';
import Loader from '../components/Loader';

const STATUS_OPTIONS = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];

/**
 * Single-incident view: full details plus resolver-assignment and
 * status-update controls. The backend enforces who is actually
 * allowed to perform each action; this page simply surfaces the
 * controls and reports any authorization error back to the user.
 */
function IncidentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [incident, setIncident] = useState(null);
  const [resolvers, setResolvers] = useState([]);
  const [selectedResolver, setSelectedResolver] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionError, setActionError] = useState('');
  const [actionMessage, setActionMessage] = useState('');

  const loadIncident = useCallback(async () => {
    const data = await incidentService.getById(id);
    setIncident(data);
    setSelectedStatus(data.status);
  }, [id]);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      setLoading(true);
      try {
        await loadIncident();
        const resolverList = await incidentService.listResolvers();
        if (isMounted) {
          setResolvers(resolverList);
        }
      } catch (err) {
        if (isMounted) {
          setActionError('Unable to load this incident.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, [loadIncident]);

  const handleAssign = async (event) => {
    event.preventDefault();
    if (!selectedResolver) return;

    setActionError('');
    setActionMessage('');
    try {
      const updated = await incidentService.assignResolver(id, selectedResolver);
      setIncident(updated);
      setSelectedStatus(updated.status);
      setActionMessage('Resolver assigned successfully.');
    } catch (err) {
      setActionError(err.response?.data?.message || 'Unable to assign resolver.');
    }
  };

  const handleStatusUpdate = async (event) => {
    event.preventDefault();

    setActionError('');
    setActionMessage('');
    try {
      const updated = await incidentService.updateStatus(id, selectedStatus);
      setIncident(updated);
      setActionMessage('Status updated successfully.');
    } catch (err) {
      setActionError(err.response?.data?.message || 'Unable to update status.');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this incident? This cannot be undone.')) return;

    try {
      await incidentService.remove(id);
      navigate('/incidents');
    } catch (err) {
      setActionError(err.response?.data?.message || 'Unable to delete this incident.');
    }
  };

  if (loading) return <Loader />;
  if (!incident) return <p className="empty-state">Incident not found.</p>;

  const isAssignedResolver = incident.assignedTo && incident.assignedTo.id === user.id;
  const canUpdateStatus = user.role === 'ADMIN' || isAssignedResolver;

  return (
    <div className="page">
      <div className="page-header">
        <h1>{incident.title}</h1>
        <div className="badge-row">
          <StatusBadge status={incident.status} />
          <SeverityBadge severity={incident.severity} />
        </div>
      </div>

      {actionError && <div className="alert alert-error">{actionError}</div>}
      {actionMessage && <div className="alert alert-success">{actionMessage}</div>}

      <div className="detail-card">
        <p>{incident.description}</p>

        <dl className="detail-meta">
          <dt>Reported by</dt>
          <dd>{incident.reportedBy?.name} ({incident.reportedBy?.email})</dd>

          <dt>Assigned to</dt>
          <dd>{incident.assignedTo ? `${incident.assignedTo.name} (${incident.assignedTo.email})` : 'Unassigned'}</dd>

          <dt>Created</dt>
          <dd>{new Date(incident.createdAt).toLocaleString()}</dd>

          <dt>Last updated</dt>
          <dd>{new Date(incident.updatedAt).toLocaleString()}</dd>
        </dl>
      </div>

      <div className="detail-actions">
        <form className="inline-form" onSubmit={handleAssign}>
          <label htmlFor="resolver">Assign Resolver</label>
          <select
            id="resolver"
            value={selectedResolver}
            onChange={(e) => setSelectedResolver(e.target.value)}
          >
            <option value="">Select a resolver...</option>
            {resolvers.map((resolver) => (
              <option key={resolver.id} value={resolver.id}>
                {resolver.name} ({resolver.email})
              </option>
            ))}
          </select>
          <button type="submit" className="btn btn-primary" disabled={!selectedResolver}>
            Assign
          </button>
        </form>

        {canUpdateStatus && (
          <form className="inline-form" onSubmit={handleStatusUpdate}>
            <label htmlFor="status">Update Status</label>
            <select
              id="status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status.replace('_', ' ')}
                </option>
              ))}
            </select>
            <button type="submit" className="btn btn-primary">
              Update Status
            </button>
          </form>
        )}

        <button className="btn btn-danger" onClick={handleDelete}>
          Delete Incident
        </button>
      </div>
    </div>
  );
}

export default IncidentDetails;
