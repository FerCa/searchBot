var log2out = require('log2out');
var adModel = require('./mongoose/admodel');
var mongoose = require('mongoose');

SeenAds = function(settings, injectedAdModel, injectedLogger) {
    this.settings = settings;
    this.adModel = injectedAdModel || adModel;
    this.logger = injectedLogger || log2out.getLogger('SeenAds');
    this.connected = false;
};

SeenAds.prototype._lazyConnect = function() {
    if (!this.connected) {
        mongoose.connect('mongodb://' + this.settings.server + '/searchbot');
        this.connected = true;
    }
};

SeenAds.prototype.alreadySeen = function (ad, callback) {
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
            callback(false);
        } else {
            callback(true);
        }
    });
}

module.exports = SeenAds;