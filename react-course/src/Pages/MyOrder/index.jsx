import Layout from '../../Components/Layout'
import { useShopiContext } from '../../Context'
import OrderCard from '../../Components/OrderCard'
import { Link } from 'react-router-dom'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
function MyOrder() {
  
   const { order } = useShopiContext();
   console.log(order?.slice(-1)[0])
   return(
    <Layout>
    <div className='flex w-80 items-center justify-center relative mb-3'>
        <Link to='/my-orders' className='absolute left-0'>
        <ChevronLeftIcon className='h-6 w-6 text-black cursor-pointer'>
        </ChevronLeftIcon>
        </Link>
       
        <h1>Mi orden</h1>
      </div>

   <div className='flex flex-col w-80'>
        {
          order?.slice(-1)[0].products.map(product => (
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
  </Layout>
 
      
   )
}

export default MyOrder
