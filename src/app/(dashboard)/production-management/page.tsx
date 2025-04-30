"use client"

import { useState } from "react"; // Assuming you have this table component
import { MaxWidthWrapper } from "@/components/utils/max-width-wrapper";
import ProductDefTable from "@/components/tables/ProductDefTable";
import ProductInProductionTable from "@/components/tables/ProductInProductionTable";
import ProductStockTable from "@/components/tables/ProductStockTable";
import ProductionTable from "@/components/tables/ProductionTable";
import ProductStockStageTable from "@/components/tables/ProductStockStageTable";
import ProductionStagesTable from "@/components/tables/ProductionStagesTable";

const Page = () => {  
  const [activeTab, setActiveTab] = useState('Product Def'); // Default active tab

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Product Def':
        return <ProductDefTable />;
      case 'In Production':
        return <ProductInProductionTable />;
      case 'Product Stock':
        return <ProductStockTable />;
      case 'Production Stock Stage':
        return <ProductStockStageTable />;
      case 'Product':
        return <ProductionTable />;
      case 'Production Stage':
        return <ProductionStagesTable />;
      default:
        return <div>No content available</div>;
    }
  };

  return (
    <MaxWidthWrapper>
      <div className="font-medium text-[#1E2022] mt-5 mb-5">Manage Production</div>
      <div className="p-2 space-y-5 mt-5"> 
        <div className="w-[50rem]">
          <div role="tablist" className="tabs tabs-bordered text-[#000] font-medium">
            <a 
              role="tab" 
              className={`tab ${activeTab === 'Product Def' ? 'tab-active' : ''}`}
              onClick={() => handleTabClick('Product Def')}
            >
              Product Def
            </a>
            <a 
              role="tab" 
              className={`tab ${activeTab === 'In Production' ? 'tab-active' : ''}`}
              onClick={() => handleTabClick('In Production')}
            >
              In Production
            </a>
            <a 
              role="tab" 
              className={`tab ${activeTab === 'Product Stock' ? 'tab-active' : ''}`}
              onClick={() => handleTabClick('Product Stock')}
            >
              Production Stock
            </a>
            <a 
              role="tab" 
              className={`tab ${activeTab === 'Production Stock Stage' ? 'tab-active' : ''}`}
              onClick={() => handleTabClick('Production Stock Stage')}
            >
              Production Stock Stage
            </a>
            <a 
              role="tab" 
              className={`tab ${activeTab === 'Product' ? 'tab-active' : ''}`}
              onClick={() => handleTabClick('Product')}
            >
              Products
            </a>
            <a 
              role="tab" 
              className={`tab ${activeTab === 'Production Stage' ? 'tab-active' : ''}`}
              onClick={() => handleTabClick('Production Stage')}
            >
              Production Stage
            </a>
          </div>
        </div>
        {renderTabContent()}
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
