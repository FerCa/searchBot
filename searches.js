var searches = [{
    name: 'left-handed guitars',
    where: [
        { page: 'milanuncios', searchUrl: 'http://www.milanuncios.com/instrumentos-musicales/guitarra-zurdo.htm?desde=400&hasta=2500&dias=1' },
        { page: 'wallapop', searchUrl: 'http://es.wallapop.com/search?kws=guitarra+zurdo&lat=41.387245&lng=2.191056' }
    ],
    notifyTo: 'YOURMAILHERE'
}
, {
    name: 'rockabilly',
    where: [
        { page: 'wallapop', searchUrl: 'http://es.wallapop.com/search?kws=rockabilly&lat=41.398077&lng=2.170432#minPrice=&maxPrice=&dist=0_10000&order=distance-asc&kws=rockabilly&lat=41.398077&lng=2.170432' }
    ],
    notifyTo: 'YOURMAILHERE'
}
];

module.exports = searches;