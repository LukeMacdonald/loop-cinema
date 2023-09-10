import React, { useState } from "react";
import { Rating } from "@mui/material";
import { getName } from "../data/userRepository";
import EditReview from "./EditReview";
import { deleteReview, getMovie } from "../data/movieRepository";

function ReviewTableRow(props) {
  const { review, index, movieTitle, email } = props;
  const movie = getMovie(movieTitle);

  // State to manage whether the EditReview modal is open or not
  const [reviewsModalShow, setReviewsModalShow] = useState({});

  // Handler to open the EditReview modal
  const handleOpenModal = (reviewId) => {
    setReviewsModalShow((prevShow) => ({ ...prevShow, [reviewId]: true }));
  };

  // Handler to close the EditReview modal and refresh the page
  const handleCloseModal = (reviewId) => {
    setReviewsModalShow((prevShow) => ({ ...prevShow, [reviewId]: false }));
    window.location.reload();
  };

  // Handler to delete a review
  const handleDelete = (id, title) => () => {
    const confirmation = window.confirm("Confirm to delete your review");
    if (confirmation) {
      deleteReview(id, title);
      window.alert("Review deleted successfully!");
      window.location.reload();
    }
  };

  return (
    <tr key={index}>
      <td>
        <Rating name="read-only" value={review.rating} readOnly />
      </td>
      <td>
        {review.comment}
        <br />
        <span className="review-email"> - {getName(review.email)}</span>
      </td>
      <td>{review.datetime.split("T")[0]}</td>
      {email === review.email && (
        <td style={{ textAlign: "center" }}>
          <button className="btn btn-secondary" style={{ margin: "0 0.5rem" }} onClick={() => handleOpenModal(index)}>
            <i className="fa fa-pen-to-square" />
          </button>
          <button className="btn btn-danger" style={{ margin: "0 0.5rem" }} onClick={handleDelete(review.id, movie.title)}>
            <i className="fa fa-trash" />
          </button>
          <EditReview
            review={review}
            movieTitle={movieTitle}
            show={reviewsModalShow[index] || false}
            onHide={() => handleCloseModal(index)}
          />
        </td>
      )}
    </tr>
  );
}

export default ReviewTableRow;

