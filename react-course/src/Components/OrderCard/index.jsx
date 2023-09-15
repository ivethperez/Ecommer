import React from 'react'
import { TrashIcon } from '@heroicons/react/24/solid'

const OrderCard = props => {
    const { id,title, imageUrl, price,quantity,handleDelete } = props
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
   
                {
                    handleDelete &&                 
                    <TrashIcon
                    onClick={()=>handleDelete(id)}
                    className="h-4 w-4 text-black cursor-pointer "/>
                }

            </div>

            
        </div>
    )
}
export default OrderCard