var sinon = require('sinon');
var assert = require('chai').assert;
var SeenAds = require('../lib/SeenAds');
var adModel = require('../lib/mongoose/admodel');


suite('SeenAds', function() {
    var sut;
    var ad, title, price, link;
    var adModelFindOneStub;

    setup(function() {
        title = 'awesome guitar';
        price = '600';
        link = 'http://adds.com/aewsomeguitar';
        ad = {title: title, price: price, link: link};

        adModelFindOneStub = sinon.stub(adModel, 'findOne');
        sut = new SeenAds(adModel);
    });

    teardown(function() {
        adModelFindOneStub.restore();
    });

    suite('alreadySeen', function() {

        test('Should call AdModel findOne with provided ad', function() {
            sut.alreadySeen(ad, function() {});
            sinon.assert.calledWithExactly(adModelFindOneStub, ad, sinon.match.func);
        });

        test('Should call provided callback with false if ad is not in DB', function() {
            var callback = sinon.spy();
            sut.alreadySeen(ad, callback);
            adModelFindOneStub.callArgOnWith(1, null, null);
            sinon.assert.calledWithExactly(callback, false)
        });

    });

});