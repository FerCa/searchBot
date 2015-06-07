var sinon = require('sinon');
var assert = require('chai').assert;
var Mailer = require('../lib/mailer');
var nodemailer = require('nodemailer');
var settings = require('../settings');


suite('Mailer', function(){
    var sut;
    var transporterSendStub;

    setup(function() {
        var transporter = nodemailer.createTransport(settings.mail.nodeMailer);
        transporterSendStub = sinon.stub(transporter, 'sendMail');
        sut = new Mailer(settings.mail, transporter);
    });

    suite('send', function() {

        test('Should call transporter.sendMail', function() {
            var subject = 'New add';
            var htmlBody = '<b>New add found</b>';
            var mailOptions = {
                from: settings.mail.from,
                to: settings.mail.to,
                subject: subject,
                html: htmlBody
            };
            sut.send(subject, htmlBody);
            assert(transporterSendStub.calledWithExactly(mailOptions, sinon.match.func));
        });

    });

});