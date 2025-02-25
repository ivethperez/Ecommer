import './styles.css'
import { useShopiContext } from '../../Context'
import { XMarkIcon,CheckIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import OrderCard from '../../Components/OrderCard'
import { totalPrice, totalProducts } from '../../utils'
import '../../Styles/styles.css'

const CheckoutSideMenu = () => {
  const { setOpenModalOrder, openModalOrder, cartProducts, setCartProducts
    , setOrder, order, setCount, count, setSearchByTitle } = useShopiContext();

  const onCancel = () => { setOpenModalOrder(false) };
  const handleDelete = (id) => {
    const product = cartProducts.filter(product => product.id == id)
    setCount(count - product[0].quantity)
    setCartProducts(cartProducts.filter(product => product.id != id))
  }
  const handleCkeckout = async () => {
    const orderToAdd = {
      date: '',
      products: cartProducts,
      totalProducts: totalProducts(cartProducts),
      totalPrice: totalPrice(cartProducts)
    }

    setOrder([...order, orderToAdd])
    setCartProducts([])
    setCount(0)
    onCancel()
    setSearchByTitle(null)
  }
  console.log(cartProducts);
  return (
    <aside
      className={`${openModalOrder ? 'flex' : 'hidden'} checkout-side-menu flex-col fixed right-0 border  rounded-lg bg-white`}>
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
              key={product.id}
              title={product.title}
              imageUrl={product.images}
              price={product.price}
              quantity={product.quantity}
              handleDelete={handleDelete}
              id={product.id}
              priceKilo={product.priceKilo}
              priceMedio={product.priceMedio}
              priceCuarto={product.priceCuarto}
              priceGramo={product.price100g}
              pricePieza={product.pricePieza}
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
          <button disabled={cartProducts.length >0 ? false: true} className='w-full bg-transparent hover:bg-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent  text-black rounded-lg' onClick={() => handleCkeckout()}>
            Ver bolsa de compra ({cartProducts.length})
          </button>
        </Link>


          <button disabled={cartProducts.length >0 ? false: true} className='mt-2  w-full color-btn-confirmar py-2 text-white rounded-lg' onClick={() => handleCkeckout()}>
            Confirmar pedido
          </button>


      </div>
    </aside>
  )
}
export default CheckoutSideMenu