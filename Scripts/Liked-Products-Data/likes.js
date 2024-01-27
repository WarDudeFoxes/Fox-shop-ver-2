import { loginData } from "../Login.data/login.js";
import { userDetails } from "../Sign-up-Data/user-details.js";

let infoMatch;
userDetails.forEach(info => {
  if ((info.email  === loginData ) || (info.phoneNumber === loginData )) {
    infoMatch = info
  }; 
});

let savedLogItem = loginData ? infoMatch.email
: '';

export let savedItems = JSON.parse(localStorage.getItem(savedLogItem)) || [];

export function addItemToLists(productId) {

  const wishIcon = document.querySelector(`.wish-item-${productId}`);

  if (loginData) {
    let matchingitem;
    savedItems.forEach(product => {
      if (product.productId === productId) {
        matchingitem = product;
      };
    });
  
    if (matchingitem) {
      matchingitem.quantity --;
      unsaveItem(productId);
      wishIcon.classList.replace('fa-solid', 'fa-regular');
    } else {
      savedItems.push({
        productId,
        quantity: 1
      });
    };
    
    console.log(savedItems);
    saveWishToStorage();
  }
};

export function unsaveItem(productId) {
  let newWishlist = [];
  savedItems.forEach(likeItem => {
    if (productId !== likeItem.productId) {
      newWishlist.push(likeItem);
    };
  });
  savedItems = newWishlist;
  saveWishToStorage();
};


export function saveWishToStorage() {
  localStorage.setItem(savedLogItem, JSON.stringify(savedItems));
};