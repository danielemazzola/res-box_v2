export const cartQuantity = (cart) => {
  const contQuantity = cart.reduce((acc, item) => acc + item.quantity, 0)
  return contQuantity
}