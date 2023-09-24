import React, { useState, useEffect } from 'react';
import { getAllMovies } from "../../database/repository";
import MovieCard from './movie/MovieCard';

function Movies(){
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            const movies = await getAllMovies();
            setMovies(movies);
        }
        fetchUsers();
    }, []);

    return (
        <div style={{width:'60%', textAlign:'left', margin:'0 auto'}}>
            <h1>Movies</h1>
            <hr/>
            {movies.map((movie, index) => (
                <MovieCard movie={movie}/>
            ))}
        </div>
    );
}

export default Movies;
