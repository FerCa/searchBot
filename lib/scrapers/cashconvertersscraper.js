var cheerio = require('cheerio');
var Ad = require('./../ad');

CashconvertersScraper = function() {
};

CashconvertersScraper.prototype.extractAds = function (html) {
    var ads = [];
    var $ = cheerio.load(html);

    $('li[class^=item]').each(function() {
        var link = $(this).find('a').attr('href');
        var textTds = $(this).find('.product-list-details-column2');
        var text = textTds[0].children[0].data + ' ' + textTds[1].children[0].data
            + ' From: ' + textTds[2].children[0].data + ' ' + textTds[2].children[0].next.next.data
            + ' ' + textTds[2].children[0].next.next.next.next.data;
        var price = $(this).find('.price').text();
        var image = $(this).find('.product-image').find('img').attr('src');
        var title = $(this).find('.product-name').find('a').attr('title');
        var ad = new Ad(title, text, price, link, image);
        ads.push(ad);
    });
    return ads;
}

module.exports = CashconvertersScraper;