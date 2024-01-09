import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { findMovieByID, getSessionDetails, createReservation } from '../../../data/repository';
import {formatFullDate} from '../../../utils/dates';
import {useAuth} from "../../../AuthContext"
import MovieDetails from '../../movies/movie/MovieDetails';

function Reservation() {
    const { movieID, sessionID } = useParams();
    const [movie, setMovie] = useState({});
    const [session, setSession] = useState({});
    const [fields, setFields] = useState({
        seats: 0,
    });

    const { state } = useAuth();

    const isLoggedIn = state.isLoggedIn

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
        try {
            await createReservation(session, localStorage.getItem("user"), fields.seats);
            // If the reservation is successful, navigate to a new page (for example, a confirmation page)
            navigate(`/movie/details/${movieID}`) // Navigate to the confirmation page
        } catch (error) {
            console.error('Reservation failed:', error);
            // Handle reservation failure, show an error message or take appropriate action
        }
    };

    const isReserveButtonDisabled = session.available_seats === 0;

    return (
        <div className='row mx-4'>
        <div className='col-md-4'>
            <img src={movie.poster} style={{ width: '75%', borderRadius: '20px', marginBottom: '2rem' }} alt="" />
            <MovieDetails movie={movie} />
        </div>
        <div className='col-md-7' style={{ margin: '2rem' }}>
            <button className='btn btn-secondary' onClick={() => navigate(-1)}><i className="fa-solid fa-left-long" style={{marginRight:'1rem'}}></i> Back</button>
            <div className='container' style={{backgroundColor:'white', color:'black', textAlign:'left', borderRadius:'15px', width:'80%', padding:' 2rem 2rem 2rem 2rem', marginTop:'2rem'}}>
            <h2 style={{marginBottom:'2rem'}}>Booking Details</h2> 
            <p><strong>Movie:</strong> {movie.title}</p>
            <p><strong>Time:</strong> {formatFullDate(session.session_time)}</p>
            <p><strong>Seats Available:</strong> {session.available_seats}</p>
            <hr/>
            {isLoggedIn ? (

            <form onSubmit={handleSubmit} style={{textAlign:'center'}}>
                <label style={{marginRight:'1rem'}}> Number of Seats:</label>
                    <input
                    className='form-group'
                        type="number"
                        name="seats"
                        min="0"
                        max={session.available_seats}
                        value={fields.seats}
                        onChange={handleInputChange}
                    />
                
                <br/>
                
                <button className="btn btn-primary"type="submit" disabled={isReserveButtonDisabled} style={{marginTop:'2rem', width:'33%'}}>Reserve</button>
            </form>
            ) : (
                <div><a href='/signin'>Sign in to leave a book reservation</a></div>
              )}

            </div>
        </div>
        </div>
    );
}

export default Reservation;
