 export const totalPrice=(products)=>{
    return products.reduce((acc,product)=> acc +product.price,0)
 }

export const dateTime = () => {
   const date = new Date().toLocaleDateString();
   return date
}