var sinon = require('sinon');
var assert = require('chai').assert;
var Webpage = require('../lib/webpage');
var MilanunciosWebpage = require('../lib/webpages/milanuncios/milanuncioswebpage');

suite('MilanunciosWebpage', function() {
    var sut, webPage, webPageGetAdsStub;

    setup(function() {
        var webpage = new Webpage();
        webPageGetAdsStub = sinon.stub(webpage, 'getAds');
        sut = new MilanunciosWebpage('searchurl', webpage);
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