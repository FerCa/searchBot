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

        setup(function() {
            // changing nextTick behaviour to make the promise syncronous
            sinon.stub(process, 'nextTick').yields();
        });

        teardown(function() {
            process.nextTick.restore();
        });

        function exerciceGetAds() {
            return sut.getAds();
        }

        test('Should call webPage.getAds', function() {
            exerciceGetAds();
            assert(webPageGetAdsStub.called);
        });

        test('when webPage.getAds calls provided callback should resolve the promise', function() {
            var ads = 'ads';
            webPageGetAdsStub.callsArgWith(0, ads);
            var resolvedSpy = sinon.spy();
            exerciceGetAds().then(resolvedSpy);
            sinon.assert.calledWithExactly(resolvedSpy, ads);
        });

    });

});