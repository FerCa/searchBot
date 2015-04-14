var nodemailer = require('nodemailer');

Mailer = function(settings, transporter) {
    this.settings = settings;
    this.transporter = transporter || nodemailer.createTransport(settings.mail.nodeMailer);
};

Mailer.prototype.send = function(subject, body) {
    var mailOptions = {
        from: this.settings.mail.from,
        to: this.settings.mail.to,
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
