const nodemailer = require('nodemailer');
require('./dotenv')();

const mailer = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    }
});

module.exports = mailer