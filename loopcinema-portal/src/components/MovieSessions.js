import React, { useState, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { formatTime, formatDate } from '../utils/dates';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function groupSessionsByDate(sessions) {
    const groupedSessions = sessions.reduce((acc, session) => {
        const sessionDate = formatDate(session.session_time);
        if (!acc[sessionDate]) {
            acc[sessionDate] = [];
        }
        acc[sessionDate].push(session);
        return acc;
    }, {});
    return groupedSessions;
}

function MovieSessions(props) {
    const { movie, sessions } = props;
    const { state } = useAuth();
    const username = state.username;

    const groupedSessions = groupSessionsByDate(sessions);
    const [selectedDate, setSelectedDate] = useState(null);
    const containerRef = useRef(null);
    const navigate = useNavigate();

    const scrollLeft = () => {
        containerRef.current.scrollLeft -= 200; // Adjust the scroll distance as needed
    };

    const scrollRight = () => {
        containerRef.current.scrollLeft += 200; // Adjust the scroll distance as needed
    };

    const handleReservation = (sessionID) => {
        if (!username || username.trim() === "") {
            // If the username is null or empty, show an alert message
            window.alert("User must be logged in to reserve a session");
        } else {
            // If the username is not null or empty, navigate to the reservation page
            navigate(`/reservation/${encodeURIComponent(movie.movie_id)}/${encodeURIComponent(sessionID)}`);
        }
    };

    const handleDateSelection = (date) => {
        setSelectedDate(date === selectedDate ? null : date);
    };

    return (
        <div>
            <h2>Sessions</h2>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <button className='btn btn-secondary' onClick={scrollLeft} style={{marginRight:'1rem'}}>&lt;</button>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        overflowX: 'auto',
                        padding: '1rem',
                        position: 'relative',
                        flex: '1',
                    }}
                    ref={containerRef}
                >
                    {Object.keys(groupedSessions).map((date, index) => (
                        <div className='col-lg-2 col-md-3 col-5' key={index}>
                            <Button onClick={() => handleDateSelection(date)} style={{ margin: '0 0.5rem', width: '90%' }}>
                                {date}
                            </Button>
                        </div>
                    ))}
                </div>
                <button className='btn btn-secondary' onClick={scrollRight} style={{marginLeft:'1rem'}}>&gt;</button>
            </div>
            <hr />
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginBottom: '4rem' }}>
                {selectedDate &&
                    groupedSessions[selectedDate].map((session, sessionIndex) => (
                        <div className='col-md-4 col-6' key={sessionIndex}>
                            <Button style={{ margin: '2rem 0.5rem 0 ', width: '80%' }} onClick={() => handleReservation(session.session_id)}>
                                {formatTime(session.session_time)}
                            </Button>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default MovieSessions;

