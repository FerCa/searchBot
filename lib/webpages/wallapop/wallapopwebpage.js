var request = require('request');
var log2out = require('log2out');
var Webpage = require('./../../webpage');
var WallapopScraper = require('./wallapopscraper');

WallapopWebpage = function(searchUrl, injectedWebpage) {
    this.searchUrl = searchUrl;
    this.webPage = injectedWebpage || new Webpage(this.searchUrl, new WallapopScraper());
};

WallapopWebpage.prototype.getAds = function (callback) {
    this.webPage.getAds(callback);
}

module.exports = WallapopWebpage;
