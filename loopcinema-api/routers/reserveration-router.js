module.exports = (express, app) => {
    const controller = require('../controllers/reservation-controller');
    
    const router = express.Router();

    router.post('/', controller.createReservation);

    router.get('/users/:username', controller.getReservationsByUsername);

    router.get('/details/:reservation_id', controller.getReservationFullDetails)

    app.use('/reservations',router)
}