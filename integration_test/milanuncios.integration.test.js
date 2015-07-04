var MilanunciosScraper = require('../lib/scrapers/milanunciosscraper');
var Webpage = require('../lib/webpage');
var WebpagesTestHelpers = require('./testhelpers/webpagestesthelpers');

suite('Milanuncios Integration Test', function() {
    var sut, webpagesTestHelpers;

    setup(function() {
        webpagesTestHelpers = new WebpagesTestHelpers();
        sut = new Webpage('http://www.milanuncios.com/motos-de-segunda-mano/', new MilanunciosScraper());
    });

    test('Should get all the required values from a milanuncios search', function(done) {
        webpagesTestHelpers.CallGetAdsAndCheckFirstAd(sut, done);
    });

});