module.exports = (db, DataTypes) =>
db.sequelize.define("reservation",{
    reserveration_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
    },
    total_seats:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});