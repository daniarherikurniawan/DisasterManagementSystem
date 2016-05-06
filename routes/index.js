var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var disaster_cont = require('../controller/disaster_cont');

/* GET home page. */
router.get('/', function(req, res, next) {
	disaster_cont.signUp();
  	res.render('index', { title: disaster_cont.hello() });
});

module.exports = router;
