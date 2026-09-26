const STATUS_CLASSES = {
  OPEN: 'badge-status-open',
  IN_PROGRESS: 'badge-status-in-progress',
  RESOLVED: 'badge-status-resolved',
  CLOSED: 'badge-status-closed',
};

/**
 * Renders an incident's lifecycle status as a color-coded badge.
 */
function StatusBadge({ status }) {
  const className = STATUS_CLASSES[status] || '';
  return <span className={`badge ${className}`}>{status.replace('_', ' ')}</span>;
}

export default StatusBadge;
