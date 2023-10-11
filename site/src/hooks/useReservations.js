import { useState, useEffect } from 'react';
import { getUserReservation } from '../data/repository';

export function useReservations(username) {
    const [reservations, setReservations] = useState([]);
    useEffect(() => {
    async function fetchUserReservation() {
      try {
        const reservation = await getUserReservation(username)
        setReservations(reservation)
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchUserReservation();
  }, [username]);

  return reservations
}