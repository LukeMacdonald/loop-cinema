import React, { useState } from "react";
import { Rating } from "@mui/material";
import { deleteReview } from "../../../data/repository";
import EditReviewModal from "./EditReviewModal";

function Review(props) {
  const { review, index, username } = props;
  const [reviewsModalShow, setReviewsModalShow] = useState({});

  const handleOpenModal = (reviewId) => {
    setReviewsModalShow((prevShow) => ({ ...prevShow, [reviewId]: true }));
  };

  const handleCloseModal = (reviewId) => {
    setReviewsModalShow((prevShow) => ({ ...prevShow, [reviewId]: false }));
    window.location.reload();
  };

  const handleDelete = (review_id) => async () => {
    const confirmation = window.confirm("Confirm to delete your review");
    if (confirmation) {
      await deleteReview(review_id);
      window.alert("Review deleted successfully!");
      window.location.reload();
    }
  };

  return (
    <tr key={index}>
      {review.removed ? (
        <>
         <td colSpan={2}>
          <strong>[This review has been deleted by the admin]</strong>
        </td>
        <td colSpan={2}>
          {review.createdAt.split("T")[0]}
        </td>
        </>
       
      ) : (
        <>
          <td>
            <Rating name="read-only" value={review.rating} readOnly />
          </td>
          <td>
            {review.comment}
            <br />
            {username === review.username && <span className="review-email"> - {review.username}</span>}
          </td>
          <td>{review.updatedAt.split("T")[0]}</td>
          {username === review.username && (
            <td style={{ textAlign: "center" }}>
              <button className="btn btn-secondary" style={{ margin: "0 0.5rem" }} onClick={() => handleOpenModal(index)}>
                <i className="fa fa-pen-square" />
              </button>
              <button className="btn btn-danger" style={{ margin: "0 0.5rem" }} onClick={handleDelete(review.review_id)}>
                <i className="fa fa-trash" />
              </button>
              <EditReviewModal review={review} show={reviewsModalShow[index] || false} onHide={() => handleCloseModal(index)} />
            </td>
          )}
        </>
      )}
    </tr>
  );
}

export default Review;
