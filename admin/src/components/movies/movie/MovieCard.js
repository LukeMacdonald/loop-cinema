import { useState } from "react"
import { useNavigate } from "react-router-dom";

import MoviePoster from "./MoviePoster";
import MovieDetails from "./MovieDetails"
import ReviewButton from "./ReviewButton";
import SessionButton from "./SessionButton";
import SessionTimes from '../../sessions/SessionTimes'
import '../../../assets/styles/styles.css'
// Refactored MovieCard component
function MovieCard(props) {
    const movie = props.movie;
    const navigate = useNavigate();
    const [modalShow, setModalShow] = useState(false);
  
    const handleReview = () => {
      navigate(`/admin/reviews/${encodeURIComponent(movie.movie_id)}`);
    };

    const handleEdit = () => {
      // Pass movie data to the edit page, navigate to the edit route
      navigate(`/admin/movies/edit/${encodeURIComponent(movie.movie_id)}`);
    };
  
    return (
      <div className="card movie-card">
        <div className="row">
          <div className="col-md-3">
            <MoviePoster poster={movie.poster} />
          </div>
          <div className="col-md-9">
            <MovieDetails movie={movie} />
            <ReviewButton onClick={handleReview} />
            <button className="btn btn-primary mr-2" onClick={handleEdit}>
              Edit
              </button>
            <SessionButton onClick={() => setModalShow(true)} />
            <SessionTimes movieID={movie.movie_id} show={modalShow} onHide={() => setModalShow(false)} />
          </div>
        </div>
      </div>
    );
  }
  
  export default MovieCard;
