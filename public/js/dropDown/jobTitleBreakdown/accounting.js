  var accountingSelect = $("<select>", {
    id : "accounting"
  });
  accountingSelect.append($("<option>", {
    value : '',
    text : 'Choose a Job Title'
  }));
  accountingSelect.append($("<option>", {
    text : "Accountant",
    value : "Accountant",
    salary : 58000
  }));
  accountingSelect.append($("<option>", {
    text : "Director Of Finance",
    value : "Director Of Finance",
    salary : 92000
  }));
  accountingSelect.append($("<option>", {
    text : "Office Manager Bookkeeper",
    value : "Office Manager Bookkeeper",
    salary : 54000
  }));
  accountingSelect.append($("<option>", {
    text : "Accounting Assistant",
    value : "Accounting Assistant",
    salary : 38000
  }));
  accountingSelect.append($("<option>", {
    text : "Finance Manager",
    value : "Finance Manager",
    salary : 66000
  }));
  accountingSelect.append($("<option>", {
    text : "Quantitative Analyst",
    value : "Quantitative Analyst",
    salary : 77000
  }));
  accountingSelect.append($("<option>", {
    text : "Accounting Clerk",
    value : "Accounting Clerk",
    salary : 26000
  }));
  accountingSelect.append($("<option>", {
    text : "Financial Advisor",
    value : "Financial Advisor",
    salary : 79000
  }));
  accountingSelect.append($("<option>", {
    text : "Quantitative Research Analyst",
    value : "Quantitative Research Analyst",
    salary : 77000
  }));
  accountingSelect.append($("<option>", {
    text : "Accounting Manager",
    value : "Accounting Manager",
    salary : 61000
  }));
  accountingSelect.append($("<option>", {
    text : "Financial Analyst",
    value : "Financial Analyst",
    salary : 73000
  }));
  accountingSelect.append($("<option>", {
    text : "Senior Accountant",
    value : "Senior Accountant",
    salary : 71000
  }));
  accountingSelect.append($("<option>", {
    text : "Assistant Controller",
    value : "Assistant Controller",
    salary : 74000
  }));
  accountingSelect.append($("<option>", {
    text : "Financial Associate",
    value : "Financial Associate",
    salary : 48000
  }));
  accountingSelect.append($("<option>", {
    text : "Tax Accountant",
    value : "Tax Accountant",
    salary : 61000
  }));
  accountingSelect.append($("<option>", {
    text : "Billing Specialist",
    value : "Billing Specialist",
    salary : 26000
  }));
  accountingSelect.append($("<option>", {
    text : "Financial Reporting Manager",
    value : "Financial Reporting Manager",
    salary : 82000
  }));
  accountingSelect.append($("<option>", {
    text : "Tax Manager",
    value : "Tax Manager",
    salary : 77000
  }));
  accountingSelect.append($("<option>", {
    text : "Bookkeeper",
    value : "Bookkeeper",
    salary : 34000
  }));
  accountingSelect.append($("<option>", {
    text : "Full Charge Bookkeeper",
    value : "Full Charge Bookkeeper",
    salary : 39000
  }));
  accountingSelect.append($("<option>", {
    text : "Treasury Analyst",
    value : "Treasury Analyst",
    salary : 73000
  }));
  accountingSelect.append($("<option>", {
    text : "Budget Analyst",
    value : "Budget Analyst",
    salary : 69000
  }));
  accountingSelect.append($("<option>", {
    text : "General Ledger Accountant",
    value : "General Ledger Accountant",
    salary : 55000
  }));
  accountingSelect.append($("<option>", {
    text : "VP Director of Finance",
    value : "VP Director of Finance",
    salary : 102000
  }));
  accountingSelect.append($("<option>", {
    text : "CNA",
    value : "CNA",
    salary : 24000
  }));
  accountingSelect.append($("<option>", {
    text : "Internal Auditor",
    value : "Internal Auditor",
    salary : 74000
  }));
  accountingSelect.append($("<option>", {
    text : "VP of Finance",
    value : "VP of Finance",
    salary : 97000
  }));
  accountingSelect.append($("<option>", {
    text : "Controller",
    value : "Controller",
    salary : 77000
  }));
  accountingSelect.append($("<option>", {
    text : "Night Auditor",
    value : "Night Auditor",
    salary : 19000
  }));

  $( ".accounting" ).append( accountingSelect ).hide();
