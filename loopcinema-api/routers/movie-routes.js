module.exports = (express, app) => {
    const controller = require('../controllers/movie-controller');
    
    const router = express.Router();

    router.post('/', controller.insert);

    router.get('/:id', controller.select);

    app.use('/movies',router)
}