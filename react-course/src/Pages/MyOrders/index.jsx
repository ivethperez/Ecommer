import OrdersCar from '../../Components/OrdersCard'
import { useShopiContext } from '../../Context'
import { Link } from 'react-router-dom'

function MyOrders() {
  const { order } = useShopiContext();
   return(
    <div>
      <div className='flex w-80 items-center justify-center relative'>
        <h1>Mis ordenes</h1>
      </div>
      {
        order.map((order,index) =>{
          <Link key={index} to={`/my-orders/${order.id}`}>
          <OrdersCar 
          totalPrice={order.totalPrice}
          totalProducts={order.totalProducts} >
          </OrdersCar>
          </Link>
          
        })
      }
    
    </div>
   )
}

export default MyOrders
