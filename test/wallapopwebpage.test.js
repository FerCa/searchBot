var sinon = require('sinon');
var assert = require('chai').assert;
var Webpage = require('../lib/webpage');
var WallapopWebpage = require('../lib/webpages/wallapop/wallapopwebpage');

suite('WallapopWebpage', function() {
    var sut, webPage, webPageGetAdsStub;

    setup(function() {
        var webpage = new Webpage();
        webPageGetAdsStub = sinon.stub(webpage, 'getAds');
        sut = new WallapopWebpage('searchurl', webpage);
    });

    suite('getAds', function() {

        function exerciceGetAds(callback) {
            sut.getAds(callback);
        }

        test('Should call webPage getAds with provided callback', function() {
            var callback = function(){};
            exerciceGetAds(callback);
            assert(webPageGetAdsStub.calledWithExactly(callback));
        });

    });

});