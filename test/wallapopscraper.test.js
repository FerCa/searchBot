var sinon = require('sinon');
var assert = require('chai').assert;
var WallapopScraper = require('../lib/webpages/wallapop/wallapopscraper');
var fs = require('fs');
var Ad = require('../lib/ad');

suite('WallapopScraper', function() {
    var sut;
    var html = fs.readFileSync('./test/fixtures/wallapopresult.html', {encoding: 'utf8'});

    setup(function() {
        sut = new WallapopScraper();
    });

    suite('ExtractAds', function() {

        test('When called with wallapop results html should return correct array of ads', function() {

            var expectedAds = [
                new Ad('Guitarra flamenca admira.f.1.2000 .', '', '800€',
                    'http://www.wallapop.com/item/guitarra-flamenca-admira-f-1-2000-12002695',
                    'http://d1qszfz8cfeddb.cloudfront.net/shnm-portlet/images?pictureId=24993354&pictureSize=W320'),
                new Ad('Guitarra electrica', '', '320€',
                    'http://www.wallapop.com/item/guitarra-electrica-5016559',
                    'http://d1qszfz8cfeddb.cloudfront.net/shnm-portlet/images?pictureId=10346940&pictureSize=W320'),
                new Ad('Guitarra', '',
                    '150€', 'http://www.wallapop.com/item/guitarra-5186661',
                    'http://d1qszfz8cfeddb.cloudfront.net/shnm-portlet/images?pictureId=10718011&pictureSize=W320'),
                new Ad('Guitarra', '', '150€', 'http://www.wallapop.com/item/guitarra-5186655',
                    'http://d1qszfz8cfeddb.cloudfront.net/shnm-portlet/images?pictureId=10717994&pictureSize=W320')
            ];
            var actualAds = sut.extractAds(html);
            assert.deepEqual(expectedAds, actualAds, 'Incorrect array of ads returned')
        });

    });

});