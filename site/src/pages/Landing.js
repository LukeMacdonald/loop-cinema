import React, { useEffect, useState } from "react";
import { getAllMovies, incrementMovieViews } from "../data/repository";
import EventInfoCard from "../components/landing/EventInfoCard";
import BusinessInfoCard from "../components/landing/BusinessInfoCard";
import { useNavigate } from "react-router-dom";

function Landing(props) {
  const [movies, setMovies] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMovies() {
      const cinemaMovies = await getAllMovies();
      setMovies(cinemaMovies); 
    }

    fetchMovies();
  }, []); 
  
  const handleClick = async (movie_id) => {
    await incrementMovieViews(movie_id);
    navigate(`/movie/details/${encodeURIComponent(movie_id)}`);
  };

  return (
    <div> 
      <h4 style={{margin:'2rem 0 1rem 0'}}>Now Showing</h4>
      <div className="movie-container">
        {movies.map((movie, index) => (
          <div className="col-2 movie-col-2" key={movie.movie_id}> 
            <button
              className="link-button"
              onClick={() => handleClick(movie.movie_id)}
            >
              <img
                src={movie.poster}
                style={{ width: "95%", borderRadius: "15px" }}
                alt=""
              />
            </button>
            <p style={{ margin: "0.5rem 1rem" }}>{movie.title}</p>
          </div>
        ))}
      </div>
      <div className="row" style={{ marginBottom: "2rem" }}>
        <div className="col-lg-7">
          <EventInfoCard />
        </div>
        <div className="col-lg-5" style={{ paddingRight: "2rem" }}>
          <BusinessInfoCard />
        </div>
      </div>
    </div>
  );
}

export default Landing;

