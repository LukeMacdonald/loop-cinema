module.exports = (db, DataTypes) =>
  db.sequelize.define("review",{
    review_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    rating:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    comment:{
        type: DataTypes.STRING(600),
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: db.user,
          key: "user_id"
        }
    },
    movie_id:{
        type: DataTypes.INTEGER,
        references:{
            model: db.movie,
            key: "movie_id"
        }
    }
});