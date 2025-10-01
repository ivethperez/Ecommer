import { useState, useEffect } from "react";
import { useShopiContext } from '../../Context'

const ProductInfo = ({ id }) => {
  const { productEdit, productFromEdit, setProductFromEdit, categories } = useShopiContext();

  useEffect(() => {
    if (id) {
      productEdit(id); // aquí decides cuándo ejecutar la acción
    }
  }, [id]);

  const handleChange = (e) => {
    setProductFromEdit({ ...product, [e.target.name]: e.target.value });
  };
  return (
    <div className="space-y-4">
      <input
        type="text"
        onChange={handleChange}
        defaultValue={productFromEdit?.name ?? ""}
        placeholder="Nombre del producto"
        className="w-full p-2 border rounded"
      />
      
      <textarea defaultValue={productFromEdit?.description} placeholder="Descripción" className="w-full p-2 border rounded"  />

      <select
        name="categoryId"
        value={productFromEdit?.categoryId || ""}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="">Selecciona una categoría</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
        <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={productFromEdit?.active}
          onChange={() => setActivo(!activo)}
          className="w-5 h-5 text-green-500 border-gray-300 rounded focus:ring-2 focus:ring-green-300"
        />
        <span className="text-gray-700 font-medium">Activo</span>

          <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={productFromEdit?.isPiece}
          onChange={() => setActivo(!activo)}
          className="w-5 h-5 text-green-500 border-gray-300 rounded focus:ring-2 focus:ring-green-300"
        />
        <span className="text-gray-700 font-medium">Es pieza</span>
      </label>
      </label>
    </div>
  );
};

export default ProductInfo;