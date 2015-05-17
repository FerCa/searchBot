var Mailer = require('./lib/mailer');
var settings = require('./settings');
var MilanunciosWebpage = require('./lib/milanuncioswebpage');
var WallapopWebpage = require('./lib/wallapopwebpage');
var SeenAds = require('./lib/seenads');


var webpages = [
    new MilanunciosWebpage('http://www.milanuncios.com/instrumentos-musicales/guitarra-zurdo.htm?desde=400&hasta=2500&dias=1'),
    new WallapopWebpage('http://es.wallapop.com/search?kws=guitarra+zurdo&lat=41.387245&lng=2.191056')
];
var seenAds = new SeenAds(settings.mongo);
var mailer = new Mailer(settings);

for(var j = 0; j < webpages.length; j++) {
    webpages[j].getAds(function (ads) {
        for(var i = 0; i < ads.length; i++) {
            var ad = ads[i];
            seenAds.alreadySeen(ad, function(seen, providedAd) {
                if(!seen) {
                    mailer.send('New add', providedAd.getAsHTML());
                }
            });
        }

    });
}

