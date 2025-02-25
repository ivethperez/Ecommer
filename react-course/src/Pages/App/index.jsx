
import { BrowserRouter } from 'react-router-dom'
import {ShoppingCartProvider} from '../../Context'
import {AppRoutes} from '../../Routes'

import './App.css'
import Navbar from '../../Components/Navbar'
import Layout from '../../Components/Layout'
import Footerr from '../../Footer'


const App =() => {
   return(
<ShoppingCartProvider>
<BrowserRouter>
    <Navbar></Navbar>
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
