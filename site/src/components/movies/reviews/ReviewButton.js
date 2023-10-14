function ReviewButton({ onClick }) {
    return (
      <button className="btn btn-secondary btn-sm movie-card-button" onClick={onClick}>
        Tickets & Reviews
      </button>
    );
};

export default ReviewButton;