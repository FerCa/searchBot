var WallapopWebpage = require('../lib/webpages/wallapop/wallapopwebpage');
var WebpagesTestHelpers = require('./testhelpers/webpagestesthelpers');

suite('Wallapop Integration Test', function() {
    var sut, webpagesTestHelpers;

    setup(function() {
        webpagesTestHelpers = new WebpagesTestHelpers();
        sut = new WallapopWebpage('http://es.wallapop.com/search?kws=guitarra+zurdo&lat=41.387245&lng=2.191056');
    });

    test('Should get all the required values from a wallapop search', function(done) {
        webpagesTestHelpers.CallGetAdsAndCheckFirstAd(sut, done);
    });

});