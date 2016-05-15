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
		res.render('display/display_disaster_event',{data: result, id_disasters:result.id_disasters, title: 'Disaster Event'});
	});
});
router.get('/disaster/:id', function(req, res, next) {
	disaster_cont.findById(req.params.id, function(result){	
		res.render('display/display_disaster',{data: result, _id: result._id, id_victims: result.id_victims, title: 'Disaster'});
	});
});
router.get('/village/:id', function(req, res, next) {
	village_cont.findById(req.params.id, function(result){	
		res.render('display/display_village',{data: result, _id: result._id, title: 'Village'});
	});
});
router.get('/victim/:id', function(req, res, next) {
	victim_cont.findById(req.params.id, function(result){	
		id_camps = [];
		for (var i = result.is_refugee.record_refugee_camps.length - 1; i >= 0; i--) {
			console.log(result.is_refugee)
			id_camps.push(result.is_refugee.record_refugee_camps[i].id_refugee_camp);
		}
		res.render('display/display_victim',{data: result,  id_camps: id_camps, id_original_village: result.id_original_village,  title: 'Victim'});
	});
});
router.get('/medical_facility/:id', function(req, res, next) {
	medical_facility_cont.findById(req.params.id, function(result){
		console.log(result);	
		res.render('display_json',{data: result, title: 'Medical Facility'});
	});
});
router.get('/refugee_camp/:id', function(req, res, next) {
	refugee_camp_cont.findById(req.params.id, function(result){	
		res.render('display_json',{data: result, title: 'Refugee Camp'});
	});
});

module.exports = router;