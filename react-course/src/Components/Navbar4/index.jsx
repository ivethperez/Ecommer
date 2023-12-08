import { Link, NavLink } from 'react-router-dom'
import { useShopiContext } from '../../Context'
import storage from '../../utils/storage'
import ShoppingCart from '../ShoppingCart'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
const Navbar4=()=>{
    const { setSearchByCategory, setSignOut, signOut, account,setShowEcomm,showEcomm,order } = useShopiContext();
    const isUserSignOut = signOut || storage.getItem('sign-out')

    const parsedAccount = storage.getItem('account')
    const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
    const noAccountInLocalState = account ? Object.keys(account).length === 0 : true
    const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState

    const handleSignOut = () => {
        storage.setItem('sign-out', true)
        setSignOut(true)
        // return <Navigate replace to={'/'}></Navigate>
    }
    const ocultar= () =>{
        setSearchByCategory()
        setShowEcomm(true)
    }

    const renderView = () => {
        // console.log(hasUserAnAccount, isUserSignOut)
         if (hasUserAnAccount && !isUserSignOut) {
             return (
 
                 <NavDropdown title={parsedAccount?.email} id="collapsible-nav-dropdown">
                     <NavDropdown.Item >
                         <Link className=' decoration-transparent text-black' to='/my-order'
                         >
                             Mi orden
                         </Link>
                     </NavDropdown.Item>
 
                     <NavDropdown.Item >
                         <Link to='/my-orders' className=' decoration-transparent text-black' >
                             Mis órdenes
                         </Link>
                     </NavDropdown.Item>
 
                     <NavDropdown.Item >
                         <Link to='/my-acount' className=' decoration-transparent text-black'
                         >
                             Mi cuenta
                         </Link>
                     </NavDropdown.Item>
 
                     <NavDropdown.Divider />
                     <NavDropdown.Item >
                         <Link to='/sign-in' className=' decoration-transparent text-black'
                             onClick={() => handleSignOut()}>
                             Cerrar sesión
                         </Link>
                     </NavDropdown.Item>
 
                 </NavDropdown>
 
             )
         }
         else {
             
             return (
 
                 // <NavLink to='/sign-in' className=' decoration-transparent text-black mt-2 pl-3'
                 //     onClick={() => handleSignOut()}>
                 //     Login
                 // </NavLink>
                 <div>{
                     
                 order.length>0 ?
                 <NavDropdown.Item >
                         <Link to='/my-orders' className=' decoration-transparent text-black' >
                             Mis órdenes
                         </Link>
                     </NavDropdown.Item>
                     :
                     (
                         <div></div>
                     )
                     
                     }
                     
                 </div>
             )
         }
     }

     return (

<nav class="bg-white border-gray-200 dark:bg-gray-900">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
      <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
      <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
  </a>
  <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
     



      <button data-collapse-toggle="navbar-cta" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>
  <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
    <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      <li>
       
      <NavLink to='/' onClick={()=>{setShowEcomm(false)}} className=' decoration-transparent text-black mt-2 pl-3'
                             style={({ isActive }) => {
                                return {
                                    fontWeight: isActive ? "bold" : ""
                                };
                            }}
                        >
                            Home
                        </NavLink>
      </li>       
    
    </ul>
  </div>
  </div>
</nav>



     


    );
}

export default Navbar4