import React, { useState } from 'react'
import { useShopiContext } from '../../Context'
import { TrashIcon, MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/solid'

const OrderCard = props => {
    const { id, title, imageUrl, price, quantity, handleDelete, priceKilo,priceMedio,priceCuarto } = props
    const { increentToCheckout, decrementToCheckout } = useShopiContext();
    const increent = () => {
        increentToCheckout(id)
    }
    const decrement = () => {
        decrementToCheckout(id)
    }
    const med =()=>{        
        if (price == priceKilo)
            return '1 kg'
        else if (price == priceMedio)
            return '1/2 kg'
        else if (price == priceCuarto)
            return '1/4 kg'    
    }

    return (
        <div>

      <div className="flex justify-between items-center mb-2">
            <div className='flex items-center gap-2'>
                <figure className='w-20 h-20'>
                    <img className='w-full h-full rounded-lg object-cover' src={imageUrl} alt={title} />
                </figure>

                <div className="flex flex-col items-start gap-1">
                    <p className="font-light text-sm">{title}</p>
                    <div className="flex justify-between items-center w-[80px]">
                        {
                            handleDelete &&
                            <MinusSmallIcon
                                className="flex justify-center items-center w-5 h-5 bg-red-200 rounded-md cursor-pointer"
                                onClick={() => decrement(id)} />
                        }
                        <p>{quantity}</p>
                        {
                            handleDelete &&
                            <PlusSmallIcon
                                className="flex justify-center items-center w-5 h-5 bg-green-200 rounded-md cursor-pointer"
                                onClick={() => increent(id)}
                            />
                        }
                    </div>
                </div>
            </div>

            <div className='flex items-center gap-0'>
            <p className='text-md items-center pl-2 pr-2 mb-2'>{med()}</p>
                <p className='text-lg items-center gap-1 pr-1 mb-2'>${price * quantity}</p>
                {
                    handleDelete &&
                    <TrashIcon
                        onClick={() => handleDelete(id)}
                        className="h-4 w-4 text-black cursor-pointer " />
                }
            </div>
        </div>

        </div>
 
    )
}
export default OrderCard