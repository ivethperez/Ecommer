import { useState } from "react";
import Menu from '../../Components/Menu'
import { useShopiContext } from '../../Context'
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import '../../Styles/styles.css'
import ProductEditView from "./edit";
import PageStart from "../PageStart";
import Alert from "../../Components/Alert"

function Products() {
    const { items,showAlert,searchProducto } = useShopiContext();
    const [editingProductId, setEditingProductId] = useState('');

    const handleAddProduct = () => {
    }

    const handleEditProduct = (productId) => {
        // TODO: Implementar edición de producto
        setEditingProductId(productId);
    }

    const handleDeleteProduct = (productId) => {
        // TODO: Implementar eliminación de producto
    }
    const handleBackToList = () => {
        setEditingProductId(null);
    };

    if (editingProductId) {
        return <ProductEditView id={editingProductId} onBack={handleBackToList} />;
    }
    return (
         <PageStart>
            {showAlert && <Alert />}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-600">Gestión de productos</h1>
                </div>

               <div className="mb-4 mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                    <input
                        type="text"
                        placeholder="Buscar por folio"
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-color-rosa focus:border-transparent w-full sm:w-auto"
                        onChange={searchProducto}
                    />
                </div>
                <button
                    onClick={handleAddProduct}
                    className="flex text-center px-4 py-2 bg-color-rosa text-white rounded-lg hover:bg-opacity-90 transition-colors"
                >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Agregar nuevo producto
                </button>
            </div>

                   <div className=" flex-1 overflow-x-auto overflow-y-auto bg-white rounded-lg shadow border border-gray-200 
            min-h-[300px] max-h-[calc(100vh-260px)] ">
                        <table className="min-w-full table-auto text-sm text-gray-700 ">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs text-gray-500 font-medium uppercase tracking-wider">
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
                                        <tr key={item.product.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 flex-shrink-0">
                                                        <img
                                                            className="h-10 w-10 rounded-lg object-cover"
                                                            src={item.product.productImage?.[0]?.imageUrl || '/placeholder.png'}
                                                            alt={item.product.name}
                                                        />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {item.product.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {item.product.description?.substring(0, 50)}...
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                                    {item.product.category?.name}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                ${item.options?.[0]?.unitPrice || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {item.product.queantity || 0}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${item.product.active
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {item.product.active ? 'Activo' : 'Inactivo'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => handleEditProduct(item.product.id)}
                                                        className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50"
                                                    >
                                                        <PencilIcon className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteProduct(item.product.id)}
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

     </PageStart>
    )
}

export default Products