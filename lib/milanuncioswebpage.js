var request = require('request');
var log2out = require('log2out');
var Webpage = require('./webpage');
var MilanunciosScraper = require('./milanunciosscraper');

MilanunciosWebpage = function(injectedWebpage) {
    this.searchUrl = 'http://www.milanuncios.com/instrumentos-musicales/guitarra-zurdo.htm?desde=400&hasta=2500&dias=1';
    this.webPage = injectedWebpage || new Webpage(this.searchUrl, new MilanunciosScraper());
};

MilanunciosWebpage.prototype.getAds = function (callback) {
    this.webPage.getAds(callback);
}

module.exports = MilanunciosWebpage;
