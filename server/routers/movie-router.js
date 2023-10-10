module.exports = (express, app) => {
    const controller = require('../controllers/movie-controller');
    
    const router = express.Router();

    router.post('/', controller.createMovie);

    router.get('/', controller.getAllMovies);

    router.get('/movie/:movie_id', controller.getMovieByID);

    router.put('/:movie_id', controller.updateMovie);

    router.delete('/:movie_id', controller.deleteMovie);

    app.use('/movies',router)
}

