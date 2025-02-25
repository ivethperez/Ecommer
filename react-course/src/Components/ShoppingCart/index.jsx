import { useShopiContext } from '../../Context'
import { Link } from 'react-router-dom'
import { ShoppingBagIcon } from '@heroicons/react/24/solid'
import '../../Styles/styles.css'

const ShoppingCart = () => {
  const {count} = useShopiContext()
  return (
      <Link to='/my-orders/last'>
    <div className='relative flex gap-0.5 items-center' >
      <ShoppingBagIcon className='w-6 h-6 fill-none stroke-black cursor-pointer'/>
      <div className='absolute bottom-3.5 left-3.5 flex justify-center items-center
      rounded-full color-rosa w-4 h-4 text-xs text-white'>
        {count}
      </div>
    </div>
    </Link>
  
  )
}

export default ShoppingCart