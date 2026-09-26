import { Link } from 'react-router-dom';
import SeverityBadge from './SeverityBadge';
import StatusBadge from './StatusBadge';

/**
 * Compact summary card for a single incident, used inside IncidentList.
 */
function IncidentCard({ incident }) {
  return (
    <Link to={`/incidents/${incident.id}`} className="incident-card">
      <div className="incident-card-header">
        <h3>{incident.title}</h3>
        <StatusBadge status={incident.status} />
      </div>

      <p className="incident-card-description">{incident.description}</p>

      <div className="incident-card-footer">
        <SeverityBadge severity={incident.severity} />
        <span className="incident-card-meta">
          Reported by {incident.reportedBy?.name || 'Unknown'}
        </span>
        {incident.assignedTo && (
          <span className="incident-card-meta">Assigned to {incident.assignedTo.name}</span>
        )}
      </div>
    </Link>
  );
}

export default IncidentCard;
