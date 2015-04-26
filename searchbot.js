var request = require('request');
var Mailer = require('./lib/mailer');
var Ad = require('./lib/ad');
var MilanunciosScraper = require('./lib/milanunciosscraper');
var settings = require('./settings');


request('http://www.milanuncios.com/instrumentos-musicales/guitarra-zurdo.htm?desde=400&hasta=2500&dias=1', function (error, response, body) {
    if (!error && response.statusCode == 200) {

        var milanunciosScraper = new MilanunciosScraper();
        var ads = milanunciosScraper.extractAds(body);

        var mailer = new Mailer(settings);
        for(var i = 0; i < ads.length; i++) {
            mailer.send('New add in milanuncios', ads[i].getAsHTML());
        }

    }
});

