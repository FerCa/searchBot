var Mailer = require('./lib/mailer');
var settings = require('./settings');
var Webpage = require('./lib/webpage');
var SeenAds = require('./lib/seenads');
var MilanunciosScraper = require('./lib/milanunciosscraper');


var webpage = new Webpage('http://www.milanuncios.com/instrumentos-musicales/guitarra-zurdo.htm?desde=400&hasta=2500&dias=1', new MilanunciosScraper());
var seenAds = new SeenAds(settings.mongo);

webpage.getAds(function (ads) {

    var mailer = new Mailer(settings);

    for(var i = 0; i < ads.length; i++) {
        var ad = ads[i];
        seenAds.alreadySeen(ad, function(seen) {
            if(!seen) {
                mailer.send('New add', ad.getAsHTML());
            }
        });
    }

});

