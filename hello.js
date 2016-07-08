var page = require('webpage').create();

var cookies = null;
page.onResourceRequested = function(request) {
 // console.log('Request ' + JSON.stringify(request, undefined, 4));
};
page.onResourceReceived = function(response) {
  // console.log('Receive ' + JSON.stringify(response, undefined, 4));
  // console.log(phantom.cookies)
    // cookies = phantom.cookies;
    // console.log(response.url);
    if(response.url.indexOf('gold_flash')!=-1){
        console.log(response.url);
    }
};


page.open('http://gold.hexun.com/hjxh/');




setTimeout(function(){
    console.log('kaishi')
    // phantom.addCookie(cookies);
    page.customHeaders = {
        "Referer" : "http://flashquote.stock.hexun.com/flash/exchange/gold_flash.html?name=%e6%ac%a7%e5%85%83%e7%be%8e%e5%85%83&market=5&code=XAUUSD",
        "Accept" : "*/*",
        "X-Requested-With":"ShockwaveFlash/21.0.0.216",
        "User-Agent" : "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.86 Safari/537.36"
    };

    page.open('http://quote.forex.hexun.com/ForexXML/QTMI/QTMI_5_xauusd.xml?&ts=1467935524565', function (status) {
    // page.open('http://quote.forex.hexun.com/ForexXML/MI_CUR5/MI_CUR5_5_xauusd.xml?&ts=1467859252335', function (status) {

      var content = page.content;
      console.log('Content: ' + content);
      phantom.exit();
    })
},3000)