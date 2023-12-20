import React from 'react'
import { ChevronRightIcon, ShoppingCartIcon,CalendarIcon } from '@heroicons/react/24/solid'
import {dateTime} from '../../utils'

const OrdersCard = props => {
    const { totalPrice, totalProducts } = props
    window.scrollTo(0, 0);
    return (
        <div className='w-80'>
        <div className="shadow border border-green-200 justify-between items-center mb-2 w-full p-4 rounded-lg decoration-transparent inline-flex text-black">
            
            <div className='flex justify-between w-full'>
                <div className='flex flex-col'>
                <div className='flex items-center justify-between gap-1'>
                    <CalendarIcon className='h-6 w-4'></CalendarIcon>
                <span className='font-light '>{dateTime()}</span>
                </div>
                <div className='flex items-center justify-between gap-1 decoration-transparent'>
                    <ShoppingCartIcon className='h-6 w-4'></ShoppingCartIcon>
                    <span  className='font-light '>{totalProducts} productos</span></div> 
                </div>
              
              <p className='flex items-center  gap-2'>
              <span className='font-medium  text-2xl'>${totalPrice}</span>
                <ChevronRightIcon className='h-6 w-6 cursor-pointer text-black'></ChevronRightIcon>
              </p>
             
                </div>
           
        </div>
        </div>
    )
}
export default OrdersCard