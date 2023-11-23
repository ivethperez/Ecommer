
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


//         <div >
//         <div className="group relative h-[17.5rem] transform overflow-hidden rounded-3xl" onClick={()=> showproduct(data)}>
//             <div className="absolute bottom-6 left-0 right-4 top-0 rounded-3xl border-2 transition duration-300 group-hover:scale-95 xl:right-6 border-blue-300"></div>
//             <div className={`absolute inset-0 bg-indigo-50 ${clipPathStyle}`}  >
//             <span className="absolute bottom-0 left-0 bg-white/60 rounded-3xl text-xs m-2 px-3 py-0.5">
//                      {data.category.name}
//                  </span>
//             <img className=" inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-110" src={data.images[0]} alt={data.title}></img>

//             {cartProducts.filter((product) => product.id === data.id)
//              .length > 0 ? (

//                 <button 
//                          className="absolute top-0 right-0 flex justify-center items-center text-xs bg-green-700 w-6 h-6 rounded-full m-2"
//                          onClick={(e) =>{
//                              addProductsToCart(data,e)
//                              }}>
//                               <CheckIcon className='h-5 w-5 text-white' />
//                          </button>    
               
                     
//            ) : (
  
//             <div className="">
           
//   </div>
         
    
//            )}
          
//       </div>
//       </div>
//       <h3 className="mt-8 font-display text-xl font-bold tracking-tight text-slate-900">{data.title}</h3>
//       <p className="mt-1 text-base tracking-tight text-slate-500">${data.price}</p>
//       <div>
//       <Button  variant="success" size="lg" onClick={(e) =>{
//                  addProductsToCart(data,e)
//                  }}> <ShoppingBagIcon className='h-6 w-6'></ShoppingBagIcon></Button>   
//       </div>
//       </div>

<li>
    <ul role="list" class="flex flex-col w-full">
        <li>
            <figure class="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10">
                
                        <blockquote className="relative h-[10.5rem] transform overflow-hidden"  onClick={()=> showproduct(data)}>
                        <span className="absolute bottom-0 left-0 bg-white/60 rounded-3xl text-xs m-2 px-3 py-0.5">
                             {data.category.name}
                         </span>
                        <img className=" inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-110  rounded-2xl" src={data.images[0]} alt={data.title}></img>

                            </blockquote><figcaption class="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6"><div>
                                <div class="font-display text-base text-slate-900">{data.title}</div><div class="mt-1 text-sm text-slate-500">
                                    
                                    
                                <div class="mt-8 flex justify-center">
                                    <div class="relative">
                                        <div class="grid grid-cols-3" id="headlessui-radiogroup-:Rraqlla:" role="radiogroup">
                                            <div class="cursor-pointer border border-gray-300 px-[calc(theme(spacing.2)-1px)] py-[calc(theme(spacing.2)-1px)] text-sm text-gray-700 outline-2 outline-offset-2 transition-colors hover:border-gray-400 rounded-l-lg" id="headlessui-radiogroup-option-:Rqraqlla:" role="radio" aria-checked="false" tabindex="-1" data-headlessui-state="">
                                                1kg</div>
                                                <div class="cursor-pointer border border-gray-300 px-[calc(theme(spacing.2)-1px)] py-[calc(theme(spacing.2)-1px)] text-sm text-gray-700 outline-2 outline-offset-2 transition-colors hover:border-gray-400" id="headlessui-radiogroup-option-:R1araqlla:" role="radio" aria-checked="true" tabindex="0" data-headlessui-state="">
                                                    1/2kg</div>
                                                    <div class="cursor-pointer border border-gray-300 px-[calc(theme(spacing.2)-1px)] py-[calc(theme(spacing.2)-1px)] text-sm text-gray-700 outline-2 outline-offset-2 transition-colors hover:border-gray-400 -ml-px rounded-r-lg" id="headlessui-radiogroup-option-:R1araqlla:" role="radio" aria-checked="true" tabindex="0" data-headlessui-state="">
                                                    1/4kg</div>
                                                    </div>
                                                    <div aria-hidden="true" class="pointer-events-none absolute inset-0 z-10 grid grid-cols-3 overflow-hidden rounded-lg bg-cyan-500 transition-all duration-300 [clip-path:inset(0_0_0_calc(50%-1px))]">
                                                        <div class="py-2 text-center text-sm font-semibold text-white"></div>
                                                        <div class="py-2 text-center text-sm font-semibold text-white -ml-px">1/2kg</div>
                                                        <div class="py-2 text-center text-sm font-semibold text-white -ml-px">1/4kg</div>
                                                        </div>
                                                        </div>
                                                        </div>
                                    
                                    
                                    
                                    ${data.price}</div></div>
                                <div class="overflow-hidden rounded-full bg-slate-50">
                                    
                                       <Button  variant="success" size="lg" onClick={(e) =>{
                  addProductsToCart(data,e)
                  }}> <ShoppingBagIcon className='h-6 w-6'></ShoppingBagIcon></Button>  

                                    </div>
                                    </figcaption>
                                    </figure>
                                    </li></ul></li>



    )
}
export default Card