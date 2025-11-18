import { useState, useEffect } from "react";
import { useShopiContext } from '../../../Context'
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import Menu from '../../../Components/Menu'
import Alert from "../../../Components/Alert"
import ProductModal from "../../../Components/ProductModal";
import ModalConfirmation from "../../../Components/Modals";
import SaleCreate from "./saleCreate"


function Sale() {
    const { customerDelete, getSales, salesItems,filteredSalesItems,searchSales, setMensajeAlerta, setShowAlert, showAlert, openModal, setOpenModal, accionConfirmar, setAccionConfirmar } = useShopiContext();
    const [view, setView] = useState("list"); // list | create | edit | delete
    const [editingSaleId, setEditingSaleId] = useState(null);

    useEffect(() => {
        if (view === "list") {
            const fetchSale = async () => {
                await getSales();
            };
            fetchSale();
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
        const salesCount = salesItems?.length +1;
         return <SaleCreate onBack={handleBackToList} salesCount={salesCount} view={view} />;
    }
    else if (view === "edit") {
        return <SaleCreate onBack={handleBackToList} view={view} editingSaleId={editingSaleId} />;
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
        <aside className="w-full fixed flex left-0 h-full bg-gray-50">
            <Menu />
            <div className="md:ml-64 lg:ml-64 flex-1 flex flex-col p-4 md:p-8 overflow-hidden">
                {showAlert && <Alert />}
                <div className="mt-2">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de ventas</h1>
                    <p className="text-gray-600">Administra las ventas de tu tienda</p>
                </div>
                <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="flex items-center space-x-4">
                        <input
                            type="text"
                            placeholder="Buscar venta por folio"
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-color-rosa focus:border-transparent"
                            onChange={searchSales}
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

                <div className=" flex-1 
            overflow-x-auto 
            overflow-y-auto 
            bg-white 
            rounded-lg 
            shadow 
            border 
            border-gray-200 
            min-h-[300px]
            max-h-[calc(100vh-260px)] ">
                        <table className="min-w-full table-auto text-sm text-gray-700 ">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                        Folio
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                        Folio de pedido
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                        Cliente
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium  uppercase tracking-wider">
                                        Total
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium  uppercase tracking-wider">
                                        Estatus
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredSalesItems ? (
                                    filteredSalesItems.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {item.folio || ""} 
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full text-gray-500">
                                                    {item.folioPo || 'Venta directa'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {item.customer.name || 'N/A'} {item.customer.lastName || ''}
                                            </td>
                                            <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                                                {'$' + item.totalAmount || '0.0'}
                                            </td>
                                            <td className="px-6 py-4 text-center whitespace-nowrap">
                                               <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${item.statusSale.code === '02'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-yellow-500'
                                                    }`}>
                                                    {item.statusSale.name}
                                                </span> 
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap flex justify-center text-sm font-medium">
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

                {openModal && (
                    <ProductModal>
                        <ModalConfirmation mensaje={"¿Estas seguro de que quieres eliminar está venta?"}></ModalConfirmation>
                    </ProductModal>
                )}
            </div>
            
        </aside>
    )
}

export default Sale