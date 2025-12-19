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
      <div className="fixed top-0 left-0 w-full h-16  flex items-center justify-between px-4 z-50 md:hidden">
        <img className="h-12" src={logo} alt="logo" />
        <button onClick={() => setIsOpen(!isOpen)} >
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
          "fixed top-0 left-0 h-full bg-white shadow-xl border-r border-gray-200 flex flex-col z-40 transform transition-transform duration-300",
          "w-56 items-center pt-16 md:pt-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0 "
        )}
      >
        {/* Header escritorio */}
        <div className="hidden md:flex items-center h-16 px-6 border-b border-gray-200">
          <img className="h-12" src={logo} alt="logo" />
        </div>

        {/* Navegación */}
        <nav className="flex-1 px-3 py-6 overflow-y-auto [&a]:no-underline">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                {item.children ? (
                  <>
                    {/* Ítem padre con submenú */}
                    <button
                      onClick={() => toggleMenu(item.name)}
                      className={classNames(
                        "w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 font-medium",
                        openMenus[item.name] ? activeClass : inactiveClass
                      )}
                    >
                      <div className="flex items-center">
                        <item.icon
                          className={classNames(
                            "h-5 w-5 mr-3",
                            openMenus[item.name] ? activeIconClass : inactiveIconClass
                          )}
                        />
                        <span>{item.name}</span>
                      </div>
                      <span className="text-xs">
                        {openMenus[item.name] ? "▲" : "▼"}
                      </span>
                    </button>

                    {/* Submenú */}
                    {openMenus[item.name] && (
                      <ul className="mt-2  space-y-1">
                        {item.children.map((subItem) => (
                          <li key={subItem.name}>

                            <NavLink
                              to={subItem.to}
                              className={({ isActive }) =>
                                classNames(
                                  "flex items-center px-4 py-2 rounded-md text-sm transition-all duration-200 !no-underline",
                                  isActive ? activeClass : "text-gray-600  hover:text-gray-800"
                                )
                              }
                              end // ← importante para rutas anidadas
                            >
                              {({ isActive }) => (
                      <>
                        <subItem.icon
                          className={classNames(
                            "h-4 w-4 mr-3",
                            isActive ? activeIconClass : inactiveIconClass
                          )}
                        />
                        <span>{subItem.name}</span>
                      </>
                    )}

                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  /* Ítem simple */
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      classNames(
                        "flex items-center px-4 py-3 rounded-lg transition-all duration-200 font-medium !no-underline",
                        isActive ? activeClass : inactiveClass
                      )
                    }
                    end
                  >
                    {({ isActive }) => (
                      <>
                        <item.icon
                          className={classNames(
                            "h-5 w-5 mr-3",
                            isActive ? activeIconClass : inactiveIconClass
                          )}
                        />
                        <span>{item.name}</span>
                      </>
                    )}
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
              className="flex items-center gap-2 pr-3 text-sm font-medium hover:text-color-rosa transition-colors group"
            >
              <ArrowRightOnRectangleIcon className="w-6 h-6 stroke-current group-hover:stroke-color-rosa no-underline" />

              <span className="">Salir</span>
            </button>
          </NavLink>
        </div>
        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 w-full text-center">
          <span className="text-xs text-gray-500">© 2025 @Web Admin</span>
        </div>
      </aside>
    </>
  );
}