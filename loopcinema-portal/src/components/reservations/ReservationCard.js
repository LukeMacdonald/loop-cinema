import React, { useEffect, useState } from "react";
import { getReservationDetails } from "../../data/repository";
import { formatFullDate } from "../../utils/dates";

function ReservationCard(props) {
    const reservation = props.reservation;
    const [data, setData] = useState(null); // Initialize data state as null

    useEffect(() => {
        async function fetchData() {
            try {
                const responseData = await getReservationDetails(reservation.reserveration_id); // Correct typo here
                setData(responseData);
            } catch (error) {
                console.error("Error fetching reservation details:", error);
            }
        }
        fetchData();
    }, [reservation]);

    // Render loading state if data is not available yet
    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ margin: '1rem', backgroundColor: '#393E46', padding: '1rem', borderRadius: '10px', color: 'white' }}>
            <h4>{data.movie.title}</h4>
            <h6><strong>{data.reservation.total_seats} Seats Booked</strong> </h6>
            <h6><strong>Movie Showing:</strong> {formatFullDate(data.session.session_time)}</h6>
        </div>
    );
}

export default ReservationCard;
