import { useLocation } from 'react-router-dom';
import Menu from '../../Components/Menu'
import { useShopiContext } from '../../Context';
function PageStart({ children }) {
      const { userName } = useShopiContext();
    const location = useLocation();

    const isHomePage = location.pathname === '/' || location.pathname === '/pageStart';
    return (
        <div className="min-h-screen bg-gray-50 ">
            <Menu />
            <main className="ml-0 md:ml-60 pt-20 px-4 md:px-8 pb-16 transition-all duration-300">
                {isHomePage && (
                    <div className="mb-10 p-8 bg-gradient-to-r from-pink-500 to-yellow-600 text-white rounded-2xl shadow-2xl max-w-4xl mx-auto">
                        <h2 className="text-4xl font-bold mb-4">¡Bienvenid@ {userName}! 👋</h2>
                        <p className="text-lg mb-6 opacity-90">
                            Usa el menú lateral para gestionar tus productos, clientes, ventas y más.
                        </p>
                        <button
                            className="bg-white text-pink-600 px-8 py-3 rounded-xl font-bold hover:bg-pink-50 transition shadow-lg"
                        >
                            ¡Empecemos!
                        </button>
                    </div>
                )}

                {children}
            </main>
        </div>
    )
}

export default PageStart