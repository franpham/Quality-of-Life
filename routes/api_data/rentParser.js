"use strict";

function parseRentCounts(json) {
  var items = json.dataset.data;
  var countObj = {};
  for (var i = 0; i < items.length; i++) {
    var num = items[i][0].substring(0, 7);
    var val = items[i][1];
    countObj[num] = val;
  }
  return countObj;
}

function parseRentPrices(json) {
  var items = json.dataset.data;
  var priceObj = {};
  for (var i = 0; i < items.length; i++) {
    var num = items[i][0].substring(0, 7);
    var val = items[i][1];
    priceObj[num] = val;
  }
  return priceObj;
}

function parseRentRatios(json) {
  var items = json.dataset.data;
  var ratioObj = {};
  for (var i = 0; i < items.length; i++) {
    var num = items[i][0].substring(0, 7);
    var val = items[i][1];
    ratioObj[num] = val;
  }
  return ratioObj;
}

module.exports = { parseRentRatios: parseRentRatios, parseRentPrices: parseRentPrices, parseRentCounts: parseRentCounts };
