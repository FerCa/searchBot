var sinon = require('sinon');
var assert = require('chai').assert;
var Webpage = require('../lib/webpage');
var log2out = require('log2out');
var MilanunciosScraper = require('../lib/webpages/milanuncios/milanunciosscraper');

suite('Webpage', function() {
    var sut, requestStub, log2OutErrorStub, scraperExtractAdsStub;
    var searchUrl;

    setup(function() {
        searchUrl = 'http://www.milanuncios.com/instrumentos-musicales/guitarra-zurdo.htm?desde=400&hasta=2500&dias=1';
        requestStub = sinon.stub();
        var logger = log2out.getLogger('Webpage');
        log2OutErrorStub = sinon.stub(logger, 'error');
        var scraper = new MilanunciosScraper();
        scraperExtractAdsStub = sinon.stub(scraper, 'extractAds');

        sut = new Webpage(searchUrl, scraper, requestStub, logger);
    });

    suite('getAds', function() {

        function exerciceGetAds(callback) {
            sut.getAds(callback);
        }

        function createFakeResponseWithStatusCode(statusCode) {
            return fakeResponse = {
                statusCode: statusCode
            };
        }

        test('Should call request with correct url and headers', function() {
            exerciceGetAds();
            var expectedOptions = {
                url: searchUrl,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.124 Safari/537.36'
                }
            };
            assert(requestStub.calledWithExactly(expectedOptions, sinon.match.func));
        });

        test('If error requesting url should print error to the console', function() {
            requestStub.callsArgWith(1, 'error');
            exerciceGetAds(function() {});
            sinon.assert.calledWithExactly(log2OutErrorStub, 'Error requesting: ' + searchUrl);
        });

        test('If http error returned when requesting url should print error to the console', function() {
            var fakeResponse = createFakeResponseWithStatusCode(500);
            requestStub.callsArgWith(1, undefined, fakeResponse);
            exerciceGetAds(function() {});
            sinon.assert.calledWithExactly(log2OutErrorStub, 'Error requesting: ' + searchUrl);
        });

        test('If http error returned when requesting url should call callback with error', function() {
            var statusCode500 = 500;
            var fakeResponse = createFakeResponseWithStatusCode(statusCode500);
            requestStub.callsArgWith(1, undefined, fakeResponse);
            var callbackSpy = sinon.spy();
            exerciceGetAds(callbackSpy);
            sinon.assert.calledWithExactly(callbackSpy, new Error('Status code ' + statusCode500 + ' returned'));
        });

        test('If library error returned when requesting url should call callback with the same error', function() {
            var error = 'library error';
            requestStub.callsArgWith(1, error);
            var callbackSpy = sinon.spy();
            exerciceGetAds(callbackSpy);
            sinon.assert.calledWithExactly(callbackSpy, error);
        });

        test('If http response is 200 should call provided scraper extractAds with response body', function() {
            var fakeResponse = createFakeResponseWithStatusCode(200);
            var body = 'testHtmlBody';
            requestStub.callsArgWith(1, undefined, fakeResponse, body);
            exerciceGetAds(function(){});
            sinon.assert.calledWithExactly(scraperExtractAdsStub, body);
        });

        test('If http response is 200 should call provided callback with the result of the provided scraper extractAds', function() {
            var fakeResponse = createFakeResponseWithStatusCode(200);
            requestStub.callsArgWith(1, undefined, fakeResponse, 'body');
            var expectedAds = 'arrayOfAds';
            scraperExtractAdsStub.returns(expectedAds);
            var callbackSpy = sinon.spy();
            exerciceGetAds(callbackSpy);
            callbackSpy.calledWithExactly(expectedAds);
        });

    });

});