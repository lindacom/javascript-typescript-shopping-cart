let allItems = [];

function createItem(name, price, quantity) {

  var name = name;
  var price = price;
  var quantity = quantity;
  var priceConv = Number(price.replace(/[^0-9.-]+/g,"")); // convert to double for calculation removes all non dot / digits
  var sum = priceConv * quantity;
  var summed = formatter.format(sum); // convert back to currency for display

  // create cart item
  var item =
    '<tr>' +
    '<td>' + name + '</td>' +
    '<td>' + price + '</td>' +
    '<td>' + quantity + '</td>' +
   '<td>' + summed + '</td>' +
   '<td id="delClick"><a class="btn-remove" id="'+name+'" href="javascript:void(0)">Delete</a></td>' +
   // '<td><button class="button btn-remove" id="' + name + '" type="button" >Delete</button></td>' +
    '</tr>'
    ;

  // create cart object
  let storageItem = {
    name: name,
    price: price,
    quantity: quantity,
    summed: summed
  };

  // if a cart item is created:
  if (item) {
    // add items to cart (DOM)
    cartItems.innerHTML += item;

    //N.b. the element could not be clicked when th below click event is placed outside this code
    
    // get first click event
   /* var clicked = document.getElementById("delClick");
    clicked.onclick = function() { 
      var deleted = clicked.children[0].id; 
      deleteItem(deleted);
    }*/

    // listen for all click events
  /* for(var i=0; i < item.length; i++) {
     var clicked = document.getElementsByClassName("delClick"); //td tags containing anchor links
for(var j=0; j < clicked.length; j++) { // loop through td tags
 clicked[j].onclick = function() { 
  var deleted = clicked[j].children[0].id; // html collection containing a tag ERROR CHILDREN UNDEFINED

        deleteItem(deleted); // calls function in cartstorage.js file
    
  }
}
    }*/

    // add array of objects to local storage
    allItems.push(storageItem); // add object to allitems array
    localStorage.setItem("allItems", JSON.stringify(allItems)); // converts to string as local storage uses string
  }

  //display cart, total and payment button
  wholeCart.style.display = "block";
  cartTotalElement.style.display = "block";
  payment.style.display = "block";
  // btnPayment.style.display = "block";    
  // btnClear.style.display = "block";

  // call update cart total
  updateTotal(summed);

  // call update badge function
  updateBadge();
}

// calculate cart grand total  
var grand = [];
function updateTotal(summed) {
  var addedTotal = Number(summed.replace(/[^0-9.-]+/g,"")); // convert to number for calculation
   grand.push(addedTotal); // add to array

 var total = grand.reduce(myFunc); 

 // perform calculation
 function myFunc(a, b) {
  return a + b;
 }
 
 cartTotal.innerHTML = formatter.format(total); // convert back to currency for display
 
} // END

// add items to session storage and remove from local storage when pmt button clicked and go to page
var buttonPayment = document.getElementById("btn-pmt");

if (buttonPayment) {
  buttonPayment.addEventListener("click", function (e) {
    sessionStorage.setItem("allItems", JSON.stringify(allItems));
    localStorage.removeItem("allItems");
    window.location = buttonPayment.dataset.url;
  });
}

// show all items from session storage (used on payment page and confirmation page)
function displayItems() {

  // show object array of items from session storage in cart
  var arr = sessionStorage.getItem("allItems"); // get data as string
  var arrayProd = JSON.parse(arr); // convert string to object

  if(arr){
  for (var i = 0; i < arrayProd.length; i++) {
    var productItem = arrayProd[i].name;
    var productPrice = arrayProd[i].price;
    var productQuantity = arrayProd[i].quantity;
    var productSummed= arrayProd[i].summed;

    var summary =

      '<tr><td>' + productItem + '</td>' +
      '<td>' + productPrice + '</td>' +
      '<td>' + productQuantity + '</td>' +
      '<td>' + productSummed + '</td>' +
      '</tr>' +
      '<hr />';

    document.getElementById("productsarray").innerHTML += summary;
  
  
  }
displayAddress();
}
}

// show all items in cart
// check if this function repeated in main file ???
function displayAddress() {

  // show object array of items from session storage in cart
  var arr2 = sessionStorage.getItem("shippingaddress"); // get data as string
  var array2 = JSON.parse(arr2); // convert string to object

  if(arr2){
  for (var i = 0; i < array2.length; i++) {
    var firstname = array2[i].Name;
    var lastname = array2[i].Surname;
    var address = array2[i].Address;
    var town = array2[i].Town;

    var fulladdress =

      '<tr>' +
      '<td>Shipping address</td>' +
      '<td>' + firstname + '</td>' +
      '<td>' + lastname + '</td>' +
      '<td>' + address + '</td>' +
      '</tr>' +
      '<hr />';

    document.getElementById("addressarray").innerHTML += fulladdress;

  }

}
}



