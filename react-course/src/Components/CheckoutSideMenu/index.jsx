import './styles.css'
import React, { useContext } from 'react'
import { useShopiContext } from '../../Context'
import { XMarkIcon } from '@heroicons/react/24/solid'

const CheckoutSideMenu = () => {
    const { setOpenModalOrder} = useShopiContext();
    const onCancel = () => { setOpenModalOrder(false) };
    return (
        <div className='flex flex-col fixed bg-white rounded-lg w-[400px] h-[calc(100vh-140px)] overflow-hidden shadow-lg hover:shadow-xl 
hover:scale-105 duration-500 transform transition'>

<div className='flex justify-between items-center p-6'>
<h2 className='fount-medium text-xl'>Mis Órdenes</h2>
<button 
                onClick={onCancel}>
                    <XMarkIcon className='h-6 w-6'></XMarkIcon>
                </button>
                </div>

            <div className='p-5'>
    
            </div>
        </div>
    )
}
export default CheckoutSideMenu