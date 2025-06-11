import { createContext, useContext, useState, useEffect,useRef } from 'react'
import emailjs from '@emailjs/browser';
import { totalPrice } from '../utils'
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
    fetch('apiproducts.snacksleier.com/api/priceproducts')
    .then(response => response.json())
    .then(data => {
       // Agrupar por producto (por Id)
        const mapa = new Map();

        data.forEach(item => {
          const prodId = item.Productos.Id;
          if (!mapa.has(prodId)) {
            mapa.set(prodId, {
              producto: item.Productos,
              opciones: [],
            });
          }
          mapa.get(prodId).opciones.push({
            unidad: item.UnidadesMedida,
            precio: item.PrecioUnitario
          });
        });

          const productosAgrupados = Array.from(mapa.values());
        setItems(productosAgrupados);

        // Inicializar selección con la primera opción
        const inicial = {};
        productosAgrupados.forEach((item, idx) => {
          inicial[item.producto.Id] = 0;
        });
        setSelecciones(inicial);

      setItems(Array.from(mapa.values()));
      
     // setItems(data)
    })
  }, [])

const [selecciones, setSelecciones] = useState({});
  //Shopping Cart
  const [count, setCount] = useState(0)

  const increment = (event, product, precio) => {
    event.stopPropagation();
      setCartProducts((prevCartProducts) => {
        const existingProductIndex = prevCartProducts.findIndex(
          (el) => el.cartId === `${product.producto.Id}-${precio}`
        );
    
        if (existingProductIndex !== -1) {
          return prevCartProducts.map((el, index) =>
            index === existingProductIndex ? { ...el, quantity: el.quantity + 1, precio: precio } : el
          );
        } else {
          const { id, ...productWithoutId } = product; // Elimina el id del producto
          return [{ ...productWithoutId, quantity: 1, cartId: `${product.producto.Id}-${precio}`, precio:precio }];
        }
      });
    
      setOrder((prevOrder) => {
        const existingOrderIndex = prevOrder.findIndex(
          (el) => el.cartId === `${product.producto.Id}-${precio}`
        );
    
        if (existingOrderIndex !== -1) {
          return prevOrder.map((el, index) =>
            index === existingOrderIndex ? { ...el, quantity: el.quantity + 1, precio: precio } : el
          );
        } else {
          const { id, ...productWithoutId } = product; // Elimina el id del producto
          return [...prevOrder, { ...productWithoutId, quantity: 1, cartId: `${product.producto.Id}-${precio}`, precio: precio }];
        }
      });
      setCount(count + 1);
      setOpenModalOrder(true);      
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
    const productOrder = order.find(el => el.cartId === id); // busca el producto
    productOrder.quantity += 1;
    setCount(count + 1);
  }
  // Increment and decrement cartProductToCheckout
  const decrementToCheckout = (id) => {
    const productOrder = order.find(el => el.cartId === id); // busca el producto
    productOrder.quantity -= 1;
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
    return items?.filter(item => item.producto.Nombre.toLowerCase().includes(searchByTitle.toLowerCase()))
  }

  //Filtro por categoría
  const [searchByCategory, setSearchByCategory] = useState(null)

  const filteredItemsByCategory = (items, searchByCategory) => {
    return items?.filter(item => item.producto.CategoriasProducto.Nombre.toLowerCase().includes(searchByCategory.toLowerCase()))
  }

  const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
    if (searchType === 'BY_TITLE') {
      return filteredItemsByTitle(items, searchByTitle)
    }
    if (searchType === 'BY_CATEGORY') {
      return filteredItemsByCategory(items, searchByCategory)
    }
    if (searchType === 'BY_TITLE_AND_CATEGORY') {
      return filteredItemsByCategory(items, searchByCategory).filter(item => item.producto.Nombre.toLowerCase().includes(searchByTitle.toLowerCase()))
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
    if (searchByCategory == 'Chocolates') {
      setisActiveChocolate(true);
      setisActiveBotanas(false)
      setisActiveGomitas(false)
      setisActiveTodo(false)
    }
    else if (searchByCategory == 'Gomitas') {
      setisActiveGomitas(true)
      setisActiveChocolate(false)
      setisActiveBotanas(false)
      setisActiveTodo(false)
    }
    else if (searchByCategory == 'Botanas') {
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



  const [precioSeleccionado, setPrecioSeleccionado] = useState()

  const [cartProduct, setCartProduct] = useState([]) //Array de objetos cart individual

  const [showAlert, setShowAlert] = useState(false);
  const [typeAlert, setTypeAlert] = useState('');

  //Envio de correo y tel
  const form = useRef();
  const [respEmail,setRespEmail] = useState(false)
  const [errorEmail,setErrorEmail] = useState(false)
  const sendEmail = async(e) =>{
    e.preventDefault()
    //'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY'
    emailjs.sendForm('', '', form.current, '')
    .then((result) => {
      setRespEmail(true);
    }, (error) => {
        setErrorEmail(true);
    });

  }
  const timeClose = async() =>{
    const timer = setTimeout(() => setOpenModalOrder(false), 3000);
    return () => clearTimeout(timer);
  }
  const [phoneNumber, setPhoneNumber] = useState('521');
  const finishOrder = async() =>{
        let products = ''
        let medida = ''
        order.forEach(element => {
           var med = element.opciones.filter(p=> p.precio === element.precio);
           medida = med[0].unidad.Nombre;
          products = products + '*Producto:* ' + element.producto.Nombre + ' ' + medida + ', Cantidad: ' + element.quantity + ', Precio: $' + element.precio + ' \n '
        });
        window.open(`https://wa.me/${phoneNumber}?text= ` + encodeURIComponent('Hola! envío la confirmación de mi pedido: \n\n' + products + '*Total a pagar: $*' + totalPrice(order) + "" + ' + envío' ), '_blank');  
        setTypeAlert('confirmacion')
        setShowAlert(true)
        setCartProducts([])
        setCount(0)
        setOrder([])
  }

  const scrollTo=()=>{
    window.scrollTo(0, 0);
  }
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
 
      cartProduct,
      setCartProduct,
      showAlert,
      setShowAlert,
      setTypeAlert,
      typeAlert,
      form,
      sendEmail,
      respEmail,
      errorEmail,
      scrollTo,
      timeClose,
      finishOrder,
      setSelecciones,
      selecciones,
      precioSeleccionado, 
      setPrecioSeleccionado
    }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}
export const useShopiContext = () => useContext(ShoppingCartContext);