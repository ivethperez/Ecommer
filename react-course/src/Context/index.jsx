import {createContext,useContext,useState } from 'react'
 
const ShoppingCartContext = createContext()

export const ShoppingCartProvider = ({children}) =>{
    //Shopping Cart
    const [count, setCount] = useState(0)
    const increment = (event) =>{
        event.stopPropagation();
        setCount(count +1);
    }
    //ProductDetail
    const [openModal,setOpenModal] = useState(false)
    const [productShow,setProductShow] = useState({}) //Array

    //shopping cart- add products to cart
    const [cartProducts,setCartProducts] = useState([]) //Array de objetos

    //checkoutSideMenu
    const [openModalOrder,setOpenModalOrder] = useState(false)
   
    console.log(openModal,openModalOrder)
    return(
        <ShoppingCartContext.Provider value={{
          count,
          setCount,
          increment,
          openModal,
          setOpenModal,
          productShow,
          setProductShow,
          cartProducts,
          setCartProducts,
          openModalOrder,
          setOpenModalOrder
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}
export const useShopiContext = () => useContext(ShoppingCartContext);