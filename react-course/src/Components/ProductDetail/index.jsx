import './style.css'
import { useShopiContext } from '../../Context'
import { XMarkIcon, ShoppingBagIcon } from '@heroicons/react/24/solid'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination,Autoplay } from 'swiper/modules'

const ProductDetail = () => {
    const { setOpenModal, productShow, openModal, increment, timeClose, precioSeleccionado } = useShopiContext();
    const addProductsToCart = (e) => {
        increment(e, productShow,precioSeleccionado);
        setOpenModal(false);
        timeClose();
    }
    const med = () => {
        const unidadesFiltradas = productShow.opciones?.filter(item => item.precio === precioSeleccionado);
        return unidadesFiltradas[0].unidad.Nombre;
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
                        {!productShow.producto?.EsPieza ? (
                            <img src={productShow.producto?.ImagenesProductos[0]?.URLImagen} alt="producto" className="w-full h-36 object-cover mb-4" />
                        ) : (
                            <Swiper
                                pagination={{ clickable: true }}
                                autoplay={{ delay: 4000, disableOnInteraction: false }}
                                modules={[Pagination,Autoplay]}
                                className="h-full w-full"
                            >
                                {productShow?.producto?.ImagenesProductos
                                    ?.slice() // para no mutar el array original
                                    .sort((a, b) => a.Orden - b.Orden)
                                    .map((img, idx) => (
                                        <SwiperSlide key={idx}>
                                            <img
                                                className="w-full h-48 object-cover mb-4"
                                                src={img.URLImagen}
                                                alt={`Imagen ${idx + 1}`}
                                            />
                                        </SwiperSlide>
                                    ))}
                            </Swiper>
                        )}
                        <h3 className="font-bold text-lg mt-4"> {productShow.producto?.Nombre}</h3>
                        <p className="text-sm text-gray-600">{productShow.producto?.Descripcion}</p>
                        <div className=' flex items-center'>
                            <p className="font-bold ">Precio: ${precioSeleccionado}</p>
                            <p className='p-2'> {med()}</p>
                        </div>
                        {productShow.producto.Cantidad > 0 ?

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
