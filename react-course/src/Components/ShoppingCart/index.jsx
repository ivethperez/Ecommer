import { useShopiContext } from '../../Context'
import { ShoppingBagIcon } from '@heroicons/react/24/solid'

const ShoppingCart = () => {
  const {setOpenModalOrder,count} = useShopiContext()

  const openCheckoutSideMenu = () => {
    setOpenModalOrder(true);
  }

  return (
    <div className='relative flex gap-0.5 items-center' onClick={() => openCheckoutSideMenu()}>
      <ShoppingBagIcon className='w-6 h-6 fill-none stroke-black cursor-pointer'/>
      <div className='absolute bottom-3.5 left-3.5 flex justify-center items-center
      rounded-full bg-black w-4 h-4 text-xs text-white'>
        {count}
      </div>
    </div>
  )
}

export default ShoppingCart