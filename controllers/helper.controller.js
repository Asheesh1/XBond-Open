var hbs = require('nodemailer-express-handlebars');
var nodemailer = require('nodemailer');
const config = require('../environment/config')
const supportEmail = config.emails.support.email
const supportPassword = config.emails.support.password
var transporter = nodemailer.createTransport({
    service: 'gmail',
    name: "www.os003.oodleslab.com",
    port: 18888,

    auth: {
        user: supportEmail,
        pass: supportPassword
    },
    dkim: {
        domainName: "www.os003.oodleslab.com",
        keySelector: "2017",
        privateKey: "Y*YD(*@*asdsadHE)u09up789798&*&(*nMIIEvgIBADANBg..."
      }
});

var options = {
    viewEngine: {
        extName: '.hbs',
        // partialsDir: 'aviews/email',
        partialsDir: 'views/email',
        layoutsDir: 'views/email',
    },
    viewPath: 'views/email',
    extName: '.hbs',
    partialsDir: '',
};
transporter.use('compile', hbs(options));

module.exports = {
    
    transporter : transporter,

}