"use client"

import { useState } from "react"; // Assuming you have this table component
import { MaxWidthWrapper } from "@/components/utils/max-width-wrapper";
import RoleTable from "@/components/tables/RoleTable";
import ItemTypeTable from "@/components/tables/ItemTypeTable";
import CustomerTypeTable from "@/components/tables/CustomerTypeTable";

const Page = () => {  
  const [activeTab, setActiveTab] = useState('Roles');

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Roles':
        return <RoleTable />;
      case 'Item Type':
        return <ItemTypeTable />;
      case 'Customer Type':
        return <CustomerTypeTable />;
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
              className={`tab ${activeTab === 'Roles' ? 'tab-active' : ''}`}
              onClick={() => handleTabClick('Roles')}
            >
              Roles
            </a>
            <a 
              role="tab" 
              className={`tab ${activeTab === 'Item Type' ? 'tab-active' : ''}`}
              onClick={() => handleTabClick('Item Type')}
            >
              Item Type
            </a>
            <a 
              role="tab" 
              className={`tab ${activeTab === 'Customer Type' ? 'tab-active' : ''}`}
              onClick={() => handleTabClick('Customer Type')}
            >
              Customer Type
            </a>
          </div>
        </div>
        {renderTabContent()}
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
