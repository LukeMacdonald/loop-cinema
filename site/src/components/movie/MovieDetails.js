import { formatDDMMYYYY } from "../../utils/dates";


// Create a MovieDetails component
function MovieDetails({ movie }) {
    return (
      <div className="card-body">
        <h4 className="card-title">{movie.title}</h4>
        <p className="card-text">
          {movie.duration} mins | {formatDDMMYYYY(movie.release_date)} | {movie.genre}
        </p>
        <p className="card-text">{movie.description}</p>
        <p className="card-text">
          <b>Director:</b> {movie.director}
        </p>
      </div>
    );
  }
export default MovieDetails;