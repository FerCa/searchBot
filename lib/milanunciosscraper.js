var cheerio = require('cheerio');

MilanunciosScraper = function() {
};

MilanunciosScraper.prototype.extractAds = function (html) {
    var ads = [];
    var $ = cheerio.load(html);

    $('.x1').each(function() {
        var link = 'http://www.milanuncios.com' + $(this).find('.x7').find('a').attr('href');
        var text = $(this).find('.x7').find('.tx').text();
        var price = $(this).find('.x11').find('.pr').text();
        var image = $(this).find('.ee').attr('src');
        var title = $(this).find('.x7').find('a').text();
        title = title.slice(0, title.lastIndexOf('particularverfotos'));
        var ad = new Ad(title, text, price, link, image);
        ads.push(ad);
    });
    return ads;
}

module.exports = MilanunciosScraper;