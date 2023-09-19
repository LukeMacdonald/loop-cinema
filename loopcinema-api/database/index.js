const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {
    Op: Sequelize.Op
};

db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.DIALECT
});


// Define Models 
db.user = require("./models/user.js")(db, DataTypes);
db.movie = require("./models/movie.js")(db, DataTypes);
db.review = require("./models/review.js")(db, DataTypes);
db.session = require("./models/session.js")(db,DataTypes);

// Define Relationships
db.review.belongsTo(db.user,{
    foreignKey: 'user_id',
    allowNull: false,
});

db.review.belongsTo(db.movie,{
    foreignKey: 'movie_id',
    allowNull: false
});

db.session.belongsTo(db.movie,{
    foreignKey: 'movie_id',
    allowNull: false,
});

db.session.hasMany(db.seat,{
    foreignKey: 'seat_id',
    allowNull: false,
});

db.session.belongsTo(db.session,{
    foreignKey: 'session_id',
    allowNull: false,
});
