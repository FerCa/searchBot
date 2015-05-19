var sinon = require('sinon');
var assert = require('chai').assert;
var AdsNotifier = require('../lib/adschecker');
var Mailer = require('../lib/mailer');
var SeenAds = require('../lib/seenads');
var Ad = require('../lib/ad');


suite('AdsChecker', function() {
    var sut, seenAdsAlreadySeenStub, mailerSendStub;
    var ads, ad0, ad1, ad2, ad3;

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
        sut = new AdsChecker(seenAds, mailer);
    });

    suite('checkAndNotify', function() {

        function exerciceCheckAndNotify(ads) {
            sut.checkAndNotify(ads);
        }

        test('call mailer send for every not seen add', function() {
            seenAdsAlreadySeenStub.onCall(0).callsArgWith(1, false, ad0);
            seenAdsAlreadySeenStub.onCall(1).callsArgWith(1, true, ad1);
            seenAdsAlreadySeenStub.onCall(2).callsArgWith(1, true, ad2);
            seenAdsAlreadySeenStub.onCall(3).callsArgWith(1, false, ad3);
            exerciceCheckAndNotify(ads);
            sinon.assert.callOrder(
                mailerSendStub.withArgs('New add', ad0.getAsHTML()),
                mailerSendStub.withArgs('New add', ad3.getAsHTML())
            );
            assert(mailerSendStub.calledTwice);
        });

    });

});