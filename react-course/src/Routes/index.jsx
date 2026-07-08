import React from 'react'
import { useRoutes } from 'react-router-dom'
import { useShopiContext } from '../Context'
import Home from '../Pages/Home'
import MyAcount from '../Pages/MyAccount'
import MyOrder from '../Pages/MyOrder'
import MyOrders from '../Pages/MyOrders'
import NotFound from '../Pages/NotFound'
import Signin from '../Pages/Signin'
import Ecommer from '../Pages/Ecommer'
import MyCustomPackage from '../Pages/MyCustomPackage'
import PageStart from '../Pages/PageStart'
import Products from '../Pages/Products'
import CustomerManagement from '../Pages/Customer/CustomerManagement'
import Sales from '../Pages/Sales/Sale' 

export const AppRoutes = () =>{
    const { signOut } = useShopiContext();
    return(
        useRoutes([ 
            // { path:'/', element:<Home/> },
            { path:'/', element:<Ecommer/> },
            { path:'/:botanas', element:<Ecommer /> },
            { path:'/my-acount',element: signOut? <Signin />: <MyAcount/> },
            { path:'/my-order', element: <MyOrder/> },
            { path:'/my-orders', element: signOut? <Signin />:<MyOrders/> },
            { path:'/my-orders/last', element: signOut? <Signin />:<MyOrder/> },
            { path:'/my-orders/:id', element:signOut? <Signin />:<MyOrder/> },
            { path:'/*', element:<NotFound/> },
            { path:'/sign-in', element:<Signin/>},
            { path:'/my-custom-package', element:<MyCustomPackage/> },
            { path:'/pageStart', element: signOut? <MyCustomPackage/>: <PageStart/>},
            { path:'/home', element: !signOut ? <Home/> : <MyCustomPackage/>},
            { path:'/products', element: !signOut ? <Products/> : <MyCustomPackage/>},
            { path:'/customerManagement', element: !signOut ? <CustomerManagement/> : <MyCustomPackage/> },
            { path:'/sales', element: !signOut ? <Sales/> : <MyCustomPackage/> }
          ])
    )

}