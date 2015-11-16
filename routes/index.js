"use strict";

var request = require('request');
var express = require('express');
var router = express.Router();

router.get('/us/rentals', function(req, res) {
  var quandl= require('./api_data/Quandl_cityCodes.js');
  var rents = require('./api_data/rent_counts.js');
  var leases= require('./api_data/rent_prices.js');
  var ratio = require('./api_data/rent_ratio.js');
  var TESTCITY = 'Miami';
  var CITYCODE = quandl.codes[TESTCITY];
  var rentals = new Array(homes.length - 1);    // homes.length - 1 since rental data lags home data by 1 month;
  for (var i = 1; i < homes.length; i++) {      // start at 1 since data in sorted in descending order;
    var time = homes[i].time;
    rentals[i - 1] = { time: time, cityCode: CITYCODE, state: homes[i].state, rentCounts: rents[time], medianPrice: leases[time], rentRatio: ratio[time], usTraffic: homes[i].usTraffic };
  }
  res.json([rentals]);
});

router.get('/us/homes', function(req, res) {
  var homes = require('./api_data/home_data.js');
  res.json([homes]);
});

router.get('/us/jobs', function(req, res) {
  var jobs  = require('./api_data/job_listings.js');
  res.json([jobs]);
});

router.get('/us/careers', function(req, res) {
  var careers = require('./api_data/job_stats.js');
  res.json([careers]);
})

module.exports = router;