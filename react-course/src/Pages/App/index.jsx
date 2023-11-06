
import { BrowserRouter } from 'react-router-dom'
import {ShoppingCartProvider} from '../../Context'
import {AppRoutes} from '../../Routes'

import './App.css'
import Navbar1 from '../../Components/Navbar1'
import Layout from '../../Components/Layout'


const App =() => {
   return(
<ShoppingCartProvider>
<BrowserRouter>
    <Navbar1></Navbar1>
    <Layout>
      <AppRoutes></AppRoutes>
    </Layout>
   </BrowserRouter>
</ShoppingCartProvider>
 
 
   )
}

export default App
