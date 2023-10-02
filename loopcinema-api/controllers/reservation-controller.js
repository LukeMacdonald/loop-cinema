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
