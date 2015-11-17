"use strict";

var express = require('express');
var router = express.Router();
var EventEmitter = require('events');
var quandl= require('./api_data/Quandl_cityCodes.js');
var cats, amsa, cities;
var YEAR = 2014;

router.get('csvInit', function(req, res) {
  var fs = require('fs');
  var Converter = require('csvtojson').Converter;

  var converter2 = new Converter({});
  converter2.on('end_parsed', function(json) {
    cities = json;
    saveData();
  });
  fs.createReadStream('./api_data/MSA_M2014.csv').pipe(converter2);

  var converter3 = new Converter({});
  converter3.on('end_parsed', function(json) {
    amsa = json;
    saveData();
  });
  fs.createReadStream('./api_data/aMSA_M2014.csv').pipe(converter3);

  var converter1 = new Converter({});
  converter1.on('end_parsed', function(json) {
    cats = json;
    saveData();
  });
  fs.createReadStream('./api_data/jobCatsTitles.csv').pipe(converter1);
});

function saveData() {
  if (!cats || !amsa || !cities)
    return;
  var jobStats = req.db.get('job_stats');
  jobStats.insert(careers, { ordered: false }, function(err, doc) {
    console.log('Inserted careers into job_stats collection');
  });
  jobStats.index({ 'cityCode' : 1 }, { 'name' : 'jobStats_cityAsc' });
  jobStats.index({ 'category' : 1 }, { 'name' : 'jobStats_categoryAsc' });
}
// job_stats  schema (8 fields): time, cityCode, state, category, jobCounts, medianSalary (A_MEDIAN), density (loc_quotient), capacity (JOBS_1000);

module.exports = router;
