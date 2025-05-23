import React, { useState } from 'react'
import { useShopiContext } from '../../Context'
import { TrashIcon, MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/solid'

const OrderFinish = props => {
    const { id, title, imageUrl, price, quantity, handleDelete, unidadMedida } = props
    const { increentToCheckout, decrementToCheckout } = useShopiContext();
    const increent = () => {
        increentToCheckout(id)
    }
    const decrement = () => {
        decrementToCheckout(id)
    }
    const med = () => {
      const unidadesFiltradas = unidadMedida.filter(item => item.precio === price);
        return unidadesFiltradas[0].unidad.Nombre;
    }

    return (
        <div className="border rounded-lg p-6 flex gap-4 items-center mt-2">
            <img
                src={imageUrl} alt={title}
                className="w-24 h-24 object-cover rounded"
            />
            <div className="flex-1">
                <div className="font-bold">{title}</div>
                <p className="text-sm text-gray-600">{med()}</p>
                <p className="font-semibold">${price * quantity}</p>
            </div>
            <div className="flex items-center gap-2">
                {/* {
                    handleDelete &&
                    <button className="border px-2 py-1" >-</button>
                } */}
                {
                    quantity >1 && (
                    handleDelete &&
                    <MinusSmallIcon
                        className="flex justify-center items-center w-5 h-5 bg-red-200 rounded-md cursor-pointer"
                        onClick={() => decrement(id)} />
                    )
                }
                <span className="px-2">{quantity}</span>
                {/* <button className="border px-2 py-1" >+</button> */}
                {
                    handleDelete &&
                    <PlusSmallIcon
                        className="flex justify-center items-center w-5 h-5 bg-green-200 rounded-md cursor-pointer"
                        onClick={() => increent(id)}
                    />
                }
                {/* <Trash className="text-red-500 cursor-pointer" /> */}
                {
                    handleDelete &&
                    <TrashIcon
                        onClick={() => handleDelete(id)}
                        className="h-4 w-4 text-black cursor-pointer " />
                }
            </div>
        </div>
    )
}
export default OrderFinish