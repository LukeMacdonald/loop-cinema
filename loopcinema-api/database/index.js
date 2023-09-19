const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {
    Op: Sequelize.Op
};

db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.DIALECT
});

db.user = require("./models/user.js")(db, DataTypes);
db.movie = require("./models/movie.js")(db, DataTypes);
db.review = require("./models/review.js")(db, DataTypes);
db.session = require("./models/session.js")(db,DataTypes);