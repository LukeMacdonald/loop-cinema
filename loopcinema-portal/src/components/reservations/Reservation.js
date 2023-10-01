import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { findMovieByID, getSessionDetails, createReservation } from '../../data/repository';

function Reservation() {
    const { movieID, sessionID } = useParams();
    const [movie, setMovie] = useState({});
    const [session, setSession] = useState({});
    const [fields, setFields] = useState({
        seats: 0,
    });

    const navigate = useNavigate(); // Get the navigate function from React Router

    useEffect(() => {
        async function fetchData() {
            const currentMovie = await findMovieByID(movieID);
            const sessionDetails = await getSessionDetails(sessionID);
            setMovie(currentMovie);
            setSession(sessionDetails);
        }

        fetchData();
    }, [movieID, sessionID]);

    const handleInputChange = (e) => {
        setFields({ ...fields, [e.target.name]: parseInt(e.target.value, 10) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(fields.seats);
        console.log(sessionID);
        console.log(localStorage.getItem("user"));
        
        try {
            await createReservation(session, localStorage.getItem("user"), fields.seats);
            // If the reservation is successful, navigate to a new page (for example, a confirmation page)
            navigate('/'); // Navigate to the confirmation page
        } catch (error) {
            console.error('Reservation failed:', error);
            // Handle reservation failure, show an error message or take appropriate action
        }
    };

    const isReserveButtonDisabled = session.available_seats === 0;

    return (
        <div>
            <h1>{movie.title}</h1>
            <p>Movie ID: {movieID}</p>
            <p>Session ID: {session.session_id}</p>
            <p>Session Time: {session.session_time}</p>
            <p>Available Seats: {session.available_seats}</p>

            <form onSubmit={handleSubmit}>
                <label>
                    Number of Seats:
                    <input
                        type="number"
                        name="seats"
                        min="0"
                        max={session.available_seats}
                        value={fields.seats}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit" disabled={isReserveButtonDisabled}>Reserve</button>
            </form>
        </div>
    );
}

export default Reservation;
