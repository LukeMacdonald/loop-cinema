const db = require('../database')
const { validationResult } = require('express-validator');

exports.createReservation = async (req,res) => {
    try{
        const session_id = req.body.session_id;
        const total_seats_requested = req.body.total_seats;
        const session = await db.session.findByPk(session_id);
        if (!session) {
            return res.status(404).json({ error: 'Session not found.' });
        }
        // Check if there are enough available seats
        if (total_seats_requested <= session.available_seats) {
            const reservation = await db.reservation.create({
                session_id: session_id,
                username: req.body.username,
                total_seats: total_seats_requested
            });

            // Update available seats in the session
            session.available_seats -= total_seats_requested;
            await session.save();

            res.status(201).json(reservation);
        } else {
            // Not enough available seats
            res.status(400).json({ error: 'Not enough available seats.' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'An error occurred while creating the review.' })
    }
}
exports.getReservationsByUsername = async (req, res) => {
    const username = req.params.username;

    try {
        const reservations = await db.reservation.findAll({
            where: {
                username: username
            }
        });

        if (reservations.length === 0) {
            return res.status(404).json({ error: 'No reservations found for the given username.' });
        }

        res.status(200).json(reservations);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'An error occurred while fetching reservations.' });
    }
};

exports.getReservationFullDetails = async (req, res) => {
    const reservation_id = req.params.reservation_id;

    try {
        const reservation = await db.reservation.findByPk(reservation_id);
        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found.' });
        }

        const session = await db.session.findByPk(reservation.session_id);
        if (!session) {
            return res.status(404).json({ error: 'Session not found for the reservation.' });
        }

        const movie = await db.movie.findByPk(session.movie_id);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found for the session.' });
        }

        const fullDetails = {
            reservation: reservation,
            session: session,
            movie: movie
        };

        res.status(200).json(fullDetails);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'An error occurred while fetching reservation details.' });
    }
};