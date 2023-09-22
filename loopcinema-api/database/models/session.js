module.exports = (db, DataTypes) =>

db.sequelize.define('session',{
    session_id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    session_time:{
        type: DataTypes.DATE,
        allowNull:false
    },
});

