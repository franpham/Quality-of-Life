"use strict";

var quandl = require('./Quandl_metroCodes.js');
var moment = require('moment');
var CATEGORY = 'Computer / Internet';
var TESTCITY = 'Miami, FL';
var CITYCODE = quandl.codes[TESTCITY];

function parseJobs(json, cityCode, category) {
  var nextJobQuery = json.end;          // do not increment since start = 1;
  var jobCounts = json.totalResults;    // = available jobs; NOTE: BLS' jobs_1000 = taken jobs;
  var items = json.results;
  var thisDate = moment();
  thisDate.isoWeekday(1);   // set to Monday when week # changes;
  var thisWeek = thisDate.isoWeek();
  var time = thisDate.year() + '-' + thisWeek;
  var jobs = [];

  for(var i = 0; i < items.length; i++) {
    var data = { time: time, cityCode: cityCode, city: quandl.cities[cityCode], category: category, jobtitle: items[i].jobtitle,
                company: items[i].company, url: items[i].url, date: items[i].date, snippet: items[i].snippet, lat: items[i].latitude, lng: items[i].longitude };
    jobs[i] = data;
  }
  return jobs;
}

module.exports = parseJobs;
// jobs_list schema (11 fields): time, cityCode, city, category, jobtitle, company, url, date, snippet, lat, lng;

// initialize DB with 91 days of data, then search again every Monday when week # changes; &useragent=&userip=0.0.0.0
// set st=employer for employer-listed jobs so map markers don't overlap; "limit" of 25 is returned, so see "totalResults" field for total listings;
// http://api.indeed.com/ads/apisearch?publisher=1588917421720308&format=json&start=0&fromage=91&jt=fulltime&st=employer&latlong=1&limit=50&radius=50&v=2&l=Miami%2CFL&q=web+developer
