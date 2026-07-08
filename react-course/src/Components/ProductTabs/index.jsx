import React from "react";

const ProductTabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="rounded">
      <div className="flex border-b border-gray-200 mb-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 -mb-px border-b-2 font-medium ${
              activeTab === index
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div>{tabs[activeTab].component}</div>
    </div>
  );
};

export default ProductTabs;