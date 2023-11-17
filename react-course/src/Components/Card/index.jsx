
import { PlusIcon,CheckIcon,ShoppingBagIcon, MinusSmallIcon, PlusSmallIcon  } from '@heroicons/react/24/solid';
import { useShopiContext } from '../../Context'

import Button from 'react-bootstrap/Button';
const Card = ({data}) =>{
    const  {increment,setOpenModal,setProductShow,cartProducts
    ,setOpenModalOrder} = useShopiContext();
    const showproduct = (productDetail) =>{
        setOpenModal(state=> !state);
        setProductShow(productDetail);
    }
    const addProductsToCart =(productData,e)=>{       
        setOpenModalOrder(true);
        increment(e,productData);
    }
    const clipPathStyle = {
        clipPath: 'url(#:R1aqlla:-0)',
      }
    return(
        // <div className="bg-white cursor-pointer w-full h-60 rounded-lg max-w-md mx-auto shadow-md overflow-hidden md:max-w-2xl" onClick={()=> showproduct(data)}>
        //     <figure className="relative mb-2 w-full h-4/5">
        //         <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-xs m-2 px-3 py-0.5">
        //             {data.category.name}
        //         </span>
        //         <img className="w-full h-full object-cover rounded-lg" src={data.images[0]} alt={data.title}></img>
               
        //         {cartProducts.filter((product) => product.id === data.id)
        //     .length > 0 ? (
        //         <button 
        //         className="absolute top-0 right-0 flex justify-center items-center text-xs bg-green-700 w-6 h-6 rounded-full m-2"
        //         onClick={(e) =>{
        //             addProductsToCart(data,e)
        //             }}>
        //              <CheckIcon className='h-5 w-5 text-white' />
        //         </button>           
        //   ) : (
  
        //       <button 
        //       className="absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1"
        //       onClick={(e) =>{
        //           addProductsToCart(data,e)
        //           }}>
        //           <PlusIcon className='h-6 w-6' ></PlusIcon>
        //       </button>
    
        //   )}

        //     </figure>
        //     <p className="flex justify-between items-center">
        //         <span className="text-sm font-light">{data.title}</span>
        //         <span className="text-lg font-medium">${data.price}</span>
        //     </p>
        // </div>

/* <Card>
        <Card.Img variant="top" src={data.images[0]} alt={data.title} onClick={()=> showproduct(data)} className='w-full h-48 bg-white cursor-pointer'/>
        <Card.Body>
          <Card.Title>{data.title}  <span className="text-lg font-medium">${data.price}</span></Card.Title>
          <Card.Text>
          </Card.Text>

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
  
            <div className="">
           
  </div>
         
    
           )}
            <Button  variant="success" size="lg" onClick={(e) =>{
                 addProductsToCart(data,e)
                 }}> <ShoppingBagIcon className='h-6 w-6'></ShoppingBagIcon></Button>   
        </Card.Body>
        </Card> */


        <div >
        <div className="group relative h-[17.5rem] transform overflow-hidden rounded-3xl" onClick={()=> showproduct(data)}>
            <div className="absolute bottom-6 left-0 right-4 top-0 rounded-3xl border-2 transition duration-300 group-hover:scale-95 xl:right-6 border-blue-300"></div>
            <div className={`absolute inset-0 bg-indigo-50 ${clipPathStyle}`}  >
            <span className="absolute bottom-0 left-0 bg-white/60 rounded-3xl text-xs m-2 px-3 py-0.5">
                     {data.category.name}
                 </span>
            <img className=" inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-110" src={data.images[0]} alt={data.title}></img>

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
  
            <div className="">
           
  </div>
         
    
           )}
          
      </div>
      </div>
      <h3 className="mt-8 font-display text-xl font-bold tracking-tight text-slate-900">{data.title}</h3>
      <p className="mt-1 text-base tracking-tight text-slate-500">${data.price}</p>
      <div>
      <Button  variant="success" size="lg" onClick={(e) =>{
                 addProductsToCart(data,e)
                 }}> <ShoppingBagIcon className='h-6 w-6'></ShoppingBagIcon></Button>   
      </div>
      </div>


    )
}
export default Card