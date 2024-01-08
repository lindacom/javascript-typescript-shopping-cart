// cart on hover display cart total
/*document.getElementById("cart").addEventListener("mouseover", (e) => {
 e.target.setAttribute("alt", "hi there");
 alert("hovered");
});*/

// search filters

const searchBox = document.getElementById('search_box');
var side = document.getElementById('sidebar2');
var filter = '';

// captures typed characters (event) in searchbox
if (searchBox) {
  searchBox.addEventListener('keyup', (e) => {
    filter = e.target.value;
    searchFilter(filter); // passes input to searchfilter function
  });

  searchBox.onfocus = function(){side.style.display = "none";}; // hide right sidebar when search box is in focus
}

// display products based on search
var names = document.getElementsByClassName('shop-item'); // get all the products

function searchFilter(filter) {
  var filter = filter.toUpperCase(); // search input in uppercase
  

  for (var i = 0; i < names.length; i++) {
    var span = names[i].getElementsByClassName("shop-item-title")[0];  // get title of this product
    txtValue = span.textContent || span.innerText || span.innerHTML;

    var span2 = names[i].getElementsByClassName("shop-item-category")[0]; // get category of this product
    txtValue2 = span2.textContent || span.innerText || span.innerHTML;

    //checks if search(filter) is contained in the title or category (>-1 means it does exist)
    var searchAlert = document.getElementById("search-alert");

    if (txtValue.toUpperCase().indexOf(filter) > -1 || txtValue2.toUpperCase().indexOf(filter) > -1) {
      names[i].style.display = "";
      searchAlert.style.display = "none";
    } else {
      names[i].style.display = "none";
      searchAlert.style.display = "block";
      searchAlert.innerHTML = "There are no products matching this description"; // display message if no products are found
    }
  }
} // END 

// this function will be executed on click of X (clear button) reload page
// but error is it also fires for pressing enter ???
if (searchBox) {
  searchBox.addEventListener('search', function (e) {
    window.location.reload();
  });
}

// checkboxes - when clicked call function passing in value
var checkedCategory = document.getElementsByClassName("category");
var input = '';

for (var i = 0; i < checkedCategory.length; i++) {

  checkedCategory[i].onclick = function () {
    input = this.value;

    searchFilter(input);
  }
}

// dropdown - when select is changed call function
var dropFilter = document.getElementById("prodFilter");

if(dropFilter) {
dropFilter.onchange = function(){
 var filterValue = dropFilter.value;

 // CHANGE TO CASE STATEMENT
 if(filterValue == "top-rated") {
  toprated();
 } else if(filterValue == "a-z") {
   alphabetical();
 }
 else if(filterValue == "low-high") {
  filterPriceLow();
 }
};
}

// filter by top rated

var topy = []; // array of each likes
var best = 0;

var match = []; // array of highest rated products (names)
var countz = 0;

function toprated() {
  
  for (var i = 0; i < products.product.length; i++) {
    // loop through products object and get the number of likes for each item 
    liker = products.product[i].likes;
  
   topy.push(liker);
   topy.sort().reverse(); // put all likes in an array and sort array of likes in descending order
  best = topy[0] // get the highest rated number from the sorted array
  }

  for (var j = 0; j < products.product.length; j++) {
  if(products.product[j].likes === best) { // find all products that have the highest rating
    var good = products.product[j].name; // get title 
    match.push(good);
    match.sort(); // add highest rated names to array and sort alphabetically
  }
}

for (var l = 0; l < names.length; l++) {
  var span = names[l].getElementsByClassName("shop-item-title")[0];  // get title of all products in the store
  txtValue = span.textContent || span.innerText || span.innerHTML;
  
  for (var m = 0; m < match.length; m++) { // loop through the highest rated product names
    // if array is empty don't display the remaining products
    if(match == '') {
      names[l].style.display = "none"; 
    }
    // if the counter of highest rated names looped has already been set increment it
    if (countz) {
      countz = countz + 1;
    }
   
// if the current highest rated product name matches the current product name display it
    if (match[m] === txtValue) { 
  names[l].style.display = "block";
  if(match.length > 1) {
    var pointer = match.indexOf(match[m]); // if matched find the name position in the array and remove it (so it is no longer in the loop)
    match.splice(pointer, 1);
  }
  
} else {
    
   if(countz == match.length || match.length == 1){ // if not matched and no more to loop through don't display 
    names[l].style.display = "none";
    countz = 0;
    } else {
      if(!countz){ // or if not matched and there is no counter set it to one (as the loop will continue)
      countz = 1;
      }
    }
  }
 
  }}



}

// filter alphabetically
var alpha = [];

function alphabetical() {

  for (var i = 0; i < names.length; i++) {
    var bet = names[i].getElementsByClassName("shop-item-title")[0].innerText;  // get title of each product
    alpha.push(bet);
}

   alpha.sort(); // sort alphabetically

   for (var l = 0; l < alpha.length; l++) {
     for (var k = 0; k < names.length; k++) {
       if(alpha[l] == names[k]){
        names[k].style.display = "block";
       } else {
        names[k].style.display = "none";
       }
    
      }
    }
   /* for (var k = 0; k < names.length; k++) {
  
      var span = names[k].getElementsByClassName("shop-item-title")[0];  // get title of all products
      txtValue = span.textContent || span.innerText || span.innerHTML;
     console.log(txtValue);
      for (var l = 0; l < letters.length; l++) {
      if (txtValue.indexOf(letters[l]) > -1) {
        names[k].style.display = "";
      } else {
        names[k].style.display = "none";
      }
    }

    }*/



}

// filter by price

function filterPriceLow() {

var a = products.product;

for (var i=0; i<a.length; a++) {
var b = a[i].price;
console.log(b);
}
}



  /*  <option value="">Select...</option>
                        <option value="top-rated">Top rated</option>
                        <option value="a-z">A-Z</option>
                        <option value="low-high">Price low to high</option>
                        <option value="high-low">Price high to low</option>*/

// button click go to book a slot delivery page
// n.b. btn-slot has been used on another page in main.js file. could be reused?

var btnSlot = document.getElementById("btnSlot");

if (btnSlot) {
  btnSlot.onclick = () => {
    window.location = "delivery.html";
  }
}

//put the count of items from session storage in counter
// if empty put the count of items from local storage in the counter
//N.b. removed counter from homepage.  Need to check if this is working.  Only currently using the session storage part ???
function updateBadge() {

  var badgeCount = JSON.parse(sessionStorage.getItem("allItems"));

  if (!badgeCount) {
    badgeCount = JSON.parse(localStorage.getItem("allItems"));
  } else {
    var bbadge = document.getElementById("badge");
    if(bbadge) {
        bbadge.innerHTML = badgeCount.length;
    }
  }
}
