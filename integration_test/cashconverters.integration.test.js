var CashconvertersScraper = require('../lib/scrapers/cashconvertersscraper');
var Webpage = require('../lib/webpage');
var WebpagesTestHelpers = require('./testhelpers/webpagestesthelpers');

suite('CashConverters Integration Test', function() {
    this.timeout(10000);
    var sut, webpagesTestHelpers;

    setup(function() {
        webpagesTestHelpers = new WebpagesTestHelpers();
        sut = new Webpage('https://webshop.cashconverters.es/catalogsearch/result/?q=guitarra', new CashconvertersScraper());
    });

    test('Should get all the required values from a cashconverters search', function(done) {
        webpagesTestHelpers.CallGetAdsAndCheckFirstAd(sut, done);
    });

});