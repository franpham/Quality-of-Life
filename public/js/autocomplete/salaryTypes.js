$(function() {
  var salaryTypes = [
    "0 - $30,000",
    "$30,001 - $60,000",
    "$60,001 - $90,000",
    "$90,001 - $120,000",
    "$120,001 - $150,000",
    "Above $150,001"
  ];
  $( '#salaryTypes' ).autocomplete({
    source: salaryTypes
  });
});

// toggle list bar
$( "#jobTitle" ).click(function(){
  $( "#jobDetails" ).toggle( "slow", function(){
  });
});