import {createContext,useContext,useState } from 'react'
 
const ShoppingCartContext = createContext()

export const ShoppingCartProvider = ({children}) =>{
    const [count, setCount] = useState(0)

    const increment = () =>{
        setCount(count +1);
    }
    return(
        <ShoppingCartContext.Provider value={{
          count,
          setCount,
          increment
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}
export const useShopiContext = () => useContext(ShoppingCartContext);