import { useState } from "react"
import { useNavigate } from "react-router-dom";
import SessionTimes from "../sessions/SessionTimes";
import MoviePoster from "./MoviePoster";
import MovieDetails from "./MovieDetails"
import ReviewButton from "../reviews/ReviewButton";
import SessionButton from "../sessions/SessionButton";

// Refactored MovieCard component
function MovieCard(props) {
    const movie = props.movie;
    const navigate = useNavigate();
    const [modalShow, setModalShow] = useState(false);
  
    const handleReview = () => {
      navigate(`/movie/details/${encodeURIComponent(movie.movie_id)}`);
    };
  
    return (
      <div className="card movie-card">
        <div className="row">
          <div className="col-md-3">
            <MoviePoster poster={movie.poster} />
          </div>
          <div className="col-md-9">
            <MovieDetails movie={movie} />
            <div style={{marginLeft:'1rem'}}>
              <ReviewButton onClick={handleReview} />
              <SessionButton onClick={() => setModalShow(true)} />

            </div>
            
            <SessionTimes movieID={movie.movie_id} show={modalShow} onHide={() => setModalShow(false)} />
          </div>
        </div>
      </div>
    );
  }
  
  export default MovieCard;
