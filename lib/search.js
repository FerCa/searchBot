var Webpages = require('./webpages');
var log2out = require('log2out');
var Mailer = require('./mailer');
var settings = require('../settings');
var Webpage = require('./webpage');

Search = function(searchPojo, injectedMailer, injectedWebpages) {
    this.name = searchPojo.name;
    this.where = searchPojo.where;
    this.notifyTo = searchPojo.notifyTo;
    this.webpages = injectedWebpages || new Webpages();
    this.mailer = injectedMailer || new Mailer(settings.mail);
    this.logger = log2out.getLogger('Search');
};

Search.prototype.process = function() {
    this.logger.info('Processing:', this.name);

    if(!Array.isArray(this.where)) {
        this.logger.error('Invalid where value for ' + this.name);
        return;
    }

    for(var j = 0; j < this.where.length; j++) {

        var where = this.where[j];
        try {
            var Scrapper = require('./scrapers/' + where.page + 'scraper.js');
        } catch(e) {
            this.logger.error(where.page + ' webpage class not found.');
            continue;
        }

        this.webpages.add(new Webpage(where.searchUrl, new Scrapper()));
    }

    var self = this;
    this.webpages.process(function(newAdsHtml) {
        //@TODO: Create a abstract notifier instead of using mailer.send
        if(newAdsHtml) {
            self.mailer.send(self.notifyTo, 'New adds for ' + self.name, newAdsHtml);
        }
    });
};

module.exports = Search;
