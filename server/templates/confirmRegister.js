const hbs = require('nodemailer-express-handlebars');
const mail = require('../config/mail');

const sendRegisterConfirmMail = function(user) {
    const pathToTemplate = path.resolve(__dirname, '..', '..', 'templates/');
    mail.use('compile', hbs({
        viewEngine: {
            extName: ".handlebars",
            partialsDir: pathToTemplate,
            defaultLayout: false
        },
        viewPath: pathToTemplate,
        extName: ".handlebars"
    }));

    const message = {
        to: user.email,
        subject: "Confirm your register",
        template: "confirmRegister"
    }
    
    try { mail.sendMail(message) } 
    catch(err) { console.log(err + "!"); }
}

module.exports = sendRegisterConfirmMail;