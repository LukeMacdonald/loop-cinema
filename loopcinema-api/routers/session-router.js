module.exports = (express, app) => {
    
    const controller = require('../controllers/session-controller');

    const router = express.Router();

    router.post('/', controller.create);

    router.get('/movie/:movie_id', controller.allByMovieID);

    app.use('/sessions', router)
}

