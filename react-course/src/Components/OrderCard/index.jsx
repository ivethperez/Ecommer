import React from 'react'
import { TrashIcon } from '@heroicons/react/24/solid'

const OrderCard = props => {
    const { title, imageUrl, price,quantity } = props
    return (
        <div className="flex justify-between items-center mb-2">
            <div className='flex items-center gap-2'>           
                <figure className='w-20 h-20'>
                <span className='text-sm w-4'>{quantity}</span>
                <img className='w-full h-full rounded-lg object-cover' src={imageUrl} alt={title} />
                </figure>
                <p className='text-sm font-light'>{title}</p>
            </div>
            <div className='flex items-center gap-2'>
                <p className='text-lg items-center gap-2'>${price * quantity}</p>
                <button className='text-lg font-medium' >
                    <TrashIcon className='h-6 w-6 text-black'></TrashIcon>
                </button>
            </div>
        </div>
    )
}
export default OrderCard