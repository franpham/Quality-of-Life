

$(function() {

  var jobTitlesPerCat = [];
  $( '#jobCatTypes' ).autocomplete({
    source: [
      'Accounting / Finance',
      'Healthcare',
      'Non-Profit / Volunteering',
      'Administrative',
      'Computer / Internet',
      'Pharmaceutical / Bio-tech',
      'Arts / Publishing',
      'Hospitality / Entertainment',
      'Real Estate',
      'Banking / Loans',
      'Human Resources',
      'Restaurant / Food Service',
      'Construction / Facilities',
      'Insurance',
      'Retail',
      'Customer Service',
      'Law Enforcement / Security',
      'Sales',
      'Education / Training',
      'Legal / Paralegal',
      'Telecommunications',
      'Engineering / Architecture',
      'Manufacturing / Mechanical',
      'Transportation / Logistics',
      'Government / Military',
      'Marketing / Advertising',
      'Upper Management / Consulting'
    ],
    select: function( event , ui ){

      if(jobTitlesPerCat.length === 0){
        var jobtitle = jobCatAutoComp[ui.item.value].JobTitles;
        for(var i = 0; i < jobtitle.length; i++) {
          var titles = jobtitle[i].name;
          jobTitlesPerCat.push(titles);
          getJobList(jobtitle);
        }
      }else{
        jobTitlesPerCat = [];
        console.log($(jobtitleTypes));
        $(jobtitleTypes)[0].value = "";
        jobtitle = jobCatAutoComp[ui.item.value].JobTitles;
        for(var i = 0; i < jobtitle.length; i++) {
          titles = jobtitle[i].name;
          jobTitlesPerCat.push(titles);
          getJobList(jobtitle);
        }
      }

    }
  });

// for(var i = 0; i < jobtitle.length; i++) {
//           var titles = jobtitle[i].name;
//           jobTitlesPerCat.push(titles);
//           getJobList(jobtitle);
//         }

function getJobList(jobtitle){


  // write an if statement to check array
  $("#jobtitleTypes").autocomplete({
    source: function(request, response) {
      var country = $("#jobCatTypes").val();

  // $("#jobtitleTypes").autocomplete({
  //   source: function(request, response) {
  //     var country = $("#jobCatTypes").val();
  //         console.log('HIHIHI', jobTitlesPerCat);

      var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term ), "i" );
      response($.grep(jobTitlesPerCat, function(value) {
          return matcher.test(value);
      }));
    }
  });

}

});

var jobCatAutoComp = {
  "Accounting/Finance Jobs": {
    "JobTitles": [
      {
        name: "Accountant",
        salary: 58000
      },
      {
        name: "Director Of Finance",
        salary: 92000
      },
      {
        name: "Office Manager Bookkeeper",
        salary: 54000
      },
      {
        name: "Accounting Assistant",
        salary: 38000
      },
      {
        name: "Finance Manager",
        salary: 66000
      },
      {
        name: "Quantitative Analyst",
        salary: 77000
      },
      {
        name: "Accounting Clerk",
        salary: 26000
      },
      {
        name: "Financial Advisor",
        salary: 79000
      },
      {
        name: "Quantitative Research Analyst",
        salary: 77000
      },
      {
        name: "Accounting Manager",
        salary: 61000
      },
      {
        name: "Financial Analyst",
        salary: 73000
      },
      {
        name: "Senior Accountant",
        salary: 71000
      },
      {
        name: "Assistant Controller",
        salary: 74000
      },
      {
        name: "Financial Associate",
        salary: 48000
      },
      {
        name: "Tax Accountant",
        salary: 61000
      },
      {
        name: "Billing Specialist",
        salary: 26000
      },
      {
        name: "Financial Reporting Manager",
        salary: 82000
      },
      {
        name: "Tax Manager",
        salary: 77000
      },
      {
        name: "Bookkeeper",
        salary: 34000
      },
      {
        name: "Full Charge Bookkeeper",
        salary: 39000
      },
      {
        name: "Treasury Analyst",
        salary: 73000
      },
      {
        name: "Budget Analyst",
        salary: 69000
      },
      {
        name: "General Ledger Accountant",
        salary: 55000
      },
      {
        name: "VP Director of Finance",
        salary: 102000
      },
      {
        name: "CNA",
        salary: 24000
      },
      {
        name: "Internal Auditor",
        salary: 74000
      },
      {
        name: "VP of Finance",
        salary: 97000
      },
      {
        name: "Controller",
        salary: 77000
      },
      {
        name: "Night Auditor",
        salary: 19000
      }
    ]
  },
  "Administrative Jobs": {
    "JobTitles": [
      {
        name: "Accounts Payable Clerk",
        salary: 29000
      },
      {
        name: "Executive Assistant",
        salary: 41000
      },
      {
        name: "Program Coordinator",
        salary: 43000
      },
      {
        name: "Accounts Receivable Clerk",
        salary: 29000
      },
      {
        name: "Executive Director",
        salary: 85000
      },
      {
        name: "Program Manager",
        salary: 57000
      },
      {
        name: "Administrative Assistant",
        salary: 29000
      },
      {
        name: "File Clerk",
        salary: 20000
      },
      {
        name: "Project Coordinator",
        salary: 41000
      },
      {
        name: "Assistant Manager",
        salary: 41000
      },
      {
        name: "Medical Records Clerk",
        salary: 22000
      },
      {
        name: "Project Manager",
        salary: 89000
      },
      {
        name: "Branch Manager",
        salary: 36000
      },
      {
        name: "Office Assistant",
        salary: 26000
      },
      {
        name: "Purchasing Agent",
        salary: 46000
      },
      {
        name: "Clerk",
        salary: 22000
      },
      {
        name: "Office Clerk",
        salary: 24000
      },
      {
        name: "Purchasing Manager",
        salary: 82000
      },
      {
        name: "Data Entry Operator",
        salary: 23000
      },
      {
        name: "Office Manager",
        salary: 51000
      },
      {
        name: "Receptionist",
        salary: 22000
      },
      {
        name: "Director of Operations",
        salary: 80000
      },
      {
        name: "Operations Manager",
        salary: 61000
      },
      {
        name: "Receptionist Administrative Assistant",
        salary: 32000
      },
      {
        name: "District Manager",
        salary: 56000
      },
      {
        name: "Personal Assistant",
        salary: 31000
      },
      {
        name: "Secretary",
        salary: 27000
      },
      {
        name: "Executive Administrative Assistant",
        salary: 40000
      },
      {
        name: "Product Manager",
        salary: 48000
      },
      {
        name: "Territory Manage",
        salary: 71000
      }
    ]
  },


"Arts/Entertainment/Publishing": {
  "JobTitles": [
    {
      name: "Art Director",
      salary: 70000
    },
    {
      name: "Graphics Designer",
      salary: 52000
    },
    {
      name: "Unigraphics Designer",
      salary: 68000
    },
    {
      name: "Assistant Editor",
      salary: 38000
    },
    {
      name: "Graphics Designer Production Artist",
      salary: 51000
    },
    {
      name: "User Interface Designer",
      salary: 92000
    },
    {
      name: "Designer",
      salary: 61000
    },
    {
      name: "Illustrator",
      salary: 66000
    },
    {
      name: "Video Editor",
      salary: 51000
    },
    {
      name: "Editor",
      salary: 51000
    },
    {
      name: "Journalist",
      salary: 49000
    },
    {
      name: "Writer",
      salary: 61000
    },
    {
      name: "Editorial Assistant",
      salary: 39000
    },
    {
      name: "News Producer",
      salary: 61000
    },
    {
      name: "Writer Editor",
      salary: 50000
    },
    {
      name: "Graphic Artist",
      salary: 47000
    },
    {
      name: "News Reporter",
      salary: 36000
    },
    {
      name: "Zoo Keeper",
      salary: 29000
    },
    {
      name: "Graphic Web Designer",
      salary: 52000
    },
    {
      name: "Photographer",
      salary: 19000
    }
  ]
},
"Banking/Loans": {
  "JobTitles": [
    {
      name: "Analyst",
      salary:59000
    },
    {
      name: "Investment Analyst",
      salary:92000
    },
    {
      name: "Underwriter",
      salary:23000
    },
    {
      name: "Bank Teller",
      salary:23000
    },
    {
      name: "Loan Consultant,",
      salary:02000
    },
    {
      name: "Underwriter Trainee",
      salary:44000
    },
    {
      name: "Banker",
      salary:74000
    },
    {
      name: "Loan Officer",
      salary:73000
    },
    {
      name: "Underwriting Assistant",
      salary:31000
    },
    {
      name: "Credit Analyst",
      salary:61000
    },
    {
      name: "Loan Processor",
      salary:35000
    },
    {
      name: "Universal Banker,",
      salary:02000
    },
    {
      name: "Escrow Assistant",
      salary:35000
    },
    {
      name: "Mortgage Loan Officer",
      salary:92000
    },
    {
      name: "In Store Banker",
      salary:32000
    },
    {
      name: "Teller",
      salary:21000
    }
  ]
},
"Construction/Facilities": {
  "JobTitles": [
    {
      name: "Carpenter",
      salary: 36000
    },
    {
      name: "Groundskeeper",
      salary: 22000
    },
    {
      name: "Laborer",
      salary: 23000
    },
    {
      name: "Construction Manager",
      salary: 64000
    },
    {
      name: "HVAC Technician",
      salary: 41000
    },
    {
      name: "Maintenance Manager",
      salary: 48000
    },
    {
      name: "Construction Superintendent",
      salary: 65000
    },
    {
      name: "Heavy Equipment Operator",
      salary: 28000
    },
    {
      name: "Maintenance Mechanic",
      salary: 38000
    },
    {
      name: "Construction Worker",
      salary: 38000
    },
    {
      name: "Industrial Designer",
      salary: 82000
    },
    {
      name: "Maintenance Supervisor",
      salary: 39000
    },
    {
      name: "Custodian",
      salary: 23000
    },
    {
      name: "Industrial Electrician",
      salary: 45000
    },
    {
      name: "Maintenance Technician",
      salary: 34000
    },
    {
      name: "Electrician",
      salary: 44000
    },
    {
      name: "Installer",
      salary: 38000
    },
    {
      name: "Maintenance Worker",
      salary: 38000
    },
    {
      name: "Equipment Operator",
      salary: 40000
    },
    {
      name: "Interior Designer",
      salary: 24000
    },
    {
      name: "Painter",
      salary: 35000
    },
    {
      name: "Estimator",
      salary: 65000
    },
    {
      name: "Janitor",
      salary: 20000
    },
    {
      name: "Plant Manager",
      salary: 82000
    },
    {
      name: "Facilities Manager",
      salary: 46000
    },
    {
      name: "Journeyman Electrician",
      salary: 47000
    },
    {
      name: "Welder",
      salary: 31000
    },
    {
      name: "General Maintenance Technician",
      salary: 39000
    },
    {
      name: "Journeyman Lineman",
      salary: 71000
    },
    {
      name: "Welder Fabricator",
      salary: 31000
    }
  ]
},
"Customer Service": {
  "JobTitles": [
    {
      name: "Branch Customer Service Representative",
      salary: 24000
    },
    {
      name: "Field Service Representative",
      salary: 35000
    },
    {
      name: "Lot Attendent",
      salary: 19000
    },
    {
      name: "Customer Service Advisor",
      salary: 41000
    },
    {
      name: "Field Service Technician",
      salary: 31000
    },
    {
      name: "Relationship Manager",
      salary: 50000
    },
    {
      name: "Customer Service Associate",
      salary: 26000
    },
    {
      name: "Field Technician",
      salary: 27000
    },
    {
      name: "Retail Customer Support Representative",
      salary: 65000
    },
    {
      name: "Customer Service Manager",
      salary: 45000
    },
    {
      name: "Flight Attendant",
      salary: 36000
    },
    {
      name: "Sales Engineer",
      salary: 82000
    },
    {
      name: "Customer Service Representative",
      salary: 44000
    },
    {
      name: "Game Manager",
      salary: 56000
    },
    {
      name: "Service Manager",
      salary: 45000
    },
    {
      name: "Desktop Support",
      salary: 45000
    },
    {
      name: "General Service Technician",
      salary: 37000
    },
    {
      name: "Service Technician",
      salary: 31000
    },
    {
      name: "Desktop Support Technician",
      salary: 39000
    },
    {
      name: "Help Desk Analyst",
      salary: 36000
    },
    {
      name: "Universal Service Representative,",
      salary: 02000
    },
    {
      name: "Emergency Road Service Counselor",
      salary: 38000
    },
    {
      name: "Help Desk Specialist",
      salary: 41000
    },
    {
      name: "Valet Attendant",
      salary: 17000
    },
    {
      name: "Field Engineer",
      salary: 84000
    },
    {
      name: "Help Desk Technical Support",
      salary: 45000
    },
    {
      name: "Field Service Engineer",
      salary: 76000
    },
    {
      name: "Help Desk Technician",
      salary: 38000
    }
  ]
},
"Education/Training": {
  "JobTitles": [
    {
      name: "Assistant Teacher",
      salary: 37000
    },
    {
      name: "Kids Activity Assistant",
      salary: 28000
    },
    {
      name: "Trainer",
      salary: 74000
    },
    {
      name: "Counselor",
      salary: 43000
    },
    {
      name: "Kindergarten Teacher",
      salary: 36000
    },
    {
      name: "Training Coordinator",
      salary: 30000
    },
    {
      name: "Enrollment Counselor",
      salary: 41000
    },
    {
      name: "Korean Language Instructor",
      salary: 46000
    },
    {
      name: "Training Manager",
      salary: 48000
    },
    {
      name: "Guidance Counselor",
      salary: 46000
    },
    {
      name: "Nanny",
      salary: 25000
    },
    {
      name: "Training Specialist",
      salary: 33000
    },
    {
      name: "Health Educator",
      salary: 61000
    },
    {
      name: "Teacher",
      salary: 55000
    },
    {
      name: "Yoga Instructor",
      salary: 21000
    },
    {
      name: "Instructional Designer",
      salary: 63000
    },
    {
      name: "Technical Trainer",
      salary: 61000
    },
    {
      name: "Instructor",
      salary: 30000
    },
    {
      name: "Technical Writer",
      salary: 61000
    }
  ]
},
"Engineering/Architecture": {
  "JobTitles": [
    {
      name: "Architect",
      salary: 102000
    },
    {
      name: "GIS Analyst",
      salary: 60000
    },
    {
      name: "Mechanical Design Engineer",
      salary: 83000
    },
    {
      name: "Civil Engineer",
      salary: 79000
    },
    {
      name: "GIS Specialist",
      salary: 49000
    },
    {
      name: "Mechanical Engineer",
      salary: 81000
    },
    {
      name: "Design Engineer",
      salary: 92000
    },
    {
      name: "GIS Technician",
      salary: 38000
    },
    {
      name: "Operations Research Analyst",
      salary: 81000
    },
    {
      name: "Electrical Designer",
      salary: 71000
    },
    {
      name: "General Engineer",
      salary: 84000
    },
    {
      name: "Optical Engineer",
      salary: 76000
    },
    {
      name: "Electrical Engineer",
      salary: 83000
    },
    {
      name: "Geographer",
      salary: 61000
    },
    {
      name: "Process Engineer",
      salary: 86000
    },
    {
      name: "Electronics Engineer",
      salary: 84000
    },
    {
      name: "Geologist",
      salary: 76000
    },
    {
      name: "Project Engineer",
      salary: 88000
    },
    {
      name: "Engineer",
      salary: 89000
    },
    {
      name: "Geotechnical Engineer",
      salary: 79000
    },
    {
      name: "Scientist",
      salary: 81000
    },
    {
      name: "Engineering Manager",
      salary: 89000
    },
    {
      name: "Hardware Design Engineer",
      salary: 94000
    },
    {
      name: "Test Engineer",
      salary: 91000
    },
    {
      name: "Engineering Technician",
      salary: 40000
    },
    {
      name: "Hardware Engineer",
      salary: 92000
    },
    {
      name: "Ultrasound Technician",
      salary: 22000
    },
    {
      name: "Environmental Engineer",
      salary: 83000
    },
    {
      name: "Industrial Engineer",
      salary: 81000
    },
    {
      name: "VP Of Engineering",
      salary: 112000
    }
  ]
},
"Government/Military": {
  "JobTitles": [
    {
      name: "Environmental Scientist",
      salary: 62000
    },
    {
      name: "Lifeguard",
      salary: 21000
    },
    {
      name: "Zoning Manager",
      salary: 73000
    },
    {
      name: "Federal Government Worker",
      salary: 48000
    },
    {
      name: "USAR Unit Administrator",
      salary: 46000
    },
    {
      name: "Zoning Specialist",
      salary: 66000
    },
    {
      name: "Firefighter",
      salary: 30000
    },
    {
      name: "Wildlife Biologist",
      salary: 56000
    },
    {
      name: "Zoning Supervisor",
      salary: 57000
    },
    {
      name: "Grant Writer",
      salary: 51000
    },
    {
      name: "Zipsort Operator",
      salary: 22000
    },
    {
      name: "Intelligence Analyst",
      salary: 76000
    },
    {
      name: "Zoning Enforcement Inspector",
      salary: 53000
    },


  ]
},
"Healthcare": {
  "JobTitles": [
    {
      name: "Case Manager",
      salary: 51000
    },
    {
      name: "Medical Worker",
      salary: 33000
    },
    {
      name: "Phlebotomist",
      salary: 24000
    },
    {
      name: "Dental Assistant",
      salary: 58000
    },
    {
      name: "Nuclear Medicine Technologist",
      salary: 72000
    },
    {
      name: "Physical Therapist",
      salary: 88000
    },
    {
      name: "Dental Hygienist",
      salary: 51000
    },
    {
      name: "Nurse",
      salary: 64000
    },
    {
      name: "Physician Assistant",
      salary: 65000
    },
    {
      name: "Director of Nursing",
      salary: 69000
    },
    {
      name: "Nurse Assistant",
      salary: 63000
    },
    {
      name: "Respiratory Therapist",
      salary: 64000
    },
    {
      name: "Health Unit Coordinator",
      salary: 51000
    },
    {
      name: "Nurse LVN",
      salary: 44000
    },
    {
      name: "Social Worker",
      salary: 51000
    },
    {
      name: "Home Health Aide",
      salary: 37000
    },
    {
      name: "Nurse Practitioner",
      salary: 95000
    },
    {
      name: "Unit Clerk",
      salary: 30000
    },
    {
      name: "Massage Therapist",
      salary: 22000
    },
    {
      name: "Nurse RN",
      salary: 66000
    },
    {
      name: "Unit Secretary",
      salary: 54000
    },
    {
      name: "Medical Assistant",
      salary: 38000
    },
    {
      name: "Nursing Assistant",
      salary: 50000
    },
    {
      name: "Veterinary Receptionist",
      salary: 28000
    },
    {
      name: "Medical Receptionist",
      salary: 26000
    },
    {
      name: "Nutritionist",
      salary: 49000
    },
    {
      name: "Veterinary Technician",
      salary: 29000
    },
    {
      name: "Medical Technologist",
      salary: 54000
    },
    {
      name: "Occupational Therapist",
      salary: 86000
    },
    {
      name: "Vocational Rehabilitation Counselor",
      salary: 44000
    }
  ]
},
"Computer/Internet Jobs": {
  "JobTitles": [
    {
      name: "Application Developer",
      salary: 94000
    },
    {
      name: "IT Specialist",
      salary: 46000
    },
    {
      name: "Software Engineer",
      salary: 94000
    },
    {
      name: "Business Objects Developer",
      salary: 94000
    },
    {
      name: "Informatica Developer",
      salary: 102000
    },
    {
      name: "System Administrator",
      salary: 67000
    },
    {
      name: "Business Systems Analyst",
      salary: 82000
    },
    {
      name: "Java Developer",
      salary: 102000
    },
    {
      name: "Systems Analyst",
      salary: 71000
    },
    {
      name: "Data Analyst",
      salary: 61000
    },
    {
      name: "NET Developer",
      salary: 88000
    },
    {
      name: "Systems Engineer",
      salary: 92000
    },
    {
      name: "Database Administrator",
      salary: 58000
    },
    {
      name: "Network Administrator",
      salary: 66000
    },
    {
      name: "Technical Support Engineer",
      salary: 88000
    },
    {
      name: "Director Of Development",
      salary: 73000
    },
    {
      name: "Network Engineer",
      salary: 92000
    },
    {
      name: "Technical Support Specialist",
      salary: 39000
    },
    {
      name: "Embedded Software Engineer",
      salary: 100000
    },
    {
      name: "Network Technician",
      salary: 34000
    },
    {
      name: "Unix System Administrator",
      salary: 92000
    },
    {
      name: "IT Director",
      salary: 79000
    },
    {
      name: "Oracle Database Administrator",
      salary: 94000
    },
    {
      name: "Web Designer",
      salary: 66000
    },
    {
      name: "IT Manager",
      salary: 70000
    },
    {
      name: "Oracle Developer",
      salary: 97000
    },
    {
      name: "Web Developer",
      salary: 87000
    },
    {
      name: "IT Project Manager",
      salary: 91000
    },
    {
      name: "Programmer Analyst",
      salary: 87000
    },
    {
      name: "Webmaster",
      salary: 71000
    }
  ]
},
"Hospitality/Travel": {
  "JobTitles": [
    {
      name: "Banquet Manager",
      salary: 38000
    },
    {
      name:"Greeter",
      salary: 19000
    },
    {
      name:"Kennel Attendant",
      salary: 22000
    },
    {
      name:"Event Manager",
      salary: 46000
    },
    {
      name:"Guest Service Agent",
      salary: 22000
    },
    {
      name:"Kennel Technician",
      salary: 27000
    },
    {
      name:"Event Planner",
      salary: 50000
    },
    {
      name:"Housekeeper",
      salary: 21000
    },
    {
      name:"Travel Agent",
      salary: 56000
    },
    {
      name:"Floral Designer",
      salary: 24000
    },
    {
      name:"Kennel Assistant",
      salary: 21000
    }
  ]
},
"Human Resources Jobs": {
  "JobTitles": [
    {
      name: "Director Of Human Resources",
      salary: 44000
    },
    {
      name: "HR Manager",
      salary: 44000
    },
    {
      name: "Recruiting Coordinator",
      salary: 40000
    },
    {
      name: "Executive Recruiter",
      salary: 71000
    },
    {
      name: "HR Recruiter",
      salary: 45000
    },
    {
      name: "Recruiting Manager",
      salary: 71000
    },
    {
      name: "HR Administrator",
      salary: 44000
    },
    {
      name: "HR Representative",
      salary: 30000
    },
    {
      name: "Technical Recruiter",
      salary: 78000
    },
    {
      name: "HR Consultant",
      salary: 69000
    },
    {
      name: "HR Specialist",
      salary: 34000
    },
    {
      name: "VP of Human Resources",
      salary: 82000
    },
    {
      name: "HR Coordinator",
      salary: 35000
    },
    {
      name: "Job Coach",
      salary: 42000
    },
    {
      name: "HR Generalist",
      salary: 58000
    },
    {
      name: "Recruiter",
      salary: 43000
    }
  ]
},
"Insurance": {
  "JobTitles": [
    {
      name: "Benefits Administrator",
      salary: 58000
    },
    {
      name: "Fraud Investigator",
      salary: 50000
    },
    {
      name: "Investigator",
      salary: 42000
    },
    {
      name: "Benefits Manager",
      salary: 48000
    },
    {
      name: "Inspector",
      salary: 27000
    },
    {
      name: "Lead Asset Protection Associate",
      salary: 102000
    },
    {
      name: "Benefits Specialist",
      salary: 40000
    },
    {
      name: "Insurance Agent",
      salary: 28000
    },
    {
      name: "Field Investigator",
      salary: 48000
    },
    {
      name: "Insurance Sales Representative",
      salary: 46000
    }
  ]
},
"Law Enforcement/Security": {
  "JobTitles": [
    {
      name: "Criminal Investigator",
      salary: 45000
    },
    {
      name: "Loss Prevention Investigator",
      salary: 34000
    },
    {
      name: "Security Officer",
      salary: 22000
    },
    {
      name: "International Police Officer",
      salary: 56000
    },
    {
      name: "Loss Prevention Manager",
      salary: 23000
    },
    {
      name: "Transportation Security Officer",
      salary: 22000
    },
    {
      name: "Juvenile Detention Officer",
      salary: 35000
    },
    {
      name: "Police Officer",
      salary: 28000
    },
    {
      name: "Unarmed Security Guard",
      salary: 22000
    },
    {
      name: "Juvenile Probation Officer",
      salary: 42000
    },
    {
      name: "Security Guard",
      salary: 22000
    }
  ]
},
"Legal": {
  "JobTitles": [
    {
      name: "Attorney",
      salary: 49000
    },
    {
      name: "Legal Administrative Assistant",
      salary: 28000
    },
    {
      name: "Litigation Attorney",
      salary: 27000
    },
    {
      name: "General Counsel",
      salary: 49000
    },
    {
      name: "Legal Assistant",
      salary: 23000
    },
    {
      name: "Litigation Paralegal",
      salary: 38000
    },
    {
      name: "Judge Advocate",
      salary: 65000
    },
    {
      name: "Legal Secretary",
      salary: 23000
    },
    {
      name: "Paralegal",
      salary: 23000
    }
  ]
},
"Manufacturing/Mechanical": {
  "JobTitles": [
    {
      name: "Assembler",
      salary: 23000
    },
    {
      name: "Manufacturing Engineer",
      salary: 78000
    },
    {
      name: "QA Tester",
      salary: 79000
    },
    {
      name: "Autocad Drafter",
      salary: 43000
    },
    {
      name: "Material Handler",
      salary: 21000
    },
    {
      name: "Quality Control Inspector",
      salary: 23000
    },
    {
      name: "Automotive Technician",
      salary: 35000
    },
    {
      name: "Operator",
      salary: 37000
    },
    {
      name: "Quality Engineer",
      salary: 85000
    },
    {
      name: "CNC Machinist",
      salary: 37000
    },
    {
      name: "Production Assistant",
      salary: 25000
    },
    {
      name: "Research Analyst",
      salary: 68000
    },
    {
      name: "Chemist",
      salary: 61000
    },
    {
      name: "Production Manager",
      salary: 71000
    },
    {
      name: "Research Assistant",
      salary: 33000
    },
    {
      name: "Drafter",
      salary: 28000
    },
    {
      name: "Production Supervisor",
      salary: 42000
    },
    {
      name: "Research Associate",
      salary: 47000
    },
    {
      name: "Electronic Assembler",
      salary: 24000
    },
    {
      name: "Production Worker",
      salary: 22000
    },
    {
      name: "Research Scientist",
      salary: 82000
    },
    {
      name: "Electronics Technician",
      salary: 26000
    },
    {
      name: "QA Analyst",
      salary: 83000
    },
    {
      name: "Safety Manager",
      salary: 39000
    },
    {
      name: "Machine Operator",
      salary: 24000
    },
    {
      name: "QA Engineer",
      salary: 92000
    },
    {
      name: "Technician",
      salary: 30000
    },
    {
      name: "Machinist",
      salary: 37000
    },
    {
      name: "QA Specialist",
      salary: 69000
    },
    {
      name: "Test Technician",
      salary: 32000
    }
  ]
},
"Marketing/Advertising/PR": {
  "JobTitles": [
    {
      name: "Brand Manager",
      salary: 66000
    },
    {
      name: "Marketing Assistant",
      salary: 48000
    },
    {
      name: "Online Marketing Manager",
      salary: 71000
    },
    {
      name: "Copywriter",
      salary: 57000
    },
    {
      name: "Marketing Associate",
      salary: 45000
    },
    {
      name: "Product Marketing Manager",
      salary: 79000
    },
    {
      name: "Director Of Communication",
      salary: 62000
    },
    {
      name: "Marketing Coordinator",
      salary: 41000
    },
    {
      name: "Public Relations Manager",
      salary: 64000
    },
    {
      name: "Director Of Marketing",
      salary: 74000
    },
    {
      name: "Marketing Manager",
      salary: 66000
    },
    {
      name: "VP of Marketing",
      salary: 102000
    },
    {
      name: "Market Research Analyst",
      salary: 70000
    },
    {
      name: "Marketing Specialist",
      salary: 49000
    }
  ]
},
"Non-Profit/Volunteering": {
  "Jobtitles": [
    {
      name: "Community Volunteer",
      salary: 35000
    },
    {
      name: "Youth Care Specialist",
      salary: 39000
    },
    {
      name: "Youth Leader",
      salary: 33000
    },
    {
      name: "Red Cross",
      salary: 39000
    },
    {
      name: "Youth Care Worker",
      salary: 31000
    },
    {
      name: "Youth Program Coordinator",
      salary: 32000
    },
    {
      name: "Special Events Coordinator",
      salary: 38000
    },
    {
      name: "Youth Coordinator",
      salary: 33000
    },
    {
      name: "Youth Program Director",
      salary: 37000
    },
    {
      name: "Volunteer Coordinator",
      salary: 35000
    },
    {
      name: "Youth Counselor",
      salary: 29000
    },
    {
      name: "Youth Specialist",
      salary: 37000
    },
    {
      name: "Volunteer Recruiter",
      salary: 35000
    },
    {
      name: "Youth Development Manager",
      salary: 43000
    },
    {
      name: "Youth Worker",
      salary: 32000
    },
    {
      name: "Youth Advocate",
      salary: 32000
    },
    {
      name: "Youth Development Specialist",
      salary: 41000
    }
  ]
},
"Pharmaceutical/Bio-tech": {
  "JobTitles": [
    {
      name: "Analytical Chemist",
      salary: 51000
    },
    {
      name: "Lab Technician",
      salary: 38000
    },
    {
      name: "Pharmacist",
      salary: 39000
    },
    {
      name: "Lab Assistant",
      salary: 27000
    },
    {
      name: "Pharmaceutical Sales Representative",
      salary: 64000
    },
    {
      name: "Pharmacy Technician",
      salary: 28000
    }
  ]
},
"Real Estate": {
  "JobTitles": [
    {
      name: "Assistant Property Manager",
      salary: 51000
    },
    {
      name: "Leasing Agent",
      salary: 17000
    },
    {
      name: "Real Estate Appraiser",
      salary: 51000
    },
    {
      name: "Land Surveyor",
      salary: 59000
    },
    {
      name: "Leasing Consultant",
      salary: 35000
    },
    {
      name: "Lease Administrator",
      salary: 51000
    },
    {
      name: "Property Manager",
      salary: 47000
    }
  ]
},
"Restaurant/Food Service": {
  "JobTitles": [
  {
   name: "Baker",
   salary: 80000
  }, {
    name: "Kitchen Bath Department Supervisor",
    salary: 38000
  }, {
    name: "Line Cook",
    salary: 19000
  }, {
    name: "Bartender",
    salary: 22000
  }, {
    name: "Kitchen Designer",
    salary: 102000
  }, {
    name: "Restaurant Bartender",
    salary: 22000
  }, {
    name: "Cook",
    salary: 21000
  }, {
    name: "Kitchen Helper",
    salary: 19000
  }, {
    name: "Restaurant Manager",
    salary: 41000
  }, {
    name: "Dishwasher",
    salary: 20000
  }, {
    name: "Kitchen Manager",
    salary: 44000
  }, {
    name: "Restaurant Worker",
    salary: 21000
  }, {
    name: "Executive Chef",
    salary: 49000
  }, {
    name: "Kitchen Staff",
    salary: 21000
  }, {
    name: "Sous Chef",
    salary: 46000
  }, {
    name: "Food Service Worker",
    salary: 20000
  }, {
    name: "Kitchen Steward",
    salary: 18000
  }, {
    name: "Wait Staff",
    salary: 21000
  }, {
    name: "Grill Cook",
    salary: 18000
  }, {
    name: "Kitchen Supervisor",
    salary: 20000
  }, {
    name: "Kitchen Assistant",
    salary: 41000
  }, {
    name: "Kitchen Worker",
    salary: 20000
  }
]},
"Retail": {
  "JobTitles": [
  {
    name: "Assistant Store Manager",
    salary: 58000
  }, {
    name: "Hair Stylist",
    salary: 19000
  }, {
    name: "Retail Sales Representative",
    salary: 48000
  }, {
    name: "Buyer",
    salary: 36000
  }, {
    name: "Head Cashier",
    salary: 25000
  }, {
    name: "Retail Store Manager",
    salary: 46000
  }, {
    name: "Buyer Planner",
    salary: 54000
  }, {
    name: "Jeweler",
    salary: 38000
  }, {
    name: "Sales Assistant",
    salary: 41000
  }, {
    name: "Cashier",
    salary: 20000
  }, {
    name: "Key Holder",
    salary: 82000
  }, {
    name: "Store Manager",
    salary: 45000
  }, {
    name: "Esthetician",
    salary: 40000
  }, {
    name: "Kitchen Bath Sales Associate",
    salary: 108000
  }, {
    name: "Visual Merchandiser",
    salary: 24000
  }, {
    name: "Footwear Associate",
    salary: 27000
  }, {
    name: "Night Manager",
    salary: 46000
  }, {
    name: "Youth Department Sales Manager",
    salary: 31000
  }, {
    name: "Garden Sales Associate",
    salary: 38000
  }, {
    name: "Representative Retail Sales",
    salary: 48000
  }, {
    name: "Grooming Salon Manager",
    salary: 36000
  }, {
    name: "Retail Sales Associate",
    salary: 41000
  }
]},
"Sales" : {
  "JobTitles" : [
  {
    name: "Account Executive",
    salary: 64000
  },{
    name: "Key Account Manager",
    salary:74000
  }, {
    name: "Sales Coordinator",
    salary:36000
  }, {
    name: "Account Manager",
    salary:58000
  }, {
    name: "Merchandiser",
    salary:20000
  }, {
    name: "Sales Executive",
    salary:61000
  }, {
    name: "Account Representative",
    salary:37000
  }, {
    name: "National Account Manager",
    salary:61000
  }, {
    name: "Sales Manager",
    salary:48000
  }, {
    name: "Business Development Manager",
    salary:82000
  }, {
    name: "National Sales Manager",
    salary:61000
  }, {
    name: "Sales Representative",
    salary:45000
  }, {
    name: "Business Development Specialist",
    salary:75000
  }, {
    name: "Outside Sales Representative",
    salary:56000
  }, {
    name: "Sales Specialist",
    salary:51000
  }, {
    name: "Director Of Business Development",
    salary:96000
  }, {
    name: "Regional Sales Manager",
    salary:81000
  }, {
    name: "Telemarketer",
    salary:36000
  }, {
    name: "Director Of Sales",
    salary:76000
  }, {
    name: "Retail Merchandiser",
    salary:20000
  }, {
    name: "Territory Sales Manager",
    salary:73000
  }, {
    name: "District Sales Manager",
    salary:57000
  }, {
    name: "Route Sales Representative",
    salary:46000
  }, {
    name: "Trader",
    salary:58000
  }, {
    name: "Field Representative",
    salary:28000
  }, {
    name: "Sales Associate",
    salary:27000
  }, {
    name: "VP of Sales",
    salary:102000
  }, {
    name: "Inside Sales Representative",
    salary:45000
  }, {
    name: "Sales Consultant",
    salary:48000
  }, {
    name: "Work Sales Representative",
    salary:45000
  }
]},
"Telecommunications" : {
  "JobTitles" : [
  {
    name: "Broadband Technician",
    salary: 33000
  }, {
    name: "Telecommunications Specialist",
    salary: 80000
  }, {
    name: "Wireless Consultant",
    salary: 48000
  }, {
    name: "Communications Specialist",
    salary: 38000
  }, {
    name: "Telecommunications Technician",
    salary: 27000
  }
]},
"Transportation/Logistics" : {
  "JobTitles":[
  {
    name: "Bus Driver",
    salary: 30000
  }, {
    name: "Logistics Coordinator",
    salary: 37000
  }, {
    name: "Van Driver",
    salary: 74000
  }, {
    name: "Delivery Driver",
    salary: 51000
  }, {
    name: "Logistics Manager",
    salary: 61000
  }, {
    name: "Warehouse Assistant",
    salary: 23000
  }, {
    name: "Diesel Mechanic",
    salary: 39000
  }, {
    name: "Nationwide Truck Driver",
    salary: 64000
  }, {
    name: "Warehouse Associate",
    salary: 21000
  }, {
    name: "Dispatcher",
    salary: 27000
  }, {
    name: "Order Builder",
    salary: 55000
  }, {
    name: "Warehouse Clerk",
    salary: 21000
  }, {
    name: "Driver",
    salary: 51000
  }, {
    name: "Receiving Associate",
    salary: 26000
  }, {
    name: "Warehouse Driver",
    salary: 24000
  }, {
    name: "Driver Merchandiser",
    salary: 23000
  }, {
    name: "Receiving Merchandise Pick Up Associate",
    salary: 21000
  }, {
    name: "Warehouse Lead",
    salary: 26000
  }, {
    name: "Forklift Operator",
    salary: 22000
  }, {
    name: "Route Driver",
    salary: 53000
  }, {
    name: "Warehouse Manager",
    salary: 25000
  }, {
    name: "Freight Team Associate",
    salary: 37000
  }, {
    name: "Shipping Clerk",
    salary: 22000
  }, {
    name: "Warehouse Specialist",
    salary: 28000
  }, {
    name: "Household Driver",
    salary: 101000
  }, {
    name: "Transportation Manager",
    salary: 48000
  }, {
    name: "Warehouse Supervisor",
    salary: 22000
  }, {
    name: "Logistics Analyst",
    salary: 71000
  }, {
    name: "Truck Driver",
    salary: 51000
  }, {
    name: "Warehouse Worker",
    salary: 20000
  }
]},
"Upper Management/Consulting" : {
  "JobTitles":[
  {
    name: "Business Analyst",
    salary: 76000
  },{
    name: "Business Process Analyst",
    salary: 82000
  },{
    name: "General Manager",
    salary: 48000
  },{
    name: "Business Manager",
    salary: 48000
  },{
    name: "Chief Financial Officer",
    salary: 99000
  },{
    name: "Manager" ,
    salary: 48000
  },{
    name: "Business Office Manager",
    salary: 61000
  },{
    name: "Director" ,
    salary: 62000
  },{
    name: "VP",
    salary: 102000
    }
  ]}
};