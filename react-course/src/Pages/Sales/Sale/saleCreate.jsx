import { useState, useEffect } from "react";
import { useShopiContext } from "../../../Context";
import Menu from "../../../Components/Menu";
import Alert from "../../../Components/Alert"
const saleCreate = ({ onBack, salesCount, view, editingSaleId }) => {
  const { saleCreate, saleDetailCreate, saleUpdate, saleDetailUpdate, getSaleId, getPaymentMethods, getProductPrice, getStatusSale, getOrdersList, getCustomers, getSaleDetail, items, paymentMethodos, clientsItems, statusSale, ordersList, saleDetail, setSaleDetail, setMensajeAlerta, setShowAlert, showAlert } = useShopiContext();
  const [saleWithDetails, setSaleWithDetails] = useState([]);
  const [productId, setProductId] = useState(null);
  const [unitOfMeasureId, setUnitOfMeasureId] = useState(null)
  const [editOrDeleteDetail, setEditOrDeleteDetail] = useState(false)

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
        const newSale = await saleCreate(formData);
        if (newSale) {
          setDetailItem((prev) => ({
            ...prev,
            saleId: newSale.id
          }));
          setShowAlert(true)
          setMensajeAlerta("Venta creada con éxito.")
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

  const addDetail = async () => {
    try {
      if (!editOrDeleteDetail) {
        const newSaleDetail = await saleDetailCreate(detailItem);
        if (newSaleDetail) {
          if (editingSaleId) {
            setSaleWithDetails(await getSaleId(editingSaleId));
          }
          handleProductSeleccion(null);
          setShowAlert(true)
          setMensajeAlerta("Detalle de venta creado con éxito.")
        }
      }
      else {
        const newSaleDetail = await saleDetailUpdate(detailItem);
        if (newSaleDetail) {
          if (editingSaleId) {
            setSaleWithDetails(await getSaleId(editingSaleId));
          }
          setEditOrDeleteDetail(false)
          handleProductSeleccion(null);
          setShowAlert(true)
          setMensajeAlerta("Detalle de venta creado con éxito.")
        }
      }

    }
    catch (error) {
      setShowAlert(true)
      setMensajeAlerta(error);
    }
  };

  const deleteDetail = (id) => {
  };

  const editDetail = (id) => {
    const item = saleWithDetails.saleDetail.find((d) => d.id === id);
    setDetailItem((prev) => ({
      id: item.id,
      saleId: saleWithDetails.id,
      productPriceId: parseInt(item.productPrice.id, 10),
      quantity: item.quantity,
      unitPrice: Number(parseFloat(item.unitPrice).toFixed(2)),
      subtotal: Number(parseFloat(item.unitPrice).toFixed(2))
    }));
    setProductId(item.productPrice.product.id);
    setUnitOfMeasureId(item.productPrice.unitOfMeasure.id);
  };


  return (
    <div className="w-full  fixed flex  left-0 h-full">
      <Menu />
      <div className="ml-64 flex-1 p-6">
        {showAlert && <Alert />}
        <div className="overflow-y-auto space-y-6 p-6">
          <button
            onClick={onBack}
            className=""
          >
            ⬅ Volver
          </button>
          <h1 className="">Nueva venta</h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="p-6 container mx-auto px-4"
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
                  value={view === 'create' ? formData?.poId || null : saleWithDetails.po?.id}
                  onChange={handleChange}
                  disabled={saleWithDetails.id}
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
                  value={view === 'create' ? formData.paymentMethodId || "" : saleWithDetails?.paymentMethod?.id}
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

        {/* FORMULARIO DETALLE */}
        <h2 className="text-lg font-bold mb-4">Detalle de la venta</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addDetail();
          }}
          className="flex flex-wrap gap-4 items-end mb-6"
        >
          <div>
            <label className="block text-xs font-bold mb-1">Producto</label>
            <select
              className={`border rounded px-3 py-2 ${editOrDeleteDetail ? "bg-slate-200" : ""}`}
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
          <div>
            <label className="block text-xs font-bold mb-1">Unidad</label>
            <select
              className="border rounded px-3 py-2"
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
          <div>
            <label className="block text-xs font-bold mb-1">Cantidad</label>
            <input
              type="number"
              name="cantidad"
              value={detailItem.quantity}
              onChange={handleDetailChange}
              className="border rounded px-3 py-2 w-24"
              min="1"
            />
          </div>
          <div>
            <label className="block text-xs font-bold mb-1">Precio</label>
            <input
              type="number"
              name="precio"
              value={detailItem.unitPrice}
              onChange={handleDetailPriceChange}
              className="border rounded px-3 py-2 w-28"
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-xs font-bold mb-1">Total</label>
            <input
              type="number"
              value={detailItem.subtotal}
              readOnly
              className="border rounded px-3 py-2 w-28 bg-gray-100"
              disabled
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {!editOrDeleteDetail ? "Agregar" : "Actializar"}
          </button>
{editOrDeleteDetail ?(
 <button
  type="button"
 onClick={() => {handleProductSeleccion(null); setEditOrDeleteDetail(false)}}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
             Cancelar
          </button>
):(<div></div>)}
           

        </form>

        {/* LISTA DE DETALLES */}
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">Producto</th>
              <th className="border px-2 py-1">Unidad</th>
              <th className="border px-2 py-1">Cantidad</th>
              <th className="border px-2 py-1">Precio</th>
              <th className="border px-2 py-1">Total</th>
              <th className="border px-2 py-1">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {view === 'create' ? saleDetail?.map((d) => (
              <tr key={d.id}>
                <td className="border px-2 py-1">{d.productPrice.product.name}</td>
                <td className="border px-2 py-1">{d.productPrice.unitOfMeasure.name}</td>
                <td className="border px-2 py-1">{d.quantity}</td>
                <td className="border px-2 py-1">${d.unitPrice}</td>
                <td className="border px-2 py-1">${d.subtotal}</td>
                <td className="border px-2 py-1 flex gap-2">
                  <button
                    onClick={() => editDetail(d.id)}
                    className="px-2 py-1 bg-yellow-400 rounded text-white hover:bg-yellow-500"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deleteDetail(d.id)}
                    className="px-2 py-1 bg-red-500 rounded text-white hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            )) :
              saleWithDetails?.saleDetail?.map((d) => (
                <tr key={d.id}>
                  <td className="border px-2 py-1">{d.productPrice.product.name}</td>
                  <td className="border px-2 py-1">{d.productPrice.unitOfMeasure.name}</td>
                  <td className="border px-2 py-1">{d.quantity}</td>
                  <td className="border px-2 py-1">${d.unitPrice}</td>
                  <td className="border px-2 py-1">${d.subtotal}</td>
                  <td className="border px-2 py-1 flex gap-2">
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
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default saleCreate