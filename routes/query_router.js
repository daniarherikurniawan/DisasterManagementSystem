var express = require('express');
var router = express.Router();

var disaster_event_cont = require('../controller/disaster_event_cont');
var disaster_cont = require('../controller/disaster_cont');
var victim_cont = require('../controller/victim_cont');
var village_cont = require('../controller/village_cont');
var medical_facility_cont = require('../controller/medical_facility_cont');
var refugee_camp_cont = require('../controller/refugee_camp_cont');
var postgre_cont = require('../controller/postgre_cont');

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

/* Run Query Postgresql */
router.post('/run', function(req, res, next) {
  postgre_cont.run_query(req.body, function(result){
    res.send(result);
  });
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
router.post('/query_4/filter_by_date', function(req, res, next) {
  disaster_cont.filter_by_date(req.body, function(result){
    res.send(result);
  });
});
router.post('/query_5/filter_by_date', function(req, res, next) {
  disaster_cont.filter_by_date_show_victim(req.body, function(result){
    res.send(result);
  });
});
router.post('/query_5/filter_by_month', function(req, res, next) {
  disaster_cont.filter_by_month_show_victim(req.body, function(result){
    res.send(result);
  });
});

router.post('/query_5/filter_by_year', function(req, res, next) {
  disaster_cont.filter_by_year_show_victim(req.body, function(result){
    res.send(result);
  });
});
router.post('/query_5/get_id_disaster_from_user', function(req, res, next) {
  victim_cont.get_id_disaster_from_user(req.body, function(result){
    res.send(result);
  });
});
router.post('/query_5/poin3', function(req, res, next) {
  victim_cont.query_5_poin3(req.body, function(result){
    res.send(result);
  });
});

router.post('/query_5/get_disaster_event_query5', function(req, res, next) {
  disaster_event_cont.get_disaster_event_query5(function(result){
    res.send(result);
  });
});

router.post('/query_6', function(req, res, next) {
  refugee_camp_cont.filter_by_location(req.body, function(result){
    res.send(result);
  });
});
router.post('/query_6/get_every_id', function(req, res, next) {
  refugee_camp_cont.get_every_id( function(result){
    res.send(result);
  });
});

router.post('/query_7', function(req, res, next) {
  medical_facility_cont.filter_by_location(req.body, function(result){
    res.send(result);
  });
});
router.post('/query_7/get_every_id', function(req, res, next) {
  medical_facility_cont.get_every_id( function(result){
    res.send(result);
  });
});
router.post('/query_8/poin4', function(req, res, next) {
  victim_cont.filter_by_status_and_age(req.body, function(result){
    res.send(result);
  });
});
module.exports = router;