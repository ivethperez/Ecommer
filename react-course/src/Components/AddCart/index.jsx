import { useState } from 'react';
import { useShopiContext } from '../../Context'
import { ShoppingBagIcon } from '@heroicons/react/24/solid';
import Button from 'react-bootstrap/Button';
import Ecommer from '../../Pages/Ecommer';
const addCart =({ data }) =>{
    const { cartProduct } = useShopiContext();
return(

<div className='flex justify-between items-center mt-3'>
                <div className="mt-1 text-sm text-slate-500">
                 </div>
                <div className="overflow-hidden rounded-full bg-slate-50">

                { cartProduct.filter((product) => product.id === data.id)
                .length > 0 ? (
                  <Button variant="success" size="lg" onClick={(e) => {
                    addProductsToCart(data, e)
                  }}>
                    <ShoppingBagIcon className='h-6 w-6'></ShoppingBagIcon></Button>

                ):(
                  <Button variant="success" disabled={true} size="lg" onClick={(e) => {
                    addProductsToCart(data, e)
                  }}>
                    <ShoppingBagIcon className='h-6 w-6'></ShoppingBagIcon></Button>
                )}
                  
                </div>
              </div>

)
}

export default addCart