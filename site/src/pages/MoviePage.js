import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { groupSessionsByDate } from '../utils/dates';
import MovieDetails from '../components/movies/movie/MovieDetails';
import { useMovie } from '../hooks/useMovie';
import MovieNavLinks from '../components/navigation/MovieNavLink';
import { Sessions } from '../components/movies/sessions/Sessions';

function MoviePage() {
    const { movieID } = useParams();
    const { movie, sessions } = useMovie(movieID);
    const groupedSessions = groupSessionsByDate(sessions);
    const location = useLocation();
    return (
    <>
    <div className='row'>
        <div className='col-md-4'>
            <img src={movie.poster} style={{ width: '75%', borderRadius: '20px', marginBottom: '2rem' }} alt="" />
            <MovieDetails movie={movie} />
        </div>
        <div className='col-md-7' style={{ margin: '2rem' }}>
            <MovieNavLinks movieID={movieID} location={location}/>
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
