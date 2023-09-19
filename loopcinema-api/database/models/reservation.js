module.exports = (db, DataTypes) =>
db.sequelize.define("reservation",{
    reserveration_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
    }
});