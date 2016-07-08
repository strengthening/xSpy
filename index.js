var phantom = require('phantom');

var models = require('./lib/model/models');
var spider_hexun_gold = require('./lib/spider/spider_hexun_gold');
var spider_hexun_usdcnh = require('./lib/spider/spider_hexun_usdcnh');


models.Hexun_xauusd.sync();
models.Hexun_usdcnh.sync();
models.Hexun_usdcny.sync();

setInterval(function(){
    spider_hexun_gold.getData();
    spider_hexun_usdcnh.getData();
},60000)