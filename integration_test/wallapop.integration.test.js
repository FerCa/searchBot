var WallapopScraper = require('../lib/scrapers/wallapopscraper');
var Webpage = require('../lib/webpage');
var WebpagesTestHelpers = require('./testhelpers/webpagestesthelpers');

suite('Wallapop Integration Test', function() {
    this.timeout(10000);
    var sut, webpagesTestHelpers;

    setup(function() {
        webpagesTestHelpers = new WebpagesTestHelpers();
        sut = new Webpage('http://es.wallapop.com/search?kws=guitarra+zurdo&lat=41.387245&lng=2.191056', new WallapopScraper());
    });

    test('Should get all the required values from a wallapop search', function(done) {
        webpagesTestHelpers.CallGetAdsAndCheckFirstAd(sut, done);
    });

});