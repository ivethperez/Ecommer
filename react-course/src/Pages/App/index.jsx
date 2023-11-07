
import { BrowserRouter } from 'react-router-dom'
import {ShoppingCartProvider} from '../../Context'
import {AppRoutes} from '../../Routes'

import './App.css'
import Navbar3 from '../../Components/Navbar3'
import Layout from '../../Components/Layout'


const App =() => {
   return(
<ShoppingCartProvider>
<BrowserRouter>
    <Navbar3></Navbar3>
    <Layout>
      <AppRoutes></AppRoutes>
    </Layout>
   </BrowserRouter>
</ShoppingCartProvider>
 
 
   )
}

export default App
