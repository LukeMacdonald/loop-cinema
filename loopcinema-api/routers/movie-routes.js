module.exports = (express, app) => {
    const controller = require('../controllers/movie-controller');
    
    const router = express.Router();

    router.post('/', controller.insert);

    router.get('/', controller.all);

    router.get('/:movie_id', controller.select);

    router.post('/review', controller.reviewInsert);

    router.get('/review/:movie_id', controller.movieReviews);

    router.post('/session', controller.sessionInsert);

    router.get('/session/:movie_id', controller.movieSessions);

    app.use('/movies',router)
}

