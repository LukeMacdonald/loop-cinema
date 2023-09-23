module.exports = (express, app) => {
    const controller = require('../controllers/movie-controller');
    
    const router = express.Router();

    router.post('/', controller.create);

    router.get('/', controller.all);

    router.get('/movie/:movie_id', controller.select);

    app.use('/movies',router)
}

