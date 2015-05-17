var Mailer = require('./lib/mailer');
var settings = require('./settings');
var MilanunciosWebpage = require('./lib/milanuncioswebpage');
var SeenAds = require('./lib/seenads');


var webpage = new MilanunciosWebpage('http://www.milanuncios.com/instrumentos-musicales/guitarra-zurdo.htm?desde=400&hasta=2500&dias=1');
var seenAds = new SeenAds(settings.mongo);

webpage.getAds(function (ads) {

    var mailer = new Mailer(settings);

    for(var i = 0; i < ads.length; i++) {
        var ad = ads[i];
        seenAds.alreadySeen(ad, function(seen, providedAd) {
            if(!seen) {
                mailer.send('New add', providedAd.getAsHTML());
            }
        });
    }

});

