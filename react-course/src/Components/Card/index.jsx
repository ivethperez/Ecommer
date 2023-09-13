
import { PlusIcon,CheckIcon } from '@heroicons/react/24/solid';
import { useShopiContext } from '../../Context'

const Card = ({data}) =>{
    const  {increment,setOpenModal,setProductShow,cartProducts
    ,setOpenModalOrder} = useShopiContext();
    const showproduct = (productDetail) =>{
        setOpenModal(state=> !state);
        setProductShow(productDetail);
    }
    const addProductsToCart =(productData,e)=>{       
        setOpenModalOrder(true);
        //setCartProducts([...cartProducts,productData]);
        increment(e,productData);
    }
    return(
        <div className="bg-white cursor-pointer w-full h-60 rounded-lg max-w-md mx-auto shadow-md overflow-hidden md:max-w-2xl" onClick={()=> showproduct(data)}>
            <figure className="relative mb-2 w-full h-4/5">
                <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-xs m-2 px-3 py-0.5">
                    {data.category.name}
                </span>
                <img className="w-full h-full object-cover rounded-lg" src={data.images[0]} alt={data.title}></img>
               
                {cartProducts.filter((product) => product.id === data.id)
            .length > 0 ? (
                <button 
                className="absolute top-0 right-0 flex justify-center items-center text-xs bg-green-700 w-6 h-6 rounded-full m-2"
                onClick={(e) =>{
                    addProductsToCart(data,e)
                    }}>
                     <CheckIcon className='h-5 w-5 text-white' />
                </button>           
          ) : (
  
              <button 
              className="absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1"
              onClick={(e) =>{
                  addProductsToCart(data,e)
                  }}>
                  <PlusIcon className='h-6 w-6' ></PlusIcon>
              </button>
    
          )}

            </figure>

         



            <p className="flex justify-between">
                <span className="text-sm font-light">{data.title}</span>
                <span className="text-lg font-medium">${data.price}</span>
            </p>
        </div>



    )
}
export default Card