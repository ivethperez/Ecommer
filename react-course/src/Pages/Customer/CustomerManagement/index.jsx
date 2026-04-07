import { useState, useEffect } from "react";
import { useShopiContext } from '../../../Context'
import { PlusIcon, PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline'
import PageStart from "../../PageStart";
import CustomerCreate from "./customerCreate";
import CustomerEdit from "./customerEdit";
import Alert from "../../../Components/Alert"
import ProductModal from "../../../Components/ProductModal";
import ModalConfirmation from "../../../Components/Modals";

function CustomerManagement() {
    const { customerDelete, getCustomers, clientsItems, filteredCustomerItems, setMensajeAlerta, setShowAlert, showAlert, openModal, setOpenModal, searchCustomer } = useShopiContext();
    const [view, setView] = useState("list"); // list | create | edit | delete
    const [editingCustomerId, setEditingCustomerId] = useState(null);

    useEffect(() => {
        if (view === "list") {
            getCustomers();
        }
    }, [view]);

    const handleBackToList = () => {
        setView("list");
        setEditingCustomerId(null);
    };

    const handleCloseDelete = () => {
        setView("list");
        setShowAlert(true);
        setOpenModal(false);
        setEditingCustomerId(null);
    }
    const deleteCustomer = async () => {
        try {

            const res = await customerDelete(editingCustomerId);
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
        return <CustomerCreate onBack={handleBackToList} />;
    }
    else if (view === "edit") {
        const data = clientsItems.filter(item => item.id === editingCustomerId)
        return <CustomerEdit onBack={handleBackToList} data={data[0]} />;
    }

    return (
        <PageStart>
            {showAlert && <Alert />}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-600">Gestión de clientes</h1>
                {/* <p className="text-gray-600">Administra los clientes de tu tienda</p> */}
            </div>
            <div className="mb-4 mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                    <input
                        type="text"
                        placeholder="Buscar por nombre..."
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-color-rosa focus:border-transparent w-full sm:w-auto"
                        onChange={searchCustomer}
                    />
                </div>
                <button
                    onClick={() => setView("create")}
                    className="flex items-center justify-center px-4 py-2 bg-color-rosa text-white rounded-lg"
                >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Agregar nuevo cliente
                </button>
            </div>

            {filteredCustomerItems ? (
                filteredCustomerItems?.length > 0 ? (
                    <div className="bg-white rounded-lg shadow border border-gray-200 overflow-x-auto">
                        <table className="min-w-full table-auto text-sm text-gray-700">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Nombre
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Teléfono
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Dirección
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Activo
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredCustomerItems.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {item.name || ""} {item.lastName || ""}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full text-gray-900">
                                                {item.phone || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {item.email || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {item.address || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${item.active
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                                }`}>
                                                {item.active ? 'Activo' : 'Inactivo'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => { setEditingCustomerId(item.id); setView("edit") }}
                                                    className="text-indigo-500 hover:text-indigo-600 p-1 rounded hover:bg-indigo-50"
                                                >
                                                    <PencilIcon className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => { setEditingCustomerId(item.id); setOpenModal(true); setView("delete") }}
                                                    className="text-red-500 hover:text-red-600 p-1 rounded hover:bg-red-50"
                                                >
                                                    <TrashIcon className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>
                ) : (<div colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No hay registros que mostrar
                </div>)
            ) : (
                <div colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    Cargando clientes...
                </div>
            )}

            {openModal && (
                <ProductModal>
                    <ModalConfirmation titulo={"Confirmación"} mensaje={"¿Estas seguro de que quieres eliminar esté cliente?"}>
                        <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded" onClick={() => deleteCustomer()} >Confirmar</button>
                        <button className=" bg-red-500 hover:bg-red-600 text-white  py-2 px-4 rounded" onClick={() => setOpenModal(false)}> Cancelar</button>
                    </ModalConfirmation>
                </ProductModal>
            )}
        </PageStart>
    )
}

export default CustomerManagement