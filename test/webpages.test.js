var sinon = require('sinon');
var assert = require('chai').assert;
var Webpages = require('../lib/webpages');
var AdsChecker = require('../lib/adschecker');
var Webpage = require('../lib/webpage');
var Q = require('Q');


suite('Webpages', function() {
    var sut, adsChecker, adsCheckerAddStub, QAllStub;

    setup(function() {
        adsChecker = new AdsChecker();
        adsCheckerAddStub = sinon.stub(adsChecker, 'add');
        QAllStub = sinon.stub(Q, 'all').returns({then: function() {}});
        sut = new Webpages('a name', adsChecker, Q);
    });

    teardown(function() {
        QAllStub.restore();
    });

    suite('process', function() {

        function exerciceProcess() {
            sut.process();
        };

        function createFakePromiseWithParam(param) {
            return fakePromise = {
                then: function(callback) {callback(param)}
            };
        }

        test('should call adsChecker add for every ad returned by every webpage', function() {
            var webpage0Ads = ['fakead0web0', 'fakead1web0'];
            var webpage1Ads = ['fakead0web1'];
            var webpage2Ads = ['fakead0web2', 'fakead1web2', 'fakead2web2'];
            var webpage0 = new Webpage();
            var webpage1 = new Webpage();
            var webpage2 = new Webpage();
            sut.add(webpage0);
            sut.add(webpage1);
            sut.add(webpage2);

            sinon.stub(webpage0, 'getAds').returns(createFakePromiseWithParam(webpage0Ads));
            sinon.stub(webpage1, 'getAds').returns(createFakePromiseWithParam(webpage1Ads));
            sinon.stub(webpage2, 'getAds').returns(createFakePromiseWithParam(webpage2Ads));

            exerciceProcess();

            sinon.assert.callOrder(
                adsCheckerAddStub.withArgs(webpage0Ads),
                adsCheckerAddStub.withArgs(webpage1Ads),
                adsCheckerAddStub.withArgs(webpage2Ads)
            );
        });

        suite('Q.All resolves', function() {
            var adsCheckerNotifyStub;

            setup(function() {
                var thenStub = {
                    then: function(callback) {
                        callback('seens', 'ads');
                    }
                };
                QAllStub.returns(thenStub);
                adsCheckerNotifyStub = sinon.stub(adsChecker, 'notify');
            });

            test('call adsChecker.notify', function() {
                exerciceProcess();
                assert(adsCheckerNotifyStub.called);
            });

        });

    });

});