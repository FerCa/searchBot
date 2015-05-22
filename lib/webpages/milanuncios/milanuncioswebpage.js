var request = require('request');
var log2out = require('log2out');
var Webpage = require('./../../webpage');
var MilanunciosScraper = require('./milanunciosscraper');

MilanunciosWebpage = function(searchUrl, injectedWebpage) {
    this.searchUrl = searchUrl;
    this.webPage = injectedWebpage || new Webpage(this.searchUrl, new MilanunciosScraper());
};

MilanunciosWebpage.prototype.getAds = function (callback) {
    this.webPage.getAds(callback);
}

module.exports = MilanunciosWebpage;
