/**
 * Small, reusable loading indicator used while async data is in flight.
 */
function Loader({ label = 'Loading...' }) {
  return (
    <div className="loader">
      <div className="spinner" />
      <p>{label}</p>
    </div>
  );
}

export default Loader;
