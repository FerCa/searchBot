var MilanunciosScraper = require('./milanunciosscraper');
var request = require('request');

Milanuncios = function(injectedRequest) {
    this.request = injectedRequest || request;
};

Milanuncios.prototype.getAds = function () {
    this.request('http://www.milanuncios.com/instrumentos-musicales/guitarra-zurdo.htm?desde=400&hasta=2500&dias=1', function (error, response, body) {

    });
}

module.exports = Milanuncios;