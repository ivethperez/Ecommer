import { createContext, useContext, useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser';
import { totalPrice, apiRequest } from '../utils'
const ShoppingCartContext = createContext()

const API_URL = import.meta.env.VITE_API_URL;
const NUM_CELULAR = import.meta.env.NUM_CELULAR;
export const ShoppingCartProvider = ({ children }) => {

  useEffect(() => {
    fetch(`${API_URL}/priceproducts`)
      .then(response => response.json())
      .then(data => {
        // Agrupar por producto (por Id)
        const mapa = new Map();

        data.forEach(item => {
          const prodId = item.product.id;
          if (!mapa.has(prodId)) {
            mapa.set(prodId, {
              product: item.product,
              options: [],
            });
          }
          mapa.get(prodId).options.push({
            unitOfMeasure: item.unitOfMeasure,
            unitPrice: item.unitPrice
          });
        });

        const productosAgrupados = Array.from(mapa.values());
        setItems(productosAgrupados);

        // Inicializar selección con la primera opción
        const inicial = {};
        productosAgrupados.forEach((item, idx) => {
          item.options.sort((a, b) => a.unitPrice - b.unitPrice);
          inicial[item.product.id] = 0;
        });
        setSelecciones(inicial);

        setItems(Array.from(mapa.values()));

        // setItems(data)
      })
  }, [])

  const [access, setAccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [mensajeAlerta, setMensajeAlerta] = useState("");
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState(0);
  const [productFromEdit, setProductFromEdit] = useState(null);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [clientsItems, setClientsItems] = useState(null);
  const [salesItems, setSalesItems] = useState(null);
  const [paymentMethodos, setPaymentMethods] = useState([])
  const [statusSale, setStatusSale] = useState([])
  const [statusOrder,setStatusOrder] = useState([])
  const [ordersList, setOrdersList] = useState([])
  const [saleDetail, setSaleDetail] = useState([])

  const login = async (email, password) => {
    try {
      //  Petición de login
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('Credenciales incorrectas');
      }

      // Extraer token del JSON
      const { token } = await response.json();
      if (!token) {
        throw new Error('No se recibió token del servidor');
      }
      // Guardar el token(para futuras peticiones)
      setToken(token);

      // Llamar a la ruta protegida con el token
      const userResponse = await fetch(
        `${API_URL}/user/${encodeURIComponent(email)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // 
          }
        }
      );

      if (!userResponse.ok) {
        throw new Error('Usuario no encontrado');
      }

      const user = await userResponse.json();
      setUserId(user[0].id);
      // Guardar datos de usuario en el estado
      setUserName(user[0].name);
      setSignOut(false);

    } catch (err) {
      console.error(err);
    }
  };

  // Acción expuesta, sin useEffect
  const productEdit = async (id) => {
    const res = await apiRequest(`${API_URL}/products/${id}`, "GET", token, userId);
    setProductFromEdit(res);

    const resCategories = await apiRequest(`${API_URL}/categories?products=true`, "GET", token, userId);
    setCategories(resCategories);
  };

  const getImagesProduct = async (productId) => {
    const res = await apiRequest(`${API_URL}/productImages/?productId=${productId}`, "GET", token, userId);
    setImages(res);
  }

  const updateProductImages = async (data) => {
    try {
      const res = await fetch(`${API_URL}/productImages`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("authToken")}`
        },
        body: data
      });
      const resp = await res.json();
      console.log("Respuesta del servidor:", resp);
    } catch (error) {
      console.error("Error al subir imágenes:", error);
    }

  }
  //#region --- Customer ---
  const getCustomers = async () => {
    const res = await apiRequest(`${API_URL}/customers`, "GET", token, userId);
    setClientsItems(res);
  }
  const customerCreate = async (formData) => {
    const res = await apiRequest(`${API_URL}/customers`, "POST", token, userId, formData);
    return res;
  }
  const customerUpdate = async (data) => {
    const res = await apiRequest(`${API_URL}/customers/${data.id}`, "PUT", token, userId, data);
    return res;
  }
  const customerDelete = async (id) => {
    const res = await apiRequest(`${API_URL}/customers/${id}`, "DELETE", token, userId,)
    return res;
  }
  //#endregion

  //#region --- Sales ---
   const saleCreate = async (formData) => {
     const res = await apiRequest(`${API_URL}/sales`, "POST",token, userId, formData);
     return res;
   }
  const getSales = async () => {
    const res = await apiRequest(`${API_URL}/sales`, "GET", token);
    setSalesItems(res);
  }
   const getSaleId = async (id) => {
    const res = await apiRequest(`${API_URL}/sales/${id}`, "GET", token);
    return res;
  }
  const saleUpdate = async (id, customerId, paymentMethodId, statusSaleId, saleDate) => {
    const saleUpdate = [
      {
        id: id,
        customerId: customerId,
        paymentMethodId: paymentMethodId,
        statusSaleId: statusSaleId,
        saleDate: saleDate
      }
    ];
    const res = await apiRequest(`${API_URL}/sales/${id}`, "PUT", token, userId, saleUpdate[0]);
    
    return res;
  }
   const saleDelete = async (id) => {
     const res = await apiRequest(`${API_URL}/sales/${id}`, "DELETE",token, userId,)
     return res;
   }
  //#endregion

  //#region --- SaleDetail ---
  const getSaleDetail = async (saleId) => {
    const res = await apiRequest(`${API_URL}/saleDetails/bySale/${saleId}`, "GET", token);
    setSaleDetail(res);
  }
   const saleDetailCreate = async (formData) => {
      const res = await apiRequest(`${API_URL}/saleDetails`, "POST", token, userId, formData);
      return res;
    }
    const saleDetailUpdate = async (data) => {
    const res = await apiRequest(`${API_URL}/saleDetails/${data.id}`, "PUT", token, userId, data);
    return res;
  }
 const saleDetailDelete = async (id) => {
    const res = await apiRequest(`${API_URL}/saleDetails/${id}`, "DELETE",token, userId,)
    return res;
   }
  //#endregion

  //#region --- Listas ---
  const getPaymentMethods = async () => {
    const res = await apiRequest(`${API_URL}/paymentMethods`, "GET", token);
    setPaymentMethods(res);
  }
  const getStatusOrder = async () => {
    const res = await apiRequest(`${API_URL}/orders/statusOrder/${true}`, "GET", token);
    setStatusOrder(res);
    return res;
  }
  const getOrdersList = async () => {
    await getStatusOrder();
    const statusSale = statusOrder?.filter(item => item.code === "03")
    if(statusSale.length > 0){
    const res = await apiRequest(`${API_URL}/orders/orderslist/${statusSale[0]?.id}`, "GET", token);
    setOrdersList(res);
    }
  }
  const getStatusSale = async () => {
    const res = await apiRequest(`${API_URL}/sales/statusSale/${true}`, "GET", token);
    setStatusSale(res);
  }

  //#endregion

  
  //#region --- Productos ---
  const productCreate = async (formData) => {
    const res = await apiRequest(`${API_URL}/products`, "POST", token, userId, formData);
    return res;
  }
  const productUpdate = async (data) => {
    const res = await apiRequest(`${API_URL}/products/${data.id}`, "PUT", token, userId, data);
    return res;
  }
  const productDelete = async (id) => {
    const res = await apiRequest(`${API_URL}/products/${id}`, "DELETE", token, userId,)
    return res;
  }
    const getProductPrice = async (productId, unitOfMeasureId) => {
    const res = await apiRequest(`${API_URL}/priceproducts/by-product/${productId}/${unitOfMeasureId}`, "GET", token);
    return res;
  }
  //#endregion


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
        return [{ ...productWithoutId, quantity: 1, cartId: `${product.producto.Id}-${precio}`, precio: precio }];
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

  //Get products --- Filtros ---
  const [items, setItems] = useState(null)

  const [searchByTitle, setSearchByTitle] = useState(null)
  const [searchByNameCustomer, setSearchByNameCustomer] = useState(null)
  const [filteredCustomerItems, setFilteredCustomerItems] = useState(null)
  const [searchByFolioSale, setSearchByFolioSale] = useState(null)
  const [filteredSalesItems, setFilteredSalesItems] = useState(null)

  const [filteredItems, setFilteredItems] = useState(null)
  const search = (event) => {
    setSearchByTitle(event.target.value)
  }
  const searchCustomer = (event) => {
    setSearchByNameCustomer(event.target.value)
  }
    const searchSales = (event) => {
    setSearchByFolioSale(event.target.value)
  }

  const filteredItemsByTitle = (items, searchByTitle) => {
    return items?.filter(item => item.product.name.toLowerCase().includes(searchByTitle.toLowerCase()))
  }

  //Filtro por categoría
  const [searchByCategory, setSearchByCategory] = useState(null)

  const filteredItemsByCategory = (items, searchByCategory) => {
    return items?.filter(item => item.product.category.name.toLowerCase().includes(searchByCategory.toLowerCase()))
  }
  const filteredItemsByCustomer = (items, searchByNameCustomer) => {
    return items?.filter(item => item.name.toLowerCase().includes(searchByNameCustomer.toLowerCase()))
  }
   const filteredItemsBySale = (items, searchByFolioSale) => {
    return items?.filter(item => item.folio.toLowerCase().includes(searchByFolioSale.toLowerCase()))
  }

  const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
    if (searchType === 'BY_TITLE') {
      return filteredItemsByTitle(items, searchByTitle)
    }
    if (searchType === 'BY_CATEGORY') {
      return filteredItemsByCategory(items, searchByCategory)
    }
    if (searchType === 'BY_TITLE_AND_CATEGORY') {
      return filteredItemsByCategory(items, searchByCategory).filter(item => item.product.name.toLowerCase().includes(searchByTitle.toLowerCase()))
    }
    if (searchType === 'BY_CUSTOMER') {
      return filteredItemsByCustomer(items, searchByTitle)
    }
    if (searchType === 'BY_FOLIO') {
      return filteredItemsBySale(items, searchByTitle)
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

  useEffect(() => {
    if (searchByNameCustomer) setFilteredCustomerItems(filterBy('BY_CUSTOMER', clientsItems, searchByNameCustomer))
    if (!searchByNameCustomer) setFilteredCustomerItems(filterBy(null, clientsItems, searchByNameCustomer))
  }, [clientsItems, searchByNameCustomer])

 useEffect(() => {
    if (searchByFolioSale) setFilteredSalesItems(filterBy('BY_FOLIO', salesItems, searchByFolioSale))
    if (!searchByFolioSale) setFilteredSalesItems(filterBy(null, salesItems, searchByFolioSale))
  }, [salesItems, searchByFolioSale])

  //My acount
  const [account, setAccount] = useState({})
  const [accountLogin, setAccountLogin] = useState({})

  //Sign out
  const [signOut, setSignOut] = useState(true)

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
  const [respEmail, setRespEmail] = useState(false)
  const [errorEmail, setErrorEmail] = useState(false)
  const sendEmail = async (e) => {
    e.preventDefault()
    //'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY'
    emailjs.sendForm('', '', form.current, '')
      .then((result) => {
        setRespEmail(true);
      }, (error) => {
        setErrorEmail(true);
      });

  }
  const timeClose = async () => {
    const timer = setTimeout(() => setOpenModalOrder(false), 3000);
    return () => clearTimeout(timer);
  }
  const [phoneNumber, setPhoneNumber] = useState(`${NUM_CELULAR}`);
  const finishOrder = async () => {
    let products = ''
    let medida = ''
    order.forEach(element => {
      var med = element.opciones.filter(p => p.precio === element.precio);
      medida = med[0].unidad.Nombre;
      products = products + '*Producto:* ' + element.producto.Nombre + ' ' + medida + ', Cantidad: ' + element.quantity + ', Precio: $' + element.precio + ' \n'
    });
    window.open(`https://wa.me/${phoneNumber}?text=` + encodeURIComponent('Hola! envío la confirmación de mi pedido: \n\n' + products + '*Total a pagar:* $' + '*' + totalPrice(order) + '*' + " " + '*más envío*'), '_blank');

    setTypeAlert('confirmacion')
    setShowAlert(true)
    setCartProducts([])
    setCount(0)
    setOrder([])
  }

  const scrollTo = () => {
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
      searchCustomer,
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
      setMensajeAlerta,
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
      setPrecioSeleccionado,
      login,
      access,
      productFromEdit,
      setProductFromEdit,
      categories,
      productEdit,
      getImagesProduct,
      images,
      setImages,
      updateProductImages,
      clientsItems,
      setClientsItems,
      filteredCustomerItems,
      getCustomers,
      customerCreate,
      mensajeAlerta,
      customerUpdate,
      customerDelete,
      salesItems,
      setSalesItems,
      getSales,
      getPaymentMethods,
      paymentMethodos,
      setPaymentMethods,
      getProductPrice,
      getOrdersList,
      ordersList,
      getStatusSale,
      statusSale,
      saleCreate,
      saleDetailCreate,
      saleDetail,
      getSaleDetail,
      filteredSalesItems,
      setFilteredSalesItems,
      searchSales,
      setSaleDetail,
      getSaleId,
      saleUpdate,
      saleDelete,
      saleDetailUpdate,
      saleDetailDelete,
      isLoggedIn, 
      setIsLoggedIn,
      productUpdate
    }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}
export const useShopiContext = () => useContext(ShoppingCartContext);