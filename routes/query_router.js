var express = require('express');
var router = express.Router();

var disaster_event_cont = require('../controller/disaster_event_cont');
var disaster_cont = require('../controller/disaster_cont');
var victim_cont = require('../controller/victim_cont');
var village_cont = require('../controller/village_cont');
var medical_facility_cont = require('../controller/medical_facility_cont');
var refugee_camp_cont = require('../controller/refugee_camp_cont');

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('query_views/view_query_list', { title: "Query"});
});

/* GET Query input */
router.get('/query_1', function(req, res, next) {
  res.render('query_views/view_query_1', {title:"Query 1"});
});
router.get('/query_2', function(req, res, next) {
  res.render('query_views/view_query_2', {title:"Query 2"});
});
router.get('/query_3', function(req, res, next) {
  res.render('query_views/view_query_3', {title:"Query 3"});
});
router.get('/query_4', function(req, res, next) {
  res.render('query_views/view_query_4', {title:"Query 4"});
});
router.get('/query_5', function(req, res, next) {
  res.render('query_views/view_query_5', {title:"Query 5"});
});
router.get('/query_6', function(req, res, next) {
  res.render('query_views/view_query_6', {title:"Query 6"});
});
router.get('/query_7', function(req, res, next) {
  res.render('query_views/view_query_7', {title:"Query 7"});
});
router.get('/query_8', function(req, res, next) {
  res.render('query_views/view_query_8', {title:"Query 8"});
});


/* Answer Query input */
router.post('/query_1/poin1', function(req, res, next) {
	disaster_event_cont.query_1_poin1(req.body, function(result){
		res.send(result);
	});
});
router.post('/query_1/poin2', function(req, res, next) {
  disaster_event_cont.query_1_poin2(req.body, function(result){
    res.send(result);
  });
});
router.post('/query_1/poin3', function(req, res, next) {
  disaster_event_cont.query_1_poin3(req.body, function(result){
    res.send(result);
  });
});
router.post('/query_1/poin4', function(req, res, next) {
  disaster_event_cont.query_1_poin4(req.body, function(result){
    res.send(result);
  });
});

module.exports = router;