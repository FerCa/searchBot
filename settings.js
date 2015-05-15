var settings = {
    mail: {
        nodeMailer: {
            service: 'Gmail',
            auth: {
                user: 'ferca.notif@gmail.com',
                pass: 'notificacions'
            }
        },
        from: 'SearchBot <search@fercaiscoding.com>',
        to: 'ferca23@gmail.com'
    },
    seenAdsExpiration: 15778463, // 6 months
    mongo: {
        server: 'localhost',
        connectionTimeout: 60000 // 1 minute

    }

};

module.exports = settings;
