import { createContext, useContext, useState,useEffect } from 'react'
const ShoppingCartContext = createContext()

 //LocalStorage sign out

 export const initializeLocalStorage = () => {
  const accountInLocalStorage = localStorage.getItem('account');
  const singOutInLocalStorage = localStorage.getItem('sing-out');

  let parsedAccount;
  let parsedSingOut;

  if (!accountInLocalStorage || !singOutInLocalStorage) {
    localStorage.setItem('account', JSON.stringify({}));
    localStorage.setItem('sing-out', JSON.stringify(false));
    parsedAccount = {};
    parsedSingOut = false;
  } else {
    parsedAccount = JSON.parse(accountInLocalStorage);
    parsedSingOut = JSON.parse(singOutInLocalStorage);
  }
}

export const ShoppingCartProvider = ({ children }) => {

    useEffect(()=>{
        fetch('https://api-product-5iv7.onrender.com/products')
        .then(response=> response.json())
        .then(data => setItems(data))
        },[])

    //Shopping Cart
    const [count, setCount] = useState(0)
    const increment = (event, product) => {
        event.stopPropagation();
        const productExists = cartProducts.some(el => el.id === product.id); // dará true si el producto ya se encuentra en el carrito
        if (productExists) {
            const productCart = cartProducts.find(el => el.id === product.id); // busca el producto
            productCart.quantity += 1; // aumenta la cantidad en 1
        } else {
            product.quantity = 1; // si el producto no está, le agrega la propiedad quantity con valor uno, y luego setea el carrito agregando ese producto
            setCartProducts([...cartProducts, product]);
        }
        setCount(count + 1);
    }
    //ProductDetail
    const [openModal, setOpenModal] = useState(false)
    const [productShow, setProductShow] = useState({}) //Array

    //shopping cart- add products to cart
    const [cartProducts, setCartProducts] = useState([]) //Array de objetos

    //checkoutSideMenu
    const [openModalOrder, setOpenModalOrder] = useState(false)

    // ShoppingCard Order
    const [order, setOrder] = useState([])

    // Increment and decrement cartProductToCheckout
    const increentToCheckout = (id) => {
        const productCart = cartProducts.find(el => el.id === id); // busca el producto
        productCart.quantity += 1;
        setCount(count + 1);
    }
    // Increment and decrement cartProductToCheckout
    const decrementToCheckout = (id) => {
        const productCart = cartProducts.find(el => el.id === id); // busca el producto
        productCart.quantity -= 1;
        setCount(count -1);
    }

    //Get products
    const [items,setItems] = useState(null)
    
    const [searchByTitle,setSearchByTitle] = useState(null)  


    const [filteredItems,setFilteredItems] = useState(null)
    const search = (event) => {
        setSearchByTitle(event.target.value)
      }

  const filteredItemsByTitle =(items,searchByTitle) =>{
    return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
 }

    //Filtro por categoría
    const [searchByCategory,setSearchByCategory] = useState(null)  

    const filteredItemsByCategory =(items,searchByCategory) =>{
         return items?.filter(item => item.category.name.toLowerCase().includes(searchByCategory.toLowerCase()))
     }

     const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
        if (searchType === 'BY_TITLE') {
          return filteredItemsByTitle(items, searchByTitle)
        }
    
        if (searchType === 'BY_CATEGORY') {
          return filteredItemsByCategory(items, searchByCategory)
        }
    
        if (searchType === 'BY_TITLE_AND_CATEGORY') {
          return filteredItemsByCategory(items, searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
        }
    
        if (!searchType) {
          return items
        }
      }

    useEffect(() => {
        if (searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY', items, searchByTitle, searchByCategory))
        if (searchByTitle && !searchByCategory) setFilteredItems(filterBy('BY_TITLE', items, searchByTitle, searchByCategory))
        if (!searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_CATEGORY', items, searchByTitle, searchByCategory))
        if (!searchByTitle && !searchByCategory) setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory))       
      }, [items, searchByTitle, searchByCategory])


     //My acount
     const [account, setAccount] = useState({})
      //Sign out
      const [signOut,setSignOut] = useState(false)

      //Create account
      const [view, setView] = useState('user-info')

      //ShoppingCart
      // Product Detail · Open/Close
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
  const openProductDetail = () => setIsProductDetailOpen(true)
  const closeProductDetail = () => setIsProductDetailOpen(false)

    return (
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
            setOpenModalOrder,
            order,
            setOrder,
            increentToCheckout,
            decrementToCheckout,
            items,
            setItems,
            search,
            searchByTitle,
            filteredItems,
            setSearchByCategory,
            setSearchByTitle,
            account,
            setAccount,
            signOut,
            setSignOut,
            view,
            setView,
            openProductDetail,
            closeProductDetail,
            isProductDetailOpen
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}
export const useShopiContext = () => useContext(ShoppingCartContext);