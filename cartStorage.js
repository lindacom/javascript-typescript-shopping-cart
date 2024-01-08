// get add to cart elements

var cartItems = document.getElementById("cart-items");
var cartTotal = document.getElementById("cart-total-price");
var btnClear = document.getElementById("btn-clear-cart");

var wholeCart = document.getElementById("whole-cart");
var cartTotalElement = document.getElementById("cart-total");
var payment = document.getElementById("payment");

var total = 0;

// hide cart (when empty)
if (wholeCart) {
  wholeCart.style.display = "none";
}

if (cartTotalElement) {
  cartTotalElement.style.display = "none";
}

if (payment) {
  payment.style.display = "none";
}

// close cart when clicked close(hide) the cart
var closeCart = document.getElementById('close-cart');

if (closeCart) {
  closeCart.addEventListener("click", (e) => {
    wholeCart.style.display = 'none';
  });
}

/*
// toggle whole cart and sidecart
if(closeCart){
closeCart.addEventListener("click", (e) => {

  if (wholeCart.className == 'sidecart') {
    wholeCart.className = wholeCart
  } else {
    wholeCart.style.display = 'none';
  }
});
}*/

// clear cart - clears product items from local storage when button clicked
if (btnClear) {
  btnClear.onclick = function clearItems() {
      localStorage.removeItem("allItems");
   location.reload(); //refresh the page
  //  updateBadge();
  }
}

// remove selected item from local storage & cart
// still testing this unable to get click event???
var btnRemove = document.getElementsByClassName("btn-remove");
var table = document.getElementById("mytable");

function deleteItem(clicked) {
  alert(clicked);
  /*var hoo = clicked.children; // html collection of a tag
  
  for(var i=0; i< hoo.length; i++) {
    var haa = hoo[i].id;
  alert(haa); // id of the a tag
  }*/

}

/*for (var i = 0; i < btnRemove.length; i++) {
  //btnRemove[i].addEventListener("click", function (e) {
  btnRemove[i].onclick = function () {
    alert("clicked");
     var remove = this.id;
      alert(remove);
      location.reload(); //refresh the page
      updateBadge()
  }
  // });
} // END*/

// SIDECART cart icon in menu bar - click to display sidecart.

var badge = document.getElementById('cart');
var aside = document.getElementById('cartcontent');

// get order from session storage
var badgediv = JSON.parse(sessionStorage.getItem("allItems"));



if (badge) {
if(badgediv) {
  for (var i = 0; i < badgediv.length; i++) {
    var ttitle = badgediv[i].name;
    var pprice = badgediv[i].price;
    var qquantity = badgediv[i].quantity;
    var ssummed = badgediv[i].summed;

    var badgediv2 = '<ol><li>' + ttitle + pprice + qquantity + ssummed + '</li></ol>';

    aside.innerHTML += badgediv2;
  }

  badge.addEventListener("click", (e) => { // when cart menu icon is clicked
    toggleCart();
  });
}
}

// toggle sidecart display
function toggleCart() {
  aside.toggleAttribute('hidden');

  if(aside.hidden == true) {
aside.style.display = "none";
} else {
  aside.style.display = "block"; // show sidecart
}

}

// changed value input
var myInput = document.getElementsByClassName("inptQuantity");

// loop through input fields and set value, 
for (var i = 0; i < myInput.length; i++) {
  var input = myInput[i];
  input.addEventListener("change", quantityChanged); //when input changes call function
}

// listen for quantity change
function quantityChanged(event) {
  var changedInput = event.target;
  if (isNAN(changedInput.value) || changedInput.value <= 0) {
    changedInput.value = 1;
    var quantity = changedInput;
  }
  updateCartTotal(quantity)
}
