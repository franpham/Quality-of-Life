var management = $("<select>", {
  id : "management"
});
management.append($("<option>", {
  value : '',
  text : 'Choose a Job Title'
}));
$( ".management" ).append( management ).hide();
// "Upper Management/Consulting" : {
// "JobTitles":[
management.append($("<option>", {
text : "Business Analyst",
value : "Business Analyst",
salary : 76000
}));
management.append($("<option>", {
text : "Business Process Analyst",
value : "Business Process Analyst",
salary : 82000
}));
management.append($("<option>", {
text : "General Manager",
value : "General Manager",
salary : 48000
}));
management.append($("<option>", {
text : "Business Manager",
value : "Business Manager",
salary : 48000
}));
management.append($("<option>", {
text : "Chief Financial Officer",
value : "Chief Financial Officer",
salary : 99000
}));
management.append($("<option>", {
text : "Manager" ,
value : "Manager" ,
salary : 48000
}));
management.append($("<option>", {
text : "Business Office Manager",
value : "Business Office Manager",
salary : 61000
}));
management.append($("<option>", {
text : "Director" ,
value : "Director" ,
salary : 62000
}));
management.append($("<option>", {
text : "VP",
value : "VP",
salary : 102000
}));