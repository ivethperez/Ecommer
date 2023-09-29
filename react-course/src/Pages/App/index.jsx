
import { BrowserRouter } from 'react-router-dom'
import {ShoppingCartProvider} from '../../Context'
import {AppRoutes} from '../../Routes'

import './App.css'
import Navbar from '../../Components/Navbar'
import Layout from '../../Components/Layout'


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
