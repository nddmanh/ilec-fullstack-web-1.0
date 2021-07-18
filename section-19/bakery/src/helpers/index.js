export const checkProductExists = (cartProducts, product) => {
  return cartProducts.find(cartProduct => cartProduct._id === product._id);
}