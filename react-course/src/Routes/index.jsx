import React from 'react'
import { useRoutes } from 'react-router-dom'
import { useShopiContext } from '../Context'
import Home from '../Pages/Home'
import MyAcount from '../Pages/MyAccount'
import MyOrder from '../Pages/MyOrder'
import MyOrders from '../Pages/MyOrders'
import NotFound from '../Pages/NotFound'
import Signin from '../Pages/Signin'
import HomePage from '../Pages/HomePage'
import Ecommer from '../Pages/Ecommer'

export const AppRoutes = () =>{
    const { signOut } = useShopiContext();
    console.log(signOut)
    return(
        useRoutes([ 
            { path:'/', element:<Home/> },
            { path:'/ecommer', element:<Ecommer/> },
            { path:'/:botanas', element:<Ecommer /> },
            { path:'/my-acount',element: signOut? <Signin />: <MyAcount/> },
            { path:'/my-order', element: signOut? <Signin />:<MyOrder/> },
            { path:'/my-orders', element: signOut? <Signin />:<MyOrders/> },
            { path:'/my-orders/last', element: signOut? <Signin />:<MyOrder/> },
            { path:'/my-orders/:id', element:signOut? <Signin />:<MyOrder/> },
            { path:'/*', element:<NotFound/> },
            { path:'/sign-in', element:<Signin/>},
          ])
    )

}