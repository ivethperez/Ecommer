import { useState } from "react";
import ProductTabs from "../../Components/ProductTabs";
import ProductInfo from "../../Components/ProductForm";
import ProductImages from "../../Components/ProductForm/ProductImages";
import Menu from '../../Components/Menu'

const ProductEdit = ({ id, onBack }) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: "Información", component: <ProductInfo id={id} /> },
    { name: "Imágenes", component: <ProductImages productId={id} /> },
  ];

  return (
    <div className="w-full bg-white fixed flex left-0 h-full">
      <Menu />
      <div className="ml-64 flex-1 p-6 ">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="h-full overflow-y-auto space-y-6 p-6">
            <button
              onClick={onBack}
              className=""
            >
              ⬅ Volver
            </button>
            <h1 className="">Editar Producto</h1>
            <ProductTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;