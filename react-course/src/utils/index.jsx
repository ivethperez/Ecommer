 export const totalPrice=(products)=>{
    return products.reduce((acc,product)=> acc +product.price,0)
 }

 export const dateTime = () => {
   var today = newDate();
   vardate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
   var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
   var dateTime = date+' '+time;
       
   return dateTime;
}