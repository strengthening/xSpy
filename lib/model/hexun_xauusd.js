var Sequelize = require('sequelize');
var sequelize = require('./_base');

var Hexun_xauusd = sequelize.define('hexun_xauusd',{  
  uuid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },    
  price : {
    type: Sequelize.FLOAT,
    field:'price'     
  },
  date : {
    type: Sequelize.DATE,
    field:'date'     
  },  
  timestamp : {
    type:Sequelize.STRING,
    field:'timestamp'
  }
},{timestamps: false,freezeTableName:true});


module.exports = Hexun_xauusd;