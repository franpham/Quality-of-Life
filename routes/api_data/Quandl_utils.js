"use strict";

var codeSet = ['00003',  // Los Angeles is default city for CA;
              '00009',  // Miami is default city for FL;
              '00047', '00015', '00046',  // default cities for LA, AZ, CT;
              '00011', '00010', '00022', '00035', '00043', '00050',   // codes for states with 1 city;
              '00054', '00088', '00075', '00590', '00008', '00004',
              '00013', '00002', '00006', '00005', '00016', '00473'];

var states = [
  { 'CA' : { '-1' : ['00018', '00014', '00044', '00012', '00032', '00037', '00025', '00064', '00056', '00003'] }}, // 10
  { 'FL' : { '-2' : ['00020', '00027', '00009', '00128', '00041', '00254'] }}, // 6
  { 'LA' : { '-3' : ['00066', '00047'] }},
  { 'AZ' : { '-4' : ['00015', '00053'] }},
  { 'CT' : { '-5' : ['00057', '00046'] }},
  { 'MA' : '00011' },
  { 'GA' : '00010' },
  { 'CO' : '00022' },
  { 'IN' : '00035' },
  { 'KY' : '00043' },
  { 'AL' : '00050' },
  { 'HI' : '00054' },
  { 'IA' : '00088' },
  { 'AR' : '00075' },
  { 'KS' : '00590' },
  { 'DC' : '00008' },
  { 'IL' : '00004' },
  { 'MI' : '00013' },
  { 'NY' : '00002' },
  { 'PA' : '00006' },
  { 'TX' : '00005' },
  { 'WA' : '00016' },
  { 'DE' : '00473' }
];
var MULTISTATES = 5;

// client side usage:
// var quandl = require('./api_data/Quandl_utils.js');
// var datatype; // should be 'careers', 'homes', or 'rents'
// var jobCat;   // should be job category from Indeed_jobCats.js
// if (oldCode !== newCode && quandl.isMultiCityState(newCode)) {
//    var json = $.getJson('http://localhost/' + datatype + '/' + newCode + (datatype === 'careers' ? '/' + encodeURI(jobCat) : ''));
      // get the data from the json object to update the color of the map;
// }
function isMultiCityState(cityCode) {
  for (var i = 0; i < MULTISTATES; i++) {
    var st = states[i];
    if (st.indexOf(cityCode) >= 0)
      return true;
  }
  return false;
}

var data = [
  {'Atlanta, GA' : '00010'},
  {'Phoenix, AZ' : '00015'},
  {'Denver, CO' : '00022'},
  {'San Diego, CA' : '00018'},
  {'Riverside, CA' : '00014'},
  {'Tampa, FL' : '00020'},
  {'Santa Ana, CA' : '00044'},        // city code
  {'San Francisco, CA' : '00012'},
  {'Orlando, FL' : '00027'},
  {'Oakland, CA' : '00037'},          // city code
  {'San Jose, CA' : '00032'},
  {'Indianapolis, IN' : '00035'},
  {'Sacramento, CA' : '00025'},
  {'Miami, FL' : '00009'},
  {'Fort Lauderdale, FL' : '00128'},  // city code
  {'Louisville, KY' : '00043'},
  {'Jacksonville, FL' : '00041'},
  {'Hartford, CT' : '00046'},
  {'Ventura, CA' : '00064'},
  {'New Orleans, LA' : '00047'},
  {'Birmingham, AL' : '00050'},
  {'Honolulu, HI' : '00054'},
  {'Wilmington, DE' : '00473'},     // city code
  {'Baton Rouge, LA' : '00066'},    // 2ND LA
  {'Tucson, AZ' : '00053'},         // 2ND AZ
  {'Stamford, CT' : '00057'},       // 2ND CT
  {'Des Moines, IA' : '00088'},
  {'Little Rock, AR' : '00075'},
  {'Fresno, CA' : '00056'},
  {'West Palm Beach' : '00254'},    // city code
  {'Wichita, KS' : '00590'},
  {'Los Angeles, CA' : '00003'},
  {'Washington, DC' : '00008'},
  {'Chicago, IL' : '00004'},
  {'Boston, MA' : '00011'},
  {'Detroit, MI' : '00013'},
  {'New York, NY' : '00002'},
  {'Philadelphia, PA' : '00006'},
  {'Dallas, TX' : '00005'},
  {'Seattle, WA' : '00016'}
];

var cities = {};    // dict of code : city;
var codes  = {};    // dict of city : code;
for (var i = 0; i < data.length; i++) {
  var city = Object.keys(data[i])[0];
  var code = data[i][city];
  codes[city]  = code;
  cities[code] = city;
}

function getState(cityCode) {
  var city = cities[cityCode];
  return city.substring(city.length - 2);
}

function getCity(cityCode) {
  var city = cities[cityCode];   // -4: 2 for state && 2 for ', ';
  return city.substring(0, city.length - 4);
}

function getQuandlCode(cityCode) {
  var code = parseInt(cityCode);                      // C = city, M = metro;
  return (code == 37 || code == 44 || code == 128 || code == 254 || code == 473) ? 'C' + cityCode : 'M' + cityCode;
}

function parseRents(json) {
  var items = json.dataset.data;
  var rents = {};
  for (var i = 0; i < items.length; i++) {
    var num = items[i][0].substring(0, 7);
    var val = items[i][1];
    rents[num] = val;
  }
  return rents;
}

module.exports = { states: states, cities: cities, codes: codes, codeSet: codeSet, getState: getState, getCity: getCity,
               getQuandlCode: getQuandlCode, parseRents: parseRents, isMultiCityState: isMultiCityState };
