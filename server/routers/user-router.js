
module.exports = (express, app) => {
    const controller = require('../controllers/user-controller');
    
    const router = express.Router();

    router.post('/', controller.createUser);

    router.put('/', controller.updateUser)

    router.delete('/:username', controller.deleteUser)

    router.get('/profile/:username', controller.getUserByUsername)

    router.get('/:email', controller.getUserByUsername);

    router.post("/login", controller.loginUser)

    app.use('/user', router);

}