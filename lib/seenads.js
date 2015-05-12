var log2out = require('log2out');
var adModel = require('./mongoose/admodel');

SeenAds = function(injectedAdModel) {
    this.adModel = injectedAdModel || adModel;
};

SeenAds.prototype.alreadySeen = function (ad, callback) {
    var self = this;
    this.adModel.findOne({ 'title': ad.title, 'price': ad.price, 'link': ad.link}, function (err, foundAd) {
        if(!foundAd) {
            self.adModel.create(ad, function() {

            });
            callback(false);
        } else {
            callback(true);
        }
    });
}

module.exports = SeenAds;