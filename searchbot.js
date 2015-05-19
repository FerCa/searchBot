var settings = require('./settings');
var MilanunciosWebpage = require('./lib/milanuncioswebpage');
var WallapopWebpage = require('./lib/wallapopwebpage');
var AdsChecker = require('./lib/adschecker');

var webpages = [
    new MilanunciosWebpage('http://www.milanuncios.com/instrumentos-musicales/guitarra-zurdo.htm?desde=400&hasta=2500&dias=1'),
    new WallapopWebpage('http://es.wallapop.com/search?kws=guitarra+zurdo&lat=41.387245&lng=2.191056')
];

var adsChecker = new AdsChecker();

for(var j = 0; j < webpages.length; j++) {
    webpages[j].getAds(function (ads) {
        adsChecker.checkAndNotify(ads);
    });
}

