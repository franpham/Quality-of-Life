
var list = [
  'accounting - finance',
  'healthcare',
  'nonprofit - volunteering',
  'administrative',
  'computer - internet',
  'pharmaceutical - biotech',
  'arts - publishing',
  'restaurant - food service',
  'construction - facilities',
  'customer service',
  'law enforcement - security',
  'sales',
  'education - training',
  'legal - paralegal',
  'engineering - architecture',
  'manufacturing - mechanical',
  'transportation - logistics',
  'upper management - consulting'
 ];

var categories = {};
for (var i = 0; i < list.length; i++) {
  categories[list[i]] = true;
}

module.exports = categories;
