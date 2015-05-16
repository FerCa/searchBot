var request = require('request');
var log2out = require('log2out');

Webpage = function(url, scraper, injectedRequest, injectedLogger) {
    this.request = injectedRequest || request;
    this.logger = injectedLogger || log2out.getLogger('Webpage');
    this.scraper = scraper;
    this.searchUrl = url;
};

Webpage.prototype.getAds = function (callback) {
    this.logger.info('Checking for ads in: ' + this.searchUrl);
    var self = this;
    this.request(this.searchUrl, function (error, response, body) {
        if (!error  && response.statusCode == 200) {
            var ads = self.scraper.extractAds(body);
            callback(ads);
        } else {
            self.logger.error('Error requesting: ' + self.searchUrl);
        }
    });
}

module.exports = Webpage;