import React, { useEffect, useState } from "react";
import { getAllMovies } from "../data/repository";
import EventInfoCard from "../components/landing/EventInfoCard"
import BusinessInfoCard from "../components/landing/BusinessInfoCard"

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
      <div>
        
      </div>
      <h4>Now Showing</h4>
      <div className="movie-container">
        {movies.map((movie, index) => (
          <div className="col-2 movie-col-2" key={movie.movie_id}>
            <a href={`/movie/details/${encodeURIComponent(movie.movie_id)}`}>
              <img src={movie.poster} style={{width:'95%',borderRadius:'15px' }} alt="" />
            </a>
            <p style={{margin:'0.5rem 1rem'}}>{movie.title}</p>
          </div>
        ))}
      </div>
      <div className="row" style={{marginBottom:'2rem'}}>
        <div className="col-lg-7">
          <EventInfoCard/>
        </div>
        <div className="col-lg-5" style={{paddingRight:'2rem'}}>
          <BusinessInfoCard /> 
        </div>
      </div>
      
  
    </div>
  );
}

export default Landing;
