import React from 'react'
import { ChevronRightIcon, ShoppingCartIcon,CalendarIcon } from '@heroicons/react/24/solid'
import {dateTime} from '../../utils'

const OrdersCard = props => {
    const { totalPrice, totalProducts } = props
    return (
        <div className="shadow border border-green-200 flex justify-between items-center mb-2 w-80 p-4 rounded-lg ">
            
            <div className='flex justify-between w-full'>
                <div className='flex flex-col'>
                <div className='flex items-center justify-between gap-1'>
                    <CalendarIcon className='h-6 w-4'></CalendarIcon>
                <span className='font-light'>{dateTime()}</span>
                </div>
                <div className='flex items-center justify-between gap-2'>
                    <ShoppingCartIcon className='h-6 w-4'></ShoppingCartIcon>
                    <span  className='font-light'>{totalProducts} productos</span></div> 
                </div>
              
              <p className='flex items-center  gap-2'>
              <span className='font-medium  text-2xl'>${totalPrice}</span>
                <ChevronRightIcon className='h-6 w-6 cursor-pointer text-black'></ChevronRightIcon>
              </p>
             
                </div>
           
        </div>
    )
}
export default OrdersCard