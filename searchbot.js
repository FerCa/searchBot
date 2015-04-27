var Mailer = require('./lib/mailer');
var settings = require('./settings');
var Milanuncios = require('./lib/milanuncios');


var milanuncios = new Milanuncios();

milanuncios.getAds(function (ads) {

    var mailer = new Mailer(settings);
    for(var i = 0; i < ads.length; i++) {
        mailer.send('New add in milanuncios', ads[i].getAsHTML());
    }

});

