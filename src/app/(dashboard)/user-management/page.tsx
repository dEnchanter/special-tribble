"use client"

import { useState } from "react"; // Assuming you have this table component
import StaffTable from "@/components/tables/StaffTable";
import CustomerTable from "@/components/tables/CustomerTable";
import { MaxWidthWrapper } from "@/components/utils/max-width-wrapper";

const Page = () => {  
  const [activeTab, setActiveTab] = useState('Staff');

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Staff':
        return <StaffTable />;
      case 'Customers':
        return <CustomerTable />;
      default:
        return <div>No content available</div>;
    }
  };

  return (
    <MaxWidthWrapper>
      {/* <div className="font-medium text-[#1E2022] mt-5 mb-5">Manage Users</div> */}
      <div className="p-2 space-y-5 mt-5"> 
        <div className="w-1/3">
          <div role="tablist" className="tabs tabs-bordered text-[#000] font-medium">
            <a 
              role="tab" 
              className={`tab ${activeTab === 'Staff' ? 'tab-active' : ''}`}
              onClick={() => handleTabClick('Staff')}
            >
              Staff
            </a>
            <a 
              role="tab" 
              className={`tab ${activeTab === 'Customers' ? 'tab-active' : ''}`}
              onClick={() => handleTabClick('Customers')}
            >
              Customers
            </a>
          </div>
        </div>
        {renderTabContent()}
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
