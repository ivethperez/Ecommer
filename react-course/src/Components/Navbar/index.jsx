
import { ShoppingBagIcon } from '@heroicons/react/24/solid';
import { NavLink } from 'react-router-dom'
import { useShopiContext } from '../../Context'

const Navbar = () => {
    const  {count} = useShopiContext();
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
                        style={({ isActive }) => {
                            return {
                                fontWeight: isActive ? "bold" : ""
                            };
                        }}>
                        All
                    </NavLink>
                </li>
                <li>

                    <NavLink to='/clothes'
                        style={({ isActive }) => {
                            return {
                                fontWeight: isActive ? "bold" : ""
                            };
                        }}>
                        Clothes
                    </NavLink>
                </li>
                <li>

                    <NavLink to='/electronic'
                        style={({ isActive }) => {
                            return {
                                fontWeight: isActive ? "bold" : ""
                            };
                        }}>
                        Electronic
                    </NavLink>
                </li>
                <li>

                    <NavLink to='/toys'
                        style={({ isActive }) => {
                            return {
                                fontWeight: isActive ? "bold" : ""
                            };
                        }}>
                        Toys
                    </NavLink>
                </li>
                <li>

                    <NavLink to='/others'
                        style={({ isActive }) => {
                            return {
                                fontWeight: isActive ? "bold" : ""
                            };
                        }}>
                        Others
                    </NavLink>
                </li>
            </ul>
            <ul className="flex items-center gap-3">
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
                        MyOrder
                    </NavLink>
                </li>
                <li>

                    <NavLink to='/my-orders' style={({ isActive }) => {
                        return {
                            fontWeight: isActive ? "bold" : ""
                        };
                    }}>
                        MyOrders
                    </NavLink>
                </li>
                <li>

                    <NavLink to='/my-acount'
                        style={({ isActive }) => {
                            return {
                                fontWeight: isActive ? "bold" : ""
                            };
                        }}>
                        MyAccount
                    </NavLink>
                </li>
                <li>

                    <NavLink to='/sign-in'
                        style={({ isActive }) => {
                            return {
                                fontWeight: isActive ? "bold" : ""
                            };
                        }}>
                        Signin
                    </NavLink>
                </li>
                <li className='flex items-center'>
               <ShoppingBagIcon className='h-6 w-6'></ShoppingBagIcon> 
<div>{count}</div>
                </li>
            </ul>
        </nav>


    )
}

export default Navbar