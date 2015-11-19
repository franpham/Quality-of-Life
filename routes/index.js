"use strict";

var moment  = require('moment');
var request = require('request');
var express = require('express');
var router  = express.Router();
var requestJson = require('request-json');

var rentParser = require('./api_data/rentParser.js');
var parseJobs  = require('./api_data/job_listings.js');
var parseHomes = require('./api_data/home_stats.js');
var quandl = require('./api_data/Quandl_metroCodes.js');
var indeed = require('./api_data/Indeed_jobCats.js');
var BLS_YEAR1 = 2014;           // BLS job stats lag by 1 yr;
var INDEED_ISOWEEK = 47;        // Indeed job listings lag by 1 week (47 = 11-16-15);
var TRULIA_MONTH1 = '2015-10';  // Trulia home stats lag by 1 month;
var QUANDL_MONTH1 = '2015-09';  // Quandl rent stats lag by 2 months;

function getState(cityCode) {
  var city = quandl.cities[cityCode];
  return city.substring(city.length - 2);
}
function getCity(cityCode) {
  var city = quandl.cities[cityCode];   // -4: 2 for state && 2 for ', ';
  return city.substring(0, city.length - 4);
}
function getQuandlCode(cityCode) {
  var code = parseInt(cityCode);                    // C = city, M = metro;
  return (code ===  37 || code === 44 || code === 128) ? 'C' + cityCode : 'M' + cityCode;
}

// Before moment 2.1.0, if a moment changed months and the new month did not have enough days to keep the current day of month, it would overflow to the next month.
// As of version 2.1.0, this was changed to be clamped to the end of the target month.
// rent_stats lags by 2 months; home_stats lags by 1 month; jobs_list lags by 1 week; job_stats_2014 is collected per year;

// jobs_list schema (11 fields): time, cityCode, city, category, jobtitle, company, url, date, snippet, lat, lng;
// rent_stats schema (6 fields): time, cityCode, state, rentCounts, medianPrice, rentRatio;
// home_stats schema (7 fields): time, cityCode, state, homeCounts, medianPrice, averagePrice, usTraffic (popularity);
// job_stats_2014 schema (6 fields):   cityCode, state, category, medianSalary (A_MEDIAN), density (loc_quotient), capacity (JOBS_1000);

router.get('/rents/:cityCode', function(req, res) {
  var rentStats = req.db.get('rent_stats');
  var cityCode = req.params.cityCode;
  var rentals = [];
  validateParams(cityCode);

  var thisDate = moment();
  thisDate.date(1);             // set to 1st date to normalize month;
  thisDate.isoWeekday(6);       // set to Saturday AFTER setting date;
  thisDate.subtract(1, 'months');           // -1 since Quandl lags by 2 months, but month() is 0-based;;
  var thisMonth = thisDate.month() + 1;     // +1 since Quandl month starts at 1;
  var time = thisDate.year() + '-' + (thisMonth < 10 ? '0' + thisMonth : thisMonth.toString());
  rentStats.find({ time: time, cityCode: cityCode }, function(err, docs) {
    rentals = docs;     // docs is an array;

    if (rentals.length > 0) {
      console.log('Found rentals in DB');
      return res.json(rentals);
    }
    var counts, prices, ratios;

    var lastDate = thisDate.clone();
    lastDate.date(lastDate.daysInMonth());  // set to last date;
    var lastSat = lastDate.clone();         // NOT thisDate;
    lastSat.isoWeekday(6);                  // set to Saturday;
    var endDate = moment.min(lastDate, lastSat);
    var subquery = time === QUANDL_MONTH1 ? 'start_date=2013-09-01' : 'start_date=' + (time + '-01');   // -01 = 1st date;
    subquery += '&end_date=' + (time + '-' + endDate.date());

    var query = 'api/v3/datasets/ZILL/' + getQuandlCode(cityCode) + '_HR.json?';
    var client1 = requestJson.createClient('https://www.quandl.com/');
    client1.get(query + subquery, function(err1, resp1, body1) {
      if (err1)
        throw err1;
      console.log('Retrieved rental counts from Quandl');
      counts = rentParser.parseRentCounts(body1);

      var query = 'api/v3/datasets/ZILL/' + getQuandlCode(cityCode) + '_RAH.json?';
      var client2 = requestJson.createClient('https://www.quandl.com/');
      client2.get(query + subquery, function(err2, resp2, body2) {
        if (err2)
          throw err2;
        console.log('Retrieved rental prices from Quandl');
        prices = rentParser.parseRentPrices(body2);

        var query = 'api/v3/datasets/ZILL/' + getQuandlCode(cityCode) + '_PRR.json?';
        var client3 = requestJson.createClient('https://www.quandl.com/');
        client3.get(query + subquery, function(err3, resp3, body3) {
          if (err3)
            throw err3;
          console.log('Retrieved rental ratios from Quandl');
          ratios = rentParser.parseRentRatios(body3);
          console.log('Quandl query: ' + query + subquery);

          var keys = Object.keys(counts);
          rentals = new Array(keys.length);
          var state = getState(cityCode);
          for (var i = 0; i < keys.length; i++) {
            var time = keys[i];
            rentals[i] = { time: time, cityCode: cityCode, state: state, rentCounts: counts[time], medianPrice: prices[time], rentRatio: ratios[time] };
          }
          var rentStats = req.db.get('rent_stats');
          rentStats.insert(rentals, { ordered: false }, function(dbError, doc) {
            if (dbError)
              throw dbError;
            console.log('Inserted rentals into rent_stats collection');
            res.json(rentals);
          });
        });
      });
    });
  });
});

router.get('/homes/:cityCode', function(req, res) {
  var homeStats = req.db.get('home_stats');
  var cityCode = req.params.cityCode;
  var homes = [];
  validateParams(cityCode);

  var thisDate = moment();
  thisDate.date(1);             // set to 1st date to normalize month;
  thisDate.isoWeekday(6);       // set to Saturday AFTER setting date;
  // Trulia lags by 1 month, but do not -1 since month() is 0-based;;
  var thisMonth = thisDate.month() + 1;       // +1 since Trulia month starts at 1;
  var time = thisDate.year() + '-' + (thisMonth < 10 ? '0' + thisMonth : thisMonth.toString());
  homeStats.find({ time: time, cityCode: cityCode }, function(err, docs) {
    homes = docs;     // docs is an array;

    if (homes.length === 0) {
      // IMPORTANT: endDate MUST BE ON SAT TO AVOID EXTRA WEEKS; to get the latest percentNationalTraffic, endDate must be specified and startDate must be 2013-09-01 or later;
      var url = 'http://api.trulia.com/webservices.php?library=TruliaStats&function=getCityStats&apikey=vb8fwj79vknntzqeva4fm93u';
      var lastDate = thisDate.clone();
      lastDate.date(lastDate.daysInMonth());  // set to last date;
      var lastSat = lastDate.clone();         // NOT thisDate;
      lastSat.isoWeekday(6);                  // set to Saturday;
      var endDate = moment.min(lastDate, lastSat);
      var state = getState(cityCode);

      var subquery = time === TRULIA_MONTH1 ? '&startDate=2013-09-01' : '&startDate=' + (time + '-01');   // -01 = 1st date;
      subquery += '&endDate=' + (time + '-' + endDate.date()) + '&city=' + getCity(cityCode) + '&state=' + state;
      console.log('Trulia query: ' + subquery);
      request.get(url + subquery, function(error, response, body) {
        console.log('Retrieved homes xml from Trulia');
        if (error)
          throw error;
        homes = parseHomes(body, cityCode, state);
        var homeStats = req.db.get('home_stats');
        homeStats.insert(homes, { ordered: false }, function(dbError, doc) {
          if (dbError)
            throw dbError;
          console.log('Inserted homes into home_stats collection');
          res.json(homes);    // NOT response!
        });
      });
    }
    else {
      console.log('Found homes in DB');
      res.json(homes);
    }
  });
});

router.get('/jobs/:cityCode/:category', function(req, res) {
  var jobsList = req.db.get('jobs_list');
  var cityCode = req.params.cityCode;
  var category = req.params.category;
  var jobs = [];
  validateParams(cityCode, category);

  var thisDate = moment();
  thisDate.isoWeekday(1);   // set to Monday when week # changes;
  var thisWeek = thisDate.isoWeek();
  var time = thisDate.year() + '-' + thisWeek;
  jobsList.find({ time: time, cityCode: cityCode, category: category }, function(err, docs) {
    jobs = docs;    // docs is an array;

    if (jobs.length === 0) {
      var city = quandl.cities[cityCode];
      // initialize DB with 91 days of data, then search again every Monday when week # changes; &useragent=&userip=0.0.0.0
      // set st=employer for employer-listed jobs so map markers don't overlap; "limit" of 25 is returned, so see "totalResults" for total listings;
      var query = 'ads/apisearch?publisher=1588917421720308&format=json&start=0&jt=fulltime&st=employer&latlong=1&limit=50&radius=50&v=2';
      var subquery = thisWeek === INDEED_ISOWEEK ? '&fromage=91' : '&fromage=7';
      subquery += '&l=' + encodeURIComponent(city) + '&q=' + encodeURIComponent(category);

      var client = requestJson.createClient('http://api.indeed.com/');
      client.get(query + subquery, function(error, response, body) {
        console.log('Retrieved jobs json from Indeed');
        if (error)
          throw error;
        jobs = parseJobs(body, cityCode, category);   // body is the API json;
        var jobsList = req.db.get('jobs_list');
        jobsList.insert(jobs, { ordered: false }, function(dbError, doc) {
          if (dbError)
            throw dbError;
          console.log('Inserted jobs into jobs_list collection');
          res.json(jobs);   // NOT response!
        });
      });
    }
    else {
      console.log('Found jobs in DB');
      res.json(jobs);
    }
  });
});

router.get('/careers/:cityCode/:category', function(req, res) {
  // var careers = require('./api_data/job_stats.js');
  var jobStats = req.db.get('job_stats_' + BLS_YEAR1);
  var cityCode = req.params.cityCode;
  var category = req.params.category;
  var stats = [];
  validateParams(cityCode, category);

  jobStats.find({ cityCode: cityCode, category: category }, function(dbError, docs) {
    stats = docs;           // docs is an array;
    if (dbError)
      throw dbError;
    else if (stats.length === 0)
      throw new Error('Job stats collection not found for: ', BLS_YEAR1, cityCode, category);
    res.json(stats);
  });
});

function validateParams(cityCode, category) {
  if ((category && !indeed[category]) || (cityCode && !quandl.cities[cityCode]))
    throw new Error('Invalid query paramaters: ', cityCode, category);
}

module.exports = router;    // 2nd goals: validate parameters!
