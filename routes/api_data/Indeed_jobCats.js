
var list = [
  'Accounting / Finance',
  'healthcare',
  'Non-Profit / Volunteering',
  'Administrative',
  'Computer / Internet',
  'Pharmaceutical / Bio-tech',
  'Arts / Publishing',
  'Restaurant / Food Service',
  'Construction / Facilities',
  'Customer Service',
  'Law Enforcement / Security',
  'Sales',
  'Education / Training',
  'Legal / Paralegal',
  'Engineering / Architecture',
  'Manufacturing / Mechanical',
  'Transportation / Logistics',
  'Upper Management / Consulting'
 ];

var categories = {};
for (var i = 0; i < list.length; i++) {
  categories[list[i]] = true;
}

module.exports = categories;
