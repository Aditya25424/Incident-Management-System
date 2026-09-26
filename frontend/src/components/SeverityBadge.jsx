const SEVERITY_CLASSES = {
  LOW: 'badge-severity-low',
  MEDIUM: 'badge-severity-medium',
  HIGH: 'badge-severity-high',
  CRITICAL: 'badge-severity-critical',
};

/**
 * Renders an incident's severity as a color-coded badge.
 */
function SeverityBadge({ severity }) {
  const className = SEVERITY_CLASSES[severity] || '';
  return <span className={`badge ${className}`}>{severity}</span>;
}

export default SeverityBadge;
