var request = require('request');
var cheerio = require('cheerio');
var nodemailer = require('nodemailer');
var iconv = require('iconv-lite');
var Ad = require('./lib/ad');
var settings = require('./settings');

request('http://www.milanuncios.com/instrumentos-musicales/guitarra-zurdo.htm?desde=400&hasta=2500&dias=1', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        //var body = iconv.decode(body, 'iso-8859-1');
        var $ = cheerio.load(body);

        var transporter = nodemailer.createTransport(settings.mail.nodeMailer);

        $('.x1').each(function() {
            var link = 'http://www.milanuncios.com' + $(this).find('.x7').find('a').attr('href');
            var text = $(this).find('.x7').find('.tx').text();
            var price = $(this).find('.x11').find('.pr').text();
            var image = $(this).find('.ee').attr('src');
            var title = $(this).find('.x7').find('a').text();
            title = title.slice(0, title.lastIndexOf('particularverfotos'));
            console.log('-------------------------------------------------------------------------------------');
            console.log('-------------------------------------------------------------------------------------');
            console.log('-------------------------------------------------------------------------------------');
            console.log('Link:', link);
            console.log('Text:', text);
            console.log('Price:', price);
            console.log('Image:', image);
            console.log('Title:', title);
            console.log('-------------------------------------------------------------------------------------');
            console.log('-------------------------------------------------------------------------------------');
            console.log('-------------------------------------------------------------------------------------');

            var ad = new Ad(title, text, price, link, image);

            var mailOptions = {
                from: settings.mail.from,
                to: settings.mail.to,
                subject: 'New add in milanuncios',
                html: ad.getAsHTML()
            };

            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    console.log(error);
                }else{
                    console.log('Message sent: ' + info.response);
                }
            });
        });
    }
});

