var Webpages = require('./lib/webpages');
var searches = require('./searches');
var log2out = require('log2out');
var logger = log2out.getLogger('searchBot');

for(var i = 0; i < searches.length; i++) {

    var search = searches[i];
    var webpages = new Webpages(search.name);

    if(!Array.isArray(search.where)) {
        logger.error('Invalid where value for ' + search.name);
        continue;
    }

    for(var j = 0; j < search.where.length; j++) {

        var where = search.where[j];
        try {
            var Webpage = require('./lib/webpages/' + where.page + '/' + where.page + 'webpage.js');
        } catch(e) {
            logger.error(where.page + ' webpage class not found.');
            continue;
        }

        webpages.add(new Webpage(where.searchUrl));
    }

    webpages.process();
}

