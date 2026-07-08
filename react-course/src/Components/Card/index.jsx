import { CheckIcon, ShoppingBagIcon } from '@heroicons/react/24/solid';
import { useShopiContext } from '../../Context'
import '../../Styles/styles.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination, Autoplay } from 'swiper/modules'

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
    <div className="flex flex-col bg-white max-w-[250px] rounded-xl">

      {/* Imagen */}
      <div className="relative group h-48 md:h-56 w-full rounded-xl overflow-hidden mb-3 flex items-center justify-center">

        {/* 🔥 BADGE POPULAR */}
        {/* <span className="absolute top-2 left-2 text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/80 backdrop-blur text-slate-700">
    🔥 Popular
  </span> */}
        {/* Badge categoría */}
        <span className="absolute bottom-2 left-2 bg-white/95 rounded-full text-[10px] font-bold uppercase px-2 py-0.5 z-10 text-slate-600 shadow-md">
          {data.product.category.name}
        </span>

        {/* Imagen / Swiper */}
        <div
          className="w-full h-full cursor-pointer flex items-center justify-center"
          onClick={() => showproduct(data, seleccion.unitPrice)}
        >
          {!data.product.isPiece ? (
            <img
              className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              src={data?.product?.productImage?.[0]?.imageUrl}
              alt={data?.product?.name || 'Producto'}
            />
          ) : (
            <Swiper
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              modules={[Pagination, Autoplay]}
              className="h-full w-full"
            >
              {data?.product?.productImage
                ?.slice()
                .sort((a, b) => a.orderImage - b.orderImage)
                .map((img, idx) => (
                  <SwiperSlide key={idx} className="flex items-center justify-center">
                    <img
                      className="h-full w-full object-cover"
                      src={img.imageUrl}
                      alt={`Imagen ${idx + 1}`}
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
          )}
        </div>

        {/* Check en carrito */}
        {cartProducts.some((product) => product.product.id === data.product.id) && (
          <div className="absolute top-2 right-2 flex justify-center items-center bg-green-500 w-6 h-6 rounded-full shadow-md z-20">
            <CheckIcon className="h-4 w-4 text-white" />
          </div>
        )}
      </div>

      {/* Info */}
      <figcaption className="text-left px-1">

        {/* Nombre */}
        <h3 className="text-sm font-semibold text-slate-800 truncate">
          {data.product.name}
        </h3>

        {/* Estado tipo badge */}
        <span
          className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1 mb-2
        ${data.product.quantity > 0
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-500'
            }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${data.product.quantity > 0 ? 'bg-green-500' : 'bg-red-400'
              }`}
          ></span>
          {data.product.quantity > 0 ? 'Disponible' : 'Agotado'}
        </span>

        {/* Opciones + acción */}
        <div className="space-y-2 pt-2 border-t border-slate-100">

          {/* Select */}
          <select
            id={data.cartId}
            className="w-full text-[12px] text-slate-600 bg-white border border-slate-300 rounded-md px-2 py-1.5 outline-none focus:border-slate-400 transition-all cursor-pointer"
            onChange={(e) => handleSeleccion(productoId, e.target.selectedIndex)}
            value={seleccionIndex}
          >
            {data.options.map((op, idx) => (
              <option key={idx} value={idx}>
                {op.unitOfMeasure.name}
              </option>
            ))}
          </select>

          {/* Precio + botón */}
          <div className="flex items-center justify-between">

            <p className="text-md font-bold text-slate-900">
              $ {seleccion.unitPrice}
              <span className="text-xs font-normal text-slate-500 ml-1">
                MXN
              </span>
            </p>

            {data.product.quantity > 0 && (
              <button
                className="flex items-center gap-1.5 bg-slate-900 hover:bg-black active:scale-95 text-white text-[11px] font-semibold py-1.5 px-3 rounded-lg transition-all shadow-sm"
                onClick={(e) => addProductsToCart(data, e, seleccion.unitPrice)}
              >
                <ShoppingBagIcon className="h-3.5 w-3.5" />
                <span>Agregar</span>
              </button>
            )}
          </div>
        </div>
      </figcaption>
    </div>

  )
}
export default Card