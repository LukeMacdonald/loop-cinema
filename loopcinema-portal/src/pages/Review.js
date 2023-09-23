import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import ReviewTableRow from '../components/ReviewTableRow';
import { findMovieByID, getMovieReviews, createReview } from '../data/repository';
import { verifyReview } from '../data/validation';


function Review(props) {
  // Get the "movieName" parameter from the URL
  const { movieID } = useParams();

  const [movie, setMovie] = useState({});

  const [reviews, setReviews] = useState([]);

  // State to manage the review rating and comment
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  // State to manage error messages
  const [errorMessage, setErrorMessage] = useState(null);

  // Extract user information from props
  const { username, isLoggedIn } = props;
  console.log(username)

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
      const response = verifyReview(username, comment, rating, movie.movie_id);
  
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


  useEffect(() => {
    async function fetchMovies() {
      const currentMovie = await findMovieByID(movieID);
      const allReviews = await getMovieReviews(movieID);
      setMovie(currentMovie);
      setReviews(allReviews); // Update movies state with the fetched data
    }

    fetchMovies(); // Call the async function to fetch movies
  }, [movieID]); // Empty dependency array to run the effect once

  return (
    <div>
      {/* Display movie details */}
      <div className='row'>
        <div className='col-lg-3'>
          <img src={movie.poster} alt='' className="movie-review-poster" />
        </div>
        <div className='col-lg-9'>
          <div className='movie-details'>
            <h1>{movie.title}</h1>
            <p>{movie.description}</p>
            <div style={{ marginTop: '1rem', marginLeft: '1rem' }}>
              <p><b>Release Date: </b>{movie.release_date}</p>
              <p><b>Director: </b>{movie.director}</p>
              <p><b>Runtime: </b>{movie.duration} minutes</p>
              <p><b>Genre: </b>{movie.genre}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Display existing reviews and allow leaving a review */}
      <div className="review-section">
        <h2 className="title">Reviews</h2>
        {/* Table to display existing reviews */}
        <table className="table table-hover review-table">
          <thead>
            <tr>
              <th style={{ width: '15%' }}>Rating</th>
              <th style={{ width: '40%' }}>Comment</th>
              <th style={{ width: '15%' }}>Date</th>
              <th style={{ width: '20%' }}></th>
            </tr>
          </thead>
          <tbody>
            {/* Map through reviews and display each using ReviewTableRow component */}
            {reviews.map((review, index) => (
              <ReviewTableRow
                key={index}
                review={review}
                username={username}
                index={index} 
              />
            ))}
          </tbody>
        </table>

        {/* Form to leave a review */}
        <h4 className="review-header">Leave a Review</h4>
        {isLoggedIn ? (
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
              maxLength={250}
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
    </div>
  );
}

export default Review;