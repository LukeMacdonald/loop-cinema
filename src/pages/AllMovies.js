import MovieCard from "../components/MovieCard";
import { getMovies } from "../data/movieRepository";
import { useState } from "react";
import { calculateSumOfRatingsValue } from "../data/movieRepository";
function AllMovies(){
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
            <div className="row">
            <div className="col">
              <h1>All Movies</h1>
            </div>
            <div className="col" style={{ textAlign: "right", marginRight: "2rem" }}>
              <button className="btn btn-secondary" style={{ width: "100px" }} onClick={handleSort}>Sort</button>
            </div>
          </div>
            {movies.map((movie, index)=>(
                <MovieCard key={index} movie = {movie}/>
              ))}
        </div>
    )

}

export default AllMovies;