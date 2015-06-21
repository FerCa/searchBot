var log2out = require('log2out');
var Webpage = require('./../../webpage');
var MilanunciosScraper = require('./milanunciosscraper');
var Q = require('q');

MilanunciosWebpage = function(searchUrl, injectedWebpage) {
    this.searchUrl = searchUrl;
    this.webPage = injectedWebpage || new Webpage(this.searchUrl, new MilanunciosScraper());
};

//@TODO: Duplication, extract superclass
MilanunciosWebpage.prototype.getAds = function () {
    var deferred = Q.defer();
    this.webPage.getAds(function(error, ads) {
        if (!error) {
            deferred.resolve(ads);
        } else {
            deferred.reject(error);
        }
    });
    return deferred.promise;
};

module.exports = MilanunciosWebpage;
