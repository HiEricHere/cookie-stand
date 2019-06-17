'use strict';

//global variables and functions
//time array with weighted adjustment at [1]
var arrayTime = [
  ['6 AM', 0.5],
  ['7 AM', 0.75],
  ['8 AM', 1],
  ['9 AM', 0.6],
  ['10 AM', 0.8],
  ['11 AM', 1],
  ['12 PM', 0.7],
  ['1 PM', 0.4],
  ['2 PM', 0.6],
  ['3 PM', 0.9],
  ['4 PM', 0.7],
  ['5 PM', 0.5],
  ['6 PM', 0.3],
  ['7 PM', 0.4],
  ['8 PM', 0.6]];

//Empty array that all location objects push themselves into. Stores array of all location objects.
var arrayLocation = [];

//this function taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
var getRand = function ( min, max ) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//this function calculates the staff needed given a customer amount
var calcStaff = function ( customers ) {
  if ( customers <= 40 ) {
    return 2;
  } else {
    return Math.ceil( customers / 20 );
  }
};

//function takes the new element needed, content to add, and the parent node that it will be appended to and adds the element
function addElement ( newElement, content, parentNode ) {
  var tempElement = document.createElement( newElement );
  tempElement.textContent = content;
  parentNode.appendChild( tempElement );
}

//create thead of given table
var theadCreate = function ( table ) {
  var tableDataElement = document.getElementById( table );
  var theadElement = document.createElement( 'thead' );
  var trElement = document.createElement( 'tr' );
  addElement( 'th', table, trElement );
  for ( var i = 0; i < arrayTime.length; i++ ){
    addElement( 'th', arrayTime[i][0], trElement );
  }
  //Specific instructions for the Sales table - also add a Total header at the end of the row
  if ( table === 'Sales' ) {
    addElement( 'th', 'Total', trElement );
  }
  theadElement.appendChild(trElement);
  tableDataElement.appendChild(theadElement);
};

//create tfoot row for sales table, calculates hourly totals, and sum total of all sales from all locations
var tfootCreate = function () {
  var allTotal = 0;
  var tableDataElement = document.getElementById( 'Sales' );
  var tfootElement = document.createElement( 'tfoot' );
  var trElement = document.createElement( 'tr' );
  addElement( 'th', 'Totals', trElement );
  //loops through time array and location array and picks the soldByHour at each location for each hour and adds to allTotal and hourTotal. Appends hourTotal for each hour.
  for ( var i = 0; i < arrayTime.length; i++ ){
    var hourTotal = 0;
    for ( var n = 0; n < arrayLocation.length; n++ ){
      hourTotal += arrayLocation[n].soldByHour[i];
      allTotal += arrayLocation[n].soldByHour[i];
    }
    addElement( 'td', hourTotal, trElement );
  }
  //append last td element = allTotal, the sum total of all sales from all locations
  addElement( 'td', allTotal, trElement );
  tfootElement.appendChild(trElement);
  tableDataElement.appendChild(tfootElement);
};

//place object constructor function
function Place ( name, min, max, avg ) {
  this.name = name;
  this.customerMin = min;
  this.customerMax = max;
  this.avgSold = avg;
  this.soldByHour = [];
  this.staffByHour = [];
  this.dailyTotal = 0;
  arrayLocation.push(this);
}

Place.prototype = {

  //Takes a table ID argument (Sales or Staff) and creates a row for a location in the requested table.
  trStoreCreate : function ( table ) {
    var tableDataElement = document.getElementById( table );
    var trElement = document.createElement( 'tr' );
    addElement( 'th', this.name, trElement );
    if ( table === 'Sales' ){
      for ( var i = 0; i < this.soldByHour.length; i++ ){
        addElement ( 'td', this.soldByHour[i], trElement );
      }
    } else {
      for ( var n = 0; n < this.staffByHour.length; n++ ){
        addElement ( 'td', this.staffByHour[n], trElement );
      }
    }
    tableDataElement.appendChild( trElement );
  },

  //calculates data using object properties
  calcData : function() {
    for ( var i = 0; i < arrayTime.length; i++ ){
      var customers = getRand(this.customerMin, this.customerMax) * arrayTime[i][1];
      var staffers = calcStaff(customers);
      var sold = parseInt(customers * this.avgSold, 10);
      this.soldByHour.push(sold);
      this.staffByHour.push(staffers);
      this.dailyTotal += sold;
    }
    //adds the dailyTotal to the end of the soldByHour array for Sales <table>'s Daily Location Total column
    this.soldByHour.push(this.dailyTotal);
  }
};

//Event listener for everything you need to add an object
var form = document.getElementById('formAddNew');
form.addEventListener('submit', function( event ){
  //not on a server
  event.preventDefault();

  //Creates a new object using the given input values
  new Place ( event.target.location.value, event.target.minCustomer.value, event.target.maxCustomer.value, event.target.avgSold.value );
  arrayLocation[arrayLocation.length-1].calcData();
  arrayLocation[arrayLocation.length-1].trStoreCreate( 'Sales' );
  arrayLocation[arrayLocation.length-1].trStoreCreate( 'Staff' );

  //Deletes the old footer, recalcs and appends a new one
  var tableDataElement = document.getElementById( 'Sales' );
  tableDataElement.deleteRow(-1);
  tfootCreate();
});

//Creates the default 5 known locations
new Place ( '1st & Pike', 23, 65, 6.3 );
new Place ( 'SeaTac', 3, 24, 1.2 );
new Place ( 'Seattle Center', 11, 38, 3.7 );
new Place ( 'Capitol Hill', 20, 39, 2.3 );
new Place ( 'Alki', 11, 38, 3.7 );

//initializes everything in the arrayLocation list.
function letThereBeLight (){
  theadCreate( 'Sales' );
  theadCreate( 'Staff' );
  for ( var i = 0; i < arrayLocation.length; i++ ){
    arrayLocation[i].calcData();
    arrayLocation[i].trStoreCreate( 'Sales' );
    arrayLocation[i].trStoreCreate( 'Staff');
  }
  tfootCreate();
}

//boom
letThereBeLight();

