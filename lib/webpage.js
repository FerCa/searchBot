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
    var options = {
        url: this.searchUrl,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.124 Safari/537.36'
        }
    };
    this.request(options, function (error, response, body) {
        if (!error  && response.statusCode == 200) {
            var ads = self.scraper.extractAds(body);
            callback(ads);
        } else {
            self.logger.error('Error requesting: ' + self.searchUrl);
        }
    });
}

module.exports = Webpage;