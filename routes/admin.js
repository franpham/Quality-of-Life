"use strict";

// var EventEmitter = require('events');
var express = require('express');
var router = express.Router();
var moment = require('moment');
var quandl = require('./api_data/Quandl_utils.js');

var TESTCITY = 'Miami, FL';
var CITYCODE = quandl.codes[TESTCITY];
var CATEGORY = 'computer / internet';
var YEAR = 2014;      // BLS data lags by 1 yr;
var thisDate = moment();
thisDate.isoWeekday(1);   // set to Monday when week # changes;
var thisWeek = thisDate.isoWeek();
var jobTime = thisDate.year() + '-' + thisWeek;

var parseJobs  = require('./api_data/job_listings.js');
var parseHomes = require('./api_data/home_stats.js');
var jobs = parseJobs(require('./api_data/Indeed_jobsList.js'), jobTime, CITYCODE, CATEGORY);
var homes= parseHomes(require('./api_data/Trulia_homeStats.js'), CITYCODE, quandl.getState(CITYCODE));
var counts = require('./api_data/rent_counts.js');
var prices = require('./api_data/rent_prices.js');
var ratios = require('./api_data/rent_ratios.js');

var keys = Object.keys(counts);
var rentals = new Array(keys.length);
var state = quandl.getState(CITYCODE);
for (var i = 0; i < keys.length; i++) {
  var time = keys[i];
  rentals[i] = { time: time, cityCode: CITYCODE, state: state, rentCounts: counts[time], medianPrice: prices[time], rentRatio: ratios[time] };
}

// jobs_list schema (11 fields): time, cityCode, city, category, jobtitle, company, url, date, snippet, lat, lng;
// job_stats_2014 schema (6 fields):   cityCode, state, category, medianSalary (A_MEDIAN), density (loc_quotient), capacity (JOBS_1000);
// rent_stats schema (6 fields): time, cityCode, state, rentCounts, medianPrice, rentRatio;
// home_stats schema (7 fields): time, cityCode, state, homeCounts, medianPrice, averagePrice, usTraffic (popularity);
// for rentals PRR: larger values = cheaper renting; for rentals && homes usTraffic: larger values = more popular areas;

router.get('/dbInit', function(req, res) {
  console.log('Initializing hire database...');

  var homeStats = req.db.get('home_stats');
  homeStats.insert(homes, { ordered: false }, function(err, doc) {
    console.log('Inserted homes into home_stats collection');
  });
  homeStats.index({ 'time' : 1 }, { 'name' : 'homeStats_monthAsc' });
  homeStats.index({ 'cityCode' : 1 }, { 'name' : 'homeStats_cityAsc' });
  // must create index using monk's function (index), NOT mongodb (createIndex);

  var rentStats = req.db.get('rent_stats');
  rentStats.insert(rentals, { ordered: false }, function(err, doc) {
    console.log('Inserted rentals into rent_stats collection');
  });
  rentStats.index({ 'time' : 1 }, { 'name' : 'rentStats_monthAsc' });
  rentStats.index({ 'cityCode' : 1 }, { 'name' : 'rentStats_cityAsc' });

  var jobsList = req.db.get('jobs_list');
  jobsList.insert(jobs, { ordered: false }, function(err, doc) {
    console.log('Inserted jobs into jobs_list collection');
  });
  jobsList.index({ 'cityCode' : 1 }, { 'name' : 'jobsList_cityAsc' });
  jobsList.index({ 'category' : 1 }, { 'name' : 'jobsList_categoryAsc' });

  res.send('Finished creating collections and indexes for rentals, homes, and jobs.');
});

router.get('csvInit', function(req, res) {
  var fs = require('fs');
  var Converter = require('csvtojson').Converter;

  var converter = new Converter({});
  converter.on('end_parsed', function(careers) {
    var jobStats = req.db.get('job_stats_' + YEAR);
    jobStats.insert(careers, { ordered: false }, function(err, doc) {
      console.log('Inserted careers into job_stats collection');
    });
    jobStats.index({ 'cityCode' : 1 }, { 'name' : 'jobStats_cityAsc' });
    jobStats.index({ 'category' : 1 }, { 'name' : 'jobStats_categoryAsc' });
  });
  fs.createReadStream('./api_data/MSAdata_2014.csv').pipe(converter);
});

router.get('/', function(req, res) {
  res.render('index', { jobs: jobs, homes: homes, rentals: rentals });
});

module.exports = router;