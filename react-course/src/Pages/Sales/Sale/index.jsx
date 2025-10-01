import { useState, useEffect } from "react";
import { useShopiContext } from '../../../Context'
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import Menu from '../../../Components/Menu'
import Alert from "../../../Components/Alert"
import ProductModal from "../../../Components/ProductModal";
import ModalConfirmation from "../../../Components/Modals";
import SaleCreate from "./saleCreate"


function Sale() {
    const { customerDelete, getSales, salesItems,filteredSalesItems, setMensajeAlerta, setShowAlert, showAlert, openModal, setOpenModal, accionConfirmar, setAccionConfirmar,searchCustomer } = useShopiContext();
    const [view, setView] = useState("list"); // list | create | edit | delete
    const [editingSaleId, setEditingSaleId] = useState(null);

    useEffect(() => {
        if (view === "list") {
             getSales();
        }
    }, [view]);

    const handleBackToList = () => {
        setView("list");
        setEditingSaleId(null);
    };

    const handleCloseDelete = () => {
        setView("list");
        setShowAlert(true);
        setOpenModal(false);
        setAccionConfirmar(false);
    }
    const deleteCustomer = async (id) => {
        try {
            const res = await customerDelete(id);
            if (res) {
                setMensajeAlerta("Cliente eliminado con éxito.");
                handleCloseDelete();
            }
        }
        catch (error) {
            console.log(error.message);
            handleCloseDelete();
        }
    };

    if (view === "create") {
        const salesCount = salesItems.length +1;
         return <SaleCreate onBack={handleBackToList} salesCount={salesCount} view={view} />;
    }
    else if (view === "edit") {
        // const data = clientsItems.filter(item => item.id === editingSaleId)
        // return <CustomerEdit onBack={handleBackToList} data={data[0]} />;
    }
    else if (view === "delete") {
        // if (accionConfirmar && editingSaleId) {
        //     const data = clientsItems.filter(item => item.id === editingSaleId);
        //     setEditingSaleId(null);
        //     const id = data[0].id;
        //     deleteCustomer(id);
        // }
    }

    return (
        <div className="w-full bg-white fixed flex  left-0 h-full">
            <Menu />
            <div className="ml-64 flex-1 p-8">
                {showAlert && <Alert />}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de ventas</h1>
                    <p className="text-gray-600">Administra las ventas de tu tienda</p>
                </div>
                <div className="mb-6 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <input
                            type="text"
                            placeholder="Buscar venta por folio"
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-color-rosa focus:border-transparent"
                            onChange={searchCustomer}
                        />
                    </div>
                    <button
                        onClick={() => setView("create")}
                        className="flex items-center px-4 py-2 bg-color-rosa text-white rounded-lg hover:bg-opacity-90 transition-colors"
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Agregar venta
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className=" max-h-96  overflow-y-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Folio
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Folio de pedido
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Cliente
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Total
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Estatus
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredSalesItems ? (
                                    filteredSalesItems.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {item.folio || ""} 
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full text-gray-900">
                                                    {item.folioPo || 'Venta directa'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {item.customer.name || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {item.totalAmount || '0.0'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {/* <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${item.
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {item.active ? 'Activo' : 'Inactivo'}
                                                </span> */}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => { setEditingSaleId(item.id); setView("edit") }}
                                                        className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50"
                                                    >
                                                        <PencilIcon className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => { setEditingSaleId(item.id); setOpenModal(true); setView("delete") }}
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
                                    {filteredSalesItems?.length > 0 ? (<td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                           Cargando ventas ..
                                        </td>) : ( <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                           No hay registros que mostrar
                                        </td>)}
                                        
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {openModal && (
                    <ProductModal>
                        <ModalConfirmation mensaje={"¿Estas seguro de que quieres eliminar está venta?"}></ModalConfirmation>
                    </ProductModal>
                )}
            </div>
        </div>
    )
}

export default Sale