var express = require('express');
var router = express.Router();

var disaster_event_cont = require('../controller/disaster_event_cont');
var disaster_cont = require('../controller/disaster_cont');
var victim_cont = require('../controller/victim_cont');
var village_cont = require('../controller/village_cont');
var medical_facility_cont = require('../controller/medical_facility_cont');
var refugee_camp_cont = require('../controller/refugee_camp_cont');


router.get('/disaster_event/:id', function(req, res, next) {
	disaster_event_cont.findById(req.params.id, function(result){	
		res.render('display_json',{data: result, title: 'Disaster Event'});
	});
});
router.get('/disaster/:id', function(req, res, next) {
	disaster_cont.findById(req.params.id, function(result){	
		res.render('display_json',{data: result, title: 'Disaster'});
	});
});
router.get('/village/:id', function(req, res, next) {
	village_cont.findById(req.params.id, function(result){	
		res.render('display_json',{data: result, title: 'Village'});
	});
});
router.get('/victim/:id', function(req, res, next) {
	victim_cont.findById(req.params.id, function(result){	
		res.render('display_json',{data: result, title: 'Victim'});
	});
});
router.get('/medical_facility/:id', function(req, res, next) {
	medical_facility_cont.findById(req.params.id, function(result){	
		res.render('display_json',{data: result, title: 'Medical Facility'});
	});
});
router.get('/refugee_camp/:id', function(req, res, next) {
	refugee_camp_cont.findById(req.params.id, function(result){	
		res.render('display_json',{data: result, title: 'Refugee Camp'});
	});
});

module.exports = router;