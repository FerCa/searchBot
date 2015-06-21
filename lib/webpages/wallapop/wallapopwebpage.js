var log2out = require('log2out');
var Webpage = require('./../../webpage');
var WallapopScraper = require('./wallapopscraper');
var Q = require('q');

WallapopWebpage = function(searchUrl, injectedWebpage) {
    this.searchUrl = searchUrl;
    this.webPage = injectedWebpage || new Webpage(this.searchUrl, new WallapopScraper());
};

//@TODO: Duplication, extract superclass
WallapopWebpage.prototype.getAds = function () {
    var deferred = Q.defer();
    this.webPage.getAds(function(error, ads) {
        if (!error) {
            deferred.resolve(ads);
        } else {
            deferred.reject(error);
        }
    });
    return deferred.promise;
}

module.exports = WallapopWebpage;
