var sinon = require('sinon');
var assert = require('chai').assert;
var Mailer = require('../lib/mailer');
var SeenAds = require('../lib/seenads');
var Ad = require('../lib/ad');
var Q = require('Q');


suite('AdsChecker', function() {
    var sut, seenAdsAlreadySeenStub, mailerSendStub, QAllStub;
    var ads, ad0, ad1, ad2, ad3;
    var name;

    setup(function() {
        ad0 = new Ad('title0');
        ad1 = new Ad('title1');
        ad2 = new Ad('title2');
        ad3 = new Ad('title3');
        ads = [ad0, ad1, ad2, ad3];
        var seenAds = new SeenAds();
        seenAdsAlreadySeenStub = sinon.stub(seenAds, 'alreadySeen');
        var mailer = new Mailer({mail: {nodeMailer: 'fake'}});
        mailerSendStub = sinon.stub(mailer, 'send');
        name = 'a name';
        QAllStub = sinon.stub(Q, 'all').returns({then: function() {}});
        sut = new AdsChecker(name, seenAds, mailer, Q);
    });

    teardown(function() {
       QAllStub.restore();
    });

    suite('notify', function() {

        function exerciceNotify() {
            sut.notify();
        }

        test('call Q.All with promises', function() {

            sut.promises.push('promise1');
            sut.promises.push('promise2');
            exerciceNotify();
            sinon.assert.calledWithExactly(QAllStub, sut.promises);
        });

        suite('Q.All resolves', function() {

            setup(function() {
                var result = [
                    {seen: false, ad: ad0},
                    {seen: true, ad: ad1},
                    {seen: false, ad: ad2},
                    {seen: false, ad: ad3}
                ];
                var thenStub = {
                    then: function(callback) {
                        callback(result);
                    }
                };
                QAllStub.returns(thenStub);
            });

            test('call mailer send with all not seen add', function() {
                exerciceNotify();
                sinon.assert.calledWithExactly(mailerSendStub, 'New adds for ' + name, ad0.getAsHTML() + ad2.getAsHTML() + ad3.getAsHTML());
            });

            test('empty the promises array', function() {
                sut.promises = ['promise1', 'promise2', 'promise3'];
                exerciceNotify();
                assert.deepEqual([], sut.promises);
            });

        });

    });

    suite('add', function() {

        function exerciceAdd(ads) {
            sut.add(ads);
        }

        function createFakePromiseWithParam(param) {
            return fakePromise = {
                then: function(callback) {callback(param)}
            };
        }

        test('add every promise to the promises array', function() {
            var ad0FakePromise = createFakePromiseWithParam({seen: false, ad: ad0});
            var ad1FakePromise = createFakePromiseWithParam({seen: true, ad: ad1});
            var ad2FakePromise = createFakePromiseWithParam({seen: true, ad: ad2});
            var ad3FakePromise = createFakePromiseWithParam({seen: false, ad: ad3});
            seenAdsAlreadySeenStub.onCall(0).returns(ad0FakePromise);
            seenAdsAlreadySeenStub.onCall(1).returns(ad1FakePromise);
            seenAdsAlreadySeenStub.onCall(2).returns(ad2FakePromise);
            seenAdsAlreadySeenStub.onCall(3).returns(ad3FakePromise);
            exerciceAdd(ads);
            assert.deepEqual(sut.promises, [ad0FakePromise, ad1FakePromise, ad2FakePromise, ad3FakePromise]);
        });

    });

});