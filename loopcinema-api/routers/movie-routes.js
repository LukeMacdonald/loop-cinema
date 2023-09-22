module.exports = (express, app) => {
    const controller = require('../controllers/movie-controller');
    
    const router = express.Router();

    router.post('/', controller.insert);

    app.use('/movies',router)
}