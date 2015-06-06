var sinon = require('sinon');
var assert = require('chai').assert;
var SeenAds = require('../lib/seenads');
var adModel = require('../lib/mongoose/admodel');
var log2out = require('log2out');
var mongoose = require('mongoose');


suite('SeenAds', function() {
    var sut;
    var ad, title, price, link, error, callbackSpy, settings;
    var adModelFindOneStub, adModelCreateStub, mongooseConnectStub;
    var log2OutErrorStub;

    setup(function() {
        settings = {};
        title = 'awesome guitar';
        price = '600';
        link = 'http://adds.com/aewsomeguitar';
        ad = {title: title, text: 'Selling this awesome guitar', price: price, link: link, image: 'http://ads.com/guitar.jpg'};
        error = 'error';
        callbackSpy = sinon.spy();

        adModelFindOneStub = sinon.stub(adModel, 'findOne');
        adModelCreateStub = sinon.stub(adModel, 'create');
        mongooseConnectStub = sinon.stub(mongoose, 'connect');

        var logger = log2out.getLogger('SeenAds');
        log2OutErrorStub = sinon.stub(logger, 'error');

        sut = new SeenAds(settings, adModel, logger);
    });

    teardown(function() {
        adModelFindOneStub.restore();
        adModelCreateStub.restore();
        mongooseConnectStub.restore();
    });

    suite('alreadySeenPromises', function() {

        setup(function() {
            // changing nextTick behaviour to make the promise syncronous
            sinon.stub(process, 'nextTick').yields();
        });

        teardown(function() {
            process.nextTick.restore();
        });

        function exerciceAlreadySeen() {
            return sut.alreadySeen(ad);
        }

        test('Should resolve promise with false if ad is not in DB', function() {
            var resolvedSpy = sinon.spy();
            exerciceAlreadySeen().then(resolvedSpy, function(error) {});
            adModelFindOneStub.callArgWith(1, null, null);

            var expected = {seen: false, ad: ad};
            sinon.assert.calledWithExactly(resolvedSpy, expected);
        });

        test('Should resolve promise with true if ad is already in the DB', function() {
            var resolvedSpy = sinon.spy();
            exerciceAlreadySeen().then(resolvedSpy, function(error) {});
            adModelFindOneStub.callArgWith(1, null, ad);

            var expected = {seen: true, ad: ad};
            sinon.assert.calledWithExactly(resolvedSpy, expected);
        });

    });

    suite('alreadySeen', function() {

        function exerciceAlreadySeen() {
            sut.alreadySeen(ad, callbackSpy);
        }

        test('Should call mongoose connect the first time is called', function() {
            exerciceAlreadySeen();
            sinon.assert.called(mongooseConnectStub);
        });

        test('Should not call mongoose connect the second time is called', function() {
            exerciceAlreadySeen();
            mongoose.connection.readyState = 1;
            exerciceAlreadySeen();
            sinon.assert.callCount(mongooseConnectStub, 1);
        });

        test('Should call AdModel findOne with provided ad', function() {
            exerciceAlreadySeen();
            var expectedQuery = {title: title, price: price, link: link};
            sinon.assert.calledWithExactly(adModelFindOneStub, expectedQuery, sinon.match.func);
        });

        test('Should call AdModel create with ad if it is not in DB', function() {
            exerciceAlreadySeen();
            adModelFindOneStub.callArgWith(1, null, null);
            sinon.assert.calledWithExactly(adModelCreateStub, ad, sinon.match.func);
        });

        test('Should log error to stdout if error finding ad', function() {
            exerciceAlreadySeen();
            adModelFindOneStub.callArgWith(1, error, null);
            sinon.assert.calledWithExactly(log2OutErrorStub, 'Error finding ad in DB: ' + error);
        });

        test('Should log error to stdout if error saving ad', function() {
            exerciceAlreadySeen();
            adModelFindOneStub.callArgWith(1, null, null);
            adModelCreateStub.callArgWith(1, error);
            sinon.assert.calledWithExactly(log2OutErrorStub, 'Error saving ad in DB: ' + error);
        });

    });

});