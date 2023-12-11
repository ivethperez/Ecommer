import { useShopiContext } from '../../Context'
import OrderCard from '../../Components/OrderCard'
import { Link } from 'react-router-dom'
import '../../Styles/styles.css'

function MyOrder() {

  const { order, phoneNumber, setTypeAlert, setShowAlert } = useShopiContext();
  const currentPath = window.location.pathname.split('/')
  let index = currentPath[currentPath.length - 1]
  if (index === 'last') {
    index = order?.length - 1
  }
  const enviarPedido = () => {
    console.log('order', order?.[index]?.products)
    let products = ''
    let medida = ''
    order?.[index]?.products.forEach(element => {
      if (element.isKilo)
        medida = '1 KG'
      else if (element.isMedio)
        medida = '1/2 KG'
      else
        medida = '1/4 KG'

      products = products + 'Producto: ' + element.title + ' ' + medida + ', Cantidad: ' + element.quantity + ', Precio: $' + element.price + ' || '
    });
    window.open('https://wa.me/?phone=' + phoneNumber + '&text=' + encodeURIComponent('Hola envío la confirmación de mi pedido: ' + products + ' Total a pagar: $' + order?.[index]?.totalPrice), '_blank');
    setTypeAlert('confirmacion')
    setShowAlert(true)
  }
  window.scrollTo(0, 0);
  return (
    <div>
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
          <li>
            <div className="flex items-center ">
              <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
              </svg>
              <Link to='/my-orders' className="decoration-transparent ms-1 text-sm font-medium text-gray-700 hover:text-yellow-500 md:ms-2 dark:text-gray-400 dark:hover:text-white">Mis órdenes
              </Link>
            </div>
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

      {/* <div className='flex w-80 items-center justify-center relative mb-3'>
        <Link to='/my-orders' className='absolute left-0'>
        <ChevronLeftIcon className='h-6 w-6 text-black cursor-pointer'>
        </ChevronLeftIcon>
        </Link>
       
        <div className='flex w-80 items-center justify-center relative mb-4'>
        <h1 className='font-medium text-lg'>Mi orden</h1>
      </div>
      </div> */}

      <div className='flex flex-col w-80 mt-3'>
        {
          order?.[index]?.products.map(product => ( 
            <OrderCard
              key={product.id}
              title={product.title}
              imageUrl={product.images}
              price={product.price}
              quantity={product.quantity}
              id={product.id}
              priceKilo={product.priceKilo}
              priceMedio={product.priceMedio}
              priceCuarto={product.priceCuarto}
            />
          ))
        }
      </div>

      <div className="flex flex-col items-center border-t border-gray-200 pb-12 pt-8 md:flex-row-reverse md:justify-between md:pt-6">
        <form className="flex w-full justify-center md:w-auto">
          <div className="w-60 min-w-0 shrink">
            <p className='flex justify-between items-center mb-2'>
              <span className='font-light'>Total:</span>
              <span className='font-medium text-2xl'>${order?.[index]?.totalPrice}</span>
            </p>
          </div>
          <Link to="/ecommer">
          <button onClick={() => { enviarPedido() }} className="inline-flex justify-center rounded-lg py-2 px-3 text-sm font-semibold relative outline-2 outline-offset-2 transition-colors  overflow-hidden color-btn-confirmar text-white before:absolute before:inset-0 active:before:bg-transparent before:transition-colors ml-4 flex-none" >
                <span className="lg:inline">Confirmar pedido</span>
                </button>

             
          </Link>
        </form></div>


    </div>

  )
}

export default MyOrder
