"use client"

import React from 'react';
import { DataTableLoader2 } from '../utils/loader';
import Template from '../utils/template';
import { DataTable2 } from './utils/data-table2';
import { useInventory } from '@/hooks/useInventory';
import { inventoryColumns } from '@/app/(dashboard)/inventory-management/columns';

const InventoryTable = () => {
  const { data: inventory, isLoading, isError  } = useInventory();

  if (isLoading) return <DataTableLoader2 />;
  if (isError) return <div>Error: </div>;

  return (
    <Template>
      <DataTable2
        columns={inventoryColumns}
        data={inventory || []}
        title='Inventory Management'
      />
    </Template>
  );
};

export default InventoryTable;