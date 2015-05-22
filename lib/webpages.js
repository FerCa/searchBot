var log2out = require('log2out');
var AdsChecker = require('./adschecker');

Webpages = function(name, injectedAdsChecker) {
    this.adsChecker = injectedAdsChecker ||new AdsChecker(name);
    this.webpages = [];
};

Webpages.prototype.add = function (webpage) {
    this.webpages.push(webpage);
};

Webpages.prototype.process = function () {
    var self = this;
    for(var j = 0; j < this.webpages.length; j++) {
        this.webpages[j].getAds(function (ads) {
            self.adsChecker.checkAndNotify(ads);
        });
    }
};


module.exports = Webpages;
