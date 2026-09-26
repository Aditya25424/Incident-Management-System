import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import incidentService from '../services/incidentService';

/**
 * Incident-reporting form. Submits to POST /incidents; the backend
 * derives the reporter from the authenticated JWT principal, so no
 * reporter field is collected or sent from here.
 */
function ReportIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('LOW');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const created = await incidentService.create({ title, description, severity });
      navigate(`/incidents/${created.id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to submit the incident. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Report an Incident</h1>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        {error && <div className="alert alert-error">{error}</div>}

        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          maxLength={150}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          rows={6}
          maxLength={4000}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label htmlFor="severity">Severity</label>
        <select id="severity" value={severity} onChange={(e) => setSeverity(e.target.value)}>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="CRITICAL">Critical</option>
        </select>

        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Incident'}
        </button>
      </form>
    </div>
  );
}

export default ReportIncident;
