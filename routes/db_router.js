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
  if(req.body != null){
    disaster_event_id = disaster_event_cont.insert(req.body, function(disaster_event_id){
      if(disaster_event_id != null )
        res.send(disaster_event_id);
      else
        res.res.sendStatus(500);
    });
  }else{
    res.res.sendStatus(500);
  }
});

router.post('/disaster/insert', function(req, res, next) {
  if(req.body != null){
    disaster_id = disaster_cont.insert(req.body);
    if(disaster_id != null )
      res.send(disaster_id);
    else
      res.res.sendStatus(500);
  }else{
    res.res.sendStatus(500);
  }
});

router.post('/victim/insert', function(req, res, next) {
  if(req.body != null){
    victim_id = victim_cont.insert(req.body);
    if(victim_id != null )
      res.send(victim_id);
    else
      res.res.sendStatus(500);
  }else{
    res.res.sendStatus(500);
  }
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
router.post('/disaster_event/find', function(req, res, next) {
  disaster_event_cont.find(req.body.search_term, function(response){
    res.send(response);
  });
});
router.post('/disaster_event/find_id_and_type', function(req, res, next) {
  disaster_event_cont.find_id_and_type(req.body.search_term, function(response){
    res.send(response);
  });
});
router.post('/disaster_event/find_id_and_type_and_victim', function(req, res, next) {
  disaster_event_cont.find_id_and_type_and_victim(req.body.search_term, function(response){
    res.send(response);
  });
});
router.post('/disaster/find', function(req, res, next) {
  disaster_cont.find(req.body.search_term, function(response){
    res.send(response);
  });
});

router.post('/victim/find_name_medfac', function(req, res, next) {
  victim_cont.find_name_medfac(req.body.search_term, function(response){
    res.send(response);
  });
});
router.post('/victim/find', function(req, res, next) {
  victim_cont.find(req.body.search_term, function(response){
    res.send(response);
  });
});

router.post('/village/find', function(req, res, next) {
  village_cont.find(req.body.search_term, function(response){
    res.send(response);
  });
});

router.post('/medical_facility/find', function(req, res, next) {
  medical_facility_cont.find(req.body.search_term, function(response){
    res.send(response);
  });
});

router.post('/refugee_camp/find', function(req, res, next) {
  refugee_camp_cont.find(req.body.search_term, function(response){
    res.send(response);
  });
});


/* Modified */
router.post('/disaster_event/get_id', function(req, res, next) {
  disaster_event_cont.get_id(function(response){
    res.send(response);
  });
});

router.post('/victim/get_id', function(req, res, next) {
  victim_cont.get_id(function(response){
    res.send(response);
  });
});
router.post('/disaster/get_array_id', function(req, res, next) {
  disaster_cont.get_array_id(req.body, function(response){
    res.send(response);
  });
});
router.post('/disaster/geo_region/:id', function(req, res, next) {
  disaster_cont.findById(req.params.id, function(response){
    res.send(response.record_region);
  });
});
router.post('/village/geo_region/:id', function(req, res, next) {
  village_cont.findById(req.params.id, function(response){
    res.send(response.geo_region);
  });
});
router.post('/village/get_villages_geom', function(req, res, next) {
  village_cont.get_villages_geom(function(response){
    res.send(response);
  });
});
router.post('/disaster/get_disasters_geom', function(req, res, next) {
  disaster_cont.get_disasters_geom(req.body, function(response){
    res.send(response);
  });
});


module.exports = router;