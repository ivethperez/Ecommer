import {createContext,useContext,useState } from 'react'
 
const ShoppingCartContext = createContext()

export const ShoppingCartProvider = ({children}) =>{
    //Shopping Cart
    const [count, setCount] = useState(0)
    const increment = (event,product) =>{
        event.stopPropagation();    

        const productExists = cartProducts.some(el => el.id === product.id); // dará true si el producto ya se encuentra en el carrito

		if (productExists) {
			// valida la existencia
			const productCart = cartProducts.find(el => el.id === product.id); // busca el producto
			productCart.quantity += 1; // aumenta la cantidad en 1
		} else {
			product.quantity = 1; // si el producto no está, le agrega la propiedad quantity con valor uno, y luego setea el carrito agregando ese producto
			setCartProducts([...cartProducts, product]);
		}    

        setCount(count +1);
    }
    //ProductDetail
    const [openModal,setOpenModal] = useState(false)
    const [productShow,setProductShow] = useState({}) //Array

    //shopping cart- add products to cart
    const [cartProducts,setCartProducts] = useState([]) //Array de objetos

    //checkoutSideMenu
    const [openModalOrder,setOpenModalOrder] = useState(false)
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