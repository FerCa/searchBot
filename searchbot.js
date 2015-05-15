var Mailer = require('./lib/mailer');
var settings = require('./settings');
var Milanuncios = require('./lib/milanuncios');
var SeenAds = require('./lib/seenads');


var milanuncios = new Milanuncios();
var seenAds = new SeenAds(settings.mongo);

milanuncios.getAds(function (ads) {

    var mailer = new Mailer(settings);

    for(var i = 0; i < ads.length; i++) {
        var ad = ads[i];
        seenAds.alreadySeen(ad, function(seen) {
            if(!seen) {
                mailer.send('New add in milanuncios', ad.getAsHTML());
            }
        });
    }

});

