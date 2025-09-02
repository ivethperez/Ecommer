import Menu from '../../Components/Menu'
import { useShopiContext } from '../../Context'
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import '../../Styles/styles.css'

function Products(){
    const { items } = useShopiContext();
    
    const handleAddProduct = () => {
        // TODO: Implementar modal o navegación para agregar producto
        console.log('Agregar nuevo producto');
    }

    const handleEditProduct = (productId) => {
        // TODO: Implementar edición de producto
        console.log('Editar producto:', productId);
    }

    const handleDeleteProduct = (productId) => {
        // TODO: Implementar eliminación de producto
        console.log('Eliminar producto:', productId);
    }
    
    return(
        <div className="w-full bg-white fixed flex  left-0 h-full">
            <Menu />
            <div className="ml-64 flex-1 p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Productos</h1>
                    <p className="text-gray-600">Administra los productos de tu tienda</p>
                </div>

                <div className="mb-6 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <input 
                            type="text" 
                            placeholder="Buscar productos..." 
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-color-rosa focus:border-transparent"
                        />
                    </div>
                    <button 
                        onClick={handleAddProduct}
                        className="flex items-center px-4 py-2 bg-color-rosa text-white rounded-lg hover:bg-opacity-90 transition-colors"
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Agregar Producto
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="max-h-80 overflow-y-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Producto
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Categoría
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Precio
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Stock
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Estado
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {items ? (
                                    items.map((item) => (
                                        <tr key={item.producto.Id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 flex-shrink-0">
                                                        <img 
                                                            className="h-10 w-10 rounded-lg object-cover" 
                                                            src={item.producto.ImagenesProductos?.[0]?.URLImagen || '/placeholder.png'} 
                                                            alt={item.producto.Nombre}
                                                        />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {item.producto.Nombre}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {item.producto.Descripcion?.substring(0, 50)}...
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                                    {item.producto.CategoriasProducto?.Nombre}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                ${item.opciones?.[0]?.precio || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {item.producto.Cantidad || 0}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                    item.producto.Activo 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {item.producto.Activo ? 'Activo' : 'Inactivo'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-2">
                                                    <button 
                                                        onClick={() => handleEditProduct(item.producto.Id)}
                                                        className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50"
                                                    >
                                                        <PencilIcon className="h-4 w-4" />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDeleteProduct(item.producto.Id)}
                                                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                                                    >
                                                        <TrashIcon className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                            Cargando productos...
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products