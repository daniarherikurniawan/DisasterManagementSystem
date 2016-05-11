var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');

/*Db Helper*/
var disaster_event_cont = require('../controller/disaster_event_cont');
var disaster_cont = require('../controller/disaster_cont');
var victim_cont = require('../controller/victim_cont');
var village_cont = require('../controller/village_cont');
var medical_facility_cont = require('../controller/medical_facility_cont');
var refugee_camp_cont = require('../controller/refugee_camp_cont');

/* GET DB interface. */
router.get('/', function(req, res, next) {
  	res.render('db_schema/view_db_schema', {title:"Database"});
});

/* GET Schema Declaration */
router.get('/data.json', function(req, res, next) {
	fs.readFile('data.json', 'utf8', function (err,data) {
	  if (err) {
	    console.error('There was an error reading the file!', err);
    	return;
	  }
  		res.send(data);
	});
});


/* GET Schema Declaration */
router.get('/disaster_event', function(req, res, next) {
  res.render('db_schema/view_disaster_event', {title:"Disaster Event"});
});
router.get('/disaster', function(req, res, next) {
  res.render('db_schema/view_disaster', {title:"Disaster"});
});
router.get('/victim', function(req, res, next) {
  	res.render('db_schema/view_victim', {title:"Victim"});
});
router.get('/village', function(req, res, next) {
  res.render('db_schema/view_village', {title:"Village"});
});
router.get('/medical_facility', function(req, res, next) {
  res.render('db_schema/view_medical_facility', {title:"Medical Facility"});
});
router.get('/refugee_camp', function(req, res, next) {
  res.render('db_schema/view_refugee_camp', {title:"Refugee Camp"});
});


/* DB INSERT. */
router.post('/disaster_event/insert', function(req, res, next) {
	disaster_event_cont.insert();
  res.send('respond with a resource db');
});
router.post('/disaster/insert', function(req, res, next) {
	disaster_cont.insert();
  res.send('respond with a resource db');
});
router.post('/victim/insert', function(req, res, next) {
	victim_cont.insert();
  res.send('respond with a resource db');
});

router.post('/village/insert', function(req, res, next) {
  if(req.body != null){
    village_id = village_cont.insert(req.body);
    if(village_id != null )
      res.send(village_id);
    else
      res.res.sendStatus(500);
  }else{
    res.res.sendStatus(500);
  }
});

router.post('/medical_facility/insert', function(req, res, next) {
  if(req.body != null){
    medical_facility_id = medical_facility_cont.insert(req.body);
    if(medical_facility_id != null )
      res.send(medical_facility_id);
    else
      res.res.sendStatus(500);
  }else{
    res.res.sendStatus(500);
  }
});

router.post('/refugee_camp/insert', function(req, res, next) {
	if(req.body != null){
    refugee_camp_id = refugee_camp_cont.insert(req.body);
    if(refugee_camp_id != null )
      res.send(refugee_camp_id);
    else
      res.res.sendStatus(500);
  }else{
    res.res.sendStatus(500);
  }
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

router.post('/village/find', function(req, res, next) {
  village_cont.find(req.body.search_term, function(response){
    res.send(response);
  });
});

router.get('/medical_facility/find', function(req, res, next) {
  res.send('respond with a resource db');
});

router.get('/refugee_camp/find', function(req, res, next) {
  res.send('respond with a resource db');
});


module.exports = router;