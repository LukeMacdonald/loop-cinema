import React, { useEffect, useState } from "react";
import LandingCarousel from "../components/LandingCarousel";
import { getAllMovies } from "../data/repository";
import MovieCard from "../components/cards/MovieCard";
import BusinessInfoCard from "../components/cards/BusinessInfoCard";
import EventInfoCard from "../components/cards/EventInfoCard";

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
      <LandingCarousel />
      <h1 className="website-name">Loop Cinema</h1>
      <h4 style={{fontWeight:'bold', fontStyle:'italic', marginBottom:'4rem'}}>"Bringing Movies and Community Together: Loop Cinemas, Where Entertainment Meets Unity"</h4>
      
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
