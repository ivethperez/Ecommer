import { Fragment, useState, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { UserIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { NavLink, Link, Navigate } from 'react-router-dom'
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
    "El snack premium para compartir 🤝",
    //"Disfruta el mejor sabor",
    "Disfruta botanas únicas, hechas en Puebla 💚",
    "Envío gratis en compras iguales o mayores a $500 🚚"
];

export default function Example() {
    const { setSearchByCategory, setSignOut, signOut, account, order, search,
        isActiveChocolate, isActiveGomitas, isActiveBotanas, isActiveTodo
    } = useShopiContext();
    const isUserSignOut = signOut;
    console.log(signOut);
    const parsedAccount = storage.getItem('account')
    const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
    const noAccountInLocalState = account ? Object.keys(account).length === 0 : true
    const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState

    const filtro = (val) => {
        setSearchByCategory(val);
    }

    const handleSignOut = () => {
        setSignOut(true)
    }
    const ocultar = () => {
        setSearchByCategory()
    }
    const [index, setIndex] = useState(0);
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % mensajes.length);
        }, 5000); // 3 segundos

        const handleScroll = () => {
            setIsSticky(window.scrollY > 30);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearInterval(interval);
        };
    }, []);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [tempUsername, setTempUsername] = useState("");
    const handleLogin = (e) => {
        e.preventDefault();
        if (tempUsername.trim()) {
            setUsername(tempUsername);
            setIsLoggedIn(true);
        }
    };
    const renderView = () => {
        return (
            <header className="w-full text-white bg-orange-300 p-1 flex justify-between items-center ">
                <div className="mx-auto flex items-center  ">
                    <div className="relative flex items-center justify-between ">
                        <p className="pt-2">{mensajes[index]}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Menu as="div" className="relative inline-block  ">
                        <div className='flex items-center justify-between'>
                            <NavLink to="/my-custom-package">
                                {/* <button className="inline-flex justify-center items-center px-6 py-1 border border-white text-white text-sm font-medium hover:bg-orange-400 hover:text-gray-800">
                                    Iniciar sesión
                                </button> */}
                            </NavLink>
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
                            <Menu.Items className="absolute right-0 mt-2 w-64 origin-top-right bg-white text-black divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-4 z-50">
                                <form onSubmit={handleLogin} className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Nombre de usuario"
                                        value={tempUsername}
                                        onChange={(e) => setTempUsername(e.target.value)}
                                    />
                                    <button type="submit" className="w-full">Entrar</button>
                                </form>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>



            </header>
        )
        // }
        // else{
        //     return (
        //         <div></div>
        //     //  <header className="w-full items-center text-center pl-4 text-white bg-orange-300 h-7 ">
        //     //    <p>{mensajes[index]}</p>
        //     //  </header>
        //     )
        // }
    }

    const renderViewLoged = () => {
        return (
            <Disclosure as="nav" className={`bg-white shadow-md ml-64 px-6 py-2 flex justify-between items-center transition-all duration-300 ${isSticky ? "" : ""}`}>
                {({ open }) => (
                    <>
                        <div className="flex items-center gap-4 ">
                            <div className="relative flex  items-center justify-between ">

                            </div>
                        </div>
                        {
                            <div className="flex items-center gap-4">

                                <UserIcon className="h-6 w-6" />
                                <span >Conectado</span>
                                <NavLink to='/' >
                                    <ArrowRightOnRectangleIcon className='w-6 h-6 fill-none stroke-black cursor-pointer' onClick={() => handleSignOut()} />
                                </NavLink>
                            </div>
                        }

                    </>
                )}
            </Disclosure>
        )
    }
    return (
        //Si el usuario no esta logeado, signOut = true
        <div>
            {signOut ? (
                renderView()) : (<div></div>)}
            {signOut ? (
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

                                    <div className=" px-4 py-2 grid grid-cols-1 items-start ">
                                        <div className="relative -mx-4 flex overflow-x-auto sm:mx-0 sm:block sm:overflow-visible sm:pb-0">

                                            <div className="grid auto-cols-auto grid-flow-col justify-start gap-x-4 gap-y-4 p-2 whitespace-nowrap  sm:mx-auto sm:max-w-2xl sm:grid-cols-3 sm:px-0 sm:text-center  lg:text-left" role="tablist" aria-orientation="vertical">
                                                <NavLink to='/' >
                                                    <div className={` ${!isActiveTodo ? 'text-black' : 'color-rosa-text'} `}>
                                                        <button onClick={() => filtro()} >Todo</button>
                                                    </div>
                                                </NavLink>
                                                <NavLink to='/' >
                                                    <div className={` ${!isActiveBotanas ? 'text-black' : 'color-rosa-text'} `}>
                                                        <button onClick={() => filtro('Botanas')} >Botanas</button>

                                                    </div>
                                                </NavLink>
                                                <NavLink to='/' >
                                                    <div className={`${!isActiveGomitas ? 'text-black' : 'color-rosa-text'} `}>
                                                        <button onClick={() => filtro('Gomitas')} >Gomitas</button>
                                                    </div>
                                                </NavLink>
                                                <NavLink to='/' >
                                                    <div className={`${!isActiveChocolate ? ' text-black' : 'color-rosa-text'} `}>
                                                        <button onClick={() => filtro('Chocolates')} >Chocolates</button>
                                                    </div>
                                                </NavLink>
                                            </div>
                                        </div>
                                    </div>

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
                </Disclosure>) : (
                renderViewLoged()
            )
            }
        </div>
    )
}
