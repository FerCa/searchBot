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
    this.webPage.getAds(function(ads) {
        deferred.resolve(ads);
    });
    return deferred.promise;
}

module.exports = WallapopWebpage;
