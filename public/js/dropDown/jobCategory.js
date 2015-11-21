
  var jobCat = $("<select>", {
    id : "careers"
  });
  jobCat.append($("<option>", {
    value : '',
    text : 'Choose a Career'
  }));
  jobCat.append($("<option>", {
    value : 'Accounting / Finance',
    text : 'Accounting / Finance'
  }));
  jobCat.append($("<option>", {
    value : 'Healthcare',
    text : 'Healthcare'
  }));
  jobCat.append($("<option>", {
    value : 'Non-Profit / Volunteering',
    text : 'Non-Profit / Volunteering'
  }));
  jobCat.append($("<option>", {
    value : 'Administrative',
    text : 'Administrative'
  }));
  jobCat.append($("<option>", {
    value : 'Computer / Internet',
    text : 'Computer / Internet'
  }));
  jobCat.append($("<option>", {
    value : 'Arts / Publishing',
    text : 'Arts / Publishing'
  }));
  jobCat.append($("<option>", {
    value : 'Restaurant / Food Service',
    text : 'Restaurant / Food Service'
  }));
  jobCat.append($("<option>", {
    value : 'Construction / Facilities',
    text : 'Construction / Facilities'
  }));
  jobCat.append($("<option>", {
    value : 'Sales',
    text : 'Sales'
  }));
  jobCat.append($("<option>", {
    value : 'Education / Training',
    text : 'Education / Training'
  }));
  jobCat.append($("<option>", {
    value : 'Legal / Paralegal',
    text : 'Legal / Paralegal'
  }));
  jobCat.append($("<option>", {
    value : 'Engineering / Architecture',
    text : 'Engineering / Architecture'
  }));
  jobCat.append($("<option>", {
    value : 'Manufacturing / Mechanical',
    text : 'Manufacturing / Mechanical'
  }));
  jobCat.append($("<option>", {
    value : 'Transportation / Logistics',
    text : 'Transportation / Logistics'
  }));
  jobCat.append($("<option>", {
    value : 'Upper Management / Consulting',
    text : 'Upper Management / Consulting'
  }));

  $( ".jobCats" ).append( jobCat );

