const db = require('../database')
const { validationResult } = require('express-validator');

exports.createReservation = async (req,res) => {
    try{
        const reservation = await db.reservation.create({
            session_id: req.body.session_id,
            username: req.body.username,
            total_seats: req.body.total_seats
        });

        const session = await db.session.findByPk(req.body.session_id);
        
        session.available_seats -= req.body.total_seats
        
        await session.save();
        res.status(201).json(reservation);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'An error occurred while creating the review.' })
    }
}
