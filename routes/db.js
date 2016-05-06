var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/*Db Helper*/
var disaster_event_cont = require('../controller/disaster_event_cont');
var disaster_cont = require('../controller/disaster_cont');
var victim_cont = require('../controller/victim_cont');
var village_cont = require('../controller/village_cont');
var medical_facility_cont = require('../controller/medical_facility_cont');
var refugee_camp_cont = require('../controller/refugee_camp_cont');

/* GET DB interface. */
router.get('/', function(req, res, next) {
  	res.render('db_schema/db_schema');
});



/* GET Schema Declaration */
router.get('/disaster_event', function(req, res, next) {
  res.render('db_schema/db_schema_disaster_event');
});
router.get('/disaster', function(req, res, next) {
  res.render('db_schema/db_schema_disaster');
});
router.get('/victim', function(req, res, next) {
  	res.render('db_schema/db_schema_victim');
});
router.get('/village', function(req, res, next) {
  res.render('db_schema/db_schema_village');
});
router.get('/medical_facility', function(req, res, next) {
  res.render('db_schema/db_schema_medical_facility');
});
router.get('/refugee_camp', function(req, res, next) {
  res.render('db_schema/db_schema_refugee_camp');
});


/* DB INSERT. */
router.get('/disaster_event/insert', function(req, res, next) {
	disaster_event_cont.insert();
  	res.render('db_insert/db_insert_disaster_event');
});
router.get('/disaster/insert', function(req, res, next) {
	disaster_cont.insert();
  	res.render('db_insert/db_insert_disaster');
});
router.get('/victim/insert', function(req, res, next) {
	victim_cont.insert();
  	res.render('db_insert/db_insert_victim');
});
router.get('/village/insert', function(req, res, next) {
	village_cont.insert();
  	res.render('db_insert/db_insert_village');
});
router.get('/medical_facility/insert', function(req, res, next) {
	medical_facility_cont.insert();
  	res.render('db_insert/db_insert_medical_facility');
});
router.get('/refugee_camp/insert', function(req, res, next) {
	refugee_camp_cont.insert();
  	res.render('db_insert/db_insert_refugee_camp');
});


/* GET users listing. */
router.get('/refugee_camp/find', function(req, res, next) {
  res.send('respond with a resource db');
});

router.get('/disaster_event/find', function(req, res, next) {
  res.send('respond with a resource db');
});

router.get('/disaster/find', function(req, res, next) {
  res.send('respond with a resource db');
});

router.get('/victim/find', function(req, res, next) {
  res.send('respond with a resource db');
});

router.get('/village/find', function(req, res, next) {
  res.send('respond with a resource db');
});

router.get('/medical_facility/find', function(req, res, next) {
  res.send('respond with a resource db');
});

router.get('/refugee_camp/find', function(req, res, next) {
  res.send('respond with a resource db');
});


module.exports = router;