const { DataTypes } = require("sequelize");

const Movie = sequelize.define("movie", {
    movie_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title:{
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    release_date:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    poster:{
        type: DataTypes.BLOB,
        allowNull: false
    },
    duration:{
        type:DataTypes.INTEGER,
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING(40),
        allowNull: false
    }
  },
  {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });

module.exports = Movie;