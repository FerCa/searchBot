var log2out = require('log2out');
var adModel = require('./mongoose/admodel');

SeenAds = function(injectedAdModel) {
    this.adModel = injectedAdModel || adModel;
};

SeenAds.prototype.alreadySeen = function (ad, callback) {
    this.adModel.findOne({ 'title': ad.title, 'price': ad.price, 'link': ad.link}, function (err, foundAd) {
        if(!foundAd) {
            callback(false);
        }
    });
}

module.exports = SeenAds;