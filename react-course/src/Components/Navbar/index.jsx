
import { ShoppingBagIcon } from '@heroicons/react/24/solid';
import { NavLink } from 'react-router-dom'
import { useShopiContext } from '../../Context'
import storage from '../../utils/storage'

const Navbar = () => {
    const { count, setSearchByCategory, setSignOut, signOut } = useShopiContext();
    const isUserSignOut = signOut || storage.getItem('sign-out')

    const renderView = () => {
        if (isUserSignOut) {
            return (
                <li>

                    <NavLink to='/sign-in'
                        style={({ isActive }) => {
                            return {
                                fontWeight: isActive ? "bold" : ""
                            };
                        }} onClick={() => handleSignOut()}>
                        iniciar sesión
                    </NavLink>
                </li>
            )
        }
        else {
            return (
                <>
                    <li className="text-black/60">
                        ivethp62@gmail.com
                    </li>
                    <li>
                        <NavLink to='/my-order'
                            style={({ isActive }) => {
                                return {
                                    fontWeight: isActive ? "bold" : ""
                                };
                            }}>
                            Mi orden
                        </NavLink>
                    </li>
                    <li>

                        <NavLink to='/my-orders' style={({ isActive }) => {
                            return {
                                fontWeight: isActive ? "bold" : ""
                            };
                        }}>
                            Mis órdenes
                        </NavLink>
                    </li>
                    <li>

                        <NavLink to='/my-acount'
                            style={({ isActive }) => {
                                return {
                                    fontWeight: isActive ? "bold" : ""
                                };
                            }}>
                            Mi cuenta
                        </NavLink>
                    </li>
                    <li>

                        <NavLink to='/sign-in'
                            style={({ isActive }) => {
                                return {
                                    fontWeight: isActive ? "bold" : ""
                                };
                            }} onClick={() => handleSignOut()}>
                            iniciar sesión
                        </NavLink>
                    </li>
                    <li className='flex items-center'>
                        <ShoppingBagIcon className='h-6 w-6'></ShoppingBagIcon>
                        <div>{count}</div>
                    </li>

                </>
            )
        }
    }
    const handleSignOut = () => {
        const stringifiedSignOut = JSON.stringify(true)
        localStorage.setItem('sign-out', stringifiedSignOut)
        setSignOut(true)
    }
    return (
        <nav className="flex justify-between items-center fixed z-10 w-full py-5 px-8 text-sm font-light top-0">
            <ul className="flex items-center gap-3">
                <li className='font-semibold text-lg'>
                    <NavLink to='/'>
                        Shopi
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/'
                        onClick={() => setSearchByCategory()}
                        style={({ isActive }) => {
                            return {
                                fontWeight: isActive ? "bold" : ""
                            };
                        }}>
                        All
                    </NavLink>
                </li>
                <li>

                    <NavLink to='/botanas'
                        onClick={() => setSearchByCategory('botanas')}
                        style={({ isActive }) => {
                            return {
                                fontWeight: isActive ? "bold" : ""
                            };
                        }}>
                        Botanas
                    </NavLink>
                </li>
                <li>

                    <NavLink to='/gomitas'
                        onClick={() => setSearchByCategory('gomitas')}
                        style={({ isActive }) => {
                            return {
                                fontWeight: isActive ? "bold" : ""
                            };
                        }}>
                        Gomitas
                    </NavLink>
                </li>
                <li>

                    <NavLink to='/chocolates'
                        onClick={() => setSearchByCategory('chocolates')}
                        style={({ isActive }) => {
                            return {
                                fontWeight: isActive ? "bold" : ""
                            };
                        }}>
                        Cocolates
                    </NavLink>
                </li>
                <li>

                    <NavLink to='/others'
                        onClick={() => setSearchByCategory('others')}
                        style={({ isActive }) => {
                            return {
                                fontWeight: isActive ? "bold" : ""
                            };
                        }}>
                        Otros
                    </NavLink>
                </li>
            </ul>

            <ul className="flex items-center gap-3">
                {renderView()}
                {/* <li className='flex items-center'>
                    <ShoppingBagIcon className='h-6 w-6'></ShoppingBagIcon>
                    <div>{count}</div>
                </li> */}
            </ul>
        </nav>
    )
}

export default Navbar