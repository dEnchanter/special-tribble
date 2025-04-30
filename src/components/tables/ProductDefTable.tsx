// components/tables/ProductDefTable.tsx
"use client"

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { IoMdAdd } from 'react-icons/io';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Separator } from '../ui/separator';
import { DataTable } from './utils/data-table';
import CustomDialog from '../dialog/CustomDialog';
import { useProductDef } from '@/hooks/useProductDef';
import { productDefColumns } from '@/app/(dashboard)/production-management/columns2';
import ProductDefForm from '../forms/ProductDefForm';
import { DataTableLoader2 } from '../utils/loader';
import { NewPageIcon, PageErrorIcon } from '../utils/icons';

const ProductDefTable = () => {

  const { data: productDefs, isLoading, isError, refetch } = useProductDef();

  const [open, setOpen] = useState(false);
  const [editProductDef, setEditProductDef] = useState<Partial<ProductDef> | undefined>(undefined);

  const toggleDialog = () => setOpen(!open);

  const handleEdit = (productDef: ProductDef) => {
    setEditProductDef(productDef);
    setOpen(true);
  };

  const emptyMessage = (
    <div className="flex flex-col space-y-3 items-center justify-center text-center min-h-[400px]">
      <NewPageIcon />
      <h2 className='font-medium text-xs'>No product definitions found</h2>
      <Button className="bg-gradient-to-r from-brand-800 to-brand-700 text-white" onClick={toggleDialog}>
        Create Product Definition
      </Button>
    </div>
  );

  const errorComp = (
    <div className="flex flex-col space-y-3 items-center justify-center text-center min-h-[400px]">
      <PageErrorIcon />
      <h2 className='font-medium text-xs'>Failed to load product definitions</h2>
      <Button className="bg-gradient-to-r from-brand-800 to-brand-700 text-white" onClick={() => refetch()}>
        Retry
      </Button>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Manage Product Definitions</h2>
          <Button className="bg-gradient-to-r from-brand-800 to-brand-700 text-white" onClick={toggleDialog}>
            <IoMdAdd />
            Create Product Definition
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
        ) : productDefs?.length === 0 ? (
          emptyMessage
        ) : (
          <DataTable
            columns={productDefColumns}
            data={productDefs || []}
            emptyMessage={emptyMessage}
            onRowClick={handleEdit}
          />
        )}
      </CardContent>

      {/* Dialog for Editing Product Definition */}
      <CustomDialog open={open} toggleOpen={toggleDialog} dialogWidth="sm:max-w-[700px]">
        <ProductDefForm closeDialog={toggleDialog} initialValues={editProductDef} />
      </CustomDialog>
    </Card>
  );
};

export default ProductDefTable;
