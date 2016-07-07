var phantom = require('phantom');
var async = require('async');
var parseString = require('xml2js').parseString;
var models = require('./lib/model/models');


var sitepage = null;
var phInstance = null;

models.Hexun_xauusd.sync();

async.waterfall([function(callback){

    phantom.create()
        .then(instance => {
            phInstance = instance;
            return instance.createPage();
        })
        .then(page => {
            sitepage = page;       
            return page.open('http://gold.hexun.com/hjxh/');
        })
        .then(status => {
            console.log(status);
            return sitepage.property('content');
        })
        .then(content => {
            console.log(content);
            // sitepage.close();
            // phInstance.exit();
            callback(null,sitepage);
        })
        .catch(error => {
            console.log(error);
            phInstance.exit();
            callback(null,null);
        })

},function(sitepage,callback){

    sitepage.setting("userAgent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.86 Safari/537.36")
        .then(function(){
            sitepage.setting('userAgent').then(function(value){
                console.log(value);
            });
        });
    var ts = new Date().getTime();

    sitepage.open('http://quote.forex.hexun.com/ForexXML/MI_CUR5/MI_CUR5_5_xauusd.xml?&ts='+ts)
        .then(status => {
            console.log(status);
            return sitepage.property('content');
        })
        .then(content => {
            // console.log(content);
            parseString(content, function (err, result) {
                // console.dir(result.HexunQuote.MiniFlash[0].Commodity[0].HistoryMinute);
                var rst = result.HexunQuote.MiniFlash[0].Commodity[0].HistoryMinute;
                for(var i=0;i<rst.length;i++){
                    console.log(rst[i].TradeDate[0]);
                    console.log(rst[i].Minute[0].Item.length);
                    var min_rst = rst[i].Minute[0].Item;
                    for(var j = 0;j<min_rst.length;j++){
                        var date_str = new Date().getFullYear()+'-'+min_rst[j].ST[0].substr(0,2)+'-'+min_rst[j].ST[0].substr(2,2)+' '+min_rst[j].ST[0].substr(4,2)+':'+min_rst[j].ST[0].substr(6,2)+':00';
                        console.log(new Date(date_str));
                        console.log(min_rst[j].ST[0]+'---'+min_rst[j].PR[0]);
                        models.Hexun_xauusd.create({
                            price:min_rst[j].PR[0],
                            date : new Date(date_str).getTime(),
                            timestamp:new Date(date_str).getTime()
                        });
                    }
                }
            });
            sitepage.close();
            phInstance.exit();
            callback(null);
        })        

}],function(err, result){

})

