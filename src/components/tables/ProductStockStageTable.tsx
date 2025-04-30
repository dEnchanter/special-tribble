// components/tables/ProductStockStageTable.tsx
"use client"

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { IoMdAdd } from 'react-icons/io';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Separator } from '../ui/separator';
import { DataTable } from './utils/data-table';
import CustomDialog from '../dialog/CustomDialog';
import { useProductStockStage } from '@/hooks/useProductStockStage';
import { NewPageIcon, PageErrorIcon } from '../utils/icons';
import { DataTableLoader2 } from '../utils/loader';
import { productStockStageColumns } from '@/app/(dashboard)/production-management/columns6';
import ProductStockStageForm from '../forms/ProductStockStageForm';

const ProductStockStageTable = () => {

  const { data: productStockStages, isLoading, isError, refetch } = useProductStockStage();

  const [open, setOpen] = useState(false);
  const [editProductStockStage, setEditProductStockStage] = useState<Partial<ProductStockStage> | undefined>(undefined);

  const toggleDialog = () => setOpen(!open);

  const handleEdit = (productStockStage: ProductStockStage) => {
    setEditProductStockStage(productStockStage);
    setOpen(true);
  };

  const emptyMessage = (
    <div className="flex flex-col space-y-3 items-center justify-center text-center min-h-[400px]">
      <NewPageIcon />
      <h2 className='font-medium text-xs'>No product stock stages found</h2>
      <Button className="bg-gradient-to-r from-brand-800 to-brand-700 text-white" onClick={toggleDialog}>
        Create Product Stock Stage
      </Button>
    </div>
  );

  const errorComp = (
    <div className="flex flex-col space-y-3 items-center justify-center text-center min-h-[400px]">
      <PageErrorIcon />
      <h2 className='font-medium text-xs'>Failed to load product stock stages</h2>
      <Button className="bg-gradient-to-r from-brand-800 to-brand-700 text-white" onClick={() => refetch()}>
        Retry
      </Button>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Manage Product Stock Stages</h2>
          <Button className="bg-gradient-to-r from-brand-800 to-brand-700 text-white" onClick={toggleDialog}>
            <IoMdAdd />
            Create Product Stock Stage
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
        ) : productStockStages?.length === 0 ? (
          emptyMessage
        ) : (
          <DataTable
            columns={productStockStageColumns}
            data={productStockStages || []}
            emptyMessage={emptyMessage}
            onRowClick={handleEdit}
          />
        )}
      </CardContent>

      {/* Dialog for Editing Product Stock Stage */}
      <CustomDialog open={open} toggleOpen={toggleDialog} dialogWidth="sm:max-w-[700px]">
        <ProductStockStageForm closeDialog={toggleDialog} initialValues={editProductStockStage} />
      </CustomDialog>
    </Card>
  );
};

export default ProductStockStageTable;
