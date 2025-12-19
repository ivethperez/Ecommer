import { useState, useEffect } from "react";
import { useShopiContext } from '../../Context'

const ProductInfo = ({ id, onBack }) => {
  const { productEdit, productFromEdit, setProductFromEdit, productUpdate, categories, setMensajeAlerta, setShowAlert } = useShopiContext();

  useEffect(() => {
    if (id) {
      productEdit(id); // aquí decides cuándo ejecutar la acción
    }
  }, [id]);


  const handleChange = (e) => {
    const { name, value } = e.target;

    setProductFromEdit((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await productUpdate(productFromEdit);
      if (updated) {
        onBack();
        setShowAlert(true)
        setMensajeAlerta("Producto editado con éxito.")
      }
    }
    catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 ">
        <div >
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
            Nombre
          </label>
          <input
            name="name"
            type="text"
            onChange={handleChange}
            value={productFromEdit?.name ?? ""}
            placeholder="Nombre del producto"
            className={`w-full p-2 border rounded ${productFromEdit?.name ? "bg-slate-200" : ""}`}
            disabled={productFromEdit?.name}
          />
        </div>
        <div className="pt-2" >
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
            Descripción
          </label>
          <textarea
            name="description"
            value={productFromEdit?.description || ""}
            onChange={handleChange}
            placeholder="Descripción"
            className="w-full p-2 border rounded" />
        </div>
        <div className="pt-2">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
            Categoría
          </label>
          <select
            name="categoryId"
            value={productFromEdit?.categoryId || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Selecciona una categoría</option>
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}

          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-1">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            name="active"
            type="checkbox"
            value={productFromEdit?.active}
            checked={productFromEdit?.active}
            onChange={() => setActivo(!activo)}
            className="w-5 h-5 text-green-500 border-gray-300 rounded focus:ring-2 focus:ring-green-300"
          />
          <span className="text-gray-700 font-medium">Activo</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            name="isPriece"
            type="checkbox"
            value={productFromEdit?.isPiece}
            checked={productFromEdit?.isPiece}
            onChange={() => setActivo(!activo)}
            className="w-5 h-5 text-green-500 border-gray-300 rounded focus:ring-2 focus:ring-green-300"
          />
          <span className="text-gray-700 font-medium">Es pieza</span>
        </label>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Actializar
        </button>
      </div>
    </form>
  );
};

export default ProductInfo;