import './style.css'
import { useShopiContext } from '../../Context'
import { XMarkIcon, ShoppingBagIcon } from '@heroicons/react/24/solid'


const ProductDetail = () => {
    const { setOpenModal, productShow, openModal, increment, timeClose } = useShopiContext();
    const addProductsToCart = (e) => {
        increment(e, productShow);
        setOpenModal(false);
        timeClose();
    }
    return (
        <div>
            {openModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" onClick={() => setOpenModal(false)}>
                    <div className="bg-white p-6 rounded-lg w-96 relative" onClick={(e) => e.stopPropagation()}>
                        <button className="absolute top-2 right-2" onClick={() => setOpenModal(false)}>
                            <XMarkIcon className=' w-6 h-6' />
                        </button>
                        <h2 className="text-xl font-bold mb-4">Detalle del producto</h2>
                        <img src={productShow.images[0]} alt="producto" className="w-full h-36 object-cover mb-4" />
                        <h3 className="font-bold text-lg mt-4"> {productShow.title}</h3>
                        <p className="text-sm text-gray-600">{productShow.description}</p>
                        <div className=' flex items-center'>
                            <p className="font-bold ">Precio: ${productShow.price}</p>
                            <p className='p-2'> {productShow.isKilo ? '1 kg' : productShow.isMedio ? '1/2 kg' : productShow.isCuarto ? '1/4 kg' : productShow.isGramo ? '100 g' : 'Pieza'}</p>
                        </div>
                        {productShow.cantidad>0 ?

                        <button className="w-full flex justify-center items-center mt-2 color-btn-confirmar text-white py-2 rounded-lg" onClick={(e) => { addProductsToCart(e) }}>Agregar a la bolsa
                            <ShoppingBagIcon className='h-6 w-6'></ShoppingBagIcon></button>
                            :
                                                <div className="dark:text-slate-200 justify-center items-center"><dd className="px-1.5 ring-slate-200 rounded dark:ring-slate-600">Agotado</dd></div>
                                                }
                    </div>
                </div>
            )}
        </div>
    )
}
export default ProductDetail
