import {createContext,useState } from "react"
 
export const ShoppingCartContext = createContext()


export const ShoppingCartProvider = ({Children}) =>{
    const [count,setCount] = useState(0)
console.log("count "+ count)
    return(
        <ShoppingCartContext.Provider value={{count,setCount}}>
            {Children}
        </ShoppingCartContext.Provider>
    )
}