import { generalCon } from "./Controllers/general.js";
import { savedItems, unsaveItem } from "./Liked-Products-Data/likes.js";
import { products } from "./Products-Data/products.js";
import { updataProfile } from "./Controllers/general.js";
import { carts } from "./Carts-Data/carts.js";


generalCon();
updataProfile();
calculateCartQuantity();

let loginData = JSON.parse(localStorage.getItem('buyer-login-info')) || ''

function saveLoginData() {
  localStorage.setItem('buyer-login-info', JSON.stringify(loginData))
};

let saveItemHTML = ''
savedItems.forEach(wishItem => {
  
  let matchingproduct;
  products.forEach(product => {
    if (wishItem.productId === product.id) {
      matchingproduct = product
    }
  });

  saveItemHTML += 
  `
    <div class="saved-items-container saved-items-container-${matchingproduct.id}">
      <div class="saved-items-details">
        <img src="${matchingproduct.image}" alt="">
        <div class="saved-items-product-details">
          <div class="saved-items-product-name">
           ${matchingproduct.name}
          </div>
          <div class="saved-items-rating-icon">
          ${matchingproduct.rating.icon}
          </div>
          <div class="saved-items-product-price">
           ${(matchingproduct.priceCent/100).toFixed(2)}
          </div>
        </div>
      </div>
      <div class="saved-items-product-options">
        <a href="index.html">BUY NOW</a>
        <div class="remove-saved-product js-remove-saved-product" data-product-id="${matchingproduct.id}">
          <i class="fa fa-trash-can"></i>
          <span>REMOVE</span>
        </div>
      </div>
    </div>
  `
});

document.querySelector('.saved-item-product-container')
  .innerHTML = saveItemHTML;

calculateSavedItemQuantity();
function calculateSavedItemQuantity() {
  if (savedItems.length === 0) {
    document.querySelector('.emthy-saved-cart').classList.remove('hide')
  }

  if (savedItems.length < 2) {
    document.querySelector('.save-items-length')
    .innerHTML = `Saved item (${savedItems.length})`
  } else {
    document.querySelector('.save-items-length')
    .innerHTML = `Saved items (${savedItems.length})`
  };
}


document.querySelectorAll('.js-remove-saved-product').forEach(link => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    const productCont = document.querySelector(`.saved-items-container-${productId}`);

    unsaveItem(productId);
    productCont.remove();
    calculateSavedItemQuantity();
  });
});


function calculateCartQuantity() {
  
  let cartquantity = 0;
  carts.forEach(cartItem => {
    cartquantity += cartItem.quantity;
  });

  document.querySelectorAll('.cart-quantity').forEach(elem => {
    elem.innerHTML = cartquantity;
  });
}; 

let cartsCustomerVeiw = '';
products.forEach(product=> {

  cartsCustomerVeiw +=
  `<a href="index.html">
    <div class="customer-views-product-container">
      <img src="${product.image}" alt="">
      <div class="customer-views-product-details">
        <div class="customer-views-product-name">
          ${product.name}
        </div>
        <div class="customer-views-product-price">
          $ ${(product.priceCent/100).toFixed(2)}
        </div>
      </div>
    </div>
  </a>
  `;
});
document.querySelector('.customer-views-product-grid')
  .innerHTML = cartsCustomerVeiw;


document.querySelectorAll('.logout').forEach(link => {
  link.addEventListener('click', () => {
    loginData = null;
    location.replace('index.html')
    saveLoginData();
  });
});

if (!loginData) {
  location.replace('entry-point.html');
};