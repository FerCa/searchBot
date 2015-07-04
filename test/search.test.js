var sinon = require('sinon');
var assert = require('chai').assert;
var Search = require('../lib/search');
var Webpages = require('../lib/webpages');
var Mailer = require('../lib/mailer');
var MilanunciosScraper = require('../lib/scrapers/milanunciosscraper');
var WallapopScraper = require('../lib/scrapers/wallapopscraper');
var Webpage = require('../lib/webpage');

suite('Search', function() {
    var sut, searchPojo, name, notifyTo;
    var mailer, mailerSendStub;
    var webpages, webpagesAddStub, webpagesProcessStub;

    setup(function() {
        name = 'Guitars';
        notifyTo = 'aemail@email.com';
        searchPojo = {
            name: name,
            where: [
                { page: 'milanuncios', searchUrl: 'http://www.milanuncios.com/instrumentos-musicales/guitarra-zurdo.htm?desde=400&hasta=2500&dias=1' },
                { page: 'wallapop', searchUrl: 'http://es.wallapop.com/search?kws=guitarra+zurdo&lat=41.387245&lng=2.191056' }
            ],
            notifyTo: notifyTo
        };
        mailer = new Mailer({}, {});
        mailerSendStub = sinon.stub(mailer, 'send');
        webpages = new Webpages();
        webpagesAddStub = sinon.stub(webpages, 'add');
        webpagesProcessStub = sinon.stub(webpages, 'process');
        sut = new Search(searchPojo, mailer, webpages);
    });

    suite('process', function() {

        function exerciceProcess() {
            return sut.process();
        }

        test('Should add to webpages a webpages implementation instance for every provided where', function() {
            exerciceProcess();
            assert.isTrue(webpagesAddStub.getCall(0).args[0] instanceof Webpage);
            assert.isTrue(webpagesAddStub.getCall(1).args[0] instanceof Webpage);
        });

        test('Should call webpages.process', function() {
            exerciceProcess();
            sinon.assert.calledWithExactly(webpagesProcessStub, sinon.match.func);
        });

        test('Should call mailer.send with adsHTML returned by webpages.process', function() {
            adsHtml = 'adsHtml';
            exerciceProcess();
            webpagesProcessStub.callArgWith(0, adsHtml);
            sinon.assert.calledWithExactly(mailerSendStub, notifyTo, 'New adds for ' + name, adsHtml);
        });

        test('When no ads are found should not call mailer.send', function() {
            adsHtml = '';
            exerciceProcess();
            webpagesProcessStub.callArgWith(0, adsHtml);
            sinon.assert.notCalled(mailerSendStub);
        });



    });

});