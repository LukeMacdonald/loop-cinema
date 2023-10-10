
module.exports = (express, app) => {
    const controller = require('../controllers/admin-controller');
    
    const router = express.Router();

    router.post("/login", controller.loginAdmin)

    router.get("/users" ,controller.getAllUsers)

    router.put('/user/block', controller.updateBlock)

    router.put("/review/delete/:review_id", controller.deleteReview)

    app.use('/admin', router);

}