"use client"

import { useState } from "react"; // Assuming you have this table component
import { MaxWidthWrapper } from "@/components/utils/max-width-wrapper";
import InvoiceTable from "@/components/tables/InvoiceTable";
import InvoiceStagesTable from "@/components/tables/InvoiceStageTable";

const Page = () => {  
  const [activeTab, setActiveTab] = useState('Invoice');

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Invoice':
        return <InvoiceTable />;
      case 'Invoice Stages':
        return <InvoiceStagesTable />;
      default:
        return <div>No content available</div>;
    }
  };

  return (
    <MaxWidthWrapper>
      <div className="font-medium text-[#1E2022] mt-5 mb-5">Manage Invoices</div>
      <div className="p-2 space-y-5 mt-5"> 
        <div className="w-1/3">
          <div role="tablist" className="tabs tabs-bordered text-[#000] font-medium">
            <a 
              role="tab" 
              className={`tab ${activeTab === 'Invoice' ? 'tab-active' : ''}`}
              onClick={() => handleTabClick('Invoice')}
            >
              Invoice
            </a>
            <a 
              role="tab" 
              className={`tab ${activeTab === 'Invoice Stages' ? 'tab-active' : ''}`}
              onClick={() => handleTabClick('Invoice Stages')}
            >
              Invoice Stages
            </a>
          </div>
        </div>
        {renderTabContent()}
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
