'use strict';

var arrayTime = ['6 AM','7 AM','8 AM','9 AM','10 AM','11 AM','12 PM','1 PM','2 PM','3 PM','4 PM','5 PM','6 PM','7 PM','8 PM'];

//this function taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
var getRand = function ( min, max ) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// pike
var pike = {
  customerMin : 23,
  customerMax : 65,
  avgSold : 6.3,
  arraySold : [],
  totalSale : 0,
  saleProjection : function () {
    var sold;
    for ( var i = 0; i < arrayTime.length; i++ ) {
      sold = parseInt((getRand(this.customerMin, this.customerMax) * this.avgSold),10);
      this.arraySold.push(sold);
      this.totalSale += sold;
    }
    console.log(this.arraySold.length);
    console.log(this.arraySold);
  },
  list : function () {
    //location
    var ul = document.getElementById( 'pike' );
    for ( var i = 0; i < this.arraySold.length; i++ ) {
      //create an <li>
      var listItem = document.createElement( 'li' );
      //add number sold from array
      listItem.textContent = `${arrayTime[i]}: ${this.arraySold[i]} cookies`;
      //add it under the ul
      ul.appendChild( listItem );
    }
    var totalSale = document.createElement( 'li' );
    totalSale.textContent = `Total Sales: ${this.totalSale} cookies`;
    ul.appendChild( totalSale );
  }
};

//seatac
var seatac = {
  customerMin : 3,
  customerMax : 24,
  avgSold : 1.2,
  arraySold : [],
  totalSale : 0,
  saleProjection : function () {
    var sold;
    for ( var i = 0; i < arrayTime.length; i++ ) {
      sold = parseInt((getRand(this.customerMin, this.customerMax) * this.avgSold),10);
      this.arraySold.push(sold);
      this.totalSale += sold;
    }
    console.log(this.arraySold.length);
    console.log(this.arraySold);
  },
  list : function () {
    //location
    var ul = document.getElementById( 'seatac' );
    for ( var i = 0; i < this.arraySold.length; i++ ) {
      //create an <li>
      var listItem = document.createElement( 'li' );
      //add number sold from array
      listItem.textContent = `${arrayTime[i]}: ${this.arraySold[i]} cookies`;
      //add it under the ul
      ul.appendChild( listItem );
    }
    var totalSale = document.createElement( 'li' );
    totalSale.textContent = `Total Sales: ${this.totalSale} cookies`;
    ul.appendChild( totalSale );
  }
};

//center
var center = {
  customerMin : 11,
  customerMax : 38,
  avgSold : 3.7,
  arraySold : [],
  totalSale : 0,
  saleProjection : function () {
    var sold;
    for ( var i = 0; i < arrayTime.length; i++ ) {
      sold = parseInt((getRand(this.customerMin, this.customerMax) * this.avgSold),10);
      this.arraySold.push(sold);
      this.totalSale += sold;
    }
    console.log(this.arraySold.length);
    console.log(this.arraySold);
  },
  list : function () {
    //location
    var ul = document.getElementById( 'center' );
    for ( var i = 0; i < this.arraySold.length; i++ ) {
      //create an <li>
      var listItem = document.createElement( 'li' );
      //add number sold from array
      listItem.textContent = `${arrayTime[i]}: ${this.arraySold[i]} cookies`;
      //add it under the ul
      ul.appendChild( listItem );
    }
    var totalSale = document.createElement( 'li' );
    totalSale.textContent = `Total Sales: ${this.totalSale} cookies`;
    ul.appendChild( totalSale );
  }
};

//capitol
var capitol = {
  customerMin : 20,
  customerMax : 38,
  avgSold : 2.3,
  arraySold : [],
  totalSale : 0,
  saleProjection : function () {
    var sold;
    for ( var i = 0; i < arrayTime.length; i++ ) {
      sold = parseInt((getRand(this.customerMin, this.customerMax) * this.avgSold),10);
      this.arraySold.push(sold);
      this.totalSale += sold;
    }
    console.log(this.arraySold.length);
    console.log(this.arraySold);
  },
  list : function () {
    //location
    var ul = document.getElementById( 'capitol' );
    for ( var i = 0; i < this.arraySold.length; i++ ) {
      //create an <li>
      var listItem = document.createElement( 'li' );
      //add number sold from array
      listItem.textContent = `${arrayTime[i]}: ${this.arraySold[i]} cookies`;
      //add it under the ul
      ul.appendChild( listItem );
    }
    var totalSale = document.createElement( 'li' );
    totalSale.textContent = `Total Sales: ${this.totalSale} cookies`;
    ul.appendChild( totalSale );
  }
};

//alki
var alki = {
  customerMin : 11,
  customerMax : 38,
  avgSold : 3.7,
  arraySold : [],
  totalSale : 0,
  saleProjection : function () {
    var sold;
    for ( var i = 0; i < arrayTime.length; i++ ) {
      sold = parseInt((getRand(this.customerMin, this.customerMax) * this.avgSold),10);
      this.arraySold.push(sold);
      this.totalSale += sold;
    }
    console.log(this.arraySold.length);
    console.log(this.arraySold);
  },
  list : function () {
    //location
    var ul = document.getElementById( 'alki' );
    for ( var i = 0; i < this.arraySold.length; i++ ) {
      //create an <li>
      var listItem = document.createElement( 'li' );
      //add number sold from array
      listItem.textContent = `${arrayTime[i]}: ${this.arraySold[i]} cookies`;
      //add it under the ul
      ul.appendChild( listItem );
    }
    var totalSale = document.createElement( 'li' );
    totalSale.textContent = `Total Sales: ${this.totalSale} cookies`;
    ul.appendChild( totalSale );
  }
};
  

pike.saleProjection();
pike.list();
seatac.saleProjection();
seatac.list();
center.saleProjection();
center.list();
capitol.saleProjection();
capitol.list();
alki.saleProjection();
alki.list();
