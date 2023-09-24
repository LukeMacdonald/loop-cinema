module.exports = (db, DataTypes) =>
  db.sequelize.define("user", {
    username: {
      type: DataTypes.STRING(255),
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    blocked: {
      type: DataTypes.BOOLEAN,
      allowNull: false, // Make it NOT NULL
      defaultValue: false, // Set the default value to false
    },
  });

