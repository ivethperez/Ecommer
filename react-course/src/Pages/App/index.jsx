
import { useRoutes,BrowserRouter } from 'react-router-dom'
import {ShoppingCartProvider} from '../../Context'
import Home from '../Home'
import MyAcount from '../MyAccount'
import MyOrder from '../MyOrder'
import MyOrders from '../MyOrders'
import NotFound from '../NotFound'
import Signin from '../Signin'
import Navbar from '../../Components/Navbar'
import './App.css'
import Layout from '../../Components/Layout'
const AppRoutes = () =>{
  let routes = useRoutes([ { path:'/', element:<Home/> },
    { path:'/my-acount',element:<MyAcount/> },
    { path:'/my-order', element:<MyOrder/> },
    { path:'/my-orders', element:<MyOrders/> },
    { path:'/my-orders/last', element:<MyOrder/> },
    { path:'/*', element:<NotFound/> },
    { path:'/sign-in', element:<Signin/>},
  ])
  return routes
}

const App =() => {
   return(
<ShoppingCartProvider>
<BrowserRouter>
    <Navbar></Navbar>
    <Layout>
      <AppRoutes></AppRoutes>
    </Layout>
   </BrowserRouter>
</ShoppingCartProvider>
 
 
   )
}

export default App
