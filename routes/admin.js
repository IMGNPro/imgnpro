var express = require('express');
var router = express.Router();
var OrderPacksCrud = require('../modules/orderpacks_crud.js');

router.get('/adm_cashout', require('connect-ensure-login').ensureLoggedIn('/login'), function(req, res) {
    res.render('adm_cashout', {message: req.flash('message')});
});
router.post('/adm_do_cashout', require('connect-ensure-login').ensureLoggedIn('/login'), function(req, res) {
    //res.render('adm_cashout', {message: req.flash('message')});    
    OrderPacksCrud.getOrderPacksCashOut('',function (orderPacks) {
      console.log(orderPacks);
      res.json(orderPacks);
    });
});

module.exports = router;