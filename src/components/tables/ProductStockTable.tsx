// components/tables/ProductStockTable.tsx
"use client"

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { IoMdAdd } from 'react-icons/io';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Separator } from '../ui/separator';
import { DataTable } from './utils/data-table';
import CustomDialog from '../dialog/CustomDialog';
import { DataTableLoader2 } from '../utils/loader';
import { productStockColumns } from '@/app/(dashboard)/production-management/columns3';
import ProductStockForm from '../forms/ProductStockForm';
import { useProductStock } from '@/hooks/useProductStock';
import { NewPageIcon, PageErrorIcon } from '../utils/icons';

const ProductStockTable = () => {

  const { data: productStocks, isLoading, isError, refetch } = useProductStock();

  const [open, setOpen] = useState(false);
  const [editProductStock, setEditProductStock] = useState<Partial<ProductStock> | undefined>(undefined);

  const toggleDialog = () => setOpen(!open);

  const handleEdit = (productStock: ProductStock) => {
    setEditProductStock(productStock);
    setOpen(true);
  };

  const emptyMessage = (
    <div className="flex flex-col space-y-3 items-center justify-center text-center min-h-[400px]">
      <NewPageIcon />
      <h2 className='font-medium text-xs'>No product stock found</h2>
      <Button className="bg-gradient-to-r from-brand-800 to-brand-700 text-white" onClick={toggleDialog}>
        Create Product Stock
      </Button>
    </div>
  );

  const errorComp = (
    <div className="flex flex-col space-y-3 items-center justify-center text-center min-h-[400px]">
      <PageErrorIcon />
      <h2 className='font-medium text-xs'>Failed to load product stocks</h2>
      <Button className="bg-gradient-to-r from-brand-800 to-brand-700 text-white" onClick={() => refetch()}>
        Retry
      </Button>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Manage Product Stocks</h2>
          <Button className="bg-gradient-to-r from-brand-800 to-brand-700 text-white" onClick={toggleDialog}>
            <IoMdAdd />
            Create Product Stock
          </Button>
        </div>
        <Separator />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <DataTableLoader2 />
          </div>
        ) : isError ? (
          errorComp
        ) : productStocks?.length === 0 ? (
          emptyMessage
        ) : (
          <DataTable
            columns={productStockColumns}
            data={productStocks || []}
            emptyMessage={emptyMessage}
            onRowClick={handleEdit}
          />
        )}
      </CardContent>

      {/* Dialog for Editing Product Stock */}
      <CustomDialog open={open} toggleOpen={toggleDialog} dialogWidth="sm:max-w-[700px]">
        <ProductStockForm closeDialog={toggleDialog} initialValues={editProductStock} />
      </CustomDialog>
    </Card>
  );
};

export default ProductStockTable;
