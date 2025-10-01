import Card from '../../Components/Card'
import ProductDetail from '../../Components/ProductDetail'
import ProductModal from '../../Components/ProductModal'
import { Link } from 'react-router-dom'
import { useShopiContext } from '../../Context'
import CheckoutSideMenu from '../../Components/CheckoutSideMenu'
import Alert from '../../Components/Alert'
import '../../Styles/styles.css'


function Ecommer() {
  const { openModal, search, filteredItems,showAlert } = useShopiContext();

  const renderView = () => {
    if (filteredItems?.length > 0) {
      return (
        filteredItems?.map(item => (
          item.product.active ?
          <Card key={item.product.id} data={item}> </Card>: ""
        ))
      )

    } else {
      return (
        <div className='flex items-center'>     
         <div role="status" className="mt-10 absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
        <svg aria-hidden="true" className=" w-40 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
        <div className="">Cargando productos...</div>
        </div>    
    </div>
      )
    }
   
  }

  return (
    <div className="container">

        {showAlert ? 
 <Alert></Alert>
 :
 <div></div>
        }
       
        <div className="grid grid-cols-1 items-start lg:grid-cols-4 md:hidden">
          <div className="relative -mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:block sm:overflow-visible sm:pb-0">
          </div>
          <div className="lg:col-span-3">
            <div className='font-display text-2xl tracking-tight text-blue-900'>
                           <input type='text' placeholder='Buscar producto' className='block w-full appearance-none rounded-lg border border-gray-200 bg-white py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-gray-900 placeholder:text-gray-400 focus:border-lime-50 focus:outline-none focus:ring-lime-50 sm:text-sm'
                onChange={search}></input>
            </div>
          </div>
        </div>
{/* `
  <div className="max-w-md mx-auto mt-10 p-6 text-center shadow-lg rounded-2xl border border-gray-200 bg-white">
      <h2 className="text-xl font-bold mb-4">¿Quieres armar tu paquete personalizado?</h2>
       <Link to='/my-custom-package'>
      <button
        
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl shadow"
      >
        ¡Empieza aquí!
      </button>
      </Link>
    </div>` */}
        <div className="mx-auto mt-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {
                renderView()
              }
            </div>
          </div>
      {openModal && (
        <ProductModal>
          <ProductDetail></ProductDetail>
        </ProductModal>
      )}
      <CheckoutSideMenu></CheckoutSideMenu>
    </div>


  )
}

export default Ecommer