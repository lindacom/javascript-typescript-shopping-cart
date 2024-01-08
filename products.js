// CREATE AN OBJECT: products object, product array of objects
const products = {
  product: [
    { name: "Mince", image: "/images/mince.jpg", price: 2.74, likes: 3, category: "meat" },
    { name: "Chocolate", image: "/images/chocolate.jpg", price: 2.00, likes: 3, category: "sweets" },
    { name: "Lemon", image: "/images/lemon.jpg", price: 0.30, likes: 4, category: "fruit" },
    { name: "Lemonade", image: "/images/lemonade.jpg", price: 0.90, likes: 2, category: "drinks" },
  ],
}

// append products object to the list div. How to change this to a function ??

//function displayAllProducts() {
for (var i = 0; i < products.product.length; i++) {

  var { name, image, price, likes, category } = products.product[i]; // sets all variables at once

  var productsList = document.getElementById("productsList");

  //use currency formatter
  currencyPrice = formatter.format(price);

  // set the initial value of the quantity input box to one
  var prodQuantity = 1;

  // unique id for each product - product name+stars
  var stars = '<li id="' + name + 'stars"><span><i class="fa fa-star fa-w-18  checked"></i></span><span><i class="fa fa-star fa-w-18  checked" ></i></span><span><i class="fa fa-star fa-w-18  checked" ></i></span><span><i class="fa fa-star fa-w-18  checked" ></i></span><span><i class="fa fa-star fa-w-18  checked" ></i></span></li>';

  // formatting products object as shop items html
  if (productsList) {
    var tr_str =
      '<div class="shop-item">' +
      '<figure>' +
      '<span class="heart"><a href="javascript:void(0);";><i class="far fa-heart fa-2x"></i></a></span>' +
      '<span class="shop-item-title">' + name + '</span>' +
      '<img class="shop-item-image" src=" ' + image + ' " alt="product">' +

      '<div class="shop-item-details">' +
      '<span class="shop-item-category" ">Category:' + category + '</span>' +

      '<ul>' +
      '<li><span class="shop-item-price">Price:' + currencyPrice + '</span></li>' +
      '<li><span class="" id="likes">Likes:' + likes + '</span></li>' + stars + '<br /><br /><br /><br />' +
      '</ul>' +
      '<div id="incrementor">' +
      '<span class="minus"><a href="javascript:void(0);" ><i class="fa fa-minus"></i></a></span>' +
     '<span><input type="text" class="prodQuantity" id="prodQuantity" name="prodQuantity" value="' + prodQuantity + '" placeholder="1"  readonly/></span>' +
         '<span class="plus"><a href="javascript:void(0);"><i class="fa fa-plus"></i></a></span>' +
      '</div>' +

      '<br /><br /><br /><br />' +
      '<button id="' + name + '" data-price="' + currencyPrice + '" data-quantity="1" class="button shop-item-button" type="button" ><i class="fas fa-shopping-cart"></i>ADD TO CART</button>' +
     '</figure>' +
      '</div>'
      ;

    productsList.innerHTML += tr_str;
    //}
  }
} // END

// STARS - loop through products and stars

var liked = '';
// loop over the products
for (var i = 0; i < products.product.length; i++) {
  // get the number of likes for each item (passed to the nested loop)
  liked = products.product[i].likes;

  // get product name
  var named = products.product[i].name;

  // get a unique identifier for each product - product name + stars
  var mystar = document.getElementById(`${named}stars`);

  // loop over the five star icons 
  for (var j = 0; j <= liked - 1; j++) {
    // colour number of likes for this product
    if (mystar) {
      mystar.children[j].style = "color:red";
    }
  }
}


// CHANGE QUANTITY listen for when the input field is changed and disable min/max

var inptQuant = document.getElementsByClassName("prodQuantity");
var btnMinus = document.getElementsByClassName("minus");
var btnPlus = document.getElementsByClassName("plus");


var btnPurchase = document.querySelectorAll(".shop-item-button");

// listen for when the input field is changed manually
/*for (var j = 0; j < inptQuant; j++) {
  inptQuant[j].addEventListener("input", (event) => {
      var myQuant = event.target.value;
      console.log(myQuant);
      inptQuant[j].setAttribute("value", 8);     
  });
}*/

// listen for when the plus button is clicked
for (var j = 0; j < btnPlus.length; j++) {
  btnPlus[j].onclick = function () {
    //  event.preventDefault();
    var more = this.previousSibling.children[0].value; // gets original value of quantity input box 

    var increasedValue = (parseInt(more) + 1); // value plus one

    var inc = this.previousSibling.children[0];
    inc.setAttribute("value", increasedValue);

    if (inc.value >= 5) {
      alert("you cannot add any more");
    } else {
      inc.value = increasedValue;
    }
  }
}

// listen for when minus buttons clicked 
for (var i = 0; i < btnMinus.length; i++) {
  btnMinus[i].onclick = function () {
    //  e.preventDefault();

    var less = this.nextSibling.children[0].value; // gets value of quantity input box
    var reducedValue = (parseInt(less) - 1); // value minus one

    var red = this.nextSibling.children[0];
    red.setAttribute("value", reducedValue);

    if (red.value == 0) {
      alert("you cannot reduce any more");
red.value = 1;
    } else {
      red.value = reducedValue;
    }
  }
}

// ADD TO CART - listen for when add to cart button clicked and get item info from the button

for (var i = 0; i < btnPurchase.length; i++) {
  btnPurchase[i].addEventListener("click", function (e) {
    this.innerHTML = "in cart"; // change text on button
    this.disabled = true;
    this.style.cursor = "not-allowed";

    e.target.parentElement.children[2].style.display = "none"; // remove incrementors when add to cart button clicked

    // get id and price from the button
    var name = this.id;
    var price = this.dataset.price;

    // get quantity from the input box

    // var quantity = this.dataset.quantity;

    // get quantity value attribute (changed by incremetor buttons)
    var quantity = e.target.parentElement.children[2].children[1].children[0].getAttribute("value");
   

            // create cart item
    createItem(name, price, quantity); // calls createItem function.  See separate file cartstorage.js. 


  });
} // END




