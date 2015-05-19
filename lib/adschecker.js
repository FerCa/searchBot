var log2out = require('log2out');
var settings = require('../settings');
var Mailer = require('./mailer');
var SeenAds = require('./seenads');

AdsChecker = function(injectedSeenAds, injectedMailer) {
    this.seenAds = injectedSeenAds ||new SeenAds(settings.mongo);
    this.mailer = injectedMailer || new Mailer(settings);

};

AdsChecker.prototype.checkAndNotify = function (ads) {
    var self = this;
    for(var i = 0; i < ads.length; i++) {
        var ad = ads[i];
        this.seenAds.alreadySeen(ad, function(seen, providedAd) {
            if(!seen) {
                self.mailer.send('New add', providedAd.getAsHTML());
            }
        });
    }
};

module.exports = AdsChecker;
