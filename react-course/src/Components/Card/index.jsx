import { CheckIcon, ShoppingBagIcon } from '@heroicons/react/24/solid';
import { useShopiContext } from '../../Context'
import '../../Styles/styles.css'

const Card = ({ data }) => {
  const { increment, setOpenModal, setProductShow, cartProducts, setIsGramo, setIsKilo, setIsMedioKilo, setIsCuartoKilo,setIsPieza,timeClose } = useShopiContext();

 
  const showproduct = (productDetail) => {
    setOpenModal(state => !state);
    setProductShow(productDetail);
  }
  const addProductsToCart = (productData, e) => {
    increment(e, productData);
    timeClose();
  }
  
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
            {data.category.name}
          </span>
          <img className=" inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-110" src={data.images[0]} alt={data.title}></img>

          {cartProducts.filter((product) => product.id === data.id)
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
        <div className="font-display text-base text-slate-900">{data.title}</div>

        {data.isPieza ? (
          <div className="flex items-center justify-center gap-4 mt-2">
            <select
              id={data.cartId}
              className="w-50 p-2 border rounded-lg"
              value={data.isPieza}
              onChange={(e) => showPrice(data, e.target.value)}
            >
              <option value="pieza">Pieza</option>
            </select>
            <p className="text-lg font-bold">$ {data.price == null ? data.price = data.pricePieza : data.price}  </p>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-4 mt-2">
            <select
              id={data.cartId}
              className="w-50 p-2 border rounded-lg"
              value={data.isCuarto ? "250g" : data.isMedio ? "500g" : data.isKilo ? "1kg" : data.isGramo ? "100g" : ""}
              onChange={(e) => showPrice(data, e.target.value)}
            >
              <option value="100g">100 g</option>
              <option value="250g">1/4 kg</option>
              <option value="500g">1/2 kg</option>
              <option value="1kg">1 kg</option>
            </select>
            <p className="text-lg font-bold">$ {data.price == null ? data.price = data.price100g : data.price}  </p>
          </div>
        )}

        <div className='flex justify-center items-center'>
          <div className="overflow-hidden rounded-full p-3">

            <button className='w-full flex justify-center items-center color-btn-confirmar text-white rounded-lg p-1' onClick={(e) => {
              addProductsToCart(data, e)
            }}>Agregar
              <ShoppingBagIcon className='h-4 w-8'></ShoppingBagIcon></button>
          </div>
        </div>
      </figcaption>
    </div>

  )
}
export default Card