// import './style.css'
import React, { useContext } from 'react'
import { useShopiContext } from '../../Context'

const ProductDetail =()=>{
    const {setOpenModal,productShow} = useShopiContext();
    const onCancel = ()=>{setOpenModal(false)};
return(
    /* <aside className="product-detail flex flex-col fixed right-0 border border-black rounded-lg bg-white">
<div className='flex justify-between items-center p-6'>
    <h2 className='fount-medium text-xl'>Detalle</h2>
    <div>x</div>
</div>
</aside> */
<div className='flex flex-col fixed bg-white rounded-lg w-[400px] h-[calc(100vh-140px)] overflow-hidden shadow-lg hover:shadow-xl 
hover:scale-105 duration-500 transform transition'>
<figure className='relative mb-2 w-full h-3/5'>
<div 
className='absolute top-0 right-0 flex justify-center items-center bg-[#2f323a9d] w-6 h-6 rounded-full m-2 p-1 font-bold cursor-pointer'
onClick={onCancel}

>
</div>

<img 
className='w-full h-full object-cover rounded-lg' 
src={productShow.images[0]} 
alt={productShow.title}
/>
</figure>

<div className='p-5'>
<h1 className='text-2xl font-bold'>
{productShow.title}
</h1>
<p className='mt-2 text-lg font-semibold text-gray-600'>
${productShow.price}
</p>
<p className='mt-1 text-gray-500 font-'>
{productShow.description}
</p>
</div>
</div>
)

}
export default ProductDetail