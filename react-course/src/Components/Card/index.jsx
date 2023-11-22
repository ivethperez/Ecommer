
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
<div>
<li>
    <ul role="list" class="flex flex-col gap-y-6 sm:gap-y-8">
        <li>
            <figure class="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10">
                <svg aria-hidden="true" width="105" height="78" class="absolute left-6 top-6 fill-slate-100">
                    <path d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z">
                        </path>
                        </svg>
                        <blockquote class="relative">
                            <p class="text-lg tracking-tight text-slate-900">TaxPal is so easy to use I can’t help but wonder if it’s really doing the things the government expects me to do.</p>
                            </blockquote><figcaption class="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6"><div>
                                <div class="font-display text-base text-slate-900">Sheryl Berge</div><div class="mt-1 text-sm text-slate-500">CEO at Lynch LLC</div></div>
                                <div class="overflow-hidden rounded-full bg-slate-50">
                                    <img alt="" loading="lazy" width="56" height="56" decoding="async" data-nimg="1" class="h-14 w-14 object-cover"  src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Favatar-1.c78616b7.png&amp;w=128&amp;q=75"/>
                                    </div>
                                    </figcaption>
                                    </figure>
                                    </li><li>
                                        <figure class="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10">
                                            <svg aria-hidden="true" width="105" height="78" class="absolute left-6 top-6 fill-slate-100">
                                                <path d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z"></path></svg>
                                                <blockquote class="relative"><p class="text-lg tracking-tight text-slate-900">I’m trying to get a hold of someone in support, I’m in a lot of trouble right now and they are saying it has something to do with my books. Please get back to me right away.</p></blockquote>
                                                <figcaption class="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6"><div>
                                                    <div class="font-display text-base text-slate-900">Amy Hahn</div><div class="mt-1 text-sm text-slate-500">Director at Velocity Industries</div></div>
                                                    <div class="overflow-hidden rounded-full bg-slate-50">
                                                        <img alt="" loading="lazy" width="56" height="56" decoding="async" data-nimg="1" class="h-14 w-14 object-cover"  src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Favatar-4.16b4e29e.png&amp;w=128&amp;q=75"/></div>
                                                        </figcaption></figure></li></ul></li>
</div>


    )
}
export default Card