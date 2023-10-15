import { useState, useEffect } from "react";
import Rating from '@mui/material/Rating';
import { createReview, getUserProfile,  } from '../../../data/repository';
import { verifyReview } from '../../../data/validation';
import { useAuth } from "../../../AuthContext";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
function ReviewCard(props) {
  // State to manage the review rating and comment
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [user, setUser] = useState({})
   
  const { state } = useAuth();

  const username = state.username;
  const isLoggedIn = state.isLoggedIn

  // State to manage error messages
  const [errorMessage, setErrorMessage] = useState(null);

// Handler for updating the comment state and character count
const handleCommentChange = (content, delta, source, editor) => {
  const text = editor.getText();
  if (text.length <= 600) {
    setComment(content); 
  }
};

  useEffect(() => {
    async function fetchUserData() {
      try {
        const account = await getUserProfile(username)
        setUser(account);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  });

  // Handler for updating the rating state
  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  // Handler for submitting a review
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(comment)

    // Verify the review and get the response
    const response = verifyReview(username, comment, rating, props.movie_id);

    if (response.success) {

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
    <div style={{ width: '100%' }}>
      {isLoggedIn ? (
        user.blocked ? (
          <div>User Blocked By Admin</div>
        ) : (
          <div>
            <div style={{ backgroundColor: 'white', borderRadius:'10px', padding:'2rem 1rem', width:'80%', margin:'0 auto' }}>
          
            <h4 className="review-header">Leave a Review</h4>
            <form onSubmit={handleSubmit}>
       
              <Rating
                name="size-large"
                defaultValue={1}
                size="large"
                value={rating}
                onChange={handleRatingChange}
                required={true}
                data-testid="rating"
              />
              <br />
  
              <ReactQuill className="react-quill" value={comment} onChange={handleCommentChange} style={{ padding: '1rem',borderRadius: '10px',marginTop: '1rem', color:'black'}} />
              
              <div className="form-group">
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Submit"
                  style={{ width: '50%', marginTop: '20px' }}
                />
              </div>
              {errorMessage && (
                <div className="form-group" style={{ marginTop: '1rem' }}>
                  <span className="text-danger">{errorMessage}</span>
                </div>
              )}
            </form>
            </div>
          </div>
        )
      ) : (
        <div>
          <a href="/signin">Sign in to leave a review</a>
        </div>
      )}
    </div>
  );
}

export default ReviewCard;