module.exports = (express, app) => {
    
    const controller = require('../controllers/session-controller');

    const router = express.Router();

    router.post('/', controller.createSession);

    router.get('/movie/:movie_id', controller.getSessionsByMovieID);

    router.get('/session/:session_id', controller.getSession)

    app.use('/sessions', router)
}

