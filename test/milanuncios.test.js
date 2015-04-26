var sinon = require('sinon');
var assert = require('chai').assert;
var Milanuncios = require('../lib/milanuncios');
var Ad = require('../lib/ad');

suite('Milanuncios', function() {
    var sut, requestStub;

    setup(function() {
        requestStub = sinon.stub();
        sut = new Milanuncios(requestStub);
    });

    suite('getAds', function() {

        test('Should call request with correct url', function() {
            var milanunciosSearchUrl = 'http://www.milanuncios.com/instrumentos-musicales/guitarra-zurdo.htm?desde=400&hasta=2500&dias=1';
            sut.getAds();
            assert(requestStub.calledWithExactly(milanunciosSearchUrl, sinon.match.func));
        });

    });

});