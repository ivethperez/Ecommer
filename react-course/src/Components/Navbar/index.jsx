import { Fragment, useState, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink, Link } from 'react-router-dom'
import { useShopiContext } from '../../Context'
import storage from '../../utils/storage'
import ShoppingCart from '../ShoppingCart'
import '../../Styles/styles.css'
import logo from '../../Imagenes/Logo.png'

const navigation = [
    { name: 'Inicio', to: '/', current: true, category: '' }

]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const mensajes = [
    "El snack premium para compartir",
    "Disfruta el mejor sabor",
    "Natural y delicioso para todos",
  ];

export default function Example() {
    const { setSearchByCategory, setSignOut, signOut, account, order, search,
        isActiveChocolate, isActiveGomitas, isActiveBotanas, isActiveTodo
    } = useShopiContext();
    const isUserSignOut = signOut || storage.getItem('sign-out')

    const parsedAccount = storage.getItem('account')
    const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
    const noAccountInLocalState = account ? Object.keys(account).length === 0 : true
    const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState

    const filtro = (val) => {
        setSearchByCategory(val);
    }

    const handleSignOut = () => {
        storage.setItem('sign-out', true)
        setSignOut(true)
        // return <Navigate replace to={'/'}></Navigate>
    }
    const ocultar = () => {
        setSearchByCategory()
    }
    const [index, setIndex] = useState(0);
    const [isSticky, setIsSticky] = useState(false);
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % mensajes.length);
          }, 5000); // 3 minutos

        const handleScroll = () => {
            setIsSticky(window.scrollY > 30);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
             window.removeEventListener("scroll", handleScroll);
            clearInterval(interval);
        };
    }, []);

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
                                <img to='/'
                                    className="h-8 w-8 rounded-full"
                                    src={logo}
                                    alt="logo"
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
                    order.length > 0 ? (
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
        <div>
            {/* <div className="color-rosa text-white text-center flex items-center justify-center text-xs" >
                <div className='p-1'>{mensajes[index]}</div>
            </div> */}
            <Disclosure as="nav" className={`bg-white shadow-md px-6 py-2 flex justify-between items-center transition-all duration-300 ${isSticky ? "fixed top-0 left-0 w-full z-50 shadow-lg" : ""}`}>
                {({ open }) => (
                    <>
                        <div className="flex items-center gap-4 ">
                            <div className="relative flex  items-center justify-between ">

                                <NavLink to='/' >
                                    <img
                                        className="h-12"
                                        src={logo}
                                        alt="logo"
                                    />
                                </NavLink>

                                {/* <div className="sm:hidden">
                                {/* Mobile menu button*/}
                                {/* <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    {open ? (
                                        <XMarkIcon className=" h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className=" h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button> */}
                                {/* </div> */}
                                {/* <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"> */}




                                {/* {navigation.map((item) => (
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
                                        ))} */}


                                <div className=" px-4 py-2 grid grid-cols-1 items-start ">
                                    <div className="relative -mx-4 flex overflow-x-auto sm:mx-0 sm:block sm:overflow-visible sm:pb-0">

                                        <div className="grid auto-cols-auto grid-flow-col justify-start gap-x-4 gap-y-4 p-2 whitespace-nowrap  sm:mx-auto sm:max-w-2xl sm:grid-cols-3 sm:px-0 sm:text-center  lg:text-left" role="tablist" aria-orientation="vertical">

                                            <div className={` ${!isActiveTodo ? 'text-black' : 'color-rosa-text'} `}>
                                                <button onClick={() => filtro()} >Todo</button>
                                            </div>

                                            <div className={` ${!isActiveBotanas ? 'text-black' : 'color-rosa-text'} `}>
                                                <button onClick={() => filtro('botanas')} >Botanas</button>

                                            </div>
                                            <div className={`${!isActiveGomitas ? 'text-black' : 'color-rosa-text'} `}>
                                                <button onClick={() => filtro('gomitas')} >Gomitas</button>
                                            </div>
                                            <div className={`${!isActiveChocolate ? ' text-black' : 'color-rosa-text'} `}>
                                                <button onClick={() => filtro('chocolates')} >Chocolates</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {renderView()}

                            </div>
                        </div>

                        {

                            <div className="flex items-center gap-4">
                                <div className="relative hidden md:block">
                                    <input type="text" placeholder="Buscar producto" className="border p-2 pl-8 rounded-md text-sm placeholder:text-gray-400 focus:border-lime-50 focus:outline-none focus:ring-lime-50 border-gray-200 bg-white "
                                        onChange={search} />
                                </div>

                                <ShoppingCart />
                            </div>

                        }

                        <Disclosure.Panel className={`sm:hidden absolute md:static top-12 left-0 w-full bg-white md:flex space-x-6 font-semibold text-sm transition-transform transform -translate-y-full md:translate-y-0 md:flex-row md:space-x-6 p-4 md:p-0 shadow-md md:shadow-none`}>
                            <div className="space-y-1 px-2 pb-3 pt-2">
                                {navigation.map((item) => (
                                    <NavLink
                                        key={item.name}
                                        to={item.to}
                                        onClick={() => setShowEcomm(false)}
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

        </div>
    )

}
