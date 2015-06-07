var log2out = require('log2out');
var settings = require('../settings');
var SeenAds = require('./seenads');
var Q = require('q');

AdsChecker = function(injectedSeenAds, injectedQ) {
    this.promises = [];
    this.seenAds = injectedSeenAds ||new SeenAds(settings.mongo);
    this.Q = injectedQ || Q;
    this.logger = log2out.getLogger('AdsChecker');
};

AdsChecker.prototype.process = function (callback) {
    var self = this;
    this.Q.all(this.promises).then(function(result) {
        self.logger.trace('AdsChecker: Q.all resolved:', result);
        var html = result.reduce(function(prev, curr, index, arr) {
            if(arr[index].seen === false) {
                return prev + arr[index].ad.getAsHTML();
            } else {
                return prev;
            }
        }, '');
        callback(html);
        self.promises = [];
    }, function(error) {
        self.logger.error('Error in Q.all', error);
    });

};

AdsChecker.prototype.add = function (ads) {
    var self = this;
    for(var i = 0; i < ads.length; i++) {
        var ad = ads[i];
        var promise = this.seenAds.alreadySeen(ad);
        this.promises.push(promise);
    }
};

module.exports = AdsChecker;
