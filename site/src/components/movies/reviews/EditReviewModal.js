import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { Rating } from '@mui/material';
import { updateReview } from '../../../data/repository'
import CommentEditor from './CommentEditor';

function EditReviewModal(props){
  const review = props.review
  // State to manage rating and comment
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);
  const [errorMessage, setErrorMessage] = useState(null);

  // Handler for comment change
  const handleCommentChange = (content, delta, source, editor) => {
    const text = editor.getText();
    if (text.length <= 600) {
      setComment(content); 
    }
  };

  // Handler for rating change
  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  // Handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
  

    if ((comment.trim() !== "")) {
       await updateReview({
        review_id: review.review_id, 
        movie_id: review.movie_id,
        comment: comment,
        rating: rating
      });
      window.alert("Review edited successfully!");
      props.onHide();
    } else {
      setComment("");
      setRating(1);
      setErrorMessage("Comment cannot be empty!");
    }
    

  };

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header style={{margin:'0 auto', color:'black'}}>
        <Modal.Title>Edit Review</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{textAlign:'center'}}>
        <form onSubmit={handleSubmit}>
          <Rating
            name="size-large"
            defaultValue={1}
            size="large"
            value={rating}
            onChange={handleRatingChange}
          />
          <br />
          <div style={{ backgroundColor: 'white', borderRadius:'10px' }}>
            <CommentEditor comment={comment} handleCommentChange={handleCommentChange}/>
          </div>
          {errorMessage && (
              <div className="form-group" style={{ marginTop: '1rem' }}>
                <span className="text-danger">{errorMessage}</span>
              </div>
            )}
        </form>
      </Modal.Body>
      <Modal.Footer style={{margin:'0 auto'}}>
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

export default EditReviewModal;