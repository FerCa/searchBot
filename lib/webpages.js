var log2out = require('log2out');
var AdsChecker = require('./adschecker');
var Q = require('q');

Webpages = function(injectedAdsChecker, injectedQ) {
    this.adsChecker = injectedAdsChecker ||new AdsChecker();
    this.Q = injectedQ || Q;
    this.webpages = [];
    this.logger = log2out.getLogger('SeenAds');
};

Webpages.prototype.add = function (webpage) {
    this.webpages.push(webpage);
};

Webpages.prototype.process = function (callback) {
    var self = this;
    var getAdsPromises = [];
    for(var j = 0; j < this.webpages.length; j++) {
        var promise = this.webpages[j].getAds();
        promise.then(
            function(ads) {
                self.logger.trace('getAds resolved, calling adsChecker.add with:', ads);
                self.adsChecker.add(ads);
            },
            function(error) {
                self.logger.error(error);
            }
        );
        getAdsPromises.push(promise);
    }

    this.Q.all(getAdsPromises).then(function(ads) {
        self.logger.trace('Webpages: Q.all resolved, calling adsChecker.notify');
        self.adsChecker.process(callback);
    }, function(error) {
        self.logger.error('Error in Q.all:', error);
    });
};

module.exports = Webpages;
