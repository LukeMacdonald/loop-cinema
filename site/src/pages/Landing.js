import React, { useEffect, useState } from "react";
import { getAllMovies } from "../data/repository";
import MovieCard from "../components/movies/movie/MovieCard";
import BusinessInfoCard from "../components/landing/BusinessInfoCard";
import EventInfoCard from "../components/landing/EventInfoCard";

function Landing(props) {
  const [movies, setMovies] = useState([]); // State to hold movies
  
  useEffect(() => {
    async function fetchMovies() {
      const cinemaMovies = await getAllMovies();
      setMovies(cinemaMovies); // Update movies state with the fetched data
    }

    fetchMovies(); // Call the async function to fetch movies
  }, []); // Empty dependency array to run the effect once

  return (
    <div>
      {/* <LandingCarousel /> */}
      <div className="row">
        <div className="col-lg-8">
          <div className="row">
            <div className="col">
              <h3>Movies Showing</h3>
            </div>
            <div className="col" style={{ textAlign: "right", marginRight: "2rem" }}>
              <button className="btn btn-secondary" style={{ width: "100px" }}>Sort</button>
            </div>
          </div>
          <hr className="solid" />
          {movies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </div>
        <div className="col-lg-4">
        <BusinessInfoCard />
          <EventInfoCard/>
        </div>
      </div>
    </div>
  );
}

export default Landing;
