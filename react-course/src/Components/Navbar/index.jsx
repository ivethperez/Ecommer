import { Fragment, useState, useEffect } from 'react'
import { Disclosure, Menu, Transition, Dialog } from '@headlessui/react'
import { UserIcon, ArrowRightOnRectangleIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink, Link, Navigate } from 'react-router-dom'
import { useShopiContext } from '../../Context'
import ShoppingCart from '../ShoppingCart'
import '../../Styles/styles.css'
import logo from '../../Imagenes/LogoNuevo.png'
import videoBg from '../..//Imagenes/video.mp4'
import botanasFondo from '../../Imagenes/Botanas.png'
import cat_regalo from '../../Imagenes/cat_regalo.png'
import cat_chela from '../../Imagenes/cat_chela.png'
import cat_botanear from '../../Imagenes/cat_botanear.png'
import cat_revender from '../../Imagenes/cat_revender.png'

const navigation = [
    { name: 'Inicio', to: '/', current: true, category: '' }
]
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const mensajes = [
    "El snack premium para compartir, directo desde Cancún 🌞",
    //"Disfruta el mejor sabor",
    "📍¡Ahora en Cancún! Disfruta botanas únicas, hechas en Puebla 💚",
    "Envío gratis en compras iguales o mayores a $500 🚚"
];

export default function Example() {
    const { setSearchByCategory, setSignOut, signOut, search, isActiveChocolate, isActiveGomitas, isActiveBotanas,
        isActiveTodo, isLoggedIn, setIsLoggedIn, userName
    } = useShopiContext();
    const filtro = (val) => {
        setSearchByCategory(val);
    }
    const [index, setIndex] = useState(0);
    const [isSticky, setIsSticky] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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
                {!isLoggedIn ? (<div className="mx-auto flex items-center  ">
                    <div className="relative flex items-center justify-between ">
                        <p className="pt-2 text-center">{mensajes[index]}</p>
                    </div>
                </div>) : null}

                <div className="flex items-center gap-4">
                    <Menu as="div" className="relative inline-block  ">
                        {isLoggedIn ? (<div className='flex items-center justify-between'>
                            <NavLink to="/">
                                <button onClick={(e) => setIsLoggedIn(false)} className="inline-flex justify-center items-center px-6 py-1 border border-white text-white text-sm font-medium hover:bg-orange-400 hover:text-gray-800">
                                    Volver
                                </button>
                            </NavLink>
                        </div>) : (
                            <div className='flex items-center justify-between'>
                                <NavLink to="/my-custom-package">
                                    <button onClick={(e) => setIsLoggedIn(true)} className="inline-flex justify-center items-center px-6 py-1 border border-white text-white text-sm font-medium hover:bg-orange-400 hover:text-gray-800">
                                        Iniciar sesión
                                    </button>
                                </NavLink>
                            </div>
                        )}

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
    }

    const renderViewLoged = () => {
        return (
            <header
                className={`fixed top-0 left-0 md:left-50 right-0 h-16 bg-white border-b z-30`}
            >
                <div className="h-full  sm:px-6 lg:px-8 flex justify-end items-center">
                    <div className="flex items-center gap-5 text-gray-700">
                        {/* Usuario - solo en sm+ */}
                        <div className="hidden sm:flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-color-rosa flex items-center justify-center text-white">
                                <UserIcon className="w-6 h-6" />
                            </div>
                            <div className='flex flex-col pt-3'>
                                <p className="text-sm font-semibold">{userName}</p>
                            </div>
                        </div>

                        {/* Solo icono en móvil */}
                        {/* <div className="sm:hidden">
                            <UserIcon className="w-7 h-7 text-gray-600" />
                        </div>  

                        {/* Cerrar sesión */}
                        <NavLink to="/">
                            <button
                                onClick={(e) => { setSignOut(true); setIsLoggedIn(false) }}
                                className="sm:flex items-center gap-2 pr-3 text-sm font-medium hover:text-pink-600 transition-colors group hidden "
                            >
                                <ArrowRightOnRectangleIcon className="w-6 h-6 stroke-current group-hover:stroke-pink-600" />
                                <span className="hidden !no-inline text-pink-600">Salir</span>
                            </button>
                        </NavLink>
                    </div>
                </div>
            </header>
        )
    }

  
    return (
        //Si el usuario no esta logeado, signOut = true
        <div>
            {/* {signOut ? (
                renderView()) : (<div></div>)} */}
            {signOut ? (
                <div>
                    {!isLoggedIn ? (
                        <div className="relative text-white">
                            {/* HERO CON IMAGEN */}
                            <div className="relative h-[50vh] overflow-hidden text-white ">

                                {/* IMAGEN */}
                                <img
                                    src={botanasFondo}
                                    alt="Fondo"
                                    className="absolute inset-0 w-full h-full object-cover"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/70"></div>

                                {/* CONTENIDO */}
                                <div className="relative z-10 flex items-center justify-center h-full text-center px-8">
                                    <div>
                                        <div className="mt-16">
                                        <div className='hidden sm:block mb-6'>
                                        
                                            <span className=" rounded-full bg-white/10 px-4 py-1 text-sm backdrop-blur-md">
                                                Envío gratis en compras iguales o mayores a $500 🚚
                                            </span>
                                            </div>
                                        </div>
                                        <h1 className="text-3xl sm:text-6xl font-bold">
                                            El sabor de Puebla ahora en Cancún 🌴
                                        </h1>

                                        <p className="mt-4 text-white/80">
                                            Artesanal, crujiente y fuera de lo común
                                        </p>

                                           <div className="sm:hidden mt-6">
      <span className="rounded-full bg-white/10 px-4 py-1 text-sm backdrop-blur-md">
        Envío gratis en compras iguales o mayores a $500 🚚
      </span>
    </div>
                                    </div>
                                </div>
                            </div>

                            {/* HEADER */}
                            <header className="absolute inset-x-0 top-0 z-20">
                                <nav className="flex items-center justify-between p-6 lg:px-8 backdrop-blur-md bg-white/10 border-b border-white/10">
                                    <img src={logo} className="h-12 w-auto rounded-full" />

                                    <a className="text-sm font-semibold text-white hover:opacity-80">
                                        Log in →
                                    </a>
                                </nav>
                            </header>


                   


                            {/* <Disclosure as="nav" className={`bg-white shadow-md px-6 py-2 flex justify-between items-center transition-all duration-300 ${isSticky ? "fixed top-0 left-0 w-full z-50 shadow-lg" : ""}`}>
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
                        </Disclosure> */}
                        </div>

                    ) : null}
                </div>
            ) : (
                renderViewLoged()
            )
            }
        </div>
    )
}
