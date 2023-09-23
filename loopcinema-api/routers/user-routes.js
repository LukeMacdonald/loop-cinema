
module.exports = (express, app) => {
    const controller = require('../controllers/user-controller');
    
    const router = express.Router();

    router.post('/', controller.insert);

    router.put('/', controller.update)

    router.delete('/:id', controller.delete)

    router.get('/profile/:username', controller.select)

    router.get('/:email', controller.findByEmail);

    router.post("/login", controller.login)

    app.use('/user', router);

}