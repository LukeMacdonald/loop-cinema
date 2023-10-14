// Create a SessionButton component
function SessionButton({ onClick }) {
    return (
      <button className="btn btn-secondary btn-sm movie-card-button" onClick={onClick}>
        Session Times
      </button>
    );
}
export default SessionButton;