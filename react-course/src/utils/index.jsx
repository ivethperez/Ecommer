export const totalPrice = (products) => {
  // if (isKilo)
      return products.reduce((acc, product) => acc + product.price * product.quantity, 0)
   /* , isMedioKilo, isCuartoKilo, isKilo
   if (isMedioKilo)
      return products.reduce((acc, product) => acc + product.priceMedio * product.quantity, 0)
   if (isCuartoKilo)
      return products.reduce((acc, product) => acc + product.priceCuarto * product.quantity, 0)*/
}
export const totalProducts = (products) => {
   return products.reduce((acc, product) => acc + product.quantity, 0)
}
export const dateTime = () => {
   const date = new Date().toLocaleDateString();
   return date
}
