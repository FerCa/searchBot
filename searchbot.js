var Webpages = require('./lib/webpages');
var searches = require('./searches');

for(var i = 0; i < searches.length; i++) {

    var search = searches[i];
    var webpages = new Webpages(search.name);

    for(var j = 0; j < search.where.length; j++) {

        var where = search.where[j];
        var Webpage = require('./lib/webpages/' + where.page + '/' + where.page + 'webpage.js');
        webpages.add(new Webpage(where.searchUrl));
    }

    webpages.process();
}

