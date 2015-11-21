var legal = $("<select>", {
  id : "legal"
});
legal.append($("<option>", {
  value : '',
  text : 'Choose a Job Title'
}));
$( ".legal" ).append( legal ).hide();
// "Legal": {
//   "JobTitles": [
legal.append($("<option>", {
  text : "Attorney",
  value : "Attorney",
  salary : 49000
}));
legal.append($("<option>", {
  text : "Legal Administrative Assistant",
  value : "Legal Administrative Assistant",
  salary : 28000
}));
legal.append($("<option>", {
  text : "Litigation Attorney",
  value : "Litigation Attorney",
  salary : 27000
}));
legal.append($("<option>", {
  text : "General Counsel",
  value : "General Counsel",
  salary : 49000
}));
legal.append($("<option>", {
  text : "Legal Assistant",
  value : "Legal Assistant",
  salary : 23000
}));
legal.append($("<option>", {
  text : "Litigation Paralegal",
  value : "Litigation Paralegal",
  salary : 38000
}));
legal.append($("<option>", {
  text : "Judge Advocate",
  value : "Judge Advocate",
  salary : 65000
}));
legal.append($("<option>", {
  text : "Legal Secretary",
  value : "Legal Secretary",
  salary : 23000
}));
legal.append($("<option>", {
  text : "Paralegal",
  value : "Paralegal",
  salary : 23000
}));