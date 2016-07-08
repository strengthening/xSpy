var phantom = require('phantom');
var async = require('async');
var parseString = require('xml2js').parseString;
var models = require('../../lib/model/models');


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
                sitepage.setting("resourceTimeout", 10000)

                return page.open('http://gold.hexun.com/hjxh/');
            })
            .then(status => {
                console.log(status);
                return sitepage.property('content');
            })
            .then(content => {
                console.log(content);
                callback(null,sitepage);
            })
            .catch(error => {
                console.log(error);
                phInstance.exit();
                callback(null,null);
            })

    },function(sitepage,callback){

        if(sitepage == null) callback(null);
        var ts = new Date().getTime();

        // sitepage.open('http://quote.forex.hexun.com/ForexXML/MI_CUR5/MI_CUR5_5_xauusd.xml?&ts='+ts)
        //     .then(status => {
        //         console.log(status);
        //         return sitepage.property('content');
        //     })
        //     .then(content => {
                
        //         parseString(content, function (err, result) {
        //             var rst = result.HexunQuote.MiniFlash[0].Commodity[0].HistoryMinute;
        //             for(var i=0;i<rst.length;i++){
        //                 console.log(rst[i].TradeDate[0]);
        //                 console.log(rst[i].Minute[0].Item.length);
        //                 var min_rst = rst[i].Minute[0].Item;
        //                 for(var j = 0;j<min_rst.length;j++){

        //                     var ts = Date.UTC(new Date().getUTCFullYear(),parseInt(min_rst[j].ST[0].substr(0,2))-1,min_rst[j].ST[0].substr(2,2),min_rst[j].ST[0].substr(4,2),min_rst[j].ST[0].substr(6,2),0);
        //                     console.log(min_rst[j].ST[0]);

        //                     models.Hexun_xauusd.findOrCreate({where: {timestamp: ts}, defaults: { price : min_rst[j].PR[0],date : new Date(ts)}})
        //                     .spread(function(hexun_xauusd, created) {
        //                     })                        
        //                 }
        //             }
        //         });
        //         sitepage.close();
        //         phInstance.exit();
        //         callback(null);
        //     })

        sitepage.open('http://quote.forex.hexun.com/ForexXML/QTMI/QTMI_5_xauusd.xml?&ts='+ts)
            .then(status => {
                console.log(status);
                return sitepage.property('content');
            })
            .then(content => {
                console.log(content);
                parseString(content, function (err, result) {
                    var time_str = result.HexunQuote.MiniFlash[0].Commodity[0].Quote[0].Item[0].TM[0];
                    var start_ts =  Date.UTC(time_str.substr(0,4),parseInt(time_str.substr(4,2))-1,time_str.substr(6,2),0,0,0);

                    console.dir(time_str);
                    console.dir(start_ts);
                    console.dir(result.HexunQuote.MiniFlash[0].Commodity[0].Minute[0].Item.length);
                    var rst = result.HexunQuote.MiniFlash[0].Commodity[0].Minute[0].Item;

                    for(var i=0;i<rst.length;i++){
                        
                        var ts = start_ts+i*60*1000;
                        console.log(rst[i].PR[0]+'---------'+ts);
                        models.Hexun_xauusd.findOrCreate({where: {timestamp: ts}, defaults: { price : rst[i].PR[0],date : new Date(ts)}})
                        .spread(function(hexun_xauusd, created) {})                     
                    }
                });
                callback(null,null);
            })

    }],function(err, result){
        console.log('ending');
        sitepage.close();
        phInstance.exit();
    })
}

