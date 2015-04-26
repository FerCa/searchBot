var MilanunciosScraper = require('./milanunciosscraper');
var request = require('request');
var log2out = require('log2out');

Milanuncios = function(injectedRequest, injectedLogger) {
    this.request = injectedRequest || request;
    this.logger = injectedLogger || log2out.getLogger('Milanuncios');
    this.milanunciosSearchUrl = 'http://www.milanuncios.com/instrumentos-musicales/guitarra-zurdo.htm?desde=400&hasta=2500&dias=1';
};

Milanuncios.prototype.getAds = function () {
    var self = this;
    this.request(this.milanunciosSearchUrl, function (error, response, body) {
        if (!error) {

        } else {
            self.logger.error('Error requesting: ' + self.milanunciosSearchUrl);
        }
    });
}

module.exports = Milanuncios;