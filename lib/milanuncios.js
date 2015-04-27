var MilanunciosScraper = require('./milanunciosscraper');
var request = require('request');
var log2out = require('log2out');

Milanuncios = function(injectedRequest, injectedLogger, injectedMilanunciosScraper) {
    this.request = injectedRequest || request;
    this.logger = injectedLogger || log2out.getLogger('Milanuncios');
    this.milanunciosScraper = injectedMilanunciosScraper || new MilanunciosScraper();
    this.milanunciosSearchUrl = 'http://www.milanuncios.com/instrumentos-musicales/guitarra-zurdo.htm?desde=400&hasta=2500&dias=1';
};

Milanuncios.prototype.getAds = function (callback) {
    this.logger.info('Checking for ads in: ' + this.milanunciosSearchUrl);
    var self = this;
    this.request(this.milanunciosSearchUrl, function (error, response, body) {
        if (!error  && response.statusCode == 200) {
            var ads = self.milanunciosScraper.extractAds(body);
            callback(ads);
        } else {
            self.logger.error('Error requesting: ' + self.milanunciosSearchUrl);
        }
    });
}

module.exports = Milanuncios;