var assert = require('chai').assert;

WebpagesTestUtils = function(searchUrl, injectedWebpage) {
    this.searchUrl = searchUrl;
    this.webPage = injectedWebpage || new Webpage(this.searchUrl, new MilanunciosScraper());
};

WebpagesTestUtils.prototype.CallGetAdsAndCheckFirstAd = function (webpage, done) {
    webpage.getAds().then(function(ads) {
        assert.isAbove(ads.length, 0, 'No ads returned by search')
        assert.notEqual(ads[0].title, '', 'Title returned empty');
        assert.notEqual(ads[0].price, '', 'Price returned empty');
        assert.notEqual(ads[0].link, '', 'Link returned empty');
        assert.notEqual(ads[0].image, '', 'Image returned empty');
        done();
    }, function(error) {
        done(error);
    });
};

module.exports = WebpagesTestUtils;
