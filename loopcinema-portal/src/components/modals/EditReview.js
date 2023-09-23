import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { Rating } from '@mui/material';
import { updateReview } from '../../data/repository'

function EditReview(props) {
  const review = props.review
  // State to manage rating and comment
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);

  // Handler for comment change
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  // Handler for rating change
  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  // Handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Edit the review with new comment and rating
    await updateReview({
        review_id: review.review_id,
        movie_id: review.movie_id,
        comment: comment,
        rating: rating
    });

    window.alert("Review edited successfully!");
    props.onHide(); // Hide the modal
  };

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header style={{margin:'0 auto'}}>
        <Modal.Title>Edit Review</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{textAlign:'center'}}>
        <form onSubmit={handleSubmit}>
          {/* Rating input */}
          <Rating
            name="size-large"
            defaultValue={1}
            size="large"
            value={rating}
            onChange={handleRatingChange}
          />
          <br />
          {/* Textarea for comment */}
          <textarea
            className="edit-review-textarea" // Apply styling through CSS class
            rows={6}
            cols={70}
            name="comment"
            placeholder="Add your feedback"
            value={comment}
            onChange={handleCommentChange}
            maxLength={250}
          />
        </form>
      </Modal.Body>
      <Modal.Footer style={{margin:'0 auto'}}>
        {/* Submit and cancel buttons */}
        <Button onClick={handleSubmit} className="edit-review-button">
          Submit
        </Button>
        <Button variant="danger" onClick={props.onHide} className="edit-review-button">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditReview;