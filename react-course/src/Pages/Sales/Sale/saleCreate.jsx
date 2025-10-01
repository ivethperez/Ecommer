import { useState, useEffect } from "react";
import { useShopiContext } from "../../../Context";
import Menu from "../../../Components/Menu";
import Alert from "../../../Components/Alert"
const saleCreate = ({ onBack, salesCount, view }) => {
  const { items, paymentMethodos, getPaymentMethods, getProductPrice, clientsItems, getCustomers, setMensajeAlerta, setShowAlert, showAlert } = useShopiContext();
  const [details, setDetails] = useState([]);
  const [productId, setProductId] = useState(null);
  const [unitOfMeasureId, setUnitOfMeasureId] = useState(null)

  useEffect(() => {
    if (view === "create") {
      getPaymentMethods();
      getCustomers();
    }
  }, [view]);

  useEffect(() => {
    if (unitOfMeasureId) {
      const fetchPrice = async () => {
        try {
          const productPrice = await getProductPrice(productId, unitOfMeasureId);
          setDetailItem((prev) => ({
            ...prev,
            unitPrice: productPrice.unitPrice,
            subTotal: productPrice.unitPrice
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
    customerId: "",
    paymentMethodId: "",
    totalAmount: 0,
    statusSaleId: ""
  })
  const [detailItem, setDetailItem] = useState({
    saleId: null,
    productPriceId: "",
    quantity: 1,
    unitPrice: 0,
    subTotal: 0,
  });

  const handleProductSeleccion = (id) => {
    setDetailItem({
      productPriceId: "",
      quantity: 1,
      unitPrice: 0,
      subTotal: 0,
    });
    setProductId(id);
    setUnitOfMeasureId(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      subTotal: quantity * prev.unitPrice, 
    }));
  };

  const handleDetailPriceChange = (e) => {
    const unitPrice = parseFloat(e.target.value) || 0;
    setDetailItem((prev) => ({
      ...prev,
      unitPrice,
      subTotal: prev.quantity * unitPrice, 
    }));
  }

  const addDetail = () => {
    if (!detailItem.product) return;
    setDetails([...details, { ...detailItem, id: Date.now() }]);
    setDetailItem({ product: "", unidadMedida: "", cantidad: 1, precio: 0, total: 0 });
  };

  const deleteDetail = (id) => {
    setDetails(details.filter((item) => item.id !== id));
  };

  const editDetail = (id) => {
    const item = details.find((d) => d.id === id);
    setDetailItem(item);
    setDetails(details.filter((d) => d.id !== id)); // lo quito para volver a guardar editado
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
                value={formData.folio}
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
                  value={formData?.poId || null}
                  onChange={handleChange}
                  className="block appearance-none w-full border-gray-200 text-gray-700 py-2.5 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="">Selecciona</option>
                  {paymentMethodos.map((po) => (
                    <option key={po.id} value={po.id}>
                      {po.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                Cliente
              </label>
              <div className="relative">
                <select
                  name="poId"
                  value={formData?.customerId || null}
                  onChange={handleChange}
                  className="block appearance-none w-full border-gray-200 text-gray-700 py-2.5 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="">Selecciona</option>
                  {clientsItems.map((po) => (
                    <option key={po.id} value={po.id}>
                      {po.name} {po.lastName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                Metodo de pago
              </label>
              <div className="relative">
                <select
                  name="poId"
                  value={formData.paymentMethodId || ""}
                  onChange={handleChange}
                  className="block appearance-none w-full border-gray-200 text-gray-700 py-2.5 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="">Selecciona</option>
                  {paymentMethodos.map((po) => (
                    <option key={po.id} value={po.id}>
                      {po.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Total
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="Total de la venta"
                className="border block w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled
              />
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                Estatus
              </label>
              <div className="relative">
                <select
                  name="poId"
                  value={formData?.poId || ""}
                  onChange={handleChange}
                  className="block appearance-none w-full border-gray-200 text-gray-700 py-2.5 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="">Selecciona</option>
                  {paymentMethodos.map((po) => (
                    <option key={po.id} value={po.id}>
                      {po.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                -
              </label>
              <button
                type="submit"
                className="px-4 py-2 mb-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Guardar
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
              className="border rounded px-3 py-2"
              onChange={(e) => handleProductSeleccion(parseInt(e.target.value, 10))}
              value={productId || ""}
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
              {items.find((item) => item.product.id === productId)?.options.map((op) => (
                <option key={op.unitOfMeasure.id} value={op.unitOfMeasure.id}>
                  {op.unitOfMeasure.name}
                </option>
              ))}
            </select>
            {/* <p className="text-lg font-bold">$ {seleccion.unitPrice} </p> */}
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
              value={detailItem.subTotal}
              readOnly
              className="border rounded px-3 py-2 w-28 bg-gray-100"
              disabled
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Agregar
          </button>
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
            {details.map((d) => (
              <tr key={d.id}>
                <td className="border px-2 py-1">{d.product}</td>
                <td className="border px-2 py-1">{d.unidadMedida}</td>
                <td className="border px-2 py-1">{d.cantidad}</td>
                <td className="border px-2 py-1">${d.precio}</td>
                <td className="border px-2 py-1">${d.total}</td>
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
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
export default saleCreate