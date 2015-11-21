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
    }else if((evt.target).value === "Home"){
      $( ".housingSearchOptions" ).show();
    }else if((evt.target).value === "Rental"){
      $( ".rentalSearchOptions" ).show();
    }
  });

  $( "#careers").change(function(evt){
    var pickedCareer = false;

    if(evt){
      userEvent = true;
      $( ".jobTitles" ).hide();
      $( ".accounting" ).hide();
      $( ".healthcare" ).hide();
      $( ".nonprofit" ).hide();
      $( ".admin" ).hide();
      $( ".computer" ).hide();
      $( ".arts" ).hide();
      $( ".restaurant" ).hide();
      $( ".construction" ).hide();
      $( ".sales" ).hide();
      $( ".education" ).hide();
      $( ".legal" ).hide();
      $( ".engineering" ).hide();
      $( ".manufacturing" ).hide();
      $( ".trans" ).hide();
      $( ".management" ).hide();















    }
    category = (evt.target).value;

    if(category === 'Accounting / Finance'){
      $( ".accounting" ).show();
    }else if(category === 'Healthcare'){
      $( ".healthcare" ).show();
    }else if(category === 'Non-Profit / Volunteering'){
      $( ".nonprofit" ).show();
    }else if(category === 'Administrative'){
      $( ".admin" ).show();
    }else if(category === 'Computer / Internet'){
      $( ".computer" ).show();
    }else if(category === 'Arts / Publishing'){
      $( ".arts" ).show();
    }else if(category === 'Restaurant / Food Service'){
      $( ".restaurant" ).show();
    }else if(category === 'Construction / Facilities'){
      $( ".construction" ).show();
    }else if(category === 'Sale'){
      $( ".sales" ).show();
    }else if(category === 'Education / Training'){
      $( ".education" ).show();
    }else if(category === 'Legal / Paralegal'){
      $( ".legal" ).show();
    }else if(category === 'Engineering / Architecture'){
      $( ".engineering" ).show();
    }else if(category === 'Manufacturing / Mechanical'){
      $( ".manufacturing" ).show();
    }else if(category === 'Transportation / Logistics'){
      $( ".trans" ).show();
    }else if(category === 'Upper Management / Consulting'){
      $( ".management" ).show();
    }else{
      $( ".jobTitles" ).show();
    }


  });

  $( "#citySelect" ).change(function(evt){
    cityCode = (evt.target).value;
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
  console.log("FJFJFJF", category);

});

