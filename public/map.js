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

// //job cat salaries
var salaryCss = salaries.map(function(obj) {
  var val = obj.salary;
  return val <= 30000 ? '#E0EEEE' :
    (val <= 60000 ? '#D1EEEE' :
    (val <= 90000 ? '#96CDCD' :
    (val <= 120000 ? '#388E8E' :
    (val <= 150000 ? '#008080' :
    (val <= 180000 ? 'blue' :
    'white')))));
});

$.getJSON('http://localhost:3000/us/careers', function(data) {
    // data is an array of objects; to get salary of each job category: var salary = data[i].salary;
});

$.getJSON('http://localhost:3000/us/jobs', function(data) {
    // data is an array of objects; to get medianPrice of each home: var price = data[i].medianPrice;
});

$.getJSON('http://localhost:3000/us/homes', function(data) {
    // data is an array of objects; to get medianPrice of each rental: var price data[i].medianPrice;
});

$.getJSON('http://localhost:3000/us/rentals', function(data) {
    // data is an array of objects; to get jobtitle of each job: var title = data[i].jobtitle;
});

/**
 * Job Cat
 * 1. Salary
 * 2. Counts
 * 3. Popularity index
 *
 * Homes
 * 1. Median Price
 * 2. Counts
 * 3. Popularity Index
 *
 * Rentals
 * 1. Median Price
 * 2. Counts
 * 3. Popularity Index
 */