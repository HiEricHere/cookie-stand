# cookie-stand
///////////////////////////////////
version Monday

- Given data of locations, min, max customers and avg number of cookies sold at each location.
- Created an object for each location with the given properties.
- Created a function that takes min max number and returns a random number between mix and max.
- Created a function inside each location object that creates an array of projected sales for each business hour.
- Created a function inside each location object that runs through the created array of projected sales and appends to lists on the html page.

///////////////////////////////////
version Tuesday

(Stretch Goal) - Global variable time array will pair each hour with its weighted value for calculating customer turnout.

Design location-object constructor function that:
- stores location name, min customers, max customers, avg sold, cookies sold by hour array, staff needed per hour array, daily total
- pushes itself into a global array list of other location object instances

Create instances for each location with given data
 - fills out location objects array

Keep global randNum generator for calculating raw customer projection

(Stretch Goal) Create two tables - Sales and Staffing 

  Create theader function
   - Takes table ID
   - Uses time array to create all the column headings for both tables
   - Appends an extra Daily Location Totals column if ID === sales
  Create tfoot function
   - Takes table ID
   - Uses time and location object array to determine total sales for each hour, and also sums together total sales from all locations.
  Create data calculation prototype function
   - (Stretch Goal) Object uses its own properties min, max, avg sold and calculates a customer projection that is weighted.
   - (Stretch Goal) Calculate staffing needed every hour and push into an array staffByHour.
   - Calculate amount sold in an hour and push into an array, soldByHour.
   - Calculate total sold for the day and push into soldByHour array for the Daily Location Totals column in the Sales <table>.
  (Stretch Goal) Create staff calculating function
   - Used by the data calculation prototype function
  Create tr prototype function
   - Takes table id name and array. If table id = Sales then array should be this.soldByHour. If id = Staff then this.staffByHour.
   - Populates the row with the object's sales or staff, depending on the table id/array pairing chosen.

///////////////////////////////////
version Wednesday

Implement markup that will add input boxes asking for
a) location name b) min customers expected c) max customers expected d) expected avg sales per customer

Implement an event listener that:
Takes this input and generates a new location object
Adds the new location object to the existing table
Remove the old footer, and recreate a new footer with updated total values and reinsert onto the bottom.

- Finally gave the page some CSS lovin'


  