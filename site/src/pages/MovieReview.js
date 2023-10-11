import React from 'react';
import { useParams, useLocation} from 'react-router-dom';
import MovieDetails from '../components/movies/movie/MovieDetails';
import { useAuth } from '../AuthContext';
import ReviewCard from '../components/movies/reviews/ReviewCard';
import ReviewsTable from '../components/movies/reviews/ReviewsTable';
import { useMovie } from '../hooks/useMovie';
import '../styles/styles.css'
import MovieNavLinks from '../components/navigation/MovieNavLink';


function MovieReview() {
  const { movieID } = useParams();
  const { movie, reviews } = useMovie(movieID);
  const { state } = useAuth();
  const location = useLocation();
  const username = state.username;  
  return (
    <>
    <div className='row'>
      <div className='col-md-4'>
        <img src={movie.poster} style={{ width: '75%', borderRadius: '20px', marginBottom: '2rem' }} alt="" />
        <MovieDetails movie={movie} />
      </div>
      <div className='col-md-7' style={{ margin: '2rem', textAlign:'center' }}>
        <MovieNavLinks movieID={movieID} location={location}/>
        <div className="review-section">
            <h2 className="title">Reviews</h2>
            <ReviewsTable reviews={reviews} username={username} />
            <ReviewCard movie_id={movie.movie_id} />
        </div>
      </div>
    </div>
    </>
  );
}

export default MovieReview;
  