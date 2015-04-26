var sinon = require('sinon');
var assert = require('chai').assert;
var Milanuncios = require('../lib/milanuncios');
var log2out = require('log2out');

suite('Milanuncios', function() {
    var sut, requestStub, log2OutErrorStub;
    var milanunciosSearchUrl;

    setup(function() {
        milanunciosSearchUrl = 'http://www.milanuncios.com/instrumentos-musicales/guitarra-zurdo.htm?desde=400&hasta=2500&dias=1';
        requestStub = sinon.stub();
        var logger = log2out.getLogger('Milanuncios');
        //var logger = {error: function() {}};
        log2OutErrorStub = sinon.stub(logger, 'error');
        sut = new Milanuncios(requestStub, logger);
    });

    suite('getAds', function() {

        function exerciceGetAds() {
            sut.getAds();
        }

        test('Should call request with correct url', function() {
            exerciceGetAds();
            assert(requestStub.calledWithExactly(milanunciosSearchUrl, sinon.match.func));
        });

        test('If error requesting url should print error to the console', function() {
            requestStub.callsArgWith(1, 'error');
            exerciceGetAds();
            sinon.assert.calledWithExactly(log2OutErrorStub, 'Error requesting: ' + milanunciosSearchUrl);
        });

        test('If http error returned when requesting url should print error to the console', function() {
            var fakeResponse = {
                statusCode: 500
            };
            requestStub.callsArgWith(1, undefined, fakeResponse);
            exerciceGetAds();
            sinon.assert.calledWithExactly(log2OutErrorStub, 'Error requesting: ' + milanunciosSearchUrl);
        });

    });

});