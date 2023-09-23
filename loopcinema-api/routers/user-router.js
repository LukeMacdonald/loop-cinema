
module.exports = (express, app) => {
    const controller = require('../controllers/user-controller');
    
    const router = express.Router();

    router.post('/', controller.create);

    router.put('/', controller.update)

    router.delete('/:id', controller.delete)

    router.get('/profile/:username', controller.select)

    router.get('/:email', controller.getByEmail);

    router.post("/login", controller.login)

    app.use('/user', router);

}