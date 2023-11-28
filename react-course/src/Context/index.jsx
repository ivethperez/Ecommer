import { createContext, useContext, useState, useEffect } from 'react'
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

  useEffect(() => {
    fetch('https://api-product-5iv7.onrender.com/products')
      .then(response => response.json())
      .then(data => setItems(data))
  }, [])

  
  //Shopping Cart
  const [count, setCount] = useState(0)
  const increment = (event, product) => {
    event.stopPropagation();
    const productExists = cartProducts.some(el => el.id === product.id); // dará true si el producto ya se encuentra en el carrito
    if (productExists) {
      const productCart = cartProducts.find(el => el.id === product.id); // busca el producto
      
      productCart.quantity += 1; // aumenta la cantidad en 1
      productCart.price = price(productCart)
    } else {
      product.quantity = 1; // si el producto no está, le agrega la propiedad quantity con valor uno, y luego setea el carrito agregando ese producto
      setCartProducts([...cartProducts, product]);
      product.price = price(product)
    }
    setCount(count + 1);
  }
  const price = (productCart) => {

    console.log(isKilo,isMedioKilo,isCuartoKilo)
    if (isKilo)
      return productCart.priceKilo
    else if (isMedioKilo)
      return productCart.priceMedio
    else if (isCuartoKilo)
      return productCart.priceCuarto
    else
      return productCart.priceKilo
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
    setCount(count - 1);
  }

  //Get products
  const [items, setItems] = useState(null)

  const [searchByTitle, setSearchByTitle] = useState(null)


  const [filteredItems, setFilteredItems] = useState(null)
  const search = (event) => {
    setSearchByTitle(event.target.value)
  }

  const filteredItemsByTitle = (items, searchByTitle) => {
    return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
  }

  //Filtro por categoría
  const [searchByCategory, setSearchByCategory] = useState(null)

  const filteredItemsByCategory = (items, searchByCategory) => {
    return items?.filter(item => item.category.name.toLowerCase().includes(searchByCategory.toLowerCase()))
  }

  const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
    //console.log('cat' + searchByTitle)
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
    //console.log(searchByTitle, searchByCategory);
    if (searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY', items, searchByTitle, searchByCategory))
    if (searchByTitle && !searchByCategory) setFilteredItems(filterBy('BY_TITLE', items, searchByTitle, searchByCategory))
    if (!searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_CATEGORY', items, searchByTitle, searchByCategory))
    if (!searchByTitle && !searchByCategory) setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory))
    if (searchByCategory == 'chocolates') {
      setisActiveChocolate(true);
      setisActiveBotanas(false)
      setisActiveGomitas(false)
      setisActiveTodo(false)
    }
    else if (searchByCategory == 'gomitas') {
      setisActiveGomitas(true)
      setisActiveChocolate(false)
      setisActiveBotanas(false)
      setisActiveTodo(false)
    }
    else if (searchByCategory == 'botanas') {
      setisActiveBotanas(true)
      setisActiveGomitas(false)
      setisActiveChocolate(false)
      setisActiveTodo(false)
    }
    else {
      setisActiveGomitas(false)
      setisActiveChocolate(false)
      setisActiveBotanas(false)
      setisActiveTodo(true)
    }

  }, [items, searchByTitle, searchByCategory])


  //My acount
  const [account, setAccount] = useState({})
  //Sign out
  const [signOut, setSignOut] = useState(false)

  //Create account
  const [view, setView] = useState('user-info')

  //ShoppingCart
  // Product Detail · Open/Close
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
  const openProductDetail = () => setIsProductDetailOpen(true)
  const closeProductDetail = () => setIsProductDetailOpen(false)

  const [isActiveChocolate, setisActiveChocolate] = useState(false)
  const [isActiveGomitas, setisActiveGomitas] = useState(false)
  const [isActiveBotanas, setisActiveBotanas] = useState(false)
  const [isActiveTodo, setisActiveTodo] = useState(false)


  const [phoneNumber, setPhoneNumber] = useState('2228189400');
  const [mensajePedido, setmensajePedido] = useState('Prueba mensaje');

  const [isKilo, setIsKilo] = useState(false)
  const [isMedioKilo, setIsMedioKilo] = useState(false)
  const [isCuartoKilo, setIsCuartoKilo] = useState(false)

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
      isProductDetailOpen,
      isActiveChocolate,
      isActiveGomitas,
      isActiveBotanas,
      isActiveTodo,
      phoneNumber,
      mensajePedido,
      setIsKilo,
      setIsMedioKilo,
      setIsCuartoKilo,
      isKilo,
      isMedioKilo,
      isCuartoKilo

    }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}
export const useShopiContext = () => useContext(ShoppingCartContext);