export let carts = JSON.parse(localStorage.getItem('fox-shopCart')) || [{
  quantity: 1,
  productId: 'rbdosdbhs'
}];


export function addToCart(productId) {

  let matchingproduct;
  carts.forEach(cartItem => {
    if (cartItem.productId === productId) {
      matchingproduct = cartItem
    };
  });
    
  if (matchingproduct) {
    matchingproduct.quantity ++
  } else {
    carts.push({
      productId,
      quantity: 1
    });
  };
  saveCartToStorage();
};

export function removeFromCart(productId) {
  let newCart = [];
  carts.forEach(cartItem => {
    if (productId !== cartItem.productId) {
      newCart.push(cartItem);
    };
  });
  carts = newCart;
  saveCartToStorage();
};

export function saveCartToStorage() {
  localStorage.setItem('fox-shopCart', JSON.stringify(carts))
};