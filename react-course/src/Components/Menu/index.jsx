import { useState } from "react";
import { NavLink, Link, Navigate } from 'react-router-dom'
import { HomeIcon, UserGroupIcon, ClipboardDocumentListIcon, ChartBarIcon, ShoppingCartIcon, DocumentTextIcon, Bars3Icon, XMarkIcon, ArrowRightOnRectangleIcon, CubeIcon } from '@heroicons/react/24/outline';
import '../../Styles/styles.css';
import { useShopiContext } from '../../Context';
import logo from '../../Imagenes/Logo.png'

const menuItems = [
  { name: 'Productos', icon: CubeIcon, to: '/products' },
  { name: 'Clientes', icon: ChartBarIcon, to: '/customerManagement' },
  // { name: 'Configuración', icon: Cog6ToothIcon, to: '/config' },
  {
    name: "Ventas",
    icon: ShoppingCartIcon,
    children: [
      { name: "Ventas", icon: DocumentTextIcon, to: "/sales" },
      { name: "Pedidos", icon: ClipboardDocumentListIcon, to: "/sales/po" },
    ],
  },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Menu() {
  const { signOut, setSignOut, setIsLoggedIn } = useShopiContext();
  const [openMenus, setOpenMenus] = useState({});
  const [isOpen, setIsOpen] = useState(false); // móvil

  const toggleMenu = (name) => {
    setOpenMenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  if (signOut) return <Navigate to="/" replace />;

  // Clase base para ítems activos (tanto padres como hijos)
  const activeClass = "bg-transparent text-pink-600 border-1 border-pink-600 hover:bg-pink-800 hover:text-pink-800 hover:border-pink-800 font-semibold py-2 px-4 rounded transition";
  const inactiveClass = "text-gray-600 hover:bg-color-rosa hover:text-gray-800";
  const activeIconClass = "text-pink-600";
  const inactiveIconClass = "text-gray-600";

  return (
    <>
      {/* Header móvil */}
      <div className="fixed top-0 left-0 w-full h-16 bg-gradient-to-r from-pink-500 to-yellow-600 flex items-center justify-between px-6 z-50 md:hidden">
        <img className="h-12" src={logo} alt="Logo" />

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isOpen ? <XMarkIcon className="w-8 h-8" /> : <Bars3Icon className="w-8 h-8" />}
        </button>
      </div>

      {/* Overlay móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      {/* Sidebar */}
      <aside
        className={classNames(
          "fixed top-0 left-0 justify-center h-full bg-white shadow-xl border-r border-gray-200 flex flex-col z-40 transform transition-transform duration-300",
          "w-56 items-center pt-16 md:pt-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0 "
        )}
      >
        {/* Header escritorio */}
        <div className="w-full hidden md:flex items-center justify-center h-16 px-6 border-b border-gray-200 bg-gradient-to-r from-pink-500 to-yellow-600">
          <img
            className="h-12 transition-transform duration-300 hover:scale-110"
            src={logo}
            alt="Logo"
          />
        </div>

        {/* Navegación */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name} className="w-full">
                {item.children ? (
                  <>
                    <button
                      onClick={() => toggleMenu(item.name)}
                      className={classNames(
                        "w-full flex items-center justify-between px-6 py-4 rounded-lg transition-colors duration-200 font-medium text-left no-underline",
                        openMenus[item.name] ? "text-pink-700 bg-pink-50" : "text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      <div className="flex items-center">
                        <item.icon className={classNames("h-6 w-6 mr-4", openMenus[item.name] ? "text-pink-600" : "text-gray-600")} />
                        <span>{item.name}</span>
                      </div>
                      <span className="text-sm">{openMenus[item.name] ? "▲" : "▼"}</span>
                    </button>

                    {openMenus[item.name] && (
                      <ul className="mt-2 ml-8 space-y-1 border-l-2 border-pink-200 pl-6">
                        {item.children.map((subItem) => (
                          <li key={subItem.name}>
                            <NavLink
                              to={subItem.to}
                              className={({ isActive }) =>
                                classNames(
                                  "flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors block w-full text-left",
                                  isActive
                                    ? "text-pink-700 bg-pink-50 border-l-4 border-pink-600 -ml-4 pl-8"
                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                )
                              }
                              end
                              onClick={() => setIsOpen(false)} // ← Cierra el menú al seleccionar en móvil
                            >
                              <subItem.icon className="h-5 w-5 mr-3 text-gray-600" />
                              <span>{subItem.name}</span>
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      classNames(
                        "flex items-center px-6 py-4 rounded-lg font-medium transition-colors w-full text-left",
                        isActive ? "text-pink-700 bg-pink-50 border-l-4 border-pink-600" : "text-gray-700 hover:bg-gray-100"
                      )
                    }
                    end
                    onClick={() => setIsOpen(false)} // ← Importante: cierra el menú al tocar un ítem en móvil
                  >
                    <item.icon className={classNames("h-6 w-6 mr-4", ({ isActive }) => isActive ? "text-pink-600" : "text-gray-600")} />
                    <span>{item.name}</span>
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="sm:hidden">
          <NavLink to="/">
            <button
              onClick={(e) => { setSignOut(true); setIsLoggedIn(false) }}
              className="w-full flex items-center gap-4 px-6 py-4 text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-lg font-medium transition-colors"
            >
              <ArrowRightOnRectangleIcon className="w-6 h-6 no-underline" />

              <span className="no-underline">Salir</span>
            </button>
          </NavLink>
        </div>

        <div className="w-full p-4 border-t border-gray-200 bg-gray-50 text-center">
          <span className="text-xs text-gray-500">© 2025 @Web Admin</span>
        </div>
      </aside>
    </>
  );
}