var nodemailer = require('nodemailer');

Mailer = function(settings, transporter) {
    this.settings = settings;
    this.transporter = transporter || nodemailer.createTransport(settings.nodeMailer);
};

Mailer.prototype.send = function(to, subject, body) {
    var mailOptions = {
        from: this.settings.from,
        to: to,
        subject: subject,
        html: body
    };

    this.transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent: ' + info.response);
        }
    });
}

module.exports = Mailer;
