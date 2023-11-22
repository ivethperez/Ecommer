import './styles.css'
import { useShopiContext } from '../../Context'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import OrderCard from '../../Components/OrderCard'
import {totalPrice,totalProducts} from '../../utils'

const CheckoutSideMenu = () => {
  const { setOpenModalOrder, openModalOrder, cartProducts,setCartProducts
  ,setOrder,order,setCount,count,setSearchByTitle,mensajePedido,phoneNumber } = useShopiContext();
  const onCancel = () => { setOpenModalOrder(false) };
  const handleDelete =(id) =>{
    const product = cartProducts.filter(product => product.id == id)
    setCount(count -product[0].quantity)
    setCartProducts(cartProducts.filter(product => product.id != id))
  }
  const handleCkeckout = async () =>{
    const orderToAdd={
      date:'',
      products: cartProducts,
      totalProducts: totalProducts(cartProducts),
      totalPrice: totalPrice(cartProducts)
    }

    setOrder([...order,orderToAdd])
    setCartProducts([])
    setCount(0)
    onCancel()
    setSearchByTitle(null)

  }
  return (
    <aside
      className={`${openModalOrder ? 'flex' : 'hidden'} checkout-side-menu flex-col fixed right-0 border border-black rounded-lg bg-white`}>
      <div className='flex justify-between items-center p-6'>
        <h2 className='font-medium text-xl'>Mis odenes</h2>
        <button
          onClick={onCancel}>
          <XMarkIcon className='h-6 w-6'></XMarkIcon>
        </button>
      </div>
      <div className='px-6 overflow-y-auto flex-1'>
        {
          cartProducts.map(product => (
            <OrderCard
              key={product.id}
              title={product.title}
              imageUrl={product.images}
              price={product.price}
              quantity={product.quantity}
              handleDelete={handleDelete}
              id={product.id}
            />
          ))
        }
      </div>
      <div className='px-6 mb-6'>
        <p className='flex justify-between items-center mb-2'>
          <span className='font-light'>Total:</span>
          <span className='font-medium text-2xl'>${totalPrice(cartProducts)}</span>
        </p>
        <Link to='/my-orders/last'>
        <button className='w-full bg-black py-3 text-white rounded-lg' onClick={() => handleCkeckout()}>
          Ordenar
        </button>
        </Link>
       
      </div>
    </aside>
  )
}
export default CheckoutSideMenu