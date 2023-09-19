const { DataTypes } = require("sequelize");

sequelize.define("user", {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username:{
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    password:{
        type: DataTypes.STRING(60),
        allowNull: false
    },
    name:{
        type: DataTypes.STRING(255),
        allowNull: false
    }
  },
  {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });