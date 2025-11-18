import { useState, useEffect } from "react";
import { useShopiContext } from "../../../Context";
import Menu from "../../../Components/Menu";
import Alert from "../../../Components/Alert"
import '../../../Styles/styles.css'
import ModalConfirmation from "../../../Components/Modals";
import ProductModal from "../../../Components/ProductModal";
const saleCreate = ({ onBack, salesCount, view, editingSaleId }) => {
  const { saleCreate, saleDetailCreate, saleUpdate, saleDetailUpdate, saleDetailDelete, getSaleId, getPaymentMethods, getProductPrice, getStatusSale, getOrdersList, getCustomers, getSaleDetail, items, paymentMethodos, clientsItems, statusSale, ordersList, saleDetail, setSaleDetail, setMensajeAlerta, setShowAlert, showAlert,openModal, setOpenModal, accionConfirmar, setAccionConfirmar } = useShopiContext();
  const [saleWithDetails, setSaleWithDetails] = useState([]);
  const [productId, setProductId] = useState(null);
  const [unitOfMeasureId, setUnitOfMeasureId] = useState(null)
  const [editOrDeleteDetail, setEditOrDeleteDetail] = useState(false)
  const [detailNewItems, setDetailNewItem] = useState([]);
  const [saleNewId, setSaleNewId] = useState(null);
  const [productDeleteId, setProductDeleteId] = useState(null);

  useEffect(() => {
    if (view === "create" || view === "edit") {
      const fetchList = async () => {
        try {
          await getPaymentMethods();
          await getCustomers();
          await getOrdersList();
          await getStatusSale();
          if (editingSaleId) {
            setSaleWithDetails(await getSaleId(editingSaleId));
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchList();
    }
  }, [view]);

  useEffect(() => {
    if (unitOfMeasureId) {
      const fetchPrice = async () => {
        try {
          const productPrice = await getProductPrice(productId, unitOfMeasureId);
          setDetailItem((prev) => ({
            ...prev,
            productPriceId: parseInt(productPrice.id, 10),
            unitPrice: Number(parseFloat(productPrice.unitPrice).toFixed(2)),
            subtotal: Number(parseFloat(productPrice.unitPrice).toFixed(2))
          }));
        } catch (error) {
          console.error("Error al obtener precio:", error);
        }
      };
      fetchPrice();
    }
  }, [unitOfMeasureId]);

  useEffect(() => {
  }, [detailNewItems]);

  const [validations, setValidations] = useState({});
  const [formData, setFormData] = useState({
    folio: "VENT-" + salesCount,
    poId: null,
    customerId: null,
    paymentMethodId: null,
    totalAmount: 0,
    statusSaleId: null
  })
  const [detailItem, setDetailItem] = useState({
    saleId: null,
    productPriceId: null,
    quantity: 1,
    unitPrice: 0,
    subtotal: 0,
  });

  const handleProductSeleccion = (id) => {
    setDetailItem((prev) => ({
      saleId: view === "create" ? prev.saleId : saleWithDetails?.id,
      productPriceId: null,
      quantity: 1,
      unitPrice: 0,
      subtotal: 0,
    }));
    setProductId(id);
    setUnitOfMeasureId(null);
  };

  const handleChange = (e) => {
    if (view === "create") {
      setFormData({
        ...formData, [e.target.name]: e.target.value === "" ? null : isNaN(e.target.value)
          ? e.target.value
          : parseInt(e.target.value, 10),
      });
    } else {
      if (e.target.name === 'customerId')
        saleWithDetails.customer.id = e.target.value;
      else if (e.target.name === 'paymentMethodId')
        saleWithDetails.paymentMethod.id = e.target.value;
      else if (e.target.name === 'statusSaleId')
        saleWithDetails.statusSale.id = e.target.value;
    }
    setValidations({ ...validations, [e.target.name]: "" });
  };

  //#region ---- CREACIÓN Y ACTUALIZACIÓN DE ENCABEZADO VENTA -----
  const handleSubmit = async (e) => {
    e.preventDefault();

    let newValidations = {};
    if (!formData.folio.trim()) {
      newValidations.folio = "El folio del cliente es requerido";
    }
    if (Object.keys(newValidations).length > 0) {
      setValidations(newValidations);
      return;
    }
    try {
      if (view === 'create') {
        if (saleNewId) {
          const update = await saleUpdate(formData.id, formData.customerId, formData.paymentMethodId, formData.statusSaleId);
          if (update) {
            setShowAlert(true)
            setMensajeAlerta("Venta actualizada con éxito.")
          }
        }
        else {
          const newSale = await saleCreate(formData);
          if (newSale) {
            setDetailItem((prev) => ({
              ...prev,
              saleId: newSale.id
            }));
            setShowAlert(true)
            setSaleNewId(newSale.id)
            setMensajeAlerta("Venta creada con éxito.")
          }
        }
      }
      else if (view === 'edit') {
        const update = await saleUpdate(saleWithDetails.id, saleWithDetails.customer.id, saleWithDetails.paymentMethod.id, saleWithDetails.statusSale.id);
        if (update) {
          setShowAlert(true)
          setMensajeAlerta("Venta actualizada con éxito.")
        }
      }
    }
    catch (error) {
      setShowAlert(true)
      setMensajeAlerta(error);
    }
  };

  //#endregion
  const handleDetailChange = (e) => {
    const quantity = parseFloat(e.target.value) || 1;
    setDetailItem((prev) => ({
      ...prev,
      quantity,
      subtotal: quantity * prev.unitPrice,
    }));
  };

  const handleDetailPriceChange = (e) => {
    const unitPrice = parseFloat(e.target.value) || 0;
    setDetailItem((prev) => ({
      ...prev,
      unitPrice,
      subtotal: prev.quantity * unitPrice,
    }));
  }

  //#region -- CREACIÓN DE DETALLES DE LA VENTA ---
  const addDetail = async () => {
    try {
      const unitOfMeasureName = items?.find(x => x.product.id === productId)?.options?.find(z => z.unitOfMeasure.id === parseInt(unitOfMeasureId, 10))

      if (!editOrDeleteDetail) {
        const newSaleDetail = await saleDetailCreate(detailItem);
        if (newSaleDetail) {
          if (editingSaleId) {
            //Muestra la venta y sus detalles actualizados que debuelve el API
            setSaleWithDetails(await getSaleId(editingSaleId));
          }
          else {
            const productName = items.find(x => x.product.id === productId)
            setDetailNewItem((prev) => ([
              ...prev,
              {
                id: newSaleDetail.id,
                saleId: newSaleDetail.saleId,
                productPriceId: parseInt(newSaleDetail.id, 10),
                quantity: newSaleDetail.quantity,
                unitPrice: Number(parseFloat(newSaleDetail.unitPrice).toFixed(2)),
                subtotal: Number(parseFloat(newSaleDetail.unitPrice).toFixed(2)),
                productName: productName.product.name,
                unitOfMeasureName: unitOfMeasureName.unitOfMeasure.name,
                productId: productId,
                unitOfMeasureId: parseInt(unitOfMeasureId, 10)
              }
            ])
            );
          }
          setMensajeAlerta("Detalle de venta creado con éxito.")
        }
      }
      else {
        const newSaleDetail = await saleDetailUpdate(detailItem);
        if (newSaleDetail) {
          if (editingSaleId) {
            setSaleWithDetails(await getSaleId(editingSaleId));
          }
          else {
            setDetailNewItem(prev =>
              prev.map(item =>
                item.id === detailItem.id
                  ? {
                    ...item, productPriceId: detailItem.productPriceId, quantity: detailItem.quantity,
                    unitOfMeasureName: unitOfMeasureName.unitOfMeasure.name,
                    unitOfMeasureId: parseInt(unitOfMeasureId, 10),
                    subtotal: detailItem.subtotal,
                    unitPrice: detailItem.unitPrice
                  }
                  : item
              )
            );
          }
          setMensajeAlerta("Detalle de venta actualizado con éxito.")
        }
      }
      setShowAlert(true)
      handleProductSeleccion(null);
      setEditOrDeleteDetail(false)
    }
    catch (error) {
      setShowAlert(true)
      setMensajeAlerta(error);
    }
  };

  //#endregion
  const deleteDetail = async () => {
       try {
        if (productDeleteId) {
          const deleteDetail = await saleDetailDelete(productDeleteId);
          if (deleteDetail) {         
            setOpenModal(false);
            setAccionConfirmar(false)
            setShowAlert(true)
            setMensajeAlerta("Producto eliminado con éxito.")
          }
        }
    }
    catch (error) {
      setShowAlert(true)
      setMensajeAlerta(error);
    }
  };

if (editOrDeleteDetail && productDeleteId) {
 
  if(accionConfirmar ){
     console.log(productDeleteId);
    deleteDetail();
  }
}
  const editDetail = (id) => {
    if (view === "create") {
      const detailNewItem = detailNewItems.find(x => x.id === id)
      cargarDetailItem(detailNewItem, detailNewItem.productPriceId, detailNewItem.saleId);
      setProductId(detailNewItem.productId);
      setUnitOfMeasureId(detailNewItem.unitOfMeasureId);
    }
    else {
      const item = saleWithDetails.saleDetail.find((d) => d.id === id);
      cargarDetailItem(item, parseInt(item.productPrice.id, 10), saleWithDetails.id)
      setProductId(item.productPrice.product.id);
      setUnitOfMeasureId(item.productPrice.unitOfMeasure.id);
    }
  };

  const cargarDetailItem = (item, productPriceId, saleId) => {
    setDetailItem((prev) => ({
      id: item.id,
      saleId: saleId,
      productPriceId: productPriceId,
      quantity: item.quantity,
      unitPrice: Number(parseFloat(item.unitPrice).toFixed(2)),
      subtotal: Number(parseFloat(item.unitPrice).toFixed(2))
    }));
  }
  return (
    <aside className="w-full fixed flex left-0 h-full bg-gray-50">
      <Menu />
      <div className="md:ml-64 lg:ml-64 flex-1 flex flex-col p-4 md:p-6 overflow-hidden">
        <div className="relative size-32">
          <div className="absolute -top-4 -left-4 size-14">
            <button
              onClick={onBack}
              className="button-return"
            >Volver
            </button>
          </div>
        </div>
        <div className="rounded-lg overflow-x-auto sm:overflow-visible ">
          {showAlert && <Alert />}
          <div className="p-12 rounded space-y-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Nueva venta</h1>
            <form
              onSubmit={handleSubmit}
              className="rounded mt-3 "
            >
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full  md:w-1/4 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                    Folio
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="folio"
                    value={view === 'create' ? formData.folio : saleWithDetails?.folio}
                    onChange={handleChange}
                    className={`w-full p-2 bg-slate-200 border-slate-200 rounded ${validations.name ? "border-red-500" : ""
                      }`}
                    required
                    disabled
                  />
                  {validations.name && (
                    <p className="text-red-500 text-sm mt-1">{validations.name}</p>
                  )}
                </div>

                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                    Pedido
                  </label>
                  <div className="relative">
                    <select
                      name="poId"
                      value={view === 'create' ? formData?.poId || null : saleWithDetails?.po?.id}
                      onChange={handleChange}
                      disabled={saleWithDetails.id || saleNewId}
                      className={`block appearance-none w-full border-gray-200 text-gray-700 py-2.5 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500
                  ${saleWithDetails?.id ? "bg-slate-200" : ""}`}>

                      <option value="">Selecciona</option>
                      {ordersList?.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      )) || null}
                    </select>
                  </div>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                    Cliente
                  </label>
                  <div className="relative">
                    <select
                      name="customerId"
                      value={view === 'create' ? formData?.customerId || null : saleWithDetails?.customer?.id}
                      onChange={handleChange}
                      className="block appearance-none w-full border-gray-200 text-gray-700 py-2.5 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    >
                      <option value="">Selecciona</option>
                      {clientsItems?.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name} {item.lastName}
                        </option>
                      )) || null}
                    </select>
                  </div>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                    Metodo de pago
                  </label>
                  <div className="relative">
                    <select
                      name="paymentMethodId"
                      value={view === 'create' ? formData?.paymentMethodId || "" : saleWithDetails?.paymentMethod?.id}
                      onChange={handleChange}
                      className="block appearance-none w-full border-gray-200 text-gray-700 py-2.5 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    >
                      <option value="">Selecciona</option>
                      {paymentMethodos?.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      )) || null}
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                    Estatus
                  </label>
                  <div className="relative">
                    <select
                      name="statusSaleId"
                      value={view === 'create' ? formData?.statusSaleId || "" : saleWithDetails?.statusSale?.id}
                      onChange={handleChange}
                      className="block appearance-none w-full border-gray-200 text-gray-700 py-2.5 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    >
                      <option value="">Selecciona</option>
                      {statusSale?.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      )) || null}
                    </select>
                  </div>
                </div>

                {view === "create" ? (
                  <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                  </div>
                ) : (<div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">

                  <label className="block uppercase text-right tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Total
                  </label>
                  <input
                    type="text"
                    value={view === 'create' ? "$" + saleDetail[0]?.sale.totalAmount : "$" + saleWithDetails?.totalAmount}
                    placeholder="Total de la venta"
                    className="border block w-full rounded px-3 py-2 focus:outline-none text-right focus:ring-2 focus:ring-blue-500 bg-slate-200"
                    disabled
                  />

                </div>)}
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                    -
                  </label>
                  <button
                    type="submit"
                    className="px-4 py-2 mb-2 bg-green-300 text-white rounded hover:bg-green-600"
                  >
                    {view === "create" ? "Guardar" : "Actializar"}
                  </button>
                </div>
              </div>
            </form>
            <hr className="border-gray-300" />

            {view === "edit" || detailItem.saleId !== null ? (
              <div>
                {/* FORMULARIO DETALLE */}
                <h2 className="text-lg font-bold ">Detalle de la venta</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    addDetail();
                  }}
                  className="flex flex-wrap gap-4 items-end mb-4"
                >
                  <div className="w-full md:w-1/4 md:mb-0">
                    <label className="block text-xs font-bold mb-1">Producto</label>
                    <select
                      className={`min-w-full border rounded px-3 py-2 ${editOrDeleteDetail ? "bg-slate-200" : ""}`}
                      onChange={(e) => handleProductSeleccion(parseInt(e.target.value, 10))}
                      value={productId || ""}
                      disabled={editOrDeleteDetail}
                    >
                      <option value="">Selecciona</option>
                      {items?.map((op) => (
                        <option key={op.product.id} value={op.product.id}>
                          {op.product.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full md:w-1/4  md:mb-0">
                    <label className="block text-xs font-bold mb-1">Unidad</label>
                    <select
                      className="min-w-full border rounded px-3 py-2"
                      onChange={(e) =>
                        setUnitOfMeasureId(e.target.value)
                      }
                      value={unitOfMeasureId || ""}
                      disabled={!productId}
                    >
                      <option value="">Selecciona unidad</option>
                      {items?.find((item) => item.product.id === productId)?.options.map((op) => (
                        <option key={op.unitOfMeasure.id} value={op.unitOfMeasure.id}>
                          {op.unitOfMeasure.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="md:mb-0">
                    <label className="block text-xs font-bold mb-1 text-right">Cantidad</label>
                    <input
                      type="number"
                      name="cantidad"
                      value={detailItem.quantity}
                      onChange={handleDetailChange}
                      className="border rounded px-3 py-2 md:w-24 min-w-full text-right"
                      min="1"
                    />
                  </div>
                  <div className="md:mb-0">
                    <label className="block text-xs font-bold mb-1 text-right">Precio</label>
                    <input
                      type="number"
                      name="precio"
                      value={detailItem.unitPrice}
                      onChange={handleDetailPriceChange}
                      className="border rounded px-3 py-2 md:w-28 min-w-full text-right"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1 text-right">Total</label>
                    <input
                      type="number"
                      value={detailItem.subtotal}
                      readOnly
                      className="border rounded px-3 py-2 md:w-28 bg-gray-100 text-right"
                      disabled
                    />
                  </div>
                  <div className="flex justify-end w-full gap-2">
                    <button
                      type="submit"
                      className={`px-4 py-2 text-white rounded ${!(productId && unitOfMeasureId) ? "bg-blue-300" : "bg-blue-600"}`}
                      disabled={!(productId && unitOfMeasureId)}
                    >
                      {!editOrDeleteDetail ? "Agregar" : "Actializar"}
                    </button>
                    {editOrDeleteDetail && (
                      <button
                        type="button"
                        onClick={() => { handleProductSeleccion(null); setEditOrDeleteDetail(false) }}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                </form>

                {/* LISTA DE DETALLES */}
                <div className=" flex-1 overflow-x-auto overflow-y-auto bg-white shadow border-gray-200 min-h-[20px] 
             max-h-[calc(100vh-260px)]">
                  <table className="min-w-full table-auto text-sm text-gray-700">
                    <thead className="bg-gray-200">
                      <tr >
                        <th className="px-6 py-4 text-left text-xs uppercase tracking-wider">Producto</th>
                        <th className="px-6 py-4 text-left text-xs uppercase tracking-wider">Unidad</th>
                        <th className="px-6 py-4 text-right text-xs uppercase tracking-wider">Cantidad</th>
                        <th className="px-6 py-4 text-right text-xs uppercase tracking-wider">Precio</th>
                        <th className="px-6 py-4 text-right text-xs uppercase tracking-wider">Total</th>
                        <th className="px-6 py-4 text-center text-xs uppercase tracking-wider">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {view === 'create' ? detailNewItems?.map((d) => (
                        <tr key={d.id}>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{d.productName}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{d.unitOfMeasureName}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-right text-gray-900">{d.quantity}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-right text-gray-900">${d.unitPrice}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-right text-gray-900">${d.subtotal}</td>
                          <td className="px-4 py-2 whitespace-nowrap flex justify-center gap-2">
                            <button
                              onClick={() => { setEditOrDeleteDetail(true); editDetail(d.id) }}
                              className="px-2 py-1 bg-yellow-400 rounded text-white hover:bg-yellow-500"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => { setEditOrDeleteDetail(true); deleteDetail(d.id) }}
                              className="px-2 py-1 bg-red-500 rounded text-white hover:bg-red-600"
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      )) :
                        saleWithDetails?.saleDetail?.map((d) => (
                          <tr key={d.id}>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900py-1">{d.productPrice.product.name}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 ">{d.productPrice.unitOfMeasure.name}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-right text-gray-900">{d.quantity}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-right text-gray-900">${d.unitPrice}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-right text-gray-900">${d.subtotal}</td>
                            <td className="px-4 py-2 whitespace-nowrap flex justify-center gap-2">
                              <button
                                onClick={() => { setEditOrDeleteDetail(true); editDetail(d.id) }}
                                className="px-2 py-1 bg-yellow-400 rounded text-white hover:bg-yellow-500"
                              >
                                Editar
                              </button>
                              <button
                                onClick={() => { setEditOrDeleteDetail(true); setOpenModal(true);  setProductDeleteId(d.id) }}
                                className="px-2 py-1 bg-red-500 rounded text-white hover:bg-red-600"
                              >
                                Eliminar
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (<div></div>)}
          </div>
        </div>
         {openModal && (
                            <ProductModal>
                                <ModalConfirmation mensaje={"¿Estas seguro de que quieres eliminar esté producto?"}></ModalConfirmation>
                            </ProductModal>
                        )}
      </div>
    </aside>
  );
}
export default saleCreate