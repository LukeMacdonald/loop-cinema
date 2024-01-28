import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { groupSessionsByDate } from "../utils/dates";
import MovieDetails from "../components/movies/movie/MovieDetails";
import { useMovie } from "../hooks/useMovie";
import MovieNavLinks from "../components/navigation/MovieNavLink";
import { Sessions } from "../components/movies/sessions/Sessions";

function MoviePage() {
  const { movieID } = useParams();
  const { movie, sessions } = useMovie(movieID);
  const groupedSessions = groupSessionsByDate(sessions);
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <div className="row mx-4">
        <div className="col-md-4">
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/home")}
            style={{ margin: "1rem 0" }}
          >
            <i
              className="fa-solid fa-left-long"
              style={{ marginRight: "1rem" }}
            ></i>{" "}
            Back
          </button>
          <br />
          <img
            src={movie.poster}
            style={{ width: "60%", borderRadius: "20px", marginBottom: "2rem" }}
            alt=""
          />
          <MovieDetails movie={movie} />
        </div>
        <div className="col-md-7" style={{ margin: "2rem" }}>
          <MovieNavLinks movieID={movieID} location={location} />
          {Object.keys(groupedSessions).map((date, index) => (
            <div key={index}>
              <h4>{date}</h4>
              <Sessions sessions={groupedSessions[date]} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MoviePage;
