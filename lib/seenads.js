var log2out = require('log2out');
var adModel = require('./mongoose/admodel');
var mongoose = require('mongoose');
var Q = require('q');

SeenAds = function(settings, injectedAdModel, injectedLogger) {
    this.settings = settings;
    this.adModel = injectedAdModel || adModel;
    this.logger = injectedLogger || log2out.getLogger('SeenAds');
};

SeenAds.prototype._lazyConnect = function() {
    if (mongoose.connection.readyState === 0) {
        mongoose.connect('mongodb://' + this.settings.server + '/searchbot');
        this._disconnectAfterTimeout();
    }
};

SeenAds.prototype._disconnectAfterTimeout = function() {
    setTimeout(function() {
        mongoose.disconnect();
    }, this.settings.connectionTimeout);
};

SeenAds.prototype.alreadySeen = function (ad) {
    var deferred = Q.defer();
    this._lazyConnect();
    var self = this;
    this.adModel.findOne({ 'title': ad.title, 'price': ad.price, 'link': ad.link}, function (error, foundAd) {
        if(error) {
            self.logger.error('Error finding ad in DB: ' + error);
        }
        if(!foundAd) {
            self.adModel.create(ad, function(error) {
                if(error) {
                    self.logger.error('Error saving ad in DB: ' + error);
                }
            });
            deferred.resolve({seen: false, ad: ad});
        } else {
            deferred.resolve({seen: true, ad: ad});
        }
    });
    return deferred.promise;
};

module.exports = SeenAds;