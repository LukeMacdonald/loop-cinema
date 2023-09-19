import { useState } from "react"
import SessionTimes from "./SessionTimes";
import { useNavigate } from "react-router-dom";
import { calculateSumOfRatings } from "../data/movieRepository";

function MovieCard(props) {
    const movie = props.movie;
    const navigate = useNavigate();

    // Handler for navigating to the review page for a specific movie
    const handleReview = (movieTitle) => (event) => {
        event.preventDefault();
        navigate(`/reviews/${encodeURIComponent(movieTitle)}`);
        return;
    }

    const [modalShow, setModalShow] = useState(false);

    return (
        <div className="card movie-card">
            <div className="row">
                <div className="col-md-3">
                    <img src={movie.poster} className="movie-poster" alt=""/>
                </div>
                <div className="col-md-9">
                    <div className="card-body">
                        <h4 className="card-title">{movie.title}</h4>
                        <p className="card-text">{movie.duration} mins | {movie.releaseDate} | {movie.genre}</p>
                        <p className="card-text">{movie.description}</p>
                        <p className="card-text"><b>Director:</b> {movie.director}</p>
                        <p className="card-text"><b>Rating:</b> {calculateSumOfRatings(movie.title)}</p>
                        <button className="btn btn-outline-dark btn-sm movie-card-button" onClick={handleReview(movie.title)}>Reviews</button>
                        <button className="btn btn-outline-dark btn-sm movie-card-button" onClick={() => setModalShow(true)}>Session Times</button>
                        {/* Show session times modal */}
                        <SessionTimes times={movie.sessions} show={modalShow} onHide={() => setModalShow(false)}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;
