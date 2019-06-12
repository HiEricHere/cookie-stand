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
//create thead of given table
var theadCreate = function ( table ) {
  var tableDataElement = document.getElementById( table );
  var theadElement = document.createElement( 'thead' );
  var trElement = document.createElement( 'tr' );
  var thElementFirst = document.createElement( 'th' );
  thElementFirst.textContent = table;
  trElement.appendChild(thElementFirst);
  for ( var i = 0; i < arrayTime.length; i++ ){
    var thElement = document.createElement( 'th' );
    thElement.textContent = arrayTime[i][0];
    trElement.appendChild(thElement);
  }
  if ( table === 'Sales' ) {
    var thElementLast = document.createElement( 'th' );
    thElementLast.textContent = 'Daily Location Total';
    trElement.appendChild(thElementLast);
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
  var thElement = document.createElement ( 'th' );
  thElement.textContent = 'Totals';
  trElement.appendChild(thElement);
  //loops through time array and location array and picks the soldByHour at of each location for each hour and adds to allTotal and hourTotal
  for ( var i = 0; i < arrayTime.length; i++ ){
    var hourTotal = 0;
    for ( var n = 0; n < arrayLocation.length; n++ ){
      hourTotal += arrayLocation[n].soldByHour[i];
      allTotal += arrayLocation[n].soldByHour[i];
    }
    var tdElement = document.createElement( 'td' );
    tdElement.textContent = hourTotal;
    trElement.appendChild(tdElement);
  }
  //append last td element = allTotal, the sum total of all sales from all locations
  var tdElementLast = document.createElement( 'td' );
  tdElementLast.textContent = allTotal;
  trElement.appendChild(tdElementLast);
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
//calculates data using object properties
Place.prototype.calcData = function() {
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
};
//takes a table id and corresponding array from object (sales table & .soldByHour array)
Place.prototype.trStoreCreate = function ( table, array ) {
  var tableDataElement = document.getElementById( table );
  var trElement = document.createElement('tr');
  var thElement = document.createElement('th');
  thElement.textContent = this.name;
  trElement.appendChild(thElement);
  for ( var i = 0; i < array.length; i++ ){
    var tdElement = document.createElement('td');
    tdElement.textContent = array[i];
    trElement.appendChild(tdElement);
  }
  tableDataElement.appendChild(trElement);
};

var pike = new Place ( '1st & Pike', 23, 65, 6.3 );
var seatac = new Place ( 'SeaTac', 3, 24, 1.2 );
var center = new Place ( 'Seattle Center', 11, 38, 3.7 );
var capitol = new Place ( 'Capitol Hill', 20, 39, 2.3 );
var alki = new Place ( 'Alki', 11, 38, 3.7 );

theadCreate( 'Sales' );
theadCreate( 'Staff' );
pike.calcData();
pike.trStoreCreate( 'Sales', pike.soldByHour );
pike.trStoreCreate( 'Staff', pike.staffByHour );
seatac.calcData();
seatac.trStoreCreate( 'Sales', seatac.soldByHour );
seatac.trStoreCreate( 'Staff', seatac.staffByHour );
center.calcData();
center.trStoreCreate( 'Sales', center.soldByHour );
center.trStoreCreate( 'Staff', center.staffByHour );
capitol.calcData();
capitol.trStoreCreate( 'Sales', capitol.soldByHour );
capitol.trStoreCreate( 'Staff', capitol.staffByHour );
alki.calcData();
alki.trStoreCreate( 'Sales', alki.soldByHour );
alki.trStoreCreate( 'Staff', alki.staffByHour );
tfootCreate();
