import { appliances } from "./appliances.js";
import { babyProduct } from "./baby-product.js";
import { computingProduct } from "./computing.js";
import { electronicProduct } from "./electronics.js";
import { fashionsProduct } from "./fashions.js";
import { gaming } from "./gaming.js";
import { home_officeProduct } from "./home&office.js";
import { phoneProduct } from "./phone&tablets.js";
import { productHTMLFun, popCartOptions, updateWishListDisplay } from "../index.js";

export let allProduct = [...appliances,...babyProduct,...computingProduct,...electronicProduct,...fashionsProduct,...gaming,...home_officeProduct,...phoneProduct];

export function categoriesFun() {
    
  const applianceLink = document.querySelectorAll('.appliances-link');
  const babyProductEl = document.querySelectorAll('.baby-products-link');
  const computingEl = document.querySelectorAll('.computing-link');
  const electronicsEl = document.querySelectorAll('.electronics-link');
  const fashionsEl = document.querySelectorAll('.fashions-link');
  const gamingEl = document.querySelectorAll('.gaming-link');
  const homeEl = document.querySelectorAll('.home-link');
  const phoneEl = document.querySelectorAll('.phones-link');


  applianceLink.forEach(elem => {
    elem.addEventListener('click', () => {
      allProduct = appliances;
      productHTMLFun();
      popCartOptions();
      updateWishListDisplay();
    });
  });

  babyProductEl.forEach(elem => {
    elem.addEventListener('click', () => {
      allProduct = babyProduct;
      productHTMLFun();
      popCartOptions();
      updateWishListDisplay();
    });
  });

  computingEl.forEach(elem => {
    elem.addEventListener('click', () => {
      allProduct = computingProduct;
      productHTMLFun();
      popCartOptions();
      updateWishListDisplay();
    });
  });

  electronicsEl.forEach(elem => {
    elem.addEventListener('click', () => {
      allProduct = electronicProduct;
      productHTMLFun();
      popCartOptions();
      updateWishListDisplay();
    });
  });

  fashionsEl.forEach(elem => {
    elem.addEventListener('click', () => {
      allProduct = fashionsProduct;
      productHTMLFun();
      popCartOptions();
      updateWishListDisplay();
    });
  });

  gamingEl.forEach(elem => {
    elem.addEventListener('click', () => {
      allProduct = gaming;
      productHTMLFun();
      popCartOptions();
      updateWishListDisplay();
    });
  });

  homeEl.forEach(elem => {
    elem.addEventListener('click', () => {
      allProduct = home_officeProduct;
      productHTMLFun();
      popCartOptions();
      updateWishListDisplay();
    });
  });

  phoneEl.forEach(elem => {
    elem.addEventListener('click', () => {
      allProduct = phoneProduct;
      productHTMLFun();
      popCartOptions();
      updateWishListDisplay();
    });
  });



  document.querySelector('.search-icon-pop-up').addEventListener('click', () => {
    const input = document.querySelector('.main-input');
    searchFun(input);
  });

  document.querySelector('.medium-icon').addEventListener('click', () => {
    const input = document.querySelector('.input-medium');
    searchFun(input);
  });

  document.querySelector('.mini-icon').addEventListener('click', () => {
    const input = document.querySelector('.input-small');
    searchFun(input);
  });
};

function searchFun(input) {
 
  let searchValue = (input.value).toLowerCase();
  
  allProduct = [...appliances,...babyProduct,...computingProduct,...electronicProduct,...fashionsProduct,...gaming,...home_officeProduct,...phoneProduct];

  let productSearch = [];

  allProduct.forEach(product => {
    product.keyWord.forEach(word => {
      if (word.toLowerCase().includes(searchValue)) {
        productSearch.push(product);
      };
    });  
  });

  allProduct = productSearch;

  // if (event.key === 'Enter') {
  //   productHTMLFun();
  // } else {
  //   allProduct = productSearch;
  // };

  productHTMLFun();
  popCartOptions();
  updateWishListDisplay();

};