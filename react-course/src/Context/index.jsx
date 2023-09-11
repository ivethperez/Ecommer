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
    const [productShow,setProductShow] = useState({})

    return(
        <ShoppingCartContext.Provider value={{
          count,
          setCount,
          increment,
          openModal,
          setOpenModal,
          productShow,
          setProductShow,
         
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}
export const useShopiContext = () => useContext(ShoppingCartContext);