module.exports = (express, app) => {
    const controller = require('../controllers/reservation-controller');
    
    const router = express.Router();

    router.post('/', controller.createReservation);

    app.use('/reservations',router)
}