import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { formatTime, formatDate } from '../utils/dates';
import { useNavigate } from 'react-router-dom';

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
    const movie = props.movie;
    const sessions = props.sessions;
    const username = localStorage.getItem("user")
    const groupedSessions = groupSessionsByDate(sessions);
    const [selectedDate, setSelectedDate] = useState(null);
    const navigate = useNavigate();

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
        if (selectedDate === date) {
            // If the selected date is clicked again, hide the sessions
            setSelectedDate(null);
        } else {
            setSelectedDate(date);
        }
    };

    return (
        <div>
            <h2>Sessions</h2>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {Object.keys(groupedSessions).map((date, index) => (
                    <Button key={index} onClick={() => handleDateSelection(date)} style={{ margin: '2rem 0.5rem 0 ' }}>
                        {date}
                    </Button>
                ))}
            </div>
            <hr />
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                {selectedDate &&
                    groupedSessions[selectedDate].map((session, sessionIndex) => (
                        <Button
                            key={sessionIndex}
                            style={{ margin: '2rem 0.5rem 0 ' }}
                            onClick={() => handleReservation(session.session_id)} // Pass a function reference here
                        >
                            {formatTime(session.session_time)}
                        </Button>
                    ))}
            </div>
        </div>
    );
}

export default MovieSessions;