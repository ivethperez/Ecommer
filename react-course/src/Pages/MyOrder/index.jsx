import Layout from '../../Components/Layout'
import { useShopiContext } from '../../Context'
import OrderCard from '../../Components/OrderCard'
function MyOrder() {
  
   const { order } = useShopiContext();
   console.log(order?.slice(-1)[0])
   return(
    <Layout>
   MyOrder

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
