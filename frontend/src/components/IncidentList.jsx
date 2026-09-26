import IncidentCard from './IncidentCard';

/**
 * Renders a list of incidents as cards, or an empty-state message
 * when there are none to show.
 */
function IncidentList({ incidents, emptyMessage = 'No incidents found.' }) {
  if (!incidents || incidents.length === 0) {
    return <p className="empty-state">{emptyMessage}</p>;
  }

  return (
    <div className="incident-list">
      {incidents.map((incident) => (
        <IncidentCard key={incident.id} incident={incident} />
      ))}
    </div>
  );
}

export default IncidentList;
