import React from 'react';
import { useParams, useLocation, useNavigate} from 'react-router-dom';
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
  const navigate = useNavigate(); 

  const username = state.username;  
  
  return (
    <>
    <div className='row'>
      <div className='col-md-4'>
      <button className='btn btn-secondary' onClick={() => navigate('/')} style={{margin:'1rem 0'}}><i className="fa-solid fa-left-long" style={{marginRight:'1rem'}}></i> Back</button><br/>
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
  