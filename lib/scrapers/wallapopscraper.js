var cheerio = require('cheerio');
var Ad = require('./../ad');

WallapopScraper = function() {
};

WallapopScraper.prototype.extractAds = function (html) {
    var ads = [];
    var $ = cheerio.load(html);

    $('div[class=container-background-fullscreen]').find('.card-product').each(function() {
        var link = 'http://www.wallapop.com' + this.children[0].attribs.href;
        var text = '';
        var price = this.children[1].children[0].children[0].data;
        var image = this.children[0].children[0].children[0].attribs.src;
        var title = this.children[1].children[1].children[0].data;
        var ad = new Ad(title, text, price, link, image);
        ads.push(ad);
    });
    return ads;
}

module.exports = WallapopScraper;