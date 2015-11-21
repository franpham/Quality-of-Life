var category = "";
var citycode = "";
var jobTitleSelected = "";
var salary = "";

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
      $( ".management").hide();
    }

    if((evt.target).value === "Transportation / Logistics"){
      $( ".trans" ).show();
    }else if((evt.target).value === "Upper Management / Consulting"){
      $( ".management" ).show();
    }
  });

  $( "#citySelect" ).change(function(evt){
    citycode = (evt.target).value;
  });

  $( "#jobSelect" ).change(function(evt){
    shit = (evt.target).salary;
    console.log('salary', shit);
    jobtit = (evt.target).value;
    console.log('RYRYRYRY', jobtit);
  });

});

// =================================
var buttonSearch = $("<button>", {
  id : "toggle",
  text : "Search"
});

$( ".buttonSearch").append( buttonSearch );

$( ".buttonSearch" ).click(function(evt){
  console.log('from Button', citycode);
  careers(category);
  homes();
  rentals();
});

