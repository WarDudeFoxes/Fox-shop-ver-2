import { generalCon } from "./Controllers/general.js";
import { carts, saveCartToStorage, removeFromCart } from "./Carts-Data/carts.js";
import { products } from "./Products-Data/products.js";
import { savedItems } from "./Liked-Products-Data/likes.js";
import { updataProfile } from "./Controllers/general.js";
import { loginData } from "./Login.data/login.js";

generalCon();
calculateCartQuantity();
cartHTMLFun();
updateSubtractBackgroundColor();
updataProfile();

export function cartHTMLFun() {

  let cartsHTML = '';
  carts.forEach(cartItem => {
   
    let productMatch;
    const productId = cartItem.productId;
    
    products.forEach(product => {
      if (product.id === productId) {
        productMatch = product
      }
    }) 

    cartsHTML += 
    `
      <div class="cart-product-container cart-product-container-${productMatch.id}" data-product-id="${productMatch.id}">
        <div class="cart-product-details">
          <img src="${productMatch.image}" alt="">
          <div class="cart-item-details">
            <div class="cart-item-name">
              <span>${productMatch.name}</span>
              <small>In stock</small>
              <div class="rating">
                <div class="rating-icon">
                  ${productMatch.rating.icon}
                </div>
                <div class="rate-count">
                  (${productMatch.rating.count})
                </div>
              </div>
            </div>
            <div class="cart-item-price">
            ${((productMatch.priceCent/100) * cartItem.quantity).toFixed(2)}
            </div>
          </div>
        </div>
        <div class="cart-product-options-container">
          <div class="remove-item js-remove-item-${productMatch.id} js-remove-item" data-product-id="${productMatch.id}">
            <i class="fa-regular fa-trash-can"></i>
            <span>REMOVE</span>
          </div>
          <div class="cart-order-options">
            <i class="fas fa-minus js-cart-sub js-cart-sub-${productMatch.id}" data-product-id="${productMatch.id}"></i>
            <small class="cart-quantity-${productMatch.id}">${cartItem.quantity}</small>
            <i class="fas fa-plus js-cart-addition" data-product-id="${productMatch.id}"></i>
          </div>
        </div>
      </div>
    `;
  });
  document.querySelector('.cart-product-flex-container')
    .innerHTML = cartsHTML;
};

document.querySelectorAll(".js-remove-item")
  .forEach(elem => {
    elem.addEventListener('click', () => {
      const productId = elem.dataset.productId;
      const productCont = document.querySelector(`.cart-product-container-${productId}`);

      productCont.remove();
      removeFromCart(productId);
      calculateCartQuantity()
    });
  });

document.querySelectorAll('.js-cart-addition')
  .forEach(elem => {
    elem.addEventListener('click', () => {
      const productId = elem.dataset.productId;
      const quantityDisplay = document.querySelector(`.cart-quantity-${productId}`);

      carts.forEach(cartItem => {
        if (productId === cartItem.productId) {
          cartItem.quantity++
          saveCartToStorage();
          quantityDisplay.innerHTML = cartItem.quantity
          calculateCartQuantity();
        };
      });
      updateSubtractBackgroundColor();
    });
  });

document.querySelectorAll('.js-cart-sub')
  .forEach(elem => {
    elem.addEventListener('click', () => {
      const productId = elem.dataset.productId;
      const quantityDisplay = document.querySelector(`.cart-quantity-${productId}`);

      carts.forEach(cartItem => {
        if (productId === cartItem.productId) {
          if (cartItem.quantity === 1) {
            cartItem.quantity
            elem.style.backgrounColor = 'rgba(255, 150, 2, 0.55)'
          } else {
            cartItem.quantity--
            saveCartToStorage();
            quantityDisplay.innerHTML = cartItem.quantity
          };
          calculateCartQuantity();
        };
      });
      updateSubtractBackgroundColor() 
    });
  });

function calculateCartQuantity() {
  let cartquantity = 0;
  carts.forEach(cartItem => {
    cartquantity += cartItem.quantity;
  });

  if (cartquantity < 2) {
    document.querySelector('.js-cart-quantity').innerHTML = `Cart( ${cartquantity} )`
  } else {
    document.querySelector('.js-cart-quantity').innerHTML = `Carts( ${cartquantity} )`
  };

  document.querySelector('.cart-quantity')
    .innerHTML = cartquantity;

  if (cartquantity === 0) {
    document.querySelector('.checkout-link-container').classList.add('hide');
    document.querySelector('.cart-container').classList.add('hide');
    document.querySelector('.empty-cart').classList.remove('hide');
    document.querySelector('.customer-views-cont').style.marginBottom = '0px'
  } else {
    document.querySelector('.checkout-link-container').classList.remove('hide');
    document.querySelector('.cart-container').classList.remove('hide');
    document.querySelector('.empty-cart').classList.add('hide');
  }
};  

function updateSubtractBackgroundColor() {
  
  document.querySelectorAll(`.cart-product-container`)
    .forEach(elem => {
      const productId = elem.dataset.productId
      const subtactIcon = document.querySelector(`.js-cart-sub-${productId}`)
  
      let matchingproduct;
      carts.forEach(cartItem => {
        if (cartItem.productId === productId) {
          matchingproduct = cartItem
        };
      });
  
      if (matchingproduct.quantity > 1) {
        subtactIcon.style.backgroundColor = 'orange'
      } else {
        subtactIcon.style.backgroundColor = 'rgba(255, 150, 2, 0.55)'
      }
    });
};

const returnCont = document.querySelector('.return-note-cont');
window.addEventListener('scroll', () => {
  if(window.scrollY > returnCont.offsetTop ) {
    document.querySelector('.checkout-link-container').classList.add('hide');
    document.querySelector('.customer-views-cont').style.marginBottom = '0px';
    document.querySelector('.customer-views-cont').style.marginBottom = '-30px';
  } else {
    document.querySelector('.checkout-link-container').classList.remove('hide');
    document.querySelector('.customer-views-cont').style.marginBottom = '80px';
  };
});

if (savedItems) {
    
  let cartSectionWishHTML = '';
  savedItems.forEach(wishItem => {

    let matchingproduct;
    products.forEach(product => {
      if (wishItem.productId === product.id) {
        matchingproduct = product
      }
    });

    cartSectionWishHTML += 
    `
      <div class="saved-product-container">
        <img src="${matchingproduct.image}" alt="">
        <div class="saved-product-details">
          <div class="save-item-name">
            ${matchingproduct.name}
          </div>
          <div class="save-item-price">
            ${(matchingproduct.priceCent/100).toFixed(2)}
          </div>
        </div>
        <a href="index.html">    
        <button>BUY NOW</button>
        </a>
      </div>
    `
  })
  document.querySelector('.js-cart-saved-items-grid')
    .innerHTML = cartSectionWishHTML;
};
 
if (savedItems.length < 2) {
  document.querySelector('.save-items-length')
  .innerHTML = `Saved item (${savedItems.length})`
} else {
  document.querySelector('.save-items-length')
  .innerHTML = `Saved items (${savedItems.length})`
};

if (loginData) {
  document.querySelector('.more-save-link').setAttribute('href', 'saved-item.html')

} else {
  document.querySelector('.more-save-link').setAttribute('href', '#')
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