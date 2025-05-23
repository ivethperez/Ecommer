import { CheckIcon, ShoppingBagIcon } from '@heroicons/react/24/solid';
import { useShopiContext } from '../../Context'
import '../../Styles/styles.css'

const Card = ({ data }) => {
  const { increment, setOpenModal, setProductShow, cartProducts, setIsGramo, setIsKilo, setIsMedioKilo, setIsCuartoKilo, setIsPieza, timeClose, setSelecciones,selecciones } = useShopiContext();


  const showproduct = (productDetail) => {
    setOpenModal(state => !state);
    setProductShow(productDetail);
  }
  const addProductsToCart = (productData, e, precio) => {
    increment(e, productData,precio);
    timeClose();
  }

  const handleSeleccion = (productoId, index) => {
    setSelecciones(prev => ({
      ...prev,
      [productoId]: index,
    }));
  };

    const productoId = data.producto.Id;
        const seleccionIndex = selecciones[productoId] || 0;
        const seleccion = data.opciones[seleccionIndex];
        
  const showPrice = async (prod, unidad) => {
    if (unidad == '1kg') {
      prod.isGramo = false
      prod.isKilo = true
      prod.isMedio = false
      prod.isCuarto = false
      prod.price = prod.priceKilo
    }
    if (unidad == '500g') {
      prod.isGramo = false
      prod.isMedio = true
      prod.isCuarto = false
      prod.isKilo = false
      prod.price = prod.priceMedio
    }
    if (unidad == '250g') {
      prod.isGramo = false
      prod.isMedio = false
      prod.isCuarto = true
      prod.isKilo = false
      prod.price = prod.priceCuarto
    }
    if (unidad == '100g') {
      prod.isMedio = false
      prod.isCuarto = false
      prod.isKilo = false
      prod.isGramo = true
      prod.price = prod.price100g
    }
    if (unidad == 'pieza') {
      prod.isGramo = false
      prod.isMedio = false
      prod.isCuarto = false
      prod.isKilo = false
      prod.isPieza = true
      prod.price = prod.pricePieza
    }
    setIsGramo(prod.isGramo)
    setIsKilo(prod.isKilo)
    setIsMedioKilo(prod.isMedio)
    setIsCuartoKilo(prod.isCuarto)
    setIsPieza(prod.isPieza)
  }
  return (

    <div className=" shadow-sm text-center">
  
      <div className='p-6'>
        <div className="group relative h-[8rem] transform overflow-hidden " onClick={() => showproduct(data)}>
          <span className="absolute bottom-0 left-0 bg-white/60 rounded-3xl text-xs m-2 px-3 py-0.5">
            {data.producto.CategoriasProducto.Nombre}
          </span>
          <img
            className="inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-110"
            src={data?.producto?.ImagenesProductos?.[0]?.URLImagen}
            alt={data?.producto?.Nombre || 'Producto'}
          />
          {cartProducts.filter((product) => product.Id === data.producto.Id)
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
        <div className="font-display text-base text-slate-900">{data.producto.Nombre}</div>


          <div className="flex items-center justify-center gap-4 mt-2">
            <select
              id={data.cartId}
              className="w-50 p-2 border rounded-lg"
              onChange={(e) => handleSeleccion(productoId, e.target.selectedIndex)}
                value={seleccionIndex}
            >
               {data.opciones.map((op, idx) => (
                <option key={idx} value={idx}>
                  {op.unidad.Nombre}
                </option>
              ))}
            </select>
            <p className="text-lg font-bold">$ {seleccion.precio} </p>
          </div>

        <div className='flex justify-center items-center'>
          <div className="overflow-hidden rounded-full p-3">
            {data.producto.Cantidad > 0 ?
              <button className='w-full flex justify-center items-center color-btn-confirmar text-white rounded-lg p-1' onClick={(e) => {
                addProductsToCart(data, e, seleccion.precio)
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