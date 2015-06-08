var searches = require('./searches');
var log2out = require('log2out');
var logger = log2out.getLogger('searchBot');
var Search = require('./lib/search');

logger.info('Starting...');
for(var i = 0; i < searches.length; i++) {
    var search = new Search(searches[i]);
    search.process();
}

