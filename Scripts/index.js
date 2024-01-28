import { generalCon } from "./Controllers/general.js";
import { allProduct } from "./Products-Data/all-product.js";
import { categoriesFun } from "./Products-Data/all-product.js";
import { carts, addToCart, saveCartToStorage , removeFromCart} from "./Carts-Data/carts.js";
import { savedItems, addItemToLists  } from "./Liked-Products-Data/likes.js";
import { updataProfile } from "./Controllers/general.js";
import { loginData } from "./Login.data/login.js";

console.log(loginData);
generalCon();
updataProfile();
const miniBars = document.querySelector('.mini-top-menu')

miniBars.addEventListener('click', () => {
  document.querySelector('.pop-products-categories').classList.toggle('hide')
})

const linksRow = document.querySelectorAll('.products-categories-row ')

linksRow.forEach(element => {
  element.addEventListener('click', () => {
    document.querySelector('.pop-products-categories').classList.add('hide');
  });
});

// document.querySelector('.nav-right-search-icon').addEventListener('click', () => {
//   document.querySelector('.nav').classList.add('hide')
//   document.querySelector('.pop-up-search').style.display = 'flex'
//   document.querySelector('.home-search-input').focus()
// })



window.addEventListener('scroll', () => {
  document.querySelector('.pop-products-categories').classList.add('hide');
})


categoriesFun();
productHTMLFun();
updateWishListDisplay() 
popCartOptions();
calculateCartQuantity();
export function productHTMLFun() {

  let productHTML = '';
  allProduct.forEach(({id, name, priceCent, rating, image}) => {
    productHTML += 
    `
      <div class="product-container product-container-${id}" data-product-id="${id}">
         
        <i class="fa-regular fa-heart wish-item wish-item-${id}" data-product-id="${id}"></i>
        <img src="${image}" alt="">
        <div class="product-details">
          <div class="product-name">
            ${name}
          </div>
          <div class="product-price">
            $${(priceCent/100).toFixed(2)}
          </div>
          <div class="rating">
            <div class="rating-icon">
             ${rating.icon}
            </div>
            <div class="rate-count">
              (${rating.count})
            </div>
          </div>
        </div>
        <button class="js-add-to-cart js-add-to-cart-${id}" data-product-id="${id}">ADD TO CART</button>

        <div class="order-options order-options-${id} hide">
          <i class="fas fa-minus js-cart-sub" data-product-id="${id}"></i>
          <small class="cart-quantity-${id}"></small>
          <i class="fas fa-plus js-cart-add" data-product-id="${id}"></i>
        </div>
      </div>
    `;
  });

  document.querySelector('.js-product-grid')
    .innerHTML = productHTML;

  document.querySelectorAll('.js-add-to-cart')
    .forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;

        addToCart(productId);
        calculateCartQuantity();
        popCartOptions();
      }); 
    });
  document.querySelectorAll('.js-cart-sub')
    .forEach(button => {
      button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        const productCartQuantity = document.querySelector(`.cart-quantity-${productId}`);
        const productButton = document.querySelector(`.js-add-to-cart-${productId}`);
        const optionCont = document.querySelector(`.order-options-${productId}`);

        let matchingproduct;
        carts.forEach(cartItem => {
          if (cartItem.productId === productId) {
            matchingproduct = cartItem
          };
        });

        if (matchingproduct.quantity === 1) {
          matchingproduct.quantity--
          removeFromCart(productId);
          optionCont.classList.add('hide');
          productButton.classList.remove('hide');
        } else if (matchingproduct.quantity > 1) {
          matchingproduct.quantity --
          saveCartToStorage();
        };

     
        calculateCartQuantity();
        productCartQuantity.innerHTML = matchingproduct.quantity;
      });
    });
  document.querySelectorAll('.js-cart-add')
    .forEach(button => {
      button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        const productCartQuantity = document.querySelector(`.cart-quantity-${productId}`);
      
        let matchingproduct;
        carts.forEach(cartItem => {
          if (cartItem.productId === productId) {
            matchingproduct = cartItem
          };
        });

        if (matchingproduct.quantity) {
          matchingproduct.quantity++
        };

        saveCartToStorage();
        calculateCartQuantity();
        productCartQuantity.innerHTML = matchingproduct.quantity;
      });
    });
  document.querySelectorAll('.wish-item')
    .forEach(link => {
      link.addEventListener('click', () => {
        if (loginData) {
          const productId = link.dataset.productId;
    
          addItemToLists(productId);
          updateWishListDisplay();
        } else {
          location.replace('entry-point.html');
        }
      });
    });
};

function calculateCartQuantity() {
  
  let cartquantity = 0;
  carts.forEach(cartItem => {
    cartquantity += cartItem.quantity;
  });

  document.querySelectorAll('.cart-quantity').forEach(elem => {
    elem.innerHTML = cartquantity;
  });
};  

export function popCartOptions() {
  document.querySelectorAll('.product-container')
  .forEach(cont => {
    const productId = cont.dataset.productId;
    const productButton = document.querySelector(`.js-add-to-cart-${productId}`);
    const optionCont = document.querySelector(`.order-options-${productId}`);
    const productCartQuantity = document.querySelector(`.cart-quantity-${productId}`);

    carts.forEach(cartItem => {
      if (cartItem.productId === productId) {
        optionCont.classList.remove('hide');
        productButton.classList.add('hide');
        productCartQuantity.innerHTML = cartItem.quantity
      };
    });
  });
};

export function updateWishListDisplay() {

  document.querySelectorAll('.product-container')
  .forEach(cont => {
    const productId = cont.dataset.productId;
    const wishIcon = document.querySelector(`.wish-item-${productId}`);

    if (savedItems) {
      savedItems.forEach(savedItem => {
        if (savedItem.productId === productId) {
          wishIcon.classList.replace('fa-regular', 'fa-solid');
        }
      });
    };
  });  
};











// const cartAddition = document.querySelectorAll('.js-cart-addition');
// cartAddition.forEach(elem => {
//   elem.addEventListener('click', () => {
//     const productId = elem.dataset.productId;
//     const quantityDisplay = document.querySelector(`.cart-quantity-${productId}`);

//     carts.forEach(cartItem => {
//       if (productId === cartItem.productId) {
//         cartItem.quantity++
//         saveCartToStorage();
//         quantityDisplay.innerHTML = cartItem.quantity
//       };
//     });
//   });
// });

// const cartSub = document.querySelectorAll('.js-cart-sub');
// cartSub.forEach(elem => {
//   elem.addEventListener('click', () => {
//     const productId = elem.dataset.productId;
//     const quantityDisplay = document.querySelector(`.cart-quantity-${productId}`);

//     carts.forEach(cartItem => {
//       if (productId === cartItem.productId) {
//         if (cartItem.quantity === 1) {
//           cartItem.quantity
//           elem.style.backgrounColor = 'rgba(255, 150, 2, 0.55)'
//         } else {
//           cartItem.quantity--
//           saveCartToStorage();
//           quantityDisplay.innerHTML = cartItem.quantity
//         };
//       };
//     });
//   });
// });



















// const popSimg = document.querySelector('.pop-categories-slide-cont');

// const body = document.querySelector('body');

// const itemGrid =document.querySelector('.product-grid-container');

// window.addEventListener('scroll', () => {
//   if(window.scrollY > itemGrid.offsetTop - popSimg.offsetHeight - 295) {
//     nav.classList.add('remove');
    
//     // popSimg.classList.add('remove');
//     itemGrid.style.marginTop = '0px';
//     body.style.paddingTop = '0px'
//   } else {
//     nav.classList.remove('remove');
//     itemGrid.style.marginTop = '285px';
//   };
// })

// itemGrid.style.setProperty( '--gridMargin' , nav.offsetHeight + 10 + 'px' );



// const addBtn = document.querySelectorAll('.product-container button');

// addBtn.forEach(element => {
//   element.addEventListener('click', () => {
//     element.classList.add('hide');
//   });
// });