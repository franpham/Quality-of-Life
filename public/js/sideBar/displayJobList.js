$(document).ready(function(){

  for (var i = 0; i < jobs.length; i++) {
    var jTitle = (jobs[i].jobtitle);
    var comp = (jobs[i].company);
    var city = (jobs[i].city);
    var state = (jobs[i].state);
    var snippet = (jobs[i].snippet);
    var date = (jobs[i].date);
    var apply = (jobs[i].url);

    var jobTitle = $("<div>", {
      class : 'jobTitle',
      html : $("<h2>", {
        class : 'jTitle',
        text : jTitle
      })
    });

    $( ".jobContainer" ).append( jobTitle );

    var jobDetails = $("<div>", {
      class : 'jobDetails hide'
    });

    jobDetails.append($('<p>',{
      class : 'comp',
      text : comp
    }));

    jobDetails.append($('<p>',{
      class : 'city',
      text : city
    }));

    jobDetails.append($('<p>',{
      class : 'state',
      text : state
    }));

    jobDetails.append($('<p>',{
      class : 'snippet',
      text : snippet
    }));

    jobDetails.append($('<p>',{
      class : 'date',
      text : date
    }));

    jobDetails.append($('<p>',{
      class : 'apply',
      text : apply
    }));

    $( ".jobContainer" ).append( jobDetails );

    jobTitle.click(function(evt){
      $(evt.target).parent().next().toggle();
    });
  }

});

