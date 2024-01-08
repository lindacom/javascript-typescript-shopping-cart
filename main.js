// price formatter
const formatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  minimumFractionDigits: 2
});

// update counter when page is loaded
document.addEventListener('DOMContentLoaded', function () {
  updateBadge();
}, false);

// mouseover and mouseout
function mOver(obj) {
  obj.innerHTML = "Thank You"
}

function mOut(obj) {
  obj.innerHTML = "Mouse Over Me"
}

// ORDER PAYMENT
// check if any items have been ordered (used on payment page - your orders)
var msg = document.getElementById("order-msg");
var btnConfirm = document.getElementById("btn-confirm"); // confirm order button
var frmFname = document.getElementById("fname");
var frmLname = document.getElementById("lname");
var frmAddress = document.getElementById("address");
var frmTown = document.getElementById("town");
var bookCheck = document.getElementById("book-check");

// used on payment page to check if there are any orders. Displays items in your order div.
function checkOrder() {
  if(msg){
  if (sessionStorage.getItem("allItems") === null) {
    msg.innerText = "There are no orders";
  } else {
    msg.innerText = '';
    displayItems();
    // keep form inputs in the form
    if(frmValues !== null) {
    frmFname = frmValues[0];
   }
}
  }

if (sessionStorage.getItem("booking") !== null) {
  if (bookCheck) {
bookCheck.innerHTML = 
  '<h2>Booking details</h2>' + JSON.parse(sessionStorage.getItem("booking"));
  }
}
}

// (used on shipping page)
if(msg){
if (msg.innerText = "There are no orders") {
  if(btnConfirm) {
  btnConfirm.disabled = "true";
  }
} else {
  displayItems();
}
}

// DELIVERY BOOKING
var btnBook = document.getElementsByClassName("btn-book");
var change = document.getElementById("btn-change-book");
var checkout = document.getElementById("btn-checkout");

var booked = false;

if(change) {
  change.addEventListener('click', function () {
    sessionStorage.removeItem("booking");  
    change.style.display = "none";
   checkout.style.display = "none";  
   for (var i = 0; i < btnBook.length; i++) {
    btnBook[i].disabled = false;
   }    
          });

  if (booked === true) {
    change.style.display = "block";
    checkout.style.display = "block";
  } 
  
  if(booked === false) {
    change.style.display = "none";
   checkout.style.display = "none";
  }
}

// checkout button (payment button used on delivery page)
if (checkout) {
  checkout.onclick = function () {
    window.location = checkout.dataset.url;
  };
}

// check if a delivery has been booked (if it is in session storage)
function checkDelivery() {
  if (sessionStorage.getItem("booking") === null) {
    btnBook.disabled = false;
    booked = false;
    editButtons(booked);
  } else {
    for (var i = 0; i < btnBook.length; i++) {
      btnBook[i].disabled = true;
      booked = true;
      editButtons(booked);
    }
  }
}

// if a delivery has been booked display edit booking button and payment button
function editButtons(booked) {
 if(booked === true) {
    //if edit booking button is clicked activate book buttons and remove booking from session storage
    change.addEventListener('click', function () {
      sessionStorage.removeItem("booking");        
            });
  }
  } 



// click book button to choose a delivery time (used on delivery page)
for (var i = 0; i < btnBook.length; i++) {
  btnBook[i].onclick = function (e) {
    // get time and cost of clicked button  row
    var chosenTime = e.target.parentElement.parentElement.children[0].innerText;
    var delCost = e.target.parentElement.parentElement.children[1].innerText
    alert(`you have chosen time: ${chosenTime}. The delivery will cost ${delCost}`);
    // put booking time in local storage
    sessionStorage.setItem("booking", JSON.stringify([chosenTime, delCost]));
    //disable all book buttons
    for (var j = 0; j < btnBook.length; j++) {
      btnBook[j].disabled = true;
      booked = true;
    }
    // show change booking button and go to payment page button
    if (booked === true) {
      change.style.display = "block";
      checkout.style.display = "block";
    }
  }

}

// book delivery button (used on payment page)
var buttonDelivery = document.getElementById("btn-delivery");
var btnSlot = document.getElementById("btnSlot");

// if a delivery slot has been booked do not show book button (change text to edit booking)
if (buttonDelivery) {
  if (sessionStorage.getItem("booking") === null) {
    buttonDelivery.disabled = false;
  } else {
    buttonDelivery.className = "hollow-button";
    buttonDelivery.innerText = "Change booking";
    // btnSlot.innerHTML = "Change booking"; //this affected the confirm order button ??
//  buttonDelivery.disabled = true; 

   
     // btnConfirm.disabled = false; 
    
     
  }
}


// Go to deliery page on button click
if (buttonDelivery) {
  buttonDelivery.addEventListener("click", function (e) {
    window.location = buttonDelivery.dataset.url;
  });
}

// back button which uses browser history 
var btnBack = document.getElementById("btnBack");

if (btnBack) {
  btnBack.onclick = function () {
    window.history.back();
  };
}

// FORM EVENTS
// character count for delivery instructions textarea
var charcount = document.getElementById("charcount");
var counter = document.getElementById("count");

if (charcount) {
  charcount.addEventListener("keyup", e => {
    let count = charcount.value.length;
    counter.value = count;
  });
}

// activate confirm order button when form completed
var form = document.getElementById("form-customer");

var firstName = '';
var lastName = '';
var address = '';
var town = '';

// ORDER PAYMENT
let allAreFilled = false;
var frmValues = [];

// enable confirm order button only when required fields are complete

if (form) {

  form.addEventListener("change", e => {
    // for each required field get value and put unique value in array
    form.querySelectorAll("[required]").forEach(function (i) {
      
      if (i.value !== '') {

        if (frmValues.indexOf(i.id + ':' + i.value) === -1) { //if the id and value are unique add to array
          frmValues.push(i.id + ':' + i.value);
        }

        if (frmValues.length == 4) {
          btnConfirm.disabled = false;
        }

        if (frmValues.length == 4) { // if the 4 required fields are not empty enable button
          if (buttonDelivery.innerText == "Book a delivery") {
            alert("please book a slot");
          } else  {
        
           allAreFilled = true;
           // confirmOrder.disabled = false;
          //  btnConfirm.disabled = false;
         
          // saves form inputs from array index into variables

          firstName = frmValues[0];
          lastName = frmValues[1];
          address = frmValues[2];
          town = frmValues[3];
          submitOrder(); // pass values to submit order function
        }
      }
    }
    });

  });
}


// submit delivery form inputs to session storage
var shipping = [];

function submitOrder() {
  var shippingObj = {
    Name: firstName,
    Surname: lastName,
    Address: address,
    Town: town
  }

  if (btnConfirm) {
    btnConfirm.addEventListener("click", function (e) {
      shipping.push(shippingObj);
      sessionStorage.setItem("shippingaddress", JSON.stringify(shipping));
      window.location = btnConfirm.dataset.url;
    });
  }
}

// ORDER CONFIRMATION display order confirmation details (function run from body of confirmation page)
var alertBookMsg = document.getElementById("alert-book-msg");
var alertAddress = document.getElementById("alert-book-address");
// var delcheck = [];

function orderComplete() {
  
  if (sessionStorage.getItem("booking") === null) {
    alertBookMsg.innerHTML = '<p>please <a href="delivery.html">book a delivery slot</a></p>';
  } else {
    displayBooking();
    }

    if(orderAddress = sessionStorage.getItem("shippingaddress") === null) {
      alertAddress.innerHTML = '<p>please enter your<a href="payment.html">delivery address</a></p>';
    } else {
      displayAddress();
    }
   
  checkOrder(); // see line 27
  displayItems(); // see wholecart.js file

 /* if(!alertAddress && alertBookMsg){
 orderDone.style.display= "block";
  }*/
// console.log(delcheck);
}

function displayBooking() {
  var bookingArray = document.getElementById("bookingarray");

  // get booking details from local storage
  bookingArray.innerHTML = JSON.parse(sessionStorage.getItem("booking"));

  // create and display a confirm order button
  let btnConfirmOrder = document.createElement("button");
  btnConfirmOrder.className = "button";
  btnConfirmOrder.innerHTML = "Confirm order";
  bookingArray.appendChild(btnConfirmOrder);

  // when confirm order clicked clear the session
btnConfirmOrder.addEventListener("click", e => {
  sessionStorage.clear();
  window.location = "store.html";
});

 // delcheck.push("a");
}

// displays used on confirmation page
function displayAddress() {
  var addArr =  document.getElementById("addressarray");
   if(addArr) {
       addArr.innerHTML = sessionStorage.getItem("address");
   }
 //  delcheck.push("b");
}

// user clicks to confirm order. session is cleared
var orderDone = document.getElementById("ordered");

/*if(orderDone){
  orderDone.style.display = "none";

}*/
