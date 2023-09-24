module.exports = (express, app) => {
    const controller = require('../controllers/review-controller');
    
    const router = express.Router();

    router.post('/', controller.createReview);

    router.put('/', controller.updateReview);

    router.delete('/:review_id', controller.deleteReview)

    router.get('/movie/:movie_id', controller.getReviewsByMovieID);

    app.use('/reviews',router)
}