"use strict";

var moment  = require('moment');
var request = require('request');
var express = require('express');
var router  = express.Router();
var requestJson = require('request-json');

var parseJobs  = require('./api_data/job_listings.js');
var parseHomes = require('./api_data/home_stats.js');
var indeed = require('./api_data/Indeed_jobCats.js');
var quandl = require('./api_data/Quandl_utils.js');
var INDEED_ISOWEEK = 47;        // Indeed job listings lag by 1 week (47 = 11-16-15);
var TRULIA_MONTH1 = '2015-10';  // Trulia home stats lag by 1 month;
var QUANDL_MONTH1 = '2015-09';  // Quandl rent stats lag by 2 months;

// Before moment 2.1.0, if a moment changed months and the new month did not have enough days to keep the current day of month, it would overflow to the next month.
// As of version 2.1.0, this was changed to be clamped to the end of the target month.
// rent_stats lags by 2 months; home_stats lags by 1 month; jobs_list lags by 1 week; job_stats_2014 is collected per year;

// jobs_list schema (11 fields): time, cityCode, city, category, jobtitle, company, url, date, snippet, lat, lng;
// job_stats_2014 schema (6 fields):   cityCode, state, category, medianSalary (A_MEDIAN), density (loc_quotient), capacity (JOBS_1000);
// rent_stats schema (6 fields): time, cityCode, state, rentCounts, medianPrice, rentRatio;
// home_stats schema (7 fields): time, cityCode, state, homeCounts, medianPrice, averagePrice, usTraffic (popularity);
// for rentals PRR: larger values = cheaper renting; for rentals && homes usTraffic: larger values = more popular areas;

router.get('/allRents', function(req, res) {
  var thisDate = moment();
  thisDate.date(1);             // set to 1st date to normalize month;
  thisDate.isoWeekday(6);       // set to Saturday AFTER setting date;
  thisDate.subtract(1, 'months');           // -1 since Quandl lags by 2 months, but month() is 0-based;;
  var thisMonth = thisDate.month() + 1;     // +1 since Quandl month starts at 1;
  var time = thisDate.year() + '-' + (thisMonth < 10 ? '0' + thisMonth : thisMonth.toString());
  var rentStats = req.db.get('rent_stats');
  var cityCodes = quandl.codeSet;
  var data = [];

  for (var i = cityCodes.length - 1; i >= 0; i--) {
    var thisCode = cityCodes[i];
    var thisTime = checkRentTime(thisCode, time);   // DO NOT reassign time!

    var promise = rentStats.find({ time: thisTime, cityCode: thisCode });
    (function(cityCode) {
      promise.success(function(docs1) {
        if (docs1 && docs1.length > 0) {
          console.log('Found rentals in DB for ', cityCode);
          data.push(docs1);
          if (data.length === quandl.codeSet.length)
            res.json(data);
        }
        else {
          getAPIRents(cityCode, rentStats, time, thisDate.clone(), function(docs2) {
            data.push(docs2);             // NOT thisTime!
            if (data.length === quandl.codeSet.length)    // MUST BE inside callback;
              res.json(data);
          });
        }
      });   // MUST pass cityCode since i == -1 when success is called;
    })(thisCode);
  }
});

router.get('/rents/:cityCode', function(req, res) {
  var cityCode = req.params.cityCode;
  validateParams(cityCode);
  var thisDate = moment();
  thisDate.date(1);             // set to 1st date to normalize month;
  thisDate.isoWeekday(6);       // set to Saturday AFTER setting date;
  thisDate.subtract(1, 'months');           // -1 since Quandl lags by 2 months, but month() is 0-based;;
  var thisMonth = thisDate.month() + 1;     // +1 since Quandl month starts at 1;
  var time = thisDate.year() + '-' + (thisMonth < 10 ? '0' + thisMonth : thisMonth.toString());
  var rentStats = req.db.get('rent_stats');
  var thisTime = checkRentTime(cityCode, time);

  var promise = rentStats.find({ time: thisTime, cityCode: cityCode });
  promise.success(function(docs1) {
    if (docs1 && docs1.length > 0) {
      console.log('Found rentals in DB for ', cityCode);
      res.json(docs1);
    }
    else {
      getAPIRents(cityCode, rentStats, time, thisDate.clone(), function(docs2) {
        res.json(docs2);              // NOT thisTime!
      });
    }
  });
});

function checkRentTime(cityCode, time) {    // call this method only when finding latest data in DB, NOT when calling getAPIRents;
  if (cityCode !== '00003' && cityCode !== '00054')
    return time;
  var thisDate = moment();
  thisDate.date(1);             // set to 1st date to normalize month;
  thisDate.isoWeekday(6);       // set to Saturday AFTER setting date;
  thisDate.subtract(2, 'months');           // -2 since Quandl for LA && Honolulu lags by 3 months, but month() is 0-based;;
  var thisMonth = thisDate.month() + 1;     // +1 since Quandl month starts at 1;
  time = thisDate.year() + '-' + (thisMonth < 10 ? '0' + thisMonth : thisMonth.toString());
  return time;
}

function getAPIRents(cityCode, rentStats, time, lastDate, callback) {
  var counts, prices, ratios;

  lastDate.date(lastDate.daysInMonth());  // set to last date;
  var lastSat = lastDate.clone();         // NOT thisDate;
  lastSat.isoWeekday(6);                  // set to Saturday;
  var endDate = moment.min(lastDate, lastSat);

  var subquery = 'api_key=wRYrEk3ghXR3tKwA37ew';
  subquery += time === QUANDL_MONTH1 ? '&start_date=2013-09-01' : '&start_date=' + (time + '-01');   // -01 = 1st date;
  var quandlCode = quandl.getQuandlCode(cityCode);
  // console.log('Quandl subquery: ' + subquery);

  var client = requestJson.createClient('https://www.quandl.com/');
  var query = 'api/v3/datasets/ZILL/' + quandlCode + '_HR.json?';
  client.get(query + subquery, function(err1, resp1, body1) {
    console.log('Retrieved rental counts from Quandl');
    counts = quandl.parseRents(body1);

    var query = 'api/v3/datasets/ZILL/' + quandlCode + '_RAH.json?';
    client.get(query + subquery, function(err2, resp2, body2) {
      console.log('Retrieved rental prices from Quandl');
      prices = quandl.parseRents(body2);

      var query = 'api/v3/datasets/ZILL/' + quandlCode + '_PRR.json?';
      client.get(query + subquery, function(err3, resp3, body3) {
        console.log('Retrieved rental ratios from Quandl');
        ratios = quandl.parseRents(body3);

        var keys = Object.keys(counts);
        var rentals = new Array(keys.length);
        var state = quandl.getState(cityCode);
        for (var i = 0; i < keys.length; i++) {
          var time = keys[i];
          rentals[i] = { time: time, cityCode: cityCode, state: state, rentCounts: counts[time], medianPrice: prices[time], rentRatio: ratios[time] };
        }
        rentStats.insert(rentals, { ordered: false }, function(err, docs) {
          console.log((err ? err + ': ' : 'Inserted rentals into collection for '), cityCode);
        });
        callback(rentals);
      });
    });
  });
}

function getAPIHomes(cityCode, homeStats, time, lastDate, apiKey, callback) {
  // IMPORTANT: endDate MUST BE ON SAT TO AVOID EXTRA WEEKS; to get the latest percentNationalTraffic, endDate must be specified and startDate must be 2013-09-01 or later;
  var url = 'http://api.trulia.com/webservices.php?library=TruliaStats&function=getCityStats&apikey=' + apiKey;
  lastDate.date(lastDate.daysInMonth());  // set to last date;
  var lastSat = lastDate.clone();         // NOT thisDate;
  lastSat.isoWeekday(6);                  // set to Saturday;
  var endDate = moment.min(lastDate, lastSat);
  var state = quandl.getState(cityCode);

  var subquery = time === TRULIA_MONTH1 ? '&startDate=2013-09-01' : '&startDate=' + (time + '-01');     // -01 = 1st date;
  subquery += '&endDate=' + (time + '-' + endDate.date()) + '&city=' + encodeURIComponent(quandl.getCity(cityCode)) + '&state=' + state;
  // console.log('Trulia subquery: ' + subquery);
  setTimeout(function() {
    request.get(url + subquery, function(error, response, body) {
      var homes = [];
      if (!error) {
        console.log('Retrieved homes xml from Trulia for ', cityCode);
        homes = parseHomes(body, cityCode, state);
        homeStats.insert(homes, { ordered: false }, function(err, docs) {
          console.log((err ? err + ': ' : 'Inserted homes into collection for '), cityCode);
        });
      }
      callback(homes);
    });
  }, 12000);    // IMPORTANT: failed at 6000 ms; Trulia limits API calls to 2 per sec per key
}

router.get('/allHomes', function(req, res) {  // , 'yg2239csx7v9xcapsew6xrmm', 'sv2e997pr7k7ryhq7q8y4b37', 'ynr9a8wxjcnkfrskyqqvqyd7'
  var apiKeys = ['vb8fwj79vknntzqeva4fm93u', 'uu8aegnvahes5apu5za6tq8j', 'dp9wj9hu3ts6z49jvnnydqp4'];
  var keySize = apiKeys.length;
  var thisDate = moment();
  thisDate.date(1);             // set to 1st date to normalize month;
  thisDate.isoWeekday(6);       // set to Saturday AFTER setting date;
  // Trulia lags by 1 month, but do not -1 since month() is 0-based;;
  var thisMonth = thisDate.month() + 1;       // +1 since Trulia month starts at 1;
  var time = thisDate.year() + '-' + (thisMonth < 10 ? '0' + thisMonth : thisMonth.toString());
  var homeStats = req.db.get('home_stats');
  var cityCodes = quandl.codeSet;
  var data = [];

  for (var i = cityCodes.length - 1; i >= 0; i--) {
    var promise = homeStats.find({ time: time, cityCode: cityCodes[i] });
    (function(cityCode, index) {
      promise.success(function(docs1) {
        if (docs1 && docs1.length > 0) {
          console.log('Found homes in DB for ', cityCode);
          data.push(docs1);
          if (data.length === quandl.codeSet.length)
            res.json(data);
        }
        else {
          getAPIHomes(cityCode, homeStats, time, thisDate.clone(), apiKeys[index % keySize], function(docs2) {
            data.push(docs2);
            if (data.length === quandl.codeSet.length)    // MUST be inside callback;
              res.json(data);
          });
        }
      });   // MUST pass cityCode since i == -1 when success is called;
    })(cityCodes[i], i);
  }
});

router.get('/homes/:cityCode', function(req, res) {
  var cityCode = req.params.cityCode;
  validateParams(cityCode);
  var thisDate = moment();
  thisDate.date(1);             // set to 1st date to normalize month;
  thisDate.isoWeekday(6);       // set to Saturday AFTER setting date;
  // Trulia lags by 1 month, but do not -1 since month() is 0-based;;
  var thisMonth = thisDate.month() + 1;       // +1 since Trulia month starts at 1;
  var time = thisDate.year() + '-' + (thisMonth < 10 ? '0' + thisMonth : thisMonth.toString());
  var homeStats = req.db.get('home_stats');

  var promise = homeStats.find({ time: time, cityCode: cityCode });
  promise.success(function(docs1) {
    if (docs1 && docs1.length > 0) {
      console.log('Found homes in DB for ', cityCode);
      res.json(docs1);
    }
    else {
      getAPIHomes(cityCode, homeStats, time, thisDate.clone(), 'vb8fwj79vknntzqeva4fm93u', function(docs2) {
        res.json(docs2);
      });
    }
  });
});

function getAPIJobs(cityCode, category, jobsList, callback) {
  var thisDate = moment();
  thisDate.isoWeekday(1);   // set to Monday when week # changes;
  var thisWeek = thisDate.isoWeek();
  var time = thisDate.year() + '-' + thisWeek;
  // initialize DB with 91 days of data, then search again every Monday when week # changes; &useragent=&userip=0.0.0.0
  // set st=employer for employer-listed jobs so map markers don't overlap; "limit" of 25 is returned, so see "totalResults" for total listings;
  var query = 'ads/apisearch?publisher=1588917421720308&format=json&start=0&jt=fulltime&st=employer&latlong=1&limit=50&radius=50&v=2';
  var subquery = thisWeek === INDEED_ISOWEEK ? '&fromage=91' : '&fromage=7';
  subquery += '&l=' + encodeURIComponent(quandl.cities[cityCode]) + '&q=' + encodeURIComponent(category);

  var client = requestJson.createClient('http://api.indeed.com/');
  client.get(query + subquery, function(error, response, body) {
    var jobs = [];
    if (!error) {
      console.log('Retrieved jobs json from Indeed for ', cityCode, ': ', category);
      jobs = parseJobs(body, time, cityCode, category);   // body is the API json;
      jobsList.insert(jobs, { ordered: false }, function(err, docs) {
        console.log((err ? err + ': ' : 'Inserted jobs into collection for '), cityCode, ': ', category);
      });
    }
    callback(jobs);
  });
}

router.get('/allJobs/:category', function(req, res) {
  var category = req.params.category;
  validateParams(null, category);
  var thisDate = moment();
  thisDate.isoWeekday(1);   // set to Monday when week # changes;
  var thisWeek = thisDate.isoWeek();
  var time = thisDate.year() + '-' + thisWeek;
  var jobsList = req.db.get('jobs_list');
  var cityCodes = quandl.codeSet;
  var data = [];

  for (var i = cityCodes.length - 1; i >= 0; i--) {
    var promise = jobsList.find({ time: time, cityCode: cityCodes[i], category: category });
    (function(cityCode) {
      promise.success(function(docs1) {
        if (docs1 && docs1.length > 0) {
          console.log('Found jobs in DB for ', cityCode, ': ', category);
          data.push(docs1);
          if (data.length === quandl.codeSet.length)
            res.json(data);
        }
        else {
          getAPIJobs(cityCode, category, jobsList, function(docs2) {
            data.push(docs2);
            if (data.length === quandl.codeSet.length)
              res.json(data);   // MUST be inside callback;
          });
        }
      });   // MUST pass cityCode since i == -1 when success is called;
    })(cityCodes[i]);
  }
});

router.get('/jobs/:cityCode/:category', function(req, res) {
  var cityCode = req.params.cityCode;
  var category = req.params.category;
  validateParams(cityCode, category);
  var thisDate = moment();
  thisDate.isoWeekday(1);   // set to Monday when week # changes;
  var thisWeek = thisDate.isoWeek();
  var time = thisDate.year() + '-' + thisWeek;
  var jobsList = req.db.get('jobs_list');

  var promise = jobsList.find({ time: time, cityCode: cityCode, category: category });
  promise.success(function(docs1) {
    if (docs1 && docs1.length > 0) {
      console.log('Found jobs in DB for ', cityCode, ': ', category);
      res.json(docs1);
    }
    else {
      getAPIJobs(cityCode, category, jobsList, function(docs2) {
        res.json(docs2);
      });
    }
  });
});

router.get('/careers/:cityCode/:category', function(req, res) {
  var year = moment().year() - 1;       // BLS data lags by 1 yr;
  var cityCode = req.params.cityCode;
  var category = req.params.category;
  var stats = [];
  validateParams(cityCode, category);

  var jobStats = req.db.get('job_stats_' + year);
  jobStats.find({ cityCode: cityCode, category: category }, function(dbError, docs) {
    stats = docs;           // docs is an array;
    if (dbError)
      throw dbError;
    else if (stats.length === 0)
      throw new Error('No job stats found for: ' + cityCode + ': ' + category);
    res.json(stats);
  });
});

function validateParams(cityCode, category) {
  if ((category && !indeed[category.toLowerCase()]) || (cityCode && !quandl.cities[cityCode]))
    throw new Error('Invalid query parameters: ' + cityCode + ': ' + category);
}

module.exports = router;
