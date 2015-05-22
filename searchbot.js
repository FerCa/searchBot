var settings = require('./settings');
var Webpages = require('./lib/webpages');

var webpages = new Webpages();

webpages.add(new MilanunciosWebpage('http://www.milanuncios.com/instrumentos-musicales/guitarra-zurdo.htm?desde=400&hasta=2500&dias=1'));
webpages.add(new WallapopWebpage('http://es.wallapop.com/search?kws=guitarra+zurdo&lat=41.387245&lng=2.191056'));

webpages.process();