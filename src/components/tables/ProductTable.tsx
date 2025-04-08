"use client"

import React from 'react';
import { DataTableLoader2 } from '../utils/loader';
import Template from '../utils/template';
import { DataTable2 } from './utils/data-table2';
import { useProduct } from '@/hooks/useProduct';
import { productColumns } from '@/app/(dashboard)/product-management/columns';

const ProductTable = () => {
  const { data: product, isLoading, isError  } = useProduct();

  if (isLoading) return <DataTableLoader2 />;
  if (isError) return <div>Error: </div>;

  return (
    <Template>
      <DataTable2
        columns={productColumns}
        data={product || []}
        title='Production Management'
      />
    </Template>
  );
};

export default ProductTable;
