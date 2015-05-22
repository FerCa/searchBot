[![Build Status](https://travis-ci.org/FerCa/searchBot.svg?branch=master)](https://travis-ci.org/FerCa/searchBot)
# searchBot

searchBot is a command line tool to save searches to e-comerce, online thrift shops or any other webpage providing 
searches for products and receive emails every time a new product matches the search.

Some e-comerce sites like ebay provides the concept of "saved searches", you can save a search and receive alerts any time 
a new product matches your search, but many others don't. With searchbot you can use one of already implemented webpage 
scrapers, register your search and use any job scheduler (like cron for linux) to regulary launch your searches.

## Configure your searches

You can register new searches by simply editing the searches.js config file you will found in the root of the project:

```javascript
var searches = [{
    name: 'left-handed guitars',
    where: [
        { page: 'milanuncios', searchUrl: 'http://www.milanuncios.com/instrumentos-musicales/guitarra-zurdo.htm?desde=400&hasta=2500&dias=1' },
        { page: 'wallapop', searchUrl: 'http://es.wallapop.com/search?kws=guitarra+zurdo&lat=41.387245&lng=2.191056' }
    ]
}];
```
You just need to put an object (a POJO) inside the searches array with this keys:

* name: A name for this search (this will be in the subject of the email you will receive for new ads).
* where: An array of objects declaring the target pages, with the keys:
   *  page: This will be the name of one of the implemented webpages (be sure to write it identically to the name of the directory inside webpages directory (./lib/webpages).
   *  searchUrl: The url of a valid and working search for the choosed page.

Of course you can add as many searches as you want to the searches array to receive email notifications for multiple concepts.
