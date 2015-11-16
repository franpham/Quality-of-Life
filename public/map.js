"use strict";

//Define Variables
// var state = stateId;
// var color = val; // ?

// Load map into the container
$("#map-container").load("Blank_US_Map.svg", function() {
  // state abb + color in hex
  // $("#"+ state).css("fill", color);
  $("#CA").css("fill", "pink");

});

// jobs_list schema (11 fields): time, cityCode, state, category, jobtitle, company, url, date, snippet, lat, lng;
// job_stats  schema (7 fields): time, cityCode, state, category, jobCounts, medianSalary, loc_quotient (density);
// rent_stats schema (7 fields): time, cityCode, state, rentCounts, medianPrice, rentRatio, usTraffic (popularity);
// home_stats schema (7 fields): time, cityCode, state, homeCounts, medianPrice, averagePrice, usTraffic (popularity);
// for rentals PRR: larger values = cheaper renting; for rentals && homes usTraffic: larger values = more popular areas;


// Anything with Job stats are here
$.getJSON('http://localhost:3000/us/careers', function(data) {
  // data is an array of objects; to get salary of each job category: var salary = data[i].salary;
  //job cat salaries
  var getSalaryCss = function(val) {
    return val <= 40000 ? '#E0EEEE' :
      (val <= 50000 ? '#D1EEEE' :
      (val <= 60000 ? '#96CDCD' :
      (val <= 70000 ? '#388E8E' :
      (val <= 80000 ? '#008080' :
      (val <= 90000 ? 'blue' :
      'white')))));
  };
});

$.getJSON('http://localhost:3000/us/jobs', function(data) {
  // data is an array of objects; to get medianPrice of each home: var price = data[i].medianPrice;
});

$.getJSON('http://localhost:3000/us/homes', function(data) {
  // data is an array of objects; to get medianPrice of each rental: var price data[i].medianPrice;
  for ( var i = 0; i < data.length; i++) {
    var price = data[i].medianPrice;
    var state = data[i].state;
    var css = getCss(price);
  }

});

$.getJSON('http://localhost:3000/us/rentals', function(data) {
  // data is an array of objects; to get jobtitle of each job: var title = data[i].jobtitle;
});
