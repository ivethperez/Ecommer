
import { BrowserRouter } from 'react-router-dom'
import {ShoppingCartProvider} from '../../Context'
import {AppRoutes} from '../../Routes'

import './App.css'
import Navbar1 from '../../Components/Navbar1'
import Layout from '../../Components/Layout'
import Footerr from '../../Footer'


const App =() => {
   return(
<ShoppingCartProvider>
<BrowserRouter>
    <Navbar1></Navbar1>
    <main>
    <Layout>
      <AppRoutes></AppRoutes>
    </Layout>
    </main>
    <Footerr></Footerr>
   </BrowserRouter>
</ShoppingCartProvider>
 
 
   )
}

export default App
