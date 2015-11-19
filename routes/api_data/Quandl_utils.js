"use strict";

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
  {'Springfield, MA' : '00077'},    // 2ND MA
  {'Baton Rouge, LA' : '00066'},    // 2ND LA
  {'Tucson, AZ' : '00053'},         // 2ND AZ
  {'Stamford, CT' : '00057'},       // 2ND CT
  {'Des Moines, IA' : '00088'},
  {'Little Rock, AR' : '00075'},
  {'Fresno, CA' : '00056'},
  {'Bakersfield, CA' : '00063'},
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
  var code = parseInt(cityCode);                    // C = city, M = metro;
  return (code ===  37 || code === 44 || code === 128) ? 'C' + cityCode : 'M' + cityCode;
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

module.exports = { cities: cities, codes: codes, getState: getState, getCity: getCity, getQuandlCode: getQuandlCode, parseRents: parseRents };
