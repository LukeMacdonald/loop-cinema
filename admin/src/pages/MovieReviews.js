import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Review from '../components/movies/reviews/Review';
import { findMovieByID } from '../database/repository';
import { formatDDMMYYYY } from '../utils/dates';
import { useAuth } from '../AuthContext';
import Sidebar from '../components/Sidebar';

// MovieDetails component to display movie details
function MovieDetails({ movie }) {
  return (
    <div className='row'>
      <div className='col-lg-3'>
        <img src={movie.poster} alt='' className="movie-review-poster" />
      </div>
      <div className='col-lg-9'>
        <div className='movie-details'>
          <h1>{movie.title}</h1>
          <p>{movie.description}</p>
          <div style={{ marginTop: '1rem', marginLeft: '1rem' }}>
            <p><b>Release Date: </b>{formatDDMMYYYY(movie.release_date)}</p>
            <p><b>Director: </b>{movie.director}</p>
            <p><b>Runtime: </b>{movie.duration} minutes</p>
            <p><b>Genre: </b>{movie.genre}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ReviewsTable component to display existing reviews
function ReviewsTable({ reviews }) {
  const { state } = useAuth();
  const username = state.username;
  return (
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
        {/* Map through reviews and display each using Review component */}
        {reviews.map((review, index) => (
          <Review
            key={index}
            review={review}
            username={username}
            index={index} 
          />
        ))}
      </tbody>
    </table>
  );
}

function MovieReviews() {
  const { movieID } = useParams();
  const parsedMovieID = parseInt(movieID, 10);
  const [movie, setMovie] = useState({});
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchMovies() {

      const currentMovie = await findMovieByID(parsedMovieID);
      const allReviews = currentMovie.reviews

      setMovie(currentMovie);
      setReviews(allReviews);
    }

    fetchMovies();
  }, [parsedMovieID, reviews]);

  return (
  <div className="container-fluid">
    <div className="row">
      <Sidebar />
      <div className="col-md-9 col-sm-8" style={{ margin: '2rem 0' }}>
        <MovieDetails movie={movie} />
        <div className="review-section">
          <h2 className="title">Reviews</h2>
          <ReviewsTable reviews={reviews}/>
        </div>
      </div>
    </div>
  </div>
  );
}

export default MovieReviews;