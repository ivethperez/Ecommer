import { PlusIcon, CheckIcon, ShoppingBagIcon, MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/solid';
import { useShopiContext } from '../../Context'
import Button from 'react-bootstrap/Button';

const Card = ({ data }) => {
  const { increment, setOpenModal, setProductShow, cartProducts,price } = useShopiContext();
  const showproduct = (productDetail) => {
    setOpenModal(state => !state);
    setProductShow(productDetail);
  }
  const addProductsToCart = (productData, e) => {
   
    increment(e, productData);
  }

const showPrice = (prod,unidad) =>{
  if(unidad == 'kilo'){
    prod.isKilo=true
    prod.isMedio=false
    prod.isCuarto = false
  }
  if(unidad == 'medioKilo'){
    prod.isMedio=true
    prod.isCuarto=false
    prod.isKilo=false
  }
  if(unidad == 'cuarto'){
    prod.isMedio=false
    prod.isCuarto=true
    prod.isKilo=false
  }
  price(prod)
}
  return (
    <li>
      <ul role="list" className="flex flex-col w-full">
        <li>
          <figure className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10">
            <blockquote className=" group relative h-[10.5rem] transform overflow-hidden rounded-3xl" onClick={() => showproduct(data)}>
              <span className="absolute bottom-0 left-0 bg-white/60 rounded-3xl text-xs m-2 px-3 py-0.5">
                {data.category.name}
              </span>
              <img className=" inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-110" src={data.images[0]} alt={data.title}></img>

              {cartProducts.filter((product) => product.id === data.id)
                .length > 0 ? (

                <button
                  className="absolute top-0 right-0 flex justify-center items-center text-xs bg-green-700 w-6 h-6 rounded-full m-2"
                  onClick={(e) => {
                    addProductsToCart(data, e)
                  }}>
                  <CheckIcon className='h-5 w-5 text-white' />
                </button>

              ) : (
                <div className="">
                </div>
              )}
            </blockquote>
            <figcaption className="relative mt-3 items-center justify-between border-t border-slate-100 pt-3">
              <div className="font-display text-base text-slate-900">{data.title}</div>
              <div className="font-display text-base text-slate-900">
                <div className="">
                  <div className="w-full mt-3">
                    <div className="flex flex-wrap gap-2">
                      <label className="cursor-pointer" onClick={() => showPrice(data,'kilo')}>
                        <input type="radio" className="peer sr-only" name="pricing" />
                        <div className=" w-16 rounded-md bg-white border text-gray-600 ring-2 ring-transparent transition-all hover:shadow-lg peer-checked:text-sky-600 peer-checked:ring-blue-400 peer-checked:ring-offset-2">                      
                            <div className=" flex flex-col gap-1 pt-2 items-center justify-between">
                              <p className="text-sm font-semibold uppercase text-gray-500">1 kg</p>
                              <p>${data.priceKilo}</p>
                            </div>
                        </div>
                      </label>
                      <label className="cursor-pointer" onClick={() => showPrice(data,'medioKilo')}>
                        <input type="radio" className="peer sr-only" name="pricing" />
                        <div className="w-16 rounded-md bg-white text-gray-600  border ring-2 ring-transparent transition-all hover:shadow-lg peer-checked:text-sky-600 peer-checked:ring-blue-400 peer-checked:ring-offset-2">
                            <div className=" flex flex-col gap-0 pt-2 items-center justify-between">
                              <p className="text-sm font-semibold uppercase text-gray-500">1/2 kg</p>
                              <p>${data.priceMedio}</p>
                            </div>
                        </div>
                      </label>
                      <label className="cursor-pointer" onClick={() => showPrice(data,'cuarto')}>
                        <input type="radio" className="peer sr-only" name="pricing" />
                        <div className="w-16 rounded-md bg-white text-gray-600 ring-2 border ring-transparent transition-all hover:shadow-lg peer-checked:text-sky-600 peer-checked:ring-blue-400 peer-checked:ring-offset-2">                  
                            <div className="flex flex-col gap-1 pt-2 items-center justify-between">
                              <p className="text-sm font-semibold uppercase text-gray-500">1/4 kg</p>
                              <p>${data.priceCuarto}</p>
                            </div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex justify-between items-center mt-3'>
                <div className="mt-1 text-sm text-slate-500">
                 </div>
                <div className="overflow-hidden rounded-full bg-slate-50">

                <Button variant="success" size="lg" onClick={(e) => {
                    addProductsToCart(data, e)
                  }}>
                    <ShoppingBagIcon className='h-6 w-6'></ShoppingBagIcon></Button>
                </div>
              </div>
            </figcaption>
            
          </figure>
        </li></ul></li>



  )
}
export default Card