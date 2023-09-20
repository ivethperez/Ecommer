import Layout from '../../Components/Layout'
import { useShopiContext } from '../../Context'
import OrderCard from '../../Components/OrderCard'
import { Link } from 'react-router-dom'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
function MyOrder() {

  const { order } = useShopiContext();
  const currentPath = window.location.pathname.split('/')
  let index = currentPath[currentPath.length - 1]
  if (index === 'last') index = order?.length - 1

   return (
<div>
    <div className='flex w-80 items-center justify-center relative mb-3'>
        <Link to='/my-orders' className='absolute left-0'>
        <ChevronLeftIcon className='h-6 w-6 text-black cursor-pointer'>
        </ChevronLeftIcon>
        </Link>
       
        <div className='flex w-80 items-center justify-center relative mb-4'>
        <h1 className='font-medium text-lg'>Mi orden</h1>
      </div>
      </div>

   <div className='flex flex-col w-80'>
        {
          order?.[index]?.products.map(product => (
            <OrderCard
              key={product.id}
              title={product.title}
              imageUrl={product.images}
              price={product.price}
              quantity={product.quantity}
              id={product.id}
            />
          ))
        }
      </div>

 </div>
      
   )
}

export default MyOrder
