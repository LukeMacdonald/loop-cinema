import React, { useState, useEffect } from 'react';
import { getAllMovies } from "../../database/repository";
import MovieCard from './movie/MovieCard';
import { useNavigate } from 'react-router-dom';

function Movies() {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    const handleAddMovieClick = () => {
        // Navigate to the new page when the button is clicked
        navigate('/admin/movies/add'); // Replace '/new-movie' with the desired route
    };

    useEffect(() => {
        async function fetchMovies() {
            const movies = await getAllMovies();
            setMovies(movies);
        }
        fetchMovies();
    }, []);

    return (
        <div style={{ width: '90%', textAlign: 'left', margin: '0 auto' }}>
            <div className='row'>
                <div className='col-6'>
                    <h1>Movies</h1>
                </div>
                <div className='col-6' style={{ textAlign: 'right' }}>
                    <button className='btn btn-outline-dark btn-sm movie-card-button' onClick={handleAddMovieClick}>+</button>
                </div>
            </div>

            <hr />
            {movies.map((movie, index) => (
                <MovieCard key={index} movie={movie} />
            ))}
        </div>
    );
}

export default Movies;

