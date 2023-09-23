module.exports = (express, app) => {
    const controller = require('../controllers/review-controller');
    
    const router = express.Router();

    router.post('/', controller.create);

    router.get('/movie/:movie_id', controller.findReviewsByMovieID);

    router.put('/', controller.update);

    router.delete('/:review_id', controller.delete)

    app.use('/reviews',router)
}