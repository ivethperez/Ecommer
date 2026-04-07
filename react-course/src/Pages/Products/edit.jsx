import { useState } from "react";
import '../../Styles/styles.css'
import ProductTabs from "../../Components/ProductTabs";
import ProductInfo from "../../Components/ProductForm";
import ProductImages from "../../Components/ProductForm/ProductImages";
import PageStart from "../PageStart";
import BtnOnBack from "../../Components/BtnOnBack";

const ProductEdit = ({ id, onBack }) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: "Información", component: <ProductInfo id={id} onBack={onBack} /> },
    { name: "Imágenes", component: <ProductImages productId={id} /> },
  ];

  return (
      <PageStart>
           <BtnOnBack onBack={onBack}/>
           <div className="rounded-lg sm:overflow-visible mt-3 pt-4">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Editar producto</h1>
            <ProductTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
 
   </PageStart>
  );
};

export default ProductEdit;