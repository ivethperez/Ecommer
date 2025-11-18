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
       <div className="relative size-32">
          <div className="absolute -top-4 -left-4 size-14">
            <button
              onClick={onBack}
              className="button-return"
            >Volver
            </button>
          </div>
        </div>
        <div className="rounded-lg shadow overflow-x-auto sm:overflow-visible h-full">
           <div className="p-12 rounded space-y-4">       
            <h1 className="">Editar Producto</h1>
            <ProductTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;