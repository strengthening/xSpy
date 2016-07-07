var Sequelize = require('sequelize');
var db_conf = require('../../config/db');

var sequelize=(function(){
    var unique=null;
    function getInstance(){
        if(unique===null){
            unique = new Construct();
        }

        return unique;
    }

    function Construct(){
        var sequelize = new Sequelize(db_conf.db_name, db_conf.db_username, db_conf.db_password, {
            host: db_conf.db_host,
            dialect: 'mysql',
            timestamps: false,
            timezone: '+08:00',
            pool: {
                max: 10,
                min: 0,
                idle: 10000
            },
            logging:false,
            define: {

                charset: 'utf8',
                collate: 'utf8_general_ci'
            }
        });
        return sequelize;
    }

    return getInstance();
})();

module.exports = sequelize;