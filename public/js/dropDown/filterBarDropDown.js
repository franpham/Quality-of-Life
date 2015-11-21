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
  id : "combobox2"
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
