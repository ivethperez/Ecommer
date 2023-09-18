import React from 'react'
import { useShopiContext } from '../../Context'
import { TrashIcon, MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/solid'
import {dateTime} from '../../utils'

const OrdersCard = props => {
    const { totalPrice, totalProducts } = props
    
    return (
        <div className="flex justify-between items-center mb-2 border-black">
            
            <p className='text-lg items-center gap-2'>
                <span>{dateTime}</span>
                <span>totalProducts</span>
                <span>totalPrice</span>
                </p>
           
        </div>
    )
}
export default OrdersCard