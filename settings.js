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
    mongo: {
        server: 'localhost'

    }

};

module.exports = settings;
