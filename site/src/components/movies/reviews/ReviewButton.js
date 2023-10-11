function ReviewButton({ onClick }) {
    return (
      <button className="btn btn-outline-dark btn-sm movie-card-button" onClick={onClick}>
        Tickets & Reviews
      </button>
    );
};

export default ReviewButton;