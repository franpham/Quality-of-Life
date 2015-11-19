(function( $ ) {
    $.widget( "custom.combobox", {
      _create: function() {
        this.wrapper = $( "<span>" )
          .addClass( "custom-combobox" )
          .insertAfter( this.element );

        // this.element.hide();
        this._createAutocomplete();
        // this._createShowAllButton();
      },

      _createAutocomplete: function() {
        var selected = this.element.children( ":selected" ),
          value = selected.val() ? selected.text() : "";

        // this.input = $( "<input>" )
        //   .appendTo( this.wrapper )
        //   .val( value )
        //   .attr( "title", "" )
        //   .addClass( "custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left" )
        //   .autocomplete({
        //     delay: 0,
        //     minLength: 0,
        //     source: $.proxy( this, "_source" )
        //   })
        //   .tooltip({
        //     tooltipClass: "ui-state-highlight"
        //   });

        this._on( this.input, {
          autocompleteselect: function( event, ui ) {
            ui.item.option.selected = true;
            this._trigger( "select", event, {
              item: ui.item.option
            });
          },

          autocompletechange: "_removeIfInvalid"
        });
      },

      // _createShowAllButton: function() {
      //   var input = this.input,
      //     wasOpen = false;

      //   $( "<a>" )
      //     .attr( "tabIndex", -1 )
      //     .attr( "title", "Show All Items" )
      //     .tooltip()
      //     .appendTo( this.wrapper )
      //     .button({
      //       icons: {
      //         primary: "ui-icon-triangle-1-s"
      //       },
      //       text: false
      //     })
      //     .removeClass( "ui-corner-all" )
      //     .addClass( "custom-combobox-toggle ui-corner-right" )
      //     .mousedown(function() {
      //       wasOpen = input.autocomplete( "widget" ).is( ":visible" );
      //     })
      //     .click(function() {
      //       input.focus();

      //       // Close if already visible
      //       if ( wasOpen ) {
      //         return;
      //       }

      //       // Pass empty string as value to search for, displaying all results
      //       input.autocomplete( "search", "" );
      //     });
      // },

      _source: function( request, response ) {
        var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
        response( this.element.children( "option" ).map(function() {
          var text = $( this ).text();
          if ( this.value && ( !request.term || matcher.test(text) ) )
            return {
              label: text,
              value: text,
              option: this
            };
        }) );
      },

      _removeIfInvalid: function( event, ui ) {

        // Selected an item, nothing to do
        if ( ui.item ) {
          return;
        }

        // Search for a match (case-insensitive)
        var value = this.input.val(),
          valueLowerCase = value.toLowerCase(),
          valid = false;
        this.element.children( "option" ).each(function() {
          if ( $( this ).text().toLowerCase() === valueLowerCase ) {
            this.selected = valid = true;
            return false;
          }
        });

        // Found a match, nothing to do
        if ( valid ) {
          return;
        }

        // Remove invalid value
        this.input
          .val( "" )
          .attr( "title", value + " didn't match any item" )
          .tooltip( "open" );
        this.element.val( "" );
        this._delay(function() {
          this.input.tooltip( "close" ).attr( "title", "" );
        }, 2500 );
        this.input.autocomplete( "instance" ).term = "";
      },

      _destroy: function() {
        this.wrapper.remove();
        this.element.show();
      }
    });
  })( jQuery );

  $(function(){
    $( "#combobox1" ).change(function(evt){
      var userEvent = false;

      // if evt for .search
        // userEvent = true
      if((evt)){
        console.log('hit the button');
        userEvent = true;
        $( ".jobCatSearchOptions" ).hide();
        $( ".housingSearchOptions" ).hide();
      }



      if((evt.target).value === "JobCategory"){
        console.log('hell yeah');
        $( ".jobCatSearchOptions" ).show();
      }else if((evt.target).value === "Home"){
        console.log('get that');
        $( ".housingSearchOptions" ).show();
      }else if((evt.target).value === "Rental"){
        console.log('Whoop');
        $( ".housingSearchOptions" ).show();
      }

    });
  });

  var searchOptions = $("<select>", {
    id : "combobox1"
  });
  searchOptions.append($("<label>", {
    value : '',
    text : 'Filter By'
  }));
  searchOptions.append($("<option>", {
    value : '',
    text : 'Select one...'
  }));
  searchOptions.append($("<option>", {
    value : 'JobCategory',
    text : 'Job Category'
  }));
  searchOptions.append($("<option>", {
    value : 'Home',
    text : 'Home'
  }));
  searchOptions.append($("<option>", {
    value : 'Rental',
    text : 'Rental'
  }));

  $( ".search" ).append( searchOptions );


// ==========================================

  var housingSearchOptions = $("<select>", {
    id : "combobox2 hide"
  });
  housingSearchOptions.append($("<label>", {
    text : 'Filter By'
  }));
  housingSearchOptions.append($("<option>", {
    value : '',
    text : 'Select one...'
  }));
  housingSearchOptions.append($("<option>", {
    value : 'Median',
    text : 'Median'
  }));
  housingSearchOptions.append($("<option>", {
    value : 'Count',
    text : 'Count'
  }));
  housingSearchOptions.append($("<option>", {
    value : 'PopularityIndex',
    text : 'Popularity Index'
  }));

  $( ".housingSearchOptions" ).append( housingSearchOptions ).hide();

  // ==========================================

  var jobCatSearchOptions = $("<select>", {
    id : "combobox2"
  });
  jobCatSearchOptions.append($("<label>", {
    text : 'Filter By'
  }));
  jobCatSearchOptions.append($("<option>", {
    value : '',
    text : 'Select one...'
  }));
  jobCatSearchOptions.append($("<option>", {
    value : 'Salary',
    text : 'Salary'
  }));
  jobCatSearchOptions.append($("<option>", {
    value : 'Count',
    text : 'Count'
  }));
  jobCatSearchOptions.append($("<option>", {
    value : 'PopularityIndex',
    text : 'Popularity Index'
  }));

  $( ".jobCatSearchOptions" ).append( jobCatSearchOptions ).hide();