module.exports = (db, DataTypes) => 
  db.sequelize.define('seat', {
    seat_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    booked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Use defaultValue instead of default
    }
  }); 