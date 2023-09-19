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
db.seat = require("./models/seat.js")(db,DataTypes);
db.reservation = require('./models/reservation.js')(db,DataTypes);

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

db.movie.hasMany(db.review,{
    foreignKey: 'movie_id',
    as:'reviews'
});

db.movie.hasMany(db.session,{
    foreignKey: 'movie_id',
    as:'sessions'
});

db.session.hasMany(db.seat, {
    foreignKey: 'session_id', // Corrected foreign key reference
    allowNull: false,
    as:'seats'
});
db.seat.belongsTo(db.session,{
    foreignKey: 'session_id',
    allowNull: false,
});

db.reservation.belongsTo(db.user,{
    foreignKey:'user_id',
    allowNull: false,
});

db.reservation.hasMany(db.seat, {
    foreignKey: 'reservation_id',
    allowNull: false,
    as:'seats'
});


module.exports = db;
