import { useState, useEffect } from 'react';
import { findMovieByID, getMovieSessions, getMovieReviews } from '../data/repository';

export function useMovie(movieID) {
    const [movie, setMovie] = useState({});
    const [sessions, setSessions] = useState([]);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        async function fetchMovieDetails() {
            const currentMovie = await findMovieByID(movieID);
            const allSessions = await getMovieSessions(movieID);
            const allReviews = await getMovieReviews(movieID);
            setMovie(currentMovie);
            setSessions(allSessions);
            setReviews(allReviews);
        }

        fetchMovieDetails();
    }, [movieID]);

    return { movie, sessions, reviews };
}