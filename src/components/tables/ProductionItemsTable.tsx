"use client"

import { useProductionItems } from '@/hooks/useProductionItems';
import React from 'react';
import { DataTableLoader2 } from '../utils/loader';
import Template from '../utils/template';
import { DataTable2 } from './utils/data-table2';
import { productionItemsColumns } from '@/app/(dashboard)/production/columns';

const ProductionItemsTable = () => {
  const { data: items, isLoading, isError  } = useProductionItems();

  if (isLoading) return <DataTableLoader2 />;
  if (isError) return <div>Error: </div>;

  return (
    <Template>
      <DataTable2
        columns={productionItemsColumns}
        data={items || []}
        title='Items in Production'
        stats={[
          { label: "Unassigned", value: 236 },
          { label: "In Production", value: 87 },
          { label: "Rejected", value: 198 },
          { label: "Cleared", value: 300 }
        ]}
      />
    </Template>
  );
};

export default ProductionItemsTable;
