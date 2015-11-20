$(function(){
  $( "#combobox1" ).change(function(evt){
    var userEvent = false;

    // if evt for .search
      // userEvent = true
    if(evt){
      console.log('hit the button');
      userEvent = true;
      $( ".jobCatSearchOptions" ).hide();
      $( ".housingSearchOptions" ).hide();
      $( ".housingSearchOptions" ).hide();
    }

    if((evt.target).value === "JobCategory"){
      $( ".jobCatSearchOptions" ).show();
      $( ".jobCats" ).show();
    }else if((evt.target).value === "Home"){
      $( ".housingSearchOptions" ).show();
    }else if((evt.target).value === "Rental"){
      $( ".rentalSearchOptions" ).show();
    }
  });

  $( "#careers").change(function(evt){
    var jobChanged = false;
    if(evt){
      jobChanged = true;
      $( ".trans" ).hide();
      $( ".management").hide();
    }

    if((evt.target).value === "Transportation / Logistics"){
      $( ".trans" ).show();
    }else if((evt.target).value === "Upper Management / Consulting"){
      $( ".management" ).show();
    }


  });

});

var searchOptions = $("<select>", {
  id : "combobox1"
});
searchOptions.append($("<label>", {
  value : '',
  text : 'Filter By'
}));
searchOptions.append($("<option>", {
  value : '',
  text : 'Select one...'
}));
searchOptions.append($("<option>", {
  value : 'JobCategory',
  text : 'Job Category'
}));
searchOptions.append($("<option>", {
  value : 'Home',
  text : 'Home'
}));
searchOptions.append($("<option>", {
  value : 'Rental',
  text : 'Rental'
}));

$( ".search" ).append( searchOptions );


// ==========================================

var housingSearchOptions = $("<select>", {
  id : "combobox2 hide"
});
housingSearchOptions.append($("<label>", {
  text : 'Filter By'
}));
housingSearchOptions.append($("<option>", {
  value : '',
  text : 'Select one...'
}));
housingSearchOptions.append($("<option>", {
  value : 'Median',
  text : 'Median'
}));
housingSearchOptions.append($("<option>", {
  value : 'Count',
  text : 'Count'
}));
housingSearchOptions.append($("<option>", {
  value : 'PopularityIndex',
  text : 'Popularity Index'
}));

$( ".housingSearchOptions" ).append( housingSearchOptions ).hide();

// ==========================================

var rentalSearchOptions = $("<select>", {
  id : "combobox2 hide"
});
rentalSearchOptions.append($("<label>", {
  text : 'Filter By'
}));
rentalSearchOptions.append($("<option>", {
  value : '',
  text : 'Select one...'
}));
rentalSearchOptions.append($("<option>", {
  value : 'Median',
  text : 'Median'
}));
rentalSearchOptions.append($("<option>", {
  value : 'Count',
  text : 'Count'
}));
rentalSearchOptions.append($("<option>", {
  value : 'PopularityIndex',
  text : 'PPR Ratio'
}));

$( ".rentalSearchOptions" ).append( rentalSearchOptions ).hide();


// ==========================================

var jobCatSearchOptions = $("<select>", {
  id : "combobox2"
});
jobCatSearchOptions.append($("<label>", {
  text : 'Filter By'
}));
jobCatSearchOptions.append($("<option>", {
  value : '',
  text : 'Select one...'
}));
jobCatSearchOptions.append($("<option>", {
  value : 'Salary',
  text : 'Salary'
}));
jobCatSearchOptions.append($("<option>", {
  value : 'Count',
  text : 'Count'
}));
jobCatSearchOptions.append($("<option>", {
  value : 'PopularityIndex',
  text : 'Popularity Index'
}));

$( ".jobCatSearchOptions" ).append( jobCatSearchOptions ).hide();

// =================================
var buttonSearch = $("<button>", {
  id : "toggle",
  text : "Search"
});

$( ".buttonSearch").append( buttonSearch );

$( ".buttonSearch" ).click(function(){
  console.log('clicked me');
  careers();
  homes();
  rentals();
});