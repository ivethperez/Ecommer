import { useState, useEffect } from "react";
import { useShopiContext } from "../../../Context";
import PageStart from "../../PageStart";
import Alert from "../../../Components/Alert"
import '../../../Styles/styles.css'
import ModalConfirmation from "../../../Components/Modals";
import ProductModal from "../../../Components/ProductModal";
import BtnOnBack from "../../../Components/BtnOnBack";
const saleCreate = ({ onBack, salesCount, view, editingSaleId }) => {
  const { saleCreate, saleDetailCreate, saleUpdate, saleDetailUpdate, saleDetailDelete, getSaleId, getPaymentMethods, getProductPrice, getStatusSale, getOrdersList, getCustomers, getSaleDetail, items, paymentMethodos, clientsItems, statusSale, ordersList, saleDetail, setSaleDetail, setMensajeAlerta, setShowAlert, showAlert, setTypeAlert, openModal, setOpenModal } = useShopiContext();
  const [saleWithDetails, setSaleWithDetails] = useState([]);
  const [productId, setProductId] = useState(null);
  const [unitOfMeasureId, setUnitOfMeasureId] = useState(null)
  const [editOrDeleteDetail, setEditOrDeleteDetail] = useState(false)
  const [actionSaleDetail, setActionSaleDetail] = useState("list"); // list | edit | delete
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

  useEffect(() => {
    //Muestra la venta y sus detalles actualizados que debuelve el API
    const fetchList = async () => {
      try {
        if (editingSaleId) {
          setSaleWithDetails(await getSaleId(editingSaleId));
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchList();
  }, [actionSaleDetail])

  const [validations, setValidations] = useState({});
  const [formData, setFormData] = useState({
    folio: "VENT-" + salesCount,
    poId: null,
    customerId: null,
    paymentMethodId: null,
    totalAmount: 0,
    statusSaleId: null,
    saleDate: null
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
      saleId: view === "create" ? prev?.saleId : saleWithDetails?.id,
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
      const { name, value, type } = e.target;
      // Para inputs tipo date, no convertir a número
      if (type === "date") {
        const isoDate = new Date(value).toISOString();
        setFormData({ ...formData, [name]: isoDate });
        return;
      }
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
      else if (e.target.name === 'saleDate')
        saleWithDetails.saleDate = new Date(e.target.value).toISOString();
    }
    setValidations({ ...validations, [e.target.name]: "" });
  };
  //#region ---- CREACIÓN Y ACTUALIZACIÓN DE ENCABEZADO VENTA -----
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (view === 'create') {
        let newValidations = {};
        if (!formData.folio.trim()) {
          newValidations.folio = "El folio del cliente es requerido";
        }
        if (!formData.saleDate) {
          newValidations.fecha = "El campo fecha es requerido";
        }
        if (Object.keys(newValidations).length > 0) {
          setValidations(newValidations);
          return;
        }
        if (saleNewId) {
          const update = await saleUpdate(saleNewId, formData.customerId, formData.paymentMethodId, formData.statusSaleId, formData.saleDate);
          if (update) {
            cleanAlert("Venta actualizada con éxito.", "")
          }
        }
        else {
          const newSale = await saleCreate(formData);
          if (newSale) {
            setDetailItem((prev) => ({
              ...prev,
              saleId: newSale.id
            }));
            setSaleNewId(newSale.id)
            cleanAlert("Venta creada con éxito.", "")
          }
        }
      }
      else if (view === 'edit') {
        const update = await saleUpdate(saleWithDetails?.id, saleWithDetails?.customer.id, saleWithDetails?.paymentMethod.id, saleWithDetails?.statusSale.id, saleWithDetails?.saleDate);
        if (update) {
          cleanAlert("Venta actualizada con éxito.", "")
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
            setActionSaleDetail("edit");
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
          cleanAlert("Detalle de venta creado con éxito.", "")
        }
      }
      else {
        const newSaleDetail = await saleDetailUpdate(detailItem);
        if (newSaleDetail) {
          if (editingSaleId) {
            setActionSaleDetail("edit");
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
          cleanAlert("Detalle de venta actualizado con éxito.", "")
        }
      }
      handleProductSeleccion(null);
      setEditOrDeleteDetail(false)
    }
    catch (error) {
      setShowAlert(true)
      setMensajeAlerta(error);
    }
  };
  //#endregion

  const handleCloseDelete = async () => {
    setActionSaleDetail("list");
    setOpenModal(false);
    setProductDeleteId(null)
    setEditOrDeleteDetail(false);
  }

  const deleteDetail = async () => {
    try {
      if (productDeleteId) {
        const deleteDetailResp = await saleDetailDelete(productDeleteId);
        if (deleteDetailResp) {
          if (view === 'create') {
            setDetailNewItem(prev =>
              prev.filter(item =>
                item.id !== productDeleteId
              )
            );
          }
          cleanAlert("Producto eliminado con éxito.", "")
          await handleCloseDelete();
        }
      }
    }
    catch (error) {
      setShowAlert(true)
      setTypeAlert('error')
      setMensajeAlerta(error);
    }
  };

  const editDetail = (id) => {
    if (view === "create") {
      const detailNewItem = detailNewItems.find(x => x.id === id)
      cargarDetailItem(detailNewItem, detailNewItem.productPriceId, detailNewItem.saleId);
      setProductId(detailNewItem.productId);
      setUnitOfMeasureId(detailNewItem.unitOfMeasureId);
    }
    else {
      const item = saleWithDetails?.saleDetail.find((d) => d.id === id);
      cargarDetailItem(item, parseInt(item.productPrice.id, 10), saleWithDetails?.id)
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
  const cleanAlert = (mensaje, typeAlert) => {
    setShowAlert(true)
    setTypeAlert(typeAlert)
    setMensajeAlerta(mensaje)
  }

  return (
    <PageStart>
      {/* <div className="ml-0 md:ml-60 pt-20 px-4 md:px-8 transition-all duration-300 "> */}
      <BtnOnBack onBack={onBack}/>
      {showAlert && <Alert />}
      <div className="rounded-lg sm:overflow-visible mt-3">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Nueva venta</h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                Folio
              </label>
              <input
                type="text"
                name="name"
                placeholder="folio"
                value={view === 'create' ? (formData.folio ?? '') : (saleWithDetails?.folio ?? '')}
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
            <div>
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                Pedido
              </label>
              <div className="relative">
                <select
                  name="poId"
                  value={view === 'create' ? (formData?.poId ?? '') : (saleWithDetails?.po?.id ?? '')}
                  onChange={handleChange}
                  disabled={saleWithDetails?.id || saleNewId}
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
            <div>
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                Cliente
              </label>
              <div className="relative">
                <select
                  name="customerId"
                  value={view === 'create' ? (formData?.customerId ?? '') : (saleWithDetails?.customer?.id ?? '')}
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
            <div>
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                Metodo de pago
              </label>
              <div className="relative">
                <select
                  name="paymentMethodId"
                  value={view === 'create' ? (formData?.paymentMethodId ?? '') : (saleWithDetails?.paymentMethod?.id ?? '')}
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
            <div>
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 after:ml-0.5 after:text-red-500 after:content-['*'] " >
                Fecha
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="saleDate"
                  value={view === 'create' ? (formData?.saleDate?.substring(0, 10) ?? '') : (saleWithDetails?.saleDate?.substring(0, 10) ?? '')}
                  onChange={handleChange}
                  className="border w-full border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none 
               focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                {validations.fecha && (
                  <p className="text-red-500 text-sm mt-1">{validations.fecha}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                Estatus
              </label>
              <div className="relative">
                <select
                  name="statusSaleId"
                  value={view === 'create' ? (formData?.statusSaleId ?? '') : (saleWithDetails?.statusSale?.id ?? '')}
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
            <div>
              {!saleNewId && !editingSaleId ? (
                <div >
                </div>
              ) : (<div>

                <label className="block uppercase text-right tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Total
                </label>
                <input
                  type="text"
                  value={view === 'create' ? "$" + (detailNewItems?.reduce((acc, item) => acc + item.subtotal, 0) ?? '') : "$" + (saleWithDetails?.totalAmount ?? '')}
                  placeholder="Total de la venta"
                  className="border block w-full rounded px-3 py-2 focus:outline-none text-right focus:ring-2 focus:ring-blue-500 bg-slate-200"
                  disabled
                />

              </div>)}
            </div>
            <div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
            >
              {!saleNewId && !editingSaleId ? "Guardar" : "Actualizar"}
            </button>
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
              className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:grid-cols-2 items-end mb-4 w-full"
            >

              {/* Producto */}
              <div className="w-full">
                <label className="block text-xs font-bold mb-1">Producto</label>
                <select
                  className={`w-full border rounded px-3 py-2 ${editOrDeleteDetail ? "bg-slate-200" : ""}`}
                  onChange={(e) => handleProductSeleccion(parseInt(e.target.value, 10))}
                  value={productId ?? ""}
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

              {/* Unidad */}
              <div className="w-full">
                <label className="block text-xs font-bold mb-1">Unidad</label>
                <select
                  className="w-full border rounded px-3 py-2"
                  onChange={(e) => setUnitOfMeasureId(e.target.value)}
                  value={unitOfMeasureId ?? ""}
                  disabled={!productId}
                >
                  <option value="">Selecciona unidad</option>
                  {items
                    ?.find((item) => item.product.id === productId)
                    ?.options.map((op) => (
                      <option key={op.unitOfMeasure.id} value={op.unitOfMeasure.id}>
                        {op.unitOfMeasure.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Cantidad */}
              <div className="w-full">
                <label className="block text-xs font-bold mb-1">Cantidad</label>
                <input
                  type="number"
                  name="cantidad"
                  value={detailItem.quantity ?? ""}
                  onChange={handleDetailChange}
                  className="border rounded px-3 py-2 w-full text-right"
                  min="1"
                />
              </div>

              {/* Precio */}
              <div className="w-full">
                <label className="block text-xs font-bold mb-1">Precio</label>
                <input
                  type="number"
                  name="precio"
                  value={detailItem.unitPrice ?? ""}
                  onChange={handleDetailPriceChange}
                  className="border rounded px-3 py-2 w-full text-right"
                  min="0"
                  step="0.01"
                />
              </div>

              {/* Total */}
              <div className="w-full">
                <label className="block text-xs font-bold mb-1">Total</label>
                <input
                  type="number"
                  value={detailItem.subtotal ?? ""}
                  readOnly
                  className="border rounded px-3 py-2 w-full bg-gray-100 text-right"
                  disabled
                />
              </div>

              {/* Botones */}
              <div className="col-span-1 md:col-span-5 flex justify-end gap-2">
                <button
                  type="submit"
                  className={`px-4 py-2 text-white rounded ${!(productId && unitOfMeasureId)
                    ? "bg-blue-300"
                    : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  disabled={!(productId && unitOfMeasureId)}
                >
                  {!editOrDeleteDetail ? "Agregar" : "Actualizar"}
                </button>

                {editOrDeleteDetail && (
                  <button
                    type="button"
                    onClick={() => {
                      handleProductSeleccion(null);
                      setEditOrDeleteDetail(false);
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Cancelar
                  </button>
                )}
              </div>

            </form>
            {/* LISTA DE DETALLES */}
            <div className="flex-1 overflow-x-auto overflow-y-auto bg-white shadow min-h-[20px]"
              style={{ maxHeight: "calc(3 * 56px + 2px)" }}>
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
                          onClick={() => { setOpenModal(true); setProductDeleteId(d.id) }}
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
                            onClick={() => { setActionSaleDetail('delete'); setOpenModal(true); setProductDeleteId(d.id) }}
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
      {openModal && (
        <ProductModal>
          <ModalConfirmation titulo={"Confirmación"} mensaje={"¿Estas seguro de que quieres eliminar esté producto?"}>
            <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded" onClick={() => deleteDetail()} >Confirmar</button>
            <button className=" bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded" onClick={() => setOpenModal(false)}> Cancelar</button>
          </ModalConfirmation>
        </ProductModal>
      )}
    </PageStart>
  );
}
export default saleCreate