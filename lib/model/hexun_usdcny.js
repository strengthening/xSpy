var Sequelize = require('sequelize');
var sequelize = require('./_base');

var Hexun_usdcny = sequelize.define('hexun_usdcny',{  
    uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    },    
    value : {
        type: Sequelize.FLOAT,
        field:'value'     
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


module.exports = Hexun_usdcny;