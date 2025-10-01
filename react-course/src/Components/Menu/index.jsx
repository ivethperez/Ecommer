import { useState } from "react";
import { NavLink, Link, Navigate } from 'react-router-dom'
import { HomeIcon, UserGroupIcon, Cog6ToothIcon, ChartBarIcon,ShoppingCartIcon } from '@heroicons/react/24/outline';
import '../../Styles/styles.css';
import { useShopiContext } from '../../Context'


const menuItems = [
  { name: 'Dashboard', icon: HomeIcon, to: '#' },
  { name: 'Productos', icon: UserGroupIcon, to: '/products' },
  { name: 'Clientes', icon: ChartBarIcon, to: '/customerManagement' },
  { name: 'Configuración', icon: Cog6ToothIcon, to: '#' },
  {
    name: "Ventas",
    icon: ShoppingCartIcon,
    children: [
      { name: "Ventas", to: "/sales" },
      { name: "Pedidos", to: "/sales/po" },
    ],
  },
];



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Menu() {
  const { signOut} = useShopiContext();
const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (name) => {
    setOpenMenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };
  return (
    <div>
     {signOut ? (
                <Navigate to="/" replace />) : (
    <aside className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col z-40">
      <div className="flex items-center h-16 px-6 border-b border-gray-200 bg-color-rosa">
        <span className="text-xl font-bold text-white tracking-wide">@Web Admin</span>
      </div>
      <nav className="flex-1 px-4 py-6 bg-white">
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.name}>
            {item.children ? (
              <>
                {/* Botón padre */}
                <button
                  onClick={() => toggleMenu(item.name)}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-color-rosa hover:text-white transition-colors"
                >
                  <div className="flex items-center">
                    <item.icon className="h-6 w-6 mr-3 text-gray-400 group-hover:text-white" />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <span className="ml-2">{openMenus[item.name] ? "▲" : "▼"}</span>
                </button>

                {/* Submenu */}
                {openMenus[item.name] && (
                  <ul className="mt-2 ml-8 space-y-1">
                    {item.children.map((subItem) => (
                      <li key={subItem.name}>
                        <NavLink
                          to={subItem.to}
                          className="block px-3 py-2 text-gray-600 hover:bg-color-rosa hover:text-white rounded-md transition-colors"
                        >
                          {subItem.name}
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
                    "flex items-center px-4 py-3 rounded-lg transition-colors",
                    isActive
                      ? "bg-color-rosa text-white"
                      : "text-gray-700 hover:bg-color-rosa hover:text-white"
                  )
                }
              >
                <item.icon className="h-6 w-6 mr-3 text-gray-400 group-hover:text-white" />
                <span className="font-medium">{item.name}</span>
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
      <div className="mt-auto p-4 border-t border-gray-200 bg-gray-50">
        <span className="text-xs text-gray-400">© 2024 @Web Admin</span>
      </div>

    </aside>
   )}
    </div>
    
  );
}
