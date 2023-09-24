
module.exports = (express, app) => {
    const controller = require('../controllers/admin-controller');
    
    const router = express.Router();

    router.post("/login", controller.loginAdmin)

    app.use('/admin', router);

}