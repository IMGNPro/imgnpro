var express = require('express');
var router = express.Router();
var OrderPacksCrud = require('../modules/orderpacks_crud.js');
var mailer = require('../modules/send_email.js'); // Módulo para enviar correo

router.get('/adm_cashout', require('connect-ensure-login').ensureLoggedIn('/login'), function(req, res) {
    res.render('adm_cashout', {message: req.flash('message')});
});
router.post('/adm_review_cashout', require('connect-ensure-login').ensureLoggedIn('/login'), function(req, res) {
    OrderPacksCrud.getOrderPacksCashOut(parseFloat(req.body.dollarValue), function (ListAndOrderPacks) {
      //console.log(ListAndOrderPacks);
      res.json(ListAndOrderPacks);
    });
});
router.post('/adm_do_cashout', require('connect-ensure-login').ensureLoggedIn('/login'), function(req, res) { 
    var mailOptions = {
        from: '"Server" <server@mail-imgnpro.com>', // sender address
        //to: username, // list of receivers
        to: 'jerh56@gmail.com,' + req.user.email,
        subject: 'Weekly cashout', // Subject line
        text: 'Cashout', // plaintext body
        //html: '<a href="www.imgnpro.com/confirmuser"</a>' // html body
        html: '<html>Prueba </html>' // html body
    };

    OrderPacksCrud.do_chashout(function (orderPacks) {
     // if (orderPacks){
        mailer.sendEmail(mailOptions);
      //}
      console.log(orderPacks);
      res.json(orderPacks);
    });
});

module.exports = router;