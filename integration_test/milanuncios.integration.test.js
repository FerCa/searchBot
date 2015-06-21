var MilanunciosWebpage = require('../lib/webpages/milanuncios/milanuncioswebpage');
var WebpagesTestHelpers = require('./testhelpers/webpagestesthelpers');

suite('Milanuncios Integration Test', function() {
    var sut, webpagesTestHelpers;

    setup(function() {
        webpagesTestHelpers = new WebpagesTestHelpers();
        sut = new MilanunciosWebpage('http://www.milanuncios.com/motos-de-segunda-mano/');
    });

    test('Should get all the required values from a milanuncios search', function(done) {
        webpagesTestHelpers.CallGetAdsAndCheckFirstAd(sut, done);
    });

});