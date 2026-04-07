import { useState, useEffect } from "react";
import { useShopiContext } from '../../../Context'
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import PageStart from "../../PageStart";
import Alert from "../../../Components/Alert"
import ProductModal from "../../../Components/ProductModal";
import ModalConfirmation from "../../../Components/Modals";
import SaleCreate from "./saleCreate"


function Sale() {
    const { saleDelete, getSales, salesItems, filteredSalesItems, setFilteredSalesItems, getSaleId, searchSales, setMensajeAlerta, setShowAlert, showAlert, setTypeAlert, openModal, setOpenModal } = useShopiContext();
    const [view, setView] = useState("list"); // list | create | edit | delete
    const [editingSaleId, setEditingSaleId] = useState(null);
    const [dateStart, setDateStart] = useState(null);
    const [dateEnd, setDateEnd] = useState(null);

    useEffect(() => {
        if (view === "list") {
            const fetchSale = async () => {
                await getSales();
            };
            fetchSale();
        }
    }, [view]);

    useEffect(() => {
        if (dateStart && dateEnd) {
            const start = new Date(dateStart);
            const end = new Date(dateEnd);

            setFilteredSalesItems(
                salesItems.filter(item => {
                    const saleDate = new Date(item.saleDate);
                    return saleDate >= start && saleDate <= end;
                })
            );
        }
        else
            setFilteredSalesItems(salesItems)
    }, [salesItems, dateStart, dateEnd])

    const handleBackToList = () => {
        setView("list");
        setEditingSaleId(null);
    };
    const handleCloseDelete = () => {
        setView("list");
        setShowAlert(true);
        setOpenModal(false);
    }
    const deleteSale = async () => {
        try {
            const data = filteredSalesItems.filter(item => item.id === editingSaleId);
            const id = data[0].id;
            const saleWithDetails = await getSaleId(id);
            if (saleWithDetails.saleDetail.length > 0) {
                setTypeAlert('error')
                setMensajeAlerta("Para poder eliminar la venta debe primero eliminar su detalle.");
                handleCloseDelete();
            }
            else {
                const res = await saleDelete(id);
                if (res) {
                    setMensajeAlerta("Venta eliminada con éxito.");
                    handleCloseDelete();
                }
            }
        }
        catch (error) {
            console.log(error.message);
            handleCloseDelete();
        }
    };

    if (view === "create") {
        const salesCount = salesItems?.length + 1;
        return <SaleCreate onBack={handleBackToList} salesCount={salesCount} view={view} />;
    }
    else if (view === "edit") {
        return <SaleCreate onBack={handleBackToList} view={view} editingSaleId={editingSaleId} />;
    }
    return (
        <>
            {showAlert && <Alert />}
            <PageStart>
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-600 ">Gestión de ventas</h1>
                    {/* <p className="text-gray-600">Administra las ventas de tu tienda</p> */}
                </div>
                <div className="mb-4 mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                        <input
                            type="text"
                            placeholder="Buscar por folio"
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-color-rosa focus:border-transparent w-full sm:w-auto"
                            onChange={searchSales}
                        />
                        <input
                            type="date"
                            placeholder="Fecha de inicio"
                            value={dateStart ?? ''}
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none 
                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto"
                            onChange={(e) => setDateStart(e.target.value)}
                        />
                        <input
                            type="date"
                            placeholder="Fecha fin"
                            value={dateEnd ?? ''}
                            className="border border-gray-300 rounded-lg px-4 py-2  focus:outline-none 
                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto"
                            onChange={(e) => setDateEnd(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={() => setView("create")}
                        className="flex items-center justify-center  px-4 py-2 bg-color-rosa text-white rounded-lg hover:bg-opacity-90 transition-colors"
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Agregar nueva venta
                    </button>
                </div>
                {filteredSalesItems ? (
                    filteredSalesItems?.length > 0 ? (
                        <div className=" flex-1 overflow-x-auto overflow-y-auto bg-white rounded-lg shadow border border-gray-200 
            min-h-[300px] max-h-[calc(100vh-260px)] ">
                            <table className="min-w-full table-auto text-sm text-gray-700 ">
                                <caption className="caption-bottom text-center pl-4">
                                </caption>
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
                                        <th className="px-6 py-3 text-center text-xs font-medium  uppercase tracking-wider">
                                            Fecha de venta
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
                                    {filteredSalesItems.map((item) => (
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
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                                {item.saleDate ? item.saleDate.substring(0, 10) : 'N/A'}
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
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr className="bg-white divide-y divide-gray-200">
                                        <th colSpan="3"></th>
                                        <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                                            Total en ventas
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                                            {
                                                new Intl.NumberFormat("es-MX", {
                                                    style: "currency",
                                                    currency: "MXN",
                                                }).format(
                                                    filteredSalesItems?.reduce(
                                                        (acc, item) => acc + Number(item.totalAmount),
                                                        0
                                                    ) || 0
                                                )
                                            }
                                        </th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    ) : (<div colSpan="6" className="px-6 py-4 text-center text-gray-500">
                        No hay registros que mostrar
                    </div>)
                ) : (
                    <div colSpan="6" className="px-6 py-4 text-center text-gray-500">
                        Cargando ventas...
                    </div>
                )}
                {openModal && (
                    <ProductModal>
                        <ModalConfirmation titulo={"Confirmación"} mensaje={"¿Estas seguro de que quieres eliminar está venta?"}>
                            <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded" onClick={() => deleteSale()} >Confirmar</button>
                            <button className=" bg-red-500 hover:bg-red-600 text-white  py-2 px-4 rounded" onClick={() => setOpenModal(false)}> Cancelar</button>
                        </ModalConfirmation>
                    </ProductModal>
                )}
            </PageStart>
        </>
    )
}

export default Sale