var sinon = require('sinon');
var assert = require('chai').assert;
var Ad = require('../lib/ad');

suite('Ad', function(){
    var sut;
    var title = 'Universe for sale',
        text = 'A full universe with lots of planets',
        price = '1000',
        link = 'http://google.com',
        image = 'http://google.com/universe.jpg';

    setup(function() {
        sut = new Ad(title, text, price, link, image);
    });

    suite('getAsHTML', function() {

        test('Should return the ad in correctly formated HTML', function() {
            var expectedHTML ='<b>' + title + '</b>' + '<br>' +
                link + '<br>' +
                text + '<br>' +
                '<b>Price: ' + price + '</b><br>' +
                '<img src="' + image + '">' + '<br>';

            var actualHTML = sut.getAsHTML();
            assert.equal(actualHTML, expectedHTML);
        });

    });

});