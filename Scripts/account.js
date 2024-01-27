import { carts } from "./Carts-Data/carts.js";
import { updataProfile } from "./Controllers/general.js";
import { userDetails } from "./Sign-up-Data/user-details.js";
import { products } from "./Products-Data/products.js";
import { generalCon } from "./Controllers/general.js";

generalCon();
export let loginData = JSON.parse(localStorage.getItem('buyer-login-info')) || ''

export function saveLoginData() {
  localStorage.setItem('buyer-login-info', JSON.stringify(loginData))
}


updataProfile();
calculateCartQuantity();
function calculateCartQuantity() {
  
  let cartquantity = 0;
  carts.forEach(cartItem => {
    cartquantity += cartItem.quantity;
  });

  document.querySelectorAll('.cart-quantity').forEach(elem => {
    elem.innerHTML = cartquantity;
  });
};  

document.querySelector('.mini-top-menu').addEventListener('click', () => {
  document.querySelector('.pop-links-container').classList.toggle('hide');
});

window.addEventListener('scroll', () => {
  document.querySelector('.pop-links-container').classList.add('hide');
})

document.querySelectorAll('.pop-links-container').forEach(element => {
  element.addEventListener('click', () => {
    document.querySelector('.pop-links-container').classList.add('hide');
  });
});

document.querySelectorAll('.logout').forEach(link => {
  link.addEventListener('click', () => {
    loginData = null;
    location.replace('index.html')
    saveLoginData();
  });
});

if (loginData) {

  let infoMatch;
  userDetails.forEach(info => {
    if ((info.email  === loginData ) || (info.phoneNumber === loginData )) {
      infoMatch = info
    }; 
  });
  
  document.querySelector('.account-name').innerHTML = `${infoMatch.firstName} ${infoMatch.lastName}`
  document.querySelector('.account-email').innerHTML = `${infoMatch.email}`
} else {
  location.replace('entry-point.html')
}



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

if (!loginData) {
  location.replace('entry-point.html');
};