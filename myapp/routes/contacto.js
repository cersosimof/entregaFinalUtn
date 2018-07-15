var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

router.get('/', function(req, res) {          
    if (req.session.user) {
        res.render('contacto', {'usuario' : req.session.user})
    } else {
        res.render('index')
    }
})

//AL HACER SUBMIT EN EL FORMULARIO!
router.post('/enviar', function(req, res) {          
    if (req.session.user) {
        var nombreC = req.body.nombreContacto;
        var correoC = req.body.emailContacto;
        var consultaC = req.body.consultaContacto;

        console.log(nombreC + correoC + consultaC)
        nodemailer.createTestAccount((err, account) => {
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                        user: 'cersosimof88@gmail.com',
                        pass: 'nodejsjs'
                    }
                });
        
            // setup email data with unicode symbols
            let mailOptions = {
                from: '"Fred Foo 👻" <foo@example.com>', // sender address
                to: 'cersosimo.facundo@gmail.com', // list of receivers
                subject: 'Hello ✔', // Subject line
                text: 'Hello world?', // plain text body
                html: '<b>Hello world?</b>' // html body
            };
 

        });
        res.redirect("/")
    } else {
        res.render('index')
    }
})
        
module.exports = router;


        