var sinon = require('sinon');
var assert = require('chai').assert;
var Webpage = require('../lib/webpage');
var WallapopWebpage = require('../lib/webpages/wallapop/wallapopwebpage');

suite('WallapopWebpage', function() {
    var sut, webPage, webPageGetAdsStub, resolvedSpy, errorSpy;
    var ads, error;

    setup(function() {
        ads = 'ads';
        error = 'error';
        resolvedSpy = sinon.spy();
        errorSpy = sinon.spy();
        var webpage = new Webpage();
        webPageGetAdsStub = sinon.stub(webpage, 'getAds');
        sut = new WallapopWebpage('searchurl', webpage);
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

        test('Should call webPage getAds with provided callback', function() {
            exerciceGetAds();
            assert(webPageGetAdsStub.called);
        });

        test('when webPage.getAds calls provided callback without error should resolve the promise', function() {
            webPageGetAdsStub.callsArgWith(0, null, ads);
            var resolvedSpy = sinon.spy();
            exerciceGetAds().then(resolvedSpy);
            sinon.assert.calledWithExactly(resolvedSpy, ads);
        });

        test('when webPage.getAds calls provided callback with error should reject the promise', function() {
            webPageGetAdsStub.callsArgWith(0, error, ads);
            exerciceGetAds().then(resolvedSpy, errorSpy);
            sinon.assert.calledWithExactly(errorSpy, error);
        });

    });

});