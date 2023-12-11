import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink,Link } from 'react-router-dom'
import { useShopiContext } from '../../Context'
import storage from '../../utils/storage'
import ShoppingCart from '../ShoppingCart'
import '../../Styles/styles.css'
import logo from '../../Imagenes/Logo.png'

const navigation = [
    { name: 'Inicio', to: '/', current: true,category: '' }
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {
    const { setSearchByCategory, setSignOut, signOut, account,order,setShowEcomm,showEcomm } = useShopiContext();
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

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const ocultar= () =>{
        setSearchByCategory()
        setShowEcomm(true)
    }

    const renderView = () => {

        if (hasUserAnAccount && !isUserSignOut) {
            return (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    {/* Profile dropdown */}
                    <div>
                        {parsedAccount?.email}
                    </div>
                    <Menu as="div" className="relative ml-3">
                        <div>
                            <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-white">
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">Open user menu</span>
                                <img
                                    className="h-8 w-8 rounded-full"
                                    src={logo}
                                    alt=""
                                />
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-white ring-opacity-5 focus:outline-none">
                                <Menu.Item>
                                    {({ active }) => (
                                        <NavLink
                                           to='/my-order'
                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                            style={({ isActive }) => {
                                                return {
                                                    fontWeight: isActive ? "bold" : ""
                                                };
                                            }}
                                        >
                                             Mi orden
                                        </NavLink>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                         <NavLink
                                         to='/my-orders'
                                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                          style={({ isActive }) => {
                                              return {
                                                  fontWeight: isActive ? "bold" : ""
                                              };
                                          }}
                                      >
                                           Mis órdenes
                                      </NavLink>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                         <NavLink
                                         to='/my-acount'
                                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                          style={({ isActive }) => {
                                              return {
                                                  fontWeight: isActive ? "bold" : ""
                                              };
                                          }}
                                      >
                                            Mi cuenta
                                      </NavLink>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                         <NavLink
                                         to='/sign-in'
                                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                          style={({ isActive }) => {
                                              return {
                                                  fontWeight: isActive ? "bold" : ""
                                              };
                                          }}
                                      >
                                            Cerrar sesión
                                      </NavLink>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </Menu>

                </div>
            )
        }
        else {
            return (
                // <NavLink to='/sign-in'
                //     style={({ isActive }) => {
                //         return {
                //             fontWeight: isActive ? "bold" : ""
                //         };
                //     }} onClick={() => handleSignOut()}>
                //     Iniciar sesión
                // </NavLink>

                <div>{
                    
                    order.length>0  && showEcomm ?(
                        <div className='relative flex gap-0.5 items-center'>
                            <Link to='/my-orders' className='px-6 overflow-y-auto flex-1 pl-4 mb-2 mt-1 pr-2 decoration-transparent text-black' >
                                Mis órdenes
                            </Link>
                            <div className='absolute bottom-3.5 left-4.5 flex justify-center items-center
          rounded-full color-rosa w-4 h-4 text-xs text-white'>
                {order.length}
              </div>
                            </div>
                    )
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
        <Disclosure as="nav" className=" bg-white">
            {({ open }) => (
                <>
                
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 container">
                        <div className="relative flex h-16 items-center justify-between ">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <img
                                        className="h-10 w-auto"
                                        src={logo}
                                        alt="logo"
                                    />
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <NavLink
                                            key={item.name}
                                                to={item.to}
                                                onClick={() => setShowEcomm(false)}
                                                className={classNames(
                                                    item.current ? ' bg-white text-black decoration-transparent' : ' text-black hover:bg-white hover:text-black',
                                                    'rounded-md px-3 py-2 text-sm font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                                style={({ isActive }) => {
                                                    return {
                                                        fontWeight: isActive ? "bold" : ""
                                                    };
                                                }}
                                            >
                                                {item.name}
                                            </NavLink>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {renderView()}

                            {
                              !showEcomm ? (  
                              <NavLink to='/ecommer' className=' decoration-transparent text-black mt-2  pl-3'
                              onClick={() => ocultar()} style={({ isActive }) => {
                                  return {
                                      fontWeight: isActive ? "bold" : ""
                                  };
                              }}
                          >
                          <button className="text-white block w-full color-btn-confirmar font-medium rounded-lg text-sm px-5 py-2.5 text-center " >
                          Visita nuestra tienda
                </button>
                           
                          </NavLink>
  ):(

    <div>
          <ShoppingCart />
    </div>
    
  )
                           
                        }
                          
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <NavLink
                                    key={item.name}
                                    to={item.to}
                                    onClick={() =>setShowEcomm(false)}
                                    className={classNames(
                                        item.current ? ' bg-white text-black decoration-transparent' : ' text-black hover:bg-white hover:text-black',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </NavLink>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )

}
