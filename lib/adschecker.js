var log2out = require('log2out');
var settings = require('../settings');
var Mailer = require('./mailer');
var SeenAds = require('./seenads');

AdsChecker = function(name, injectedSeenAds, injectedMailer) {
    this.name = name;
    this.notSeenAds = [];
    this.seenAds = injectedSeenAds ||new SeenAds(settings.mongo);
    this.mailer = injectedMailer || new Mailer(settings);

};

AdsChecker.prototype.checkAndNotify = function (ads) {
    var self = this;
    for(var i = 0; i < ads.length; i++) {
        var ad = ads[i];
        this.seenAds.alreadySeen(ad, function(seen, providedAd) {
            if(!seen) {
                //@TODO: Create a abstract notifier instead of using mailer.send
                self.mailer.send('New add for ' + self.name, providedAd.getAsHTML());
            }
        });
    }
};

AdsChecker.prototype.notify = function () {
    var html = this.notSeenAds.reduce(function(prev, curr, index, arr) {
        return prev + arr[index].getAsHTML();
    }, '');
    //@TODO: Create a abstract notifier instead of using mailer.send
    this.mailer.send('New add for ' + this.name, html);
    this.notSeenAds = [];
};

AdsChecker.prototype.add = function (ads) {
    var self = this;
    for(var i = 0; i < ads.length; i++) {
        var ad = ads[i];
        this.seenAds.alreadySeen(ad, function(seen, providedAd) {
            if(!seen) {
                self.notSeenAds.push(providedAd);
            }
        });
    }
};

module.exports = AdsChecker;
