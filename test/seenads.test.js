var sinon = require('sinon');
var assert = require('chai').assert;
var SeenAds = require('../lib/SeenAds');
var adModel = require('../lib/mongoose/admodel');


suite('SeenAds', function() {
    var sut;
    var ad, title, price, link;
    var adModelFindOneStub, adModelCreateStub;

    setup(function() {
        title = 'awesome guitar';
        price = '600';
        link = 'http://adds.com/aewsomeguitar';
        ad = {title: title, text: 'Selling this awesome guitar', price: price, link: link, image: 'http://ads.com/guitar.jpg'};

        adModelFindOneStub = sinon.stub(adModel, 'findOne');
        adModelCreateStub = sinon.stub(adModel, 'create');
        sut = new SeenAds(adModel);
    });

    teardown(function() {
        adModelFindOneStub.restore();
        adModelCreateStub.restore();
    });

    suite('alreadySeen', function() {

        test('Should call AdModel findOne with provided ad', function() {
            sut.alreadySeen(ad, function() {});
            var expectedQuery = {title: title, price: price, link: link};
            sinon.assert.calledWithExactly(adModelFindOneStub, expectedQuery, sinon.match.func);
        });

        test('Should call provided callback with false if ad is not in DB', function() {
            var callback = sinon.spy();
            sut.alreadySeen(ad, callback);
            adModelFindOneStub.callArgWith(1, null, null);
            sinon.assert.calledWithExactly(callback, false)
        });

        test('Should call AdModel create with ad if it is not in DB', function() {
            var callback = sinon.spy();
            sut.alreadySeen(ad, callback);
            adModelFindOneStub.callArgWith(1, null, null);
            sinon.assert.calledWithExactly(adModelCreateStub, ad, sinon.match.func);
        });

        test('Should call provided callback with true if ad is already in the DB', function() {
            var callback = sinon.spy();
            sut.alreadySeen(ad, callback);
            adModelFindOneStub.callArgWith(1, null, ad);
            sinon.assert.calledWithExactly(callback, true)
        });

    });

});