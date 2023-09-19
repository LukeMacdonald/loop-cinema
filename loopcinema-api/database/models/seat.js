module.exports = (db, DataTypes) => {
    const Seat = db.sequelize.define('seat', {
      seat_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // Add any other seat-specific properties here
    });
  
    // Define a relationship between a seat and a session
    Seat.belongsTo(db.session, {
      foreignKey: 'session_id',
      allowNull: false,
    });
  
    return Seat;
  };