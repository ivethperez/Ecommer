import { NavLink, Link } from 'react-router-dom'
import { HomeIcon, UserGroupIcon, Cog6ToothIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import '../../Styles/styles.css';

const menuItems = [
  { name: 'Dashboard', icon: HomeIcon, to: '#' },
  { name: 'Productos', icon: UserGroupIcon, to: '/products' },
  { name: 'Reportes', icon: ChartBarIcon, to: '#' },
  { name: 'Configuración', icon: Cog6ToothIcon, to: '#' },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Menu() {
  return (
    <div>
    <aside className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col z-40">
      <div className="flex items-center h-16 px-6 border-b border-gray-200 bg-color-rosa">
        <span className="text-xl font-bold text-white tracking-wide">@Web Admin</span>
      </div>
      <nav className="flex-1 px-4 py-6 bg-white">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <NavLink
            key={item.name}
            to={item.to}
                className={classNames("flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-color-rosa hover:text-white transition-colors group"
                )}
               icon={item.icon} //className="h-6 w-6 mr-3 text-gray-400 group-hover:text-white"}
                >
                <span className="font-medium">{item.name}</span>
        
            
              </NavLink>
          ))}
        </ul>
      </nav>
      <div className="mt-auto p-4 border-t border-gray-200 bg-gray-50">
        <span className="text-xs text-gray-400">© 2024 @Web Admin</span>
      </div>

    </aside>
   
    </div>
    
  );
}
