
module.exports = (express, app) => {
    const controller = require('../controllers/admin-controller');
    
    const router = express.Router();

    router.post("/login", controller.loginAdmin)

    router.get("/users" ,controller.getAllUsers)

    app.use('/admin', router);

}