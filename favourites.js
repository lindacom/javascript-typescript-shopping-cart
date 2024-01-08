// button click go to favourites page
var shopFav = document.getElementById("shopFavourites");

if (shopFav) {
    shopFav.onclick = () => {
        window.location = "myfavourites.html";
    }
}

// display favourites from local storage (local storage used as it is always available)
function displayFavourites() {
    var myFav = localStorage.getItem("favouriteStore");

    if(myFav === null) {
        document.getElementById("storedfavourites").innerText = "You do not have any favourites";
    } else {
    document.getElementById("storedfavourites").innerHTML += JSON.parse(myFav);
  
    document.getElementById("favColl").innerHTML += '<i class="fas fa-tags" id="tag"></li>' ;
    }
}

//  listen for when the heart icon is clicked and change colour
var favourite = document.getElementsByClassName("heart");
let favourites = [];

var alertMsg = document.getElementById("alertMsg");

// loop through heart icons
for (var j = 0; j < favourite.length; j++) {
    favourite[j].onclick = function () {
        var heart = this.children[0]; // access the tag/property that can change the colour style (i.e. a href)
        var heartTitle = heart.parentElement.nextSibling.innerText; // get the title text of the product

        //toggle the colour (favourite and unfavourite) and display alert
        if (heart.style.color === 'black') {
            heart.style.color = 'green';

            setTimeout(function () { alertMsg.style.display = "block"; }, 600);
            setTimeout(function () { alertMsg.style.display = "none"; }, 3000);

            // add array of favourites to session storage
            favourites.push(heartTitle); // and title to array
            localStorage.setItem("favouriteStore", JSON.stringify(favourites));
        } else {
            heart.style.color = 'black';

            var splicedElement; // set variable

            for (var i = 0; i < favourites.length; i++) { //loop through favourites array
                if (favourites[i] === heartTitle) { // check if unfavourited title is in the favourites array
                    splicedElement = favourites.splice(i, 1); // remove from array and store in a variable

                    alertMsg.innerHTML = `removed ${splicedElement} from favourites`;
                    setTimeout(function () { alertMsg.style.display = "block"; }, 600);
                    setTimeout(function () { alertMsg.style.display = "none"; }, 3000);

                    var getFav = JSON.parse(localStorage.getItem("favouriteStore")); // get favourites from session storage
                    for (var j = 0; j < getFav.length - 1; j++) { //loop through favourites array
                        if (getFav[j] === heartTitle) { // check if unfavourited title is in the favourites array
                            var chopped = getFav.splice(j, 1); // remove unfavourited title from array 
                           // console.log(getFav); // returns the new array
                            // console.log(chopped); // returns the item that was removed
                            localStorage.setItem("favouriteStore", JSON.stringify(getFav)); // update the favourites in storage
                        }
                    }
                }
            }
        }

    }
} // END


// check if favourited item exists in products
// put product details in array (to be used by another piece of code)
var array1 = JSON.parse(localStorage.getItem("favouriteStore")); // array of favourites
var array2 = products.product; // products array of objects
var savedFav = [];

if (array1) {
    // Loop for array1
    for (var i = 0; i < array1.length; i++) {
        // Loop for array2
        for (var j = 0; j < array2.length; j++) {

            // Compare the element of each and every element from both of the arrays
            if (array1[i] === array2[j].name) {

                // creates an array of objects
                savedFav.push(array2[j]);
                //  savedFav.push(array2[j].name + array2[j].price + array2[j].likes);
            }
        }
    }
}

// formatting the favourite products array of objects (above) as favourite shop items html
var favListDiv = document.getElementById("favouritesList");

if (favListDiv) {
    // loop through favourites array of products
    for (var i = 0; i < savedFav.length; i++) {

        var { name, image, price, likes, category } = savedFav[i]; // sets all variables at once   

        var tr_str =
            '<div class="shop-item" style="position:relative">' +
            '<span class="heart" style="position:absolute; top: 8px; right: 5px;"><a href="javascript:void(0);" style="cursor:default;color:black;";><i class="far fa-heart fa-2x"></i></a></span>' +
            '<span class="shop-item-title">' + name + '</span>' +
            '<img class="shop-item-image" src=" ' + image + ' " width="250px">' +

            '<div class="shop-item-details">' +
            '<span class="shop-item-category" ">Category:' + category + '</span>' +

            '<ul>' +
            '<li style="text-decoration:none;"><span class="shop-item-price" style="font-size:20px;font-weight:400">Price:' + currencyPrice + '</span></li>' +
            '<li><span class="" id="likes">Likes:' + likes + '</span></li>' + stars + '<br /><br /><br /><br />' +
            '</ul>' +
            '<div id="incrementor" style="position:absolute; bottom: 60px; left: 55px">' +
            '<span class="minus"><a href="javascript:void(0);" style="cursor:default;"><i class="fa fa-minus"></i></a></span>' +
            '<span><input type="text" class="prodQuantity" id="prodQuantity" name="prodQuantity" value="' + prodQuantity + '" placeholder="1" style="width:50px;margin:20px" /></span>' +
            '<span class="plus"><a href="javascript:void(0);" style="cursor:default";><i class="fa fa-plus"></i></a></span>' +
            '</div>' +

            '<br /><br /><br /><br />' +
            '<button id="' + name + '" data-price="' + currencyPrice + '" data-quantity="1" class="button shop-item-button" type="button" style="position:absolute; bottom: 8px; right: 5px;"><i class="fas fa-shopping-cart"></i>ADD TO CART</button>' +
            '</div>'
            ;

        favListDiv.innerHTML += tr_str;
    }
}// END
