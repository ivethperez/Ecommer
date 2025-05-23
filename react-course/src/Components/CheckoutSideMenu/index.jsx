import './styles.css'
import { useShopiContext } from '../../Context'
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import OrderCard from '../../Components/OrderCard'
import { totalPrice } from '../../utils'
import '../../Styles/styles.css'

const CheckoutSideMenu = () => {
  const { setOpenModalOrder, openModalOrder, cartProducts, setCartProducts
    , order, setCount, count, setSearchByTitle,finishOrder } = useShopiContext();

  const onCancel = () => { setOpenModalOrder(false) };

  const handleDelete = (id) => {
    const product = cartProducts.filter(product => product.producto.Id == id)
    setCount(count - product[0].quantity)
    setCartProducts(cartProducts.filter(product => product.producto.Id != id))
  }
  const handleCkeckout = async () => {
    onCancel()
    setSearchByTitle(null)
  }
  const enviarPedio = async () => {
    onCancel()
    setSearchByTitle(null)
    finishOrder();
  }
  return (
    <aside
      className={`${openModalOrder ? 'flex' : 'hidden'} h-96 checkout-side-menu flex-col fixed right-0  shadow-lg border-1 border-2 rounded-lg bg-white `}>
      <div className='flex justify-between items-center p-6'>
        <button
          className=" top-0 right-0 flex justify-center items-center text-xs color-btn-confirmar w-6 h-6 rounded-full "
        >
          <CheckIcon className='h-5 w-5 text-white' />
        </button>
        <h2 className='font-medium text-sm mt-2'>
          Agregado a la bolsa de compra </h2>
        <button className='rounded-full'
          onClick={onCancel}>
          <XMarkIcon className='h-6 w-6'></XMarkIcon>
        </button>
      </div>

      <div className='px-6 overflow-y-auto flex-1 mt-3'>
        {

          cartProducts.map(product => (
            <OrderCard
              key={product.cartId}
              title={product.producto.Nombre}
              imageUrl={product.producto.ImagenesProductos?.[0].URLImagen}
              price={product.precio}
              quantity={product.quantity}
              handleDelete={handleDelete}
              id={product.cartId}
              unidadMedida={product.opciones}
              
            />
          ))
        }
      </div>
      <div className='px-6 mb-6'>
        <p className='flex justify-between items-center mb-2'>
          <span className='font-light'>Total en la bolsa de compra:</span>
          <span className='font-medium text-2xl'>${totalPrice(order)}</span>
        </p>

        <Link to='/my-order'>
          <button disabled={order.length > 0 ? false : true} className='w-full bg-transparent hover:bg-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent  text-black rounded-lg' onClick={() => handleCkeckout()}>
            Ver bolsa de compra ({order.length})
          </button>
        </Link>

        <button disabled={order.length > 0 ? false : true} className='mt-2  w-full color-btn-confirmar py-2 text-white rounded-lg' onClick={() => enviarPedio()}>
          Confirmar pedido
        </button>
      </div>
    </aside>
  )
}
export default CheckoutSideMenu