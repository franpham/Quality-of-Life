// "Healthcare": {
//   "JobTitles": [

var healthcare = $("<select>", {
  id : "healthcare"
});
healthcare.append($("<option>", {
  value : '',
  text : 'Choose a Job Title'
}));
healthcare.append($("<option>", {
  text : "Case Manager",
  value : "Case Manager",
  salary : 51000
}));
healthcare.append($("<option>", {
  text : "Medical Worker",
  value : "Medical Worker",
  salary : 33000
}));
healthcare.append($("<option>", {
  text : "Phlebotomist",
  value : "Phlebotomist",
  salary : 24000
}));
healthcare.append($("<option>", {
  text : "Dental Assistant",
  value : "Dental Assistant",
  salary : 58000
}));
healthcare.append($("<option>", {
  text : "Nuclear Medicine Technologist",
  value : "Nuclear Medicine Technologist",
  salary : 72000
}));
healthcare.append($("<option>", {
  text : "Physical Therapist",
  value : "Physical Therapist",
  salary : 88000
}));
healthcare.append($("<option>", {
  text : "Dental Hygienist",
  value : "Dental Hygienist",
  salary : 51000
}));
healthcare.append($("<option>", {
  text : "Nurse",
  value : "Nurse",
  salary : 64000
}));
healthcare.append($("<option>", {
  text : "Physician Assistant",
  value : "Physician Assistant",
  salary : 65000
}));
healthcare.append($("<option>", {
  text : "Director of Nursing",
  value : "Director of Nursing",
  salary : 69000
}));
healthcare.append($("<option>", {
  text : "Nurse Assistant",
  value : "Nurse Assistant",
  salary : 63000
}));
healthcare.append($("<option>", {
  text : "Respiratory Therapist",
  value : "Respiratory Therapist",
  salary : 64000
}));
healthcare.append($("<option>", {
  text : "Health Unit Coordinator",
  value : "Health Unit Coordinator",
  salary : 51000
}));
healthcare.append($("<option>", {
  text : "Nurse LVN",
  value : "Nurse LVN",
  salary : 44000
}));
healthcare.append($("<option>", {
  text : "Social Worker",
  value : "Social Worker",
  salary : 51000
}));
healthcare.append($("<option>", {
  text : "Home Health Aide",
  value : "Home Health Aide",
  salary : 37000
}));
healthcare.append($("<option>", {
  text : "Nurse Practitioner",
  value : "Nurse Practitioner",
  salary : 95000
}));
healthcare.append($("<option>", {
  text : "Unit Clerk",
  value : "Unit Clerk",
  salary : 30000
}));
healthcare.append($("<option>", {
  text : "Massage Therapist",
  value : "Massage Therapist",
  salary : 22000
}));
healthcare.append($("<option>", {
  text : "Nurse RN",
  value : "Nurse RN",
  salary : 66000
}));
healthcare.append($("<option>", {
  text : "Unit Secretary",
  value : "Unit Secretary",
  salary : 54000
}));
healthcare.append($("<option>", {
  text : "Medical Assistant",
  value : "Medical Assistant",
  salary : 38000
}));
healthcare.append($("<option>", {
  text : "Nursing Assistant",
  value : "Nursing Assistant",
  salary : 50000
}));
healthcare.append($("<option>", {
  text : "Veterinary Receptionist",
  value : "Veterinary Receptionist",
  salary : 28000
}));
healthcare.append($("<option>", {
  text : "Medical Receptionist",
  value : "Medical Receptionist",
  salary : 26000
}));
healthcare.append($("<option>", {
  text : "Nutritionist",
  value : "Nutritionist",
  salary : 49000
}));
healthcare.append($("<option>", {
  text : "Veterinary Technician",
  value : "Veterinary Technician",
  salary : 29000
}));
healthcare.append($("<option>", {
  text : "Medical Technologist",
  value : "Medical Technologist",
  salary : 54000
}));
healthcare.append($("<option>", {
  text : "Occupational Therapist",
  value : "Occupational Therapist",
  salary : 86000
}));
healthcare.append($("<option>", {
  text : "Vocational Rehabilitation Counselor",
  value : "Vocational Rehabilitation Counselor",
  salary : 44000
}));

$( ".healthcare" ).append( healthcare ).hide();