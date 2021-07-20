const nodemailer = require('nodemailer'); 

const hbs = require('nodemailer-express-handlebars');

const path = require('path');

const transport = nodemailer.createTransport({
	host: process.env.EMAIL_HOST,
	port: process.env.EMAIL_PORT,
	auth: { 
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASSWORD
	},
});

transport.use('compile', hbs({
	viewEngine: {
		extName: '.html',
		defaultLayout: false,
	},
	viewPath: path.resolve('./resources/mail/'), //Caminho aonde estão as templates/views do Email
	extName: '.html',
}));

module.exports = transport;