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
    available_seats:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 10
    }
    
},{
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });

