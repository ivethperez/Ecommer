import { NavLink } from "react-router-dom"
import { ShoppingCartContext } from "../../Context"
import { useContext } from "react"

const Navbar = () => {
    const context = useContext(ShoppingCartContext)
    return (
        <nav className="flex justify-between items-center fixed z-10 w-full py-5 px-8 text-sm font-light top-0">
            <ul className="flex items-center gap-3">
                <li className="font-semibold text-lg">

                    <NavLink to='/shopi'
                        style={({ isActive }) => {
                            return {
                                fontWeight: isActive ? "bold" : ""
                            };
                        }}>
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
                <li>
                    {context.count}

                </li>
            </ul>
        </nav>


    )
}

export default Navbar