import { CheckIcon, ShoppingBagIcon } from '@heroicons/react/24/solid';
import { useShopiContext } from '../../Context'
import '../../Styles/styles.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination,Autoplay } from 'swiper/modules'

const Card = ({ data }) => {
  const { increment, setOpenModal, setProductShow, cartProducts, timeClose, setSelecciones, selecciones, setPrecioSeleccionado } = useShopiContext();

  const showproduct = (productDetail, precio) => {
    setOpenModal(state => !state);
    setProductShow(productDetail);
    setPrecioSeleccionado(precio);
  }
  const addProductsToCart = (productData, e, precio) => {
    increment(e, productData, precio);
    timeClose();
  }

  const handleSeleccion = (productoId, index) => {
    setSelecciones(prev => ({
      ...prev,
      [productoId]: index,
    }));
  };

  const productoId = data.product.id;
  const seleccionIndex = selecciones[productoId] || 0;
  const seleccion = data.options[seleccionIndex];

  return (

    <div className="shadow-sm text-center">

      <div className='p-6'>
      
        <div className={`group relative transform overflow-hidden sm:h-[7rem] max-sm:h-[7rem] ${!data.product.isPiece ? ' md:h-[10rem]' : 'md:h-[10rem]'}`} onClick={() => showproduct(data, seleccion.precio)}>
          <span className="absolute bottom-0 left-0 bg-white/60 rounded-3xl text-xs m-2 px-3 py-0.5">
            {data.product.category.name}
          </span>
          {!data.product.isPiece ? (
            <img
              className="inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-110"
              src={data?.product?.productImage?.[0]?.imageUrl}
              alt={data?.product?.name || 'Producto'}
            />) : (

            <Swiper
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              modules={[Pagination,Autoplay]}
              className="inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-110"
            >
              {data?.product?.productImage
                ?.slice() // para no mutar el array original
                .sort((a, b) => a.orderImage - b.orderImage)
                .map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      className="inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-110"
                      src={img.imageUrl}
                      alt={`Imagen ${idx + 1}`}
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
          )}
          {cartProducts.filter((product) => product.id === data.product.id)
            .length > 0 ? (
            <button
              className="absolute top-0 right-0 flex justify-center items-center text-xs color-btn-confirmar w-6 h-6 rounded-full m-2"
              onClick={(e) => {
                addProductsToCart(data, e)
              }}>
              <CheckIcon className='h-5 w-5 text-white' />
            </button>

          ) : (
            <div className="">
            </div>
          )}
        </div>
      </div>
      <figcaption className="relative items-center justify-between border-t border-slate-100 pt-3">
        <div className="font-display text-base text-slate-900">{data.product.name}</div>
        <div className="flex items-center justify-center gap-4 mt-2">
          <select
            id={data.cartId}
            className="w-50 p-2 border rounded-lg"
            onChange={(e) => handleSeleccion(productoId, e.target.selectedIndex)}
            value={seleccionIndex}
          >
            {data.options.map((op, idx) => (
              <option key={idx} value={idx}>
                {op.unitOfMeasure.name}
              </option>
            ))}
          </select>
          <p className="text-lg font-bold">$ {seleccion.unitPrice} </p>
        </div>

        <div className='flex justify-center items-center'>
          <div className="overflow-hidden rounded-full p-3">
            {data.product.quantity > 0 ?
              <button className='w-full flex justify-center items-center color-btn-confirmar text-white rounded-lg p-1' onClick={(e) => {
                addProductsToCart(data, e, seleccion.unitPrice)
              }}>Agregar
                <ShoppingBagIcon className='h-4 w-8'></ShoppingBagIcon></button>
              :
              <div className="dark:text-slate-200"><dd className="px-1.5 ring-slate-200 rounded dark:ring-slate-600">Agotado</dd></div>
            }
          </div>
        </div>
      </figcaption>
    </div>

  )
}
export default Card