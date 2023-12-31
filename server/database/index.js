const { Sequelize, DataTypes } = require("sequelize");
// const config = require("./config.js");
const {hashedPassword} = require('../utils.js')
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];
const db = {
};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Define Models 
db.user = require("./models/user.js")(db, DataTypes);
db.movie = require("./models/movie.js")(db, DataTypes);
db.review = require("./models/review.js")(db, DataTypes);
db.session = require("./models/session.js")(db,DataTypes);
db.reservation = require('./models/reservation.js')(db,DataTypes);
db.admin = require('./models/admin.js')(db,DataTypes);

// Define Relationships
db.review.belongsTo(db.user,{
    foreignKey: 'username',
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

db.reservation.belongsTo(db.user,{
    foreignKey:'username',
    allowNull: false,
});
db.reservation.belongsTo(db.session,{
    foreignKey:'session_id',
    allowNull: false
})


db.sync = async () => {
    try {
        // Sync schema.
        await db.sequelize.sync();
        if (env == "development"){
            // Seed data.
            await seedData();
        }
      
    } catch (error) {
        console.error('Error syncing database or seeding data:', error);
    }
};

async function seedData() {
    let count = await db.user.count();
    if (count == 0){
        console.log("Seeding user data...");
        await db.user.bulkCreate([
            {
                username:'lukemacdonald.09',
                password:await hashedPassword('abc123'),
                name:'Luke Macdonald',
                email: 'lukemacdonald09@outlook.com'
            }
        ]);
    }
    count = await db.movie.count();
    console.log("Seeding data...");
  
    // Only seed data if necessary.
    if (count == 0){
        console.log("Seeding movie data...");
        // Create movie records.
        await db.movie.bulkCreate([
            {
                title: "Barbie",
                description: "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.",
                director: "Greta Gerwig",
                release_date: "2023-07-02",
                poster: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQaoW2gxmJFDPtqfC9pGL6Rdist9nH9ntMLV7XR1FXpaQj1VrGT",
                duration: 114,
                genre: "Comedy"
            },
            {
                title: "Avengers: Endgame",
                description: "After the devastating events of Infinity War, the Avengers assemble once again to undo the actions of Thanos and restore balance to the universe.",
                director: "Anthony Russo, Joe Russo",
                release_date: "2029-04-26",
                poster: "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg",
                duration: 181,
                genre: "Action"
            },
        ]);
    }
    count = await db.session.count();
    if (count == 0){
        console.log("Seeding session data...");
        await db.session.bulkCreate([
            {
                "movie_id": 1,
                "session_time":"2023-09-24T10:00:00"
            },
            {
                "movie_id": 1,
                "session_time":"2023-09-24T13:00:00"
            },
            {
                "movie_id": 1,
                "session_time":"2023-09-25T12:30:00"
            },
            {
                "movie_id": 2,
                "session_time":"2023-09-24T12:00:00"
            },
            {
                "movie_id": 2,
                "session_time":"2023-09-24T14:30:00"
            },
            {
                "movie_id": 2,
                "session_time":"2023-09-24T19:45:00"
            }
        ])
    }

    count = await db.review.count();

    if(count === 0){
        await db.review.bulkCreate([
            {
                rating: 5,
                comment: "This was a great movie!",
                username: "lukemacdonald.09",
                movie_id: 1
            },
            {
                rating: 1,
                comment: "Not a very good movie!",
                username: "lukemacdonald.09",
                movie_id: 2
            }
        ]);
    }
    count = await db.admin.count();
    if (count == 0){
        console.log("Seeding user data...");
        await db.admin.bulkCreate([
            {
                username:'admin',
                password:await hashedPassword('admin'),
                name:'Administrator',
                email: 'admin@gmail.com'
            }
        ]);
    }
   

    
}

module.exports = db;
