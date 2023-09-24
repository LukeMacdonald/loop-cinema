import { useState } from "react";
import Rating from '@mui/material/Rating';
import { createReview } from '../../data/repository';
import { verifyReview } from '../../data/validation';
function ReviewCard(props) {
  // State to manage the review rating and comment
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  // State to manage error messages
  const [errorMessage, setErrorMessage] = useState(null);

  // Handler for updating the comment state
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  // Handler for updating the rating state
  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  // Handler for submitting a review
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verify the review and get the response
    const response = verifyReview(props.username, comment, rating, props.movie_id);

    if (response.successful) {
      // Update the review and show a success message
      await createReview(response.review);
      window.alert("Review successfully posted!");
      window.location.reload();
    } else {
      // Reset the comment and rating, and show the error message
      setComment("");
      setRating(1);
      setErrorMessage(response.message);
    }
  };

  return (
    <div>
      {/* Form to leave a review */}
      <h4 className="review-header">Leave a Review</h4>
      {props.isLoggedIn ? (
        <form onSubmit={handleSubmit}>
          {/* Rating component */}
          <Rating
            name="size-large"
            defaultValue={1}
            size="large"
            value={rating}
            onChange={handleRatingChange}
            required={true}
          />
          <br />

          {/* Textarea for comment */}
          <textarea
            rows={6}
            cols={70}
            name="comment"
            placeholder={"Add your feedback"}
            value={comment}
            onChange={handleCommentChange}
            maxLength={600}
            required={true}
          />

          {/* Submit button and error message */}
          <div className="form-group">
            <input type="submit" className="btn btn-primary" value="Submit" style={{ width: '200px', marginTop: '20px' }} />
          </div>
          {errorMessage && (
            <div className="form-group" style={{ marginTop: '1rem' }}>
              <span className="text-danger">{errorMessage}</span>
            </div>
          )}
        </form>
      ) : (
        <div>
          <a href='/signin'>Sign in to leave a review</a>
        </div>
      )}
    </div>
  );
}
export default ReviewCard;