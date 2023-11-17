import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, NavLink } from 'react-router-dom'
import { useShopiContext } from '../../Context'
import storage from '../../utils/storage'
import ShoppingCart from '../ShoppingCart'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Navbarr = () => {
    const { setSearchByCategory, setSignOut, signOut, account } = useShopiContext();
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

    const renderView = () => {
        console.log(hasUserAnAccount, isUserSignOut)
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
                <NavLink to='/sign-in'
                    onClick={() => handleSignOut()}>
                    Login
                </NavLink>
            )
        }
    }


    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" sticky="top">
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to={`${isUserSignOut ? '/sign-in' : '/'}`} style={({ isActive }) => {
                            return {
                                fontWeight: isActive ? "bold" : ""
                            };
                        }} className=' decoration-transparent text-black mt-2  pl-3'>
                            Shopi
                        </NavLink>
                        <NavLink to='/' className=' decoration-transparent text-black mt-2  pl-3'
                            onClick={() => setSearchByCategory()} style={({ isActive }) => {
                                return {
                                    fontWeight: isActive ? "bold" : ""
                                };
                            }}
                        >
                            Home
                        </NavLink>


                        {/* <NavLink to='/todo' className=' decoration-transparent text-black mt-2  pl-3'
                            onClick={() => setSearchByCategory()} style={({ isActive }) => {
                                return {
                                    fontWeight: isActive ? "bold" : ""
                                };
                            }}
                        >
                            Todo
                        </NavLink>
                        <NavLink to='/botanas' className=' decoration-transparent text-black mt-2  pl-3'
                            onClick={() => setSearchByCategory('botanas')}
                            style={({ isActive }) => {
                                return {
                                    fontWeight: isActive ? "bold" : ""
                                };
                            }}
                        >
                            Botanas
                        </NavLink>
                        <NavLink to='/gomitas' className=' decoration-transparent text-black mt-2  pl-3'
                            onClick={() => setSearchByCategory('gomitas')}
                            style={({ isActive }) => {
                                return {
                                    fontWeight: isActive ? "bold" : ""
                                };
                            }}
                        >
                            Gomitas
                        </NavLink>
                        <NavLink to='/chocolates' className=' decoration-transparent text-black mt-2  pl-3'
                            onClick={() => setSearchByCategory('chocolates')}
                            style={({ isActive }) => {
                                return {
                                    fontWeight: isActive ? "bold" : ""
                                };
                            }}
                        >
                            Cocolates
                        </NavLink>
                        <NavLink to='/others' className=' decoration-transparent text-black mt-2  pl-3'
                            onClick={() => setSearchByCategory('others')}
                            style={({ isActive }) => {
                                return {
                                    fontWeight: isActive ? "bold" : ""
                                };
                            }}
                        >
                            Otros
                        </NavLink> */}

                    </Nav>
                    <Nav>
                        <NavLink  className=' decoration-transparent text-black mt-2  pl-3'> </NavLink>
                        <NavLink to='/ecommer' className=' decoration-transparent text-black mt-2  pl-3'
                            onClick={() => setSearchByCategory()} style={({ isActive }) => {
                                return {
                                    fontWeight: isActive ? "bold" : ""
                                };
                            }}
                        >
                            Ecommer
                        </NavLink>
                        {renderView()}
                        <ShoppingCart />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navbarr;