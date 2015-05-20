var sinon = require('sinon');
var assert = require('chai').assert;
var Webpages = require('../lib/webpages');
var AdsChecker = require('../lib/adschecker');
var Webpage = require('../lib/webpage');


suite('Webpages', function() {
    var sut, adsChecker, adsCheckerCheckAndNotifyStub;

    setup(function() {
        var adsChecker = new AdsChecker();
        adsCheckerCheckAndNotifyStub = sinon.stub(adsChecker, 'checkAndNotify');
        sut = new Webpages(adsChecker);
    });

    suite('process', function() {

        test('should call adsChecker checkAndNotify for every ad returned by every webpage', function() {
            var webpage0Ads = ['fakead0web0', 'fakead1web0'];
            var webpage1Ads = ['fakead0web1'];
            var webpage2Ads = ['fakead0web2', 'fakead1web2', 'fakead2web2'];
            var webpage0 = new Webpage();
            var webpage1 = new Webpage();
            var webpage2 = new Webpage();
            sut.add(webpage0);
            sut.add(webpage1);
            sut.add(webpage2);
            sinon.stub(webpage0, 'getAds').callsArgWith(0, webpage0Ads);
            sinon.stub(webpage1, 'getAds').callsArgWith(0, webpage1Ads);
            sinon.stub(webpage2, 'getAds').callsArgWith(0, webpage2Ads);

            sut.process();

            sinon.assert.callOrder(
                adsCheckerCheckAndNotifyStub.withArgs(webpage0Ads),
                adsCheckerCheckAndNotifyStub.withArgs(webpage1Ads),
                adsCheckerCheckAndNotifyStub.withArgs(webpage2Ads)
            );
        });

    });

});