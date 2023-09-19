module.exports = (db, DataTypes) =>
  db.sequelize.define("review",{
    review_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    rating:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    comment:{
        type: DataTypes.STRING(600),
        allowNull: false
    }, 
});