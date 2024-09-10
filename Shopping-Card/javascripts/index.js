const cartItems = [{
    id: "wtuwtpo",
    productName: "Nike Sneaker",
    Discrpition: "A beautiful pair of nike sneaker",
    price: 100,
    imageUrl: "assets/baskets.png",
    isFavorite: false,
    quantity: 0,
},
{
    id: "qwertyu",
    productName: "Nike Socks",
    Discrpition: "A beautiful pair of nike socks",
    price: 20,
    imageUrl: "assets/socks.png",
    isFavorite: false,
    quantity: 0,
},
{
    id: "asdfgghjk",
    productName: "Nike Bag",
    Discrpition: "A beautiful pair of nike bag",
    price: 50,
    imageUrl: "assets/bag.png",
    isFavorite: false,
    quantity: 0,
},
];

// target product list div
const productListDiv = document.querySelector(".list-products");
const totalpricespan = document.querySelector(".total")
const trashItemBtn = document.getElementsByClassName("fa-trash-alt");
const heartItemBtn = document.getElementsByClassName("fa-heart");

// render cart items to the DOM 
function renderCartItems() {
    productListDiv.innerHTML = "";
    totalpricespan.textcontent = "";
    let productTotalPrice = 0;
    // loop through cat items array
    for (cartItem of cartItems){
        productTotalPrice += cartItem.price * cartItem.quantity;
        totalpricespan.textContent = `$${productTotalPrice}`;

        // create a new card div
        const cartCard = document.createElement("div");
        cartCard.classList.add("card-body");
        cartCard.innerHTML = `<div class="card-body">
            <div class="card" style="width: 18rem">
              <img
                src=${cartItem.imageUrl}
                class="card-img-top"
                alt="baskets"
              />
              <div class="card-body">
                <h5 class="card-title">${cartItem.productName}</h5>
                <p class="card-text">${cartItem.Discrpition}</p>
                <h4 class="unit-price">$${cartItem.price}</h4>
                <div>
                  <i class="fas fa-plus-circle" value=${cartItem.id}></i>
                  <span class="quantity">${cartItem.quantity}</span>
                  <i class="fas fa-minus-circle" value=${cartItem.id}></i>
                </div>
                <div>
                  <i class="fas fa-trash-alt" value=${cartItem.id}></i>
                  <i class="fas fa-heart ${cartItem.isFavourite ? 'heart' : ''}" value=${cartItem.id} 
                     style="color: ${cartItem.isFavourite ? 'red' : 'black'};"></i                  
                </div>
              </div>
            </div>
          </div>`;

    productListDiv.appendChild(cartCard);   
   }
 //    selesct all product price / item increase btn
   const increaseItemBtn = document.getElementsByClassName("fa-plus-circle");
 //    selsct all product price / item decrease btn
    const decreaseItemBtn = document.getElementsByClassName("fa-minus-circle");

 //    loop over the array of increaseItemBtn
 for (increaseBtn of increaseItemBtn) {
    increaseBtn.addEventListener("click", increaseCartItemPrice);
  }

 // loop over the array of decreaseItemBtn
 for (decreaseBtn of decreaseItemBtn) {
    decreaseBtn.addEventListener("click", decreaseCartItemPrice);    
 }

    //Loop Over the Array of Increased item button

    for (let trashItem of trashItemBtn) {
        trashItem.addEventListener("click", clearCartItemPrice);
    }

    for (let heartItem of heartItemBtn) {
        heartItem.addEventListener("click", toggleFavourite);
    }
}

// call the renderCartItems function on the window load
window.addEventListener("load", renderCartItems);

// change cart items quantity and price 
function increaseCartItemPrice(event) {
    // get id of the product
   const productId = event.target.getAttribute("value")

    // find the index of the the product on the cart items array
    const foundProductIndex = cartItems.findIndex(
     item => item.id === productId   
    );

    // get the actual product on the cart items array by the products index
    const productToUdpate = cartItems[foundProductIndex];

    // update quantity of product on products object
    const updatedProduct ={
        ...productToUdpate,quantity: (productToUdpate.quantity +=1),
    };

    // update cart items array with updated product
    cartItems[foundProductIndex] = updatedProduct;

    return renderCartItems();
}

// change cart items quantity and price 
function decreaseCartItemPrice(event) {
    // get id of the product
    const productId = event.target.getAttribute("value")

    // find the index of the the product on the cart items array
    const foundProductIndex = cartItems.findIndex(
        item => item.id === productId
    );

    // get the actual product on the cart items array by the products index
    const productToUdpate = cartItems[foundProductIndex];

    // delete quantity of product on products object
    const updatedProduct = {
        ...productToUdpate, quantity: productToUdpate.quantity > 0 ? productToUdpate.quantity -1 : 0,
    };

    // update cart items array with updated product
    cartItems[foundProductIndex] = updatedProduct;

    return renderCartItems();
}


function clearCartItemPrice(event) {
    const productId = event.target.getAttribute("value");

    // Find the index of the product in the cartItems array
    const foundProductIndex = cartItems.findIndex(item => item.id === productId);

    // Set the quantity of the found product to zero
    if (foundProductIndex < 0) {
        return
    }
cartItems.splice(foundProductIndex, 1)    

    // Re-render the cart items to update the UI
    return renderCartItems();
}



function toggleFavourite(event) {
    const productId = event.target.getAttribute("value");

    // Find the index of the clicked product in the cartItems array
    const foundProductIndex = cartItems.findIndex(item => item.id === productId);

    // Toggle the ⁠ isFavourite ⁠ status of the found product
    if (foundProductIndex !== -1) {
        cartItems[foundProductIndex].isFavourite = !cartItems[foundProductIndex].isFavourite;
    }

    return renderCartItems();
}