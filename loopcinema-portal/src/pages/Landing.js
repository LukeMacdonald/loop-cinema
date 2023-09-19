import React, { useState } from "react";
import { getMovies, calculateSumOfRatingsValue } from "../data/movieRepository";
import BusinessInfoCard from "../components/BusinessInfoCard";
import WelcomeCarousel from "../components/WelcomeCarousel";
import MovieCard from "../components/MovieCard";
import EventInfoCard from "../components/EventInfoCard";

function Landing(props) {
  const [movies, setMovies] = useState(getMovies()); // State to hold movies

  const handleSort = () => {
    const sortedMovies = [...movies]; // Create a copy of the movies array

    sortedMovies.sort((movieA, movieB) =>
      calculateSumOfRatingsValue(movieB.title) - calculateSumOfRatingsValue(movieA.title)
    );

    setMovies(sortedMovies); // Update the movies state with the sorted array
  };

  return (
    <div>
      <WelcomeCarousel />
      <h1 className="website-name">Loop Cinema</h1>
      <h4 style={{fontWeight:'bold', fontStyle:'italic', marginBottom:'4rem'}}>"Bringing Movies and Community Together: Loop Cinemas, Where Entertainment Meets Unity"</h4>
      
      <div className="row">
        <div className="col-lg-8">
          <div className="row">
            <div className="col">
              <h3>Movies Showing</h3>
            </div>
            <div className="col" style={{ textAlign: "right", marginRight: "2rem" }}>
              <button className="btn btn-secondary" style={{ width: "100px" }} onClick={handleSort}>Sort</button>
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