 export const totalPrice=(products)=>{
    return products.reduce((acc,product)=> acc +product.price * product.quantity,0)
 }
 export const totalProducts=(products)=>{
   return products.reduce((acc,product)=> acc + product.quantity,0)
}
export const dateTime = () => {
   const date = new Date().toLocaleDateString();
   return date
}
