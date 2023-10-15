import React from "react";
import { formatDDMMYYYY } from "../../../utils/dates";
import Rating from "@mui/material/Rating";

// Create a MovieDetails component
function MovieDetails({ movie }) {
  return (
    <div className="card-body" style={{ marginBottom: "2rem" }}>
      <h4 className="card-title">{movie.title}</h4>
      <p className="card-text">
        {movie.duration} mins | {formatDDMMYYYY(movie.release_date)} | {movie.genre}
      </p>
      <p style={{marginTop:'1rem'}}>
     
        <Rating
          className="custom-rating"
          size="large"
          value={movie.rating || 0} // Set a default value in case movie.rating is undefined
          precision={0.5}
          readOnly
        />       
      </p>
      <p className="card-text">{movie.description}</p>
      <p className="card-text">
        <b>Director:</b> {movie.director}
      </p>
    </div>
  );
}


export default MovieDetails;
