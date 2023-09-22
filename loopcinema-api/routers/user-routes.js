
module.exports = (express, app) => {
    const controller = require('../controllers/user-controller');
    
    const router = express.Router();

    router.post('/', controller.insert);

    router.put('/:id', controller.update)

    router.delete('/:id', controller.delete)

    // router.get('/:id', controller.select)

    router.get('/:email', controller.findByEmail);

    app.use('/user', router);

}