"use strict";

var cities = [
  {'Atlanta' : '00010'},
  {'Phoenix' : '00015'},
  {'Santa Ana' : '00044'},
  {'Denver' : '00022'},
  {'San Diego' : '00018'},
  {'Riverside' : '00014'},
  {'Tampa' : '00020'},
  {'San Francisco' : '00012'},
  {'Orlando' : '00027'},
  {'Oakland' : '00037'},
  {'San Jose' : '00032'},
  {'Indianapolis' : '00035'},
  {'Sacramento' : '00025'},
  {'Miami' : '00911'},
  {'Fort Lauderdale' : '00009'},
  {'Louisville' : '00043'},
  {'Jacksonville' : '00041'},
  {'Hartford' : '00046'},
  {'West Palm Beach' : '00254'},
  {'New Orleans' : '00047'},
  {'Birmingham' : '00050'},
  {'Honolulu' : '00054'},
  {'Bridgeport' : '00154'},
  {'Baton Rouge' : '00066'},
  {'Tucson' : '00053'},
  {'Des Moines' : '00088'},
  {'Wilmington' : '00138'},
  {'Little Rock' : '00075'},
  {'Fresno' : '00056'},
  {'Bakersfield' : '00063'},
  {'Wichita' : '00590'},
  {'Los Angeles' : '00003'},
  {'Washington DC' : '00008'},
  {'Chicago' : '00188'},
  {'Boston' : '00011'},
  {'Detroit' : '00013'},
  {'New York' : '00002'},
  {'Philadelphia' : '00006'},
  {'Dallas' : '00005'},
  {'Seattle' : '00016'}
];

var codes = {};   // dict of city : code;
for (var i = 0; i < cities.length; i++) {
  var city = Object.keys(cities[i])[0];
  codes[city] = cities[i][city];
}

module.exports = { cities: cities, codes: codes };
