module.exports = (db, DataTypes) =>
  db.sequelize.define("movie", {
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
    director: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    release_date:{
        type: DataTypes.DATE,
        allowNull: false
    },
    poster:{
        type: DataTypes.STRING(255),
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