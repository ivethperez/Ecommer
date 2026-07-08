import { useShopiContext } from '../../Context'
import { Link } from 'react-router-dom'
import { ShoppingBagIcon } from '@heroicons/react/24/solid'
import '../../Styles/styles.css'

const ShoppingCart = () => {
  const {count} = useShopiContext()
  return (
<div className=" -translate-y-1/2 z-[100]">
  <Link to='/my-order'>
    <div className='relative flex items-center justify-center bg-white p-3 rounded-full shadow-2xl border border-slate-100 hover:scale-110 transition-transform active:scale-95 group'>
      
      {/* Icono (Manteniendo tus clases originales) */}
      <ShoppingBagIcon className='w-7 h-7 fill-none stroke-black cursor-pointer'/>
      
      {/* Contador rosa (Manteniendo tus clases originales y ubicación) */}
      <div className='absolute bottom-3.5 left-3.5 flex justify-center items-center
        rounded-full color-rosa w-5 h-5 text-[10px] font-bold text-white shadow-md'>
        {count}
      </div>

    </div>
  </Link>
</div>
  )
}

export default ShoppingCart