console.log('hello from map-fill.js');

// script.
  //- $("#"+ state).css("fill", color);
  $("#CA").css("fill", "pink");
$( "path" ).hover(function(evt){
  var stateAb = (evt.target).id;
  var textBox = $("<a>", {
    id : "textBox",
    text : stateAb
  });
  $( ".textBox").append( textBox );

});

  // var state = stateId;
  // var color = val; // ?

  // $("#"+ state).css("fill", css);

  // Make 6 shades of color, white default.


var city = $('#cityTypes').value;
console.log('testing city',city);
var datatype = $('#combobox1').value
if (inMultiCityState(city)) {
  if (datatype === 'rents') {
    var cityJson = $.json('http://localhost:3000/rents' + city);
    // use this new data to update the color of the state
  }
}


function careers(){
  console.log("hey the function thingy worked");
  $.getJSON('http://localhost:3000/us/careers', function(data) {
    // data is an array of objects; to get salary of each job category: var salary = data[i].salary;
    // job_stats  schema (7 fields): time, cityCode, state, category, jobCounts, medianSalary, loc_quotient (density);

    // salary, density, counts
    for (var i = 0; i < data.length; i++) {
      var salary = data[i].salary;
      var state = data[i].state;
      var density = data[i].density;
      var counts = data[i].jobCounts;

      if ( whateverUserPicks = salary) {
        var css = getSalaryCss(salary);
        var getSalaryCss = function(val) {
          return val <= 40000 ? '#CCCCFF' :
            (val <= 50000 ? '#B2B2FF' :
            (val <= 60000 ? '#9999FF' :
            (val <= 70000 ? '#7F7FFF' :
            (val <= 80000 ? '#6666FF' :
            (val <= 90000 ? '#4C4CFF' :
            '#FFF')))));
        };
      } else if ( whateverUserPicks = density) {
        css = getDensityCss(density);
        var getDensityCss = function(val) {
          return val <= 0.2 ? '#CCCCFF' :
            (val <= 0.4 ? '#B2B2FF' :
            (val <= 0.6 ? '#9999FF' :
            (val <= 0.8 ? '#7F7FFF' :
            (val <= 0.10 ? '#6666FF' :
            (val <= 0.12 ? '#4C4CFF' :
            '#FFF')))));
        };
      } else if ( whateverUserPicks = jobCounts) {
        css = getJobCount(jobCounts);
        // IF DOING HOVER...
        // Need to multiply values by 1k to reflect correct data to user
        var getJobCountCss = function(val) {
          return val <= 20000 ? '#CCCCFF' :
            (val <= 25000 ? '#9999FF' :
            (val <= 30000 ? '#7F7FFF' :
            (val <= 35000 ? '#6666FF' :
            (val <= 40000 ? '#4C4CFF' :
            (val <= 45000 ? '#4C4CFF' :
            '#FFF')))));
        };
      }
    }
  });
}

function homes(){
  console.log('homes thingy works');

  $.getJSON('http://localhost:3000/us/homes', function(data) {
    // home_stats schema (7 fields): time, cityCode, state, homeCounts, medianPrice, averagePrice, usTraffic (popularity);
    // data is an array of objects; to get medianPrice of each rental: var price data[i].medianPrice;


  // price(medianPrice), counts, popularity
  for (var i = 0; i < data.length; i++) {
    var state = data[i].state;
    var price = data[i].medianPrice;
    var homeCounts = data[i].homeCounts;
    var usTraffic = data[i].homeCounts;

    if ( whateverUserPicks = price) {
      var css = getPriceCss(price);
      var getSalaryCss = function(val) {
        return val <= 200000 ? '#99ff99' :
          (val <= 300000 ? '#7fff7f' :
          (val <= 400000 ? '#66ff66' :
          (val <= 500000 ? '#4cff4c' :
          (val <= 600000 ? '#00b200' :
          (val <= 700000 ? '007f00' :
          '#FFF')))));
      };
    } else if ( whateverUserPicks = homeCounts) {
      css = getHomeCountsCss(homeCounts);
      var getHomecountsCss = function(val) {
        return val <= 500 ? '#99ff99' :
          (val <= 1000 ? '#7fff7f' :
          (val <= 1500 ? '#66ff66' :
          (val <= 2000 ? '#4cff4c' :
          (val <= 2500 ? '#00b200' :
          (val <= 3000 ? '007f00' :
          '#FFF')))));
      };
    } else if ( whateverUserPicks = usTraffic) {
      css = getUsTrafficCss(usTraffic);
      var getUsTrafficCss = function(val) {
        return val <= 0.1 ? '#99ff99' :
          (val <= 0.2 ? '#7fff7f' :
          (val <= 0.3 ? '#66ff66' :
          (val <= 0.4 ? '#4cff4c' :
          (val <= 0.5 ? '#00b200' :
          (val <= 0.6 ? '007f00' :
          '#FFF')))));
      };
    }
  }
  });
}

function rentals(){
  console.log('rental thingy');

  $.getJSON('http://localhost:3000/us/rentals', function(data) {
    // rent_stats schema (7 fields): time, cityCode, state, rentCounts, medianPrice, rentRatio, usTraffic (popularity);
    // for rentals PRR: larger values = cheaper renting; for rentals && homes usTraffic: larger values = more popular areas;
    // data is an array of objects; to get jobtitle of each job: var title = data[i].jobtitle;

    // counts, price, popularity
  for (var i = 0; i < data.length; i++) {
    var state = data[i].state;
    var rentCounts = data[i].rentCounts;
    var price = data[i].medianPrice;
    var usTraffic = data[i].usTraffic;

    if ( whateverUserPicks = homeCounts) {
      var css = getHomeCountsCss(homeCounts);
      var getHomeCountsCss = function(val) {
        return val <= 200000 ? '#AA8CC5' :
          (val <= 201000 ? '#885EAD' :
          (val <= 202000 ? '#663096' :
          (val <= 203000 ? '#551A8B' :
          (val <= 204000 ? '#2A0D45' :
          (val <= 205000 ? '220A37' :
          '#FFF')))));
      };
    } else if ( whateverUserPicks = medianPrice) {
      css = getPriceCss(medianPrice);
      var getPriceCss = function(val) {
        return val <= 1400 ? '#AA8CC5' :
          (val <= 1600 ? '#885EAD' :
          (val <= 1800 ? '#663096' :
          (val <= 2000 ? '#551A8B' :
          (val <= 2200 ? '#2A0D45' :
          (val <= 2400 ? '220A37' :
          '#FFF')))));
      };
    } else if ( whateverUserPicks = usTraffic) {
      css = getJobCount(usTraffic);
      var getUsTrafficCss = function(val) {
        return val <= 0.1 ? '#AA8CC5' :
          (val <= 0.2 ? '#885EAD' :
          (val <= 0.3 ? '#663096' :
          (val <= 0.4 ? '#551A8B' :
          (val <= 0.5 ? '#2A0D45' :
          (val <= 0.6 ? '220A37' :
          '#FFF')))));
      };
    }
  }
  });
}
