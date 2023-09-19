module.exports = (db, DataTypes) =>
db.sequalize.define("reservation",{
    reserveration_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
    }
});