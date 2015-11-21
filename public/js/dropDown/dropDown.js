$(function(){

  $( "#combobox1" ).change(function(evt){
    var userEvent = false;

    if(evt){
      userEvent = true;
      $( ".jobCatSearchOptions" ).hide();
      $( ".housingSearchOptions" ).hide();
      $( ".housingSearchOptions" ).hide();
    }

    if((evt.target).value === "JobCategory"){
      $( ".jobCatSearchOptions" ).show();
      $( ".jobCats" ).show();
      $( ".jobTitles").show();
    }else if((evt.target).value === "Home"){
      $( ".housingSearchOptions" ).show();
    }else if((evt.target).value === "Rental"){
      $( ".rentalSearchOptions" ).show();
    }
  });

  $( "#careers").change(function(evt){

    category = (evt.target).value;

    var jobChanged = false;
    if(evt){
      jobChanged = true;
      $( ".jobSelect" ).hide();
    }
  });

  $( "#citySelect" ).change(function(evt){
    cityCode = (evt.target).value;
  });

  $( "#jobSelect" ).change(function(evt){
    jobTitleSelected = (evt.target).value;
  });

});

// =================================
var buttonSearch = $("<button>", {
  id : "toggle",
  text : "Search"
});

$( ".buttonSearch").append( buttonSearch );

$( ".buttonSearch" ).click(function(evt){
  careers();
  homes();
  rentals();
});

