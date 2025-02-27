import { useShopiContext } from '../../Context'
import OrderFinish from '../../Components/OrderFinish'
import { totalPrice } from '../../utils'
import { Link } from 'react-router-dom'
import '../../Styles/styles.css'

function MyOrder() {

  const { order, setCount,count, setOrder,finishOrder } = useShopiContext();

  const enviarPedido = () => {
    finishOrder();
  }
  const handleDelete = (id) => {
    const product = order.filter(product => product.cartId === id)
    setCount(count - product[0].quantity)
    setOrder(order.filter(product => product.cartId !== id))
  }
  window.scrollTo(0, 0);
  return (
    <div className='mt-3'>
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <Link to='/ecommer' className=" decoration-transparent inline-flex items-center text-sm font-medium text-gray-700 hover:text-yellow-500 dark:text-gray-400 dark:hover:text-white">
              <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              Seguir comprando
            </Link>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
              </svg>
              <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Mi orden</span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="flex flex-col lg:flex-row p-6 gap-6 max-w-5xl mx-auto">
                <div className="w-full lg:w-2/3">
                    <h2 className=" text-base font-bold mb-4">Bolsa de compra</h2>
        {
          order?.map(product => ( 
            <OrderFinish
              key={product.cartId}
              title={product.title}
              imageUrl={product.images}
              price={product.price}
              quantity={product.quantity}
              handleDelete={handleDelete}
              id={product.cartId}
              priceKilo={product.priceKilo}
              priceMedio={product.priceMedio}
              priceCuarto={product.priceCuarto}
              priceGramo={product.price100g}
              pricePieza={product.pricePieza}
            />
          ))
        }
        </div>
                <div className="w-full lg:w-1/3">
                    <div className="border rounded-lg p-4">
                        <h2 className="text-xl font-bold">Resumen</h2>
                        <div className="flex justify-between text-lg font-medium mt-2">
                            <span>Subtotal</span>
                            <span>${totalPrice(order)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Gastos de envío</span>
                            <span>Gratis</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold mt-2">
                            <span>Total</span>
                            <span>${totalPrice(order)}</span>
                        </div>
                        <Link to="/ecommer">
                        <button className="w-full mt-4 color-btn-confirmar text-white py-2 rounded" onClick={() => { enviarPedido() }}>Confirmar pedido</button>
                        </Link>
                        {/* <button className="w-full mt-2 bg-gray-200 text-black py-2 rounded">PayPal</button> */}
                    </div>
                </div>
            </div>
    </div>

  )
}

export default MyOrder
