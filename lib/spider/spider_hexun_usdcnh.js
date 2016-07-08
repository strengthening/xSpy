var phantom = require('phantom');
var async = require('async');
// var parseString = require('xml2js').parseString;
var models = require('../../lib/model/models');
var dateFormat = require('dateformat');


var sitepage = null;
var phInstance = null;

exports.getData = function(){
    async.waterfall([function(callback){

        phantom.create()
            .then(instance => {
                phInstance = instance;
                return instance.createPage();
            })
            .then(page => {
                sitepage = page;
                sitepage.setting("userAgent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.86 Safari/537.36")   
                return page.open('http://quote.forex.hexun.com/USDCNH.shtml');
            })
            .then(status => {
                console.log(status);
                return sitepage.property('content');
            })
            .then(content => {
                // console.log(content);
                callback(null,sitepage);
            })
            .catch(error => {
                console.log(error);
                phInstance.exit();
                callback(null,null);
            })

    },function(sitepage,callback){
        if(sitepage==null) callback(null);

        // var ts = new Date().getTime();

        // sitepage.open('http://webforex.hermes.hexun.com/forex/historyminute?code=FOREXUSDCNH&date=20160708')
        //     .then(status => {
        //         console.log(status);
        //         return sitepage.property('content');
        //     })
        //     .then(content => {
        //         var start_pos = content.indexOf('({');
        //         var end_pos = content.indexOf('})');
        //         // console.log(content.substring(start_pos+1,end_pos+1));
        //         var usdcnh = JSON.parse(content.substring(start_pos+1,end_pos+1));
        //         // console.log(usdcnh.Data);
        //         var usdcnh_rst = usdcnh.Data[0];
        //         for(var i=0;i<usdcnh_rst.length;i++){

        //             if(usdcnh_rst[i][0]!=0){
        //                 var dt_str = usdcnh_rst[i][0]+"";
        //                 var date = new Date(dt_str.substr(0,4)+'-'+dt_str.substr(4,2)+'-'+dt_str.substr(6,2)+' '+dt_str.substr(8,2)+':'+dt_str.substr(10,2)+':'+dt_str.substr(12,2));
        //                 console.log(date.getTime());
        //                 models.Hexun_usdcnh.findOrCreate({where: {timestamp : date.getTime()}, defaults: { value : usdcnh_rst[i][1],date : date}})
        //                 .spread(function(hexun_xauusd, created) {})
        //             }
                    
        //         }
        //         callback(null,null);
        //     })

        var start_date = new Date();
        start_date = new Date(Date.UTC(start_date.getUTCFullYear(),start_date.getUTCMonth(),start_date.getUTCDate()+1,0,0,0));

        console.log();

        sitepage.open('http://webforex.hermes.hexun.com/forex/minute?code=FOREXUSDCNH&start='+dateFormat(start_date,"yyyymmddhhMMss")+'&number=-1440&t='+new Date().getTime())
            .then(status => {
                console.log(status);
                return sitepage.property('content');
            })
            .then(content => {
                console.log(content);
                var start_pos = content.indexOf('({');
                var end_pos = content.indexOf('})');
                var usdcnh = JSON.parse(content.substring(start_pos+1,end_pos+1));
                var usdcnh_rst = usdcnh.Data[0];

                for(var i=0;i<usdcnh_rst.length;i++){

                    if(usdcnh_rst[i][0]!=0){
                        var dt_str = usdcnh_rst[i][0]+"";
                        var date = new Date(dt_str.substr(0,4)+'-'+dt_str.substr(4,2)+'-'+dt_str.substr(6,2)+' '+dt_str.substr(8,2)+':'+dt_str.substr(10,2)+':'+dt_str.substr(12,2));
                        console.log(date.getTime()+'------'+usdcnh_rst[i][1]);
                        models.Hexun_usdcnh.findOrCreate({where: {timestamp : date.getTime()}, defaults: { value : usdcnh_rst[i][1] , date : date}})
                        .spread(function(hexun_xauusd, created) {})
                    }

                }
                callback(null,null);
            })            

    }],function(err, result){
        console.log('ending');
        sitepage.close();
        phInstance.exit();
    })
}

