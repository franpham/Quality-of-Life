var citySelect = $("<select>", {
  id : "citySelect"
});

citySelect.append($("<option>", {
  value : '',
  text : 'Choose a City'
}));
citySelect.append($("<option>", {
  value : 'Miami',
  text : 'Miami'
}));

$( ".citySelect" ).append( citySelect );