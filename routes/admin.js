"use strict";

var express = require('express');
var router = express.Router();
var EventEmitter = require('events');
var YEAR = 2014;

var rentParser = require('./api_data/rentParser.js');
var parseJobs  = require('./api_data/job_listings.js');
var parseHomes = require('./api_data/home_stats.js');
var jobs  = parseJobs(require('./Indeed_jobsList.js'));
var homes = parseHomes(require('./Trulia_homeStats.js'));
var quandl= require('./api_data/Quandl_metroCodes.js');

var rents = require('./api_data/rent_counts.js');
var leases = require('./api_data/rent_prices.js');
var ratio = require('./api_data/rent_ratio.js');
var TESTCITY = 'Miami, FL';
var CITYCODE = quandl.codes[TESTCITY];

var rentals = new Array(homes.length - 1);    // homes.length - 1 since rental data lags home data by 1 month;
for (var i = 1; i < homes.length; i++) {      // start at 1 since data in sorted in descending order;
  var time = homes[i].time;
  rentals[i - 1] = { time: time, cityCode: CITYCODE, state: homes[i].state, rentCounts: rents[time], medianPrice: leases[time], rentRatio: ratio[time], usTraffic: homes[i].usTraffic };
}

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
// jobs_list schema (11 fields): time, cityCode, city, category, jobtitle, company, url, date, snippet, lat, lng;
// rent_stats schema (6 fields): time, cityCode, state, rentCounts, medianPrice, rentRatio;
// home_stats schema (7 fields): time, cityCode, state, homeCounts, medianPrice, averagePrice, usTraffic (popularity);
// job_stats_2014 schema (6 fields): cityCode, state, category, medianSalary (A_MEDIAN), density (loc_quotient), capacity (JOBS_1000);
// for rentals PRR: larger values = cheaper renting; for rentals && homes usTraffic: larger values = more popular areas;

router.get('csvInit', function(req, res) {
  var fs = require('fs');
  var Converter = require('csvtojson').Converter;

  var converter = new Converter({});
  converter.on('end_parsed', function(json) {
    saveData(json);
  });
  fs.createReadStream('./api_data/MSAdata_2014.csv').pipe(converter);
});

function saveData(careers) {
  var jobStats = req.db.get('job_stats_' + YEAR);
  jobStats.insert(careers, { ordered: false }, function(err, doc) {
    console.log('Inserted careers into job_stats collection');
  });
  jobStats.index({ 'cityCode' : 1 }, { 'name' : 'jobStats_cityAsc' });
  jobStats.index({ 'category' : 1 }, { 'name' : 'jobStats_categoryAsc' });
}

router.get('/', function(req, res) {
  res.render('index', { jobs: jobs, homes: homes, rentals: rentals });
});

module.exports = router;