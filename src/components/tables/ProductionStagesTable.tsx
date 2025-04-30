// components/tables/ProductionStagesTable.tsx
"use client"

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { IoMdAdd } from 'react-icons/io';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Separator } from '../ui/separator';
import { DataTable } from './utils/data-table';
import CustomDialog from '../dialog/CustomDialog';
import { useProductionStages } from '@/hooks/useProductionStages';
import { NewPageIcon, PageErrorIcon } from '../utils/icons';
import { DataTableLoader2 } from '../utils/loader';
import { productionStagesColumns } from '@/app/(dashboard)/production-management/columns';
import ProductionStagesForm from '../forms/ProductionStagesForm';

const ProductionStagesTable = () => {

  const { data: productionStages, isLoading, isError, refetch } = useProductionStages();

  const [open, setOpen] = useState(false);
  const [editProductionStage, setEditProductionStage] = useState<Partial<ProductionStages> | undefined>(undefined);

  const toggleDialog = () => setOpen(!open);

  const handleEdit = (productionStage: ProductionStages) => {
    setEditProductionStage(productionStage);
    setOpen(true);
  };

  const emptyMessage = (
    <div className="flex flex-col space-y-3 items-center justify-center text-center min-h-[400px]">
      <NewPageIcon />
      <h2 className='font-medium text-xs'>No production stages found</h2>
      <Button className="bg-gradient-to-r from-brand-800 to-brand-700 text-white" onClick={toggleDialog}>
        Create Production Stage
      </Button>
    </div>
  );

  const errorComp = (
    <div className="flex flex-col space-y-3 items-center justify-center text-center min-h-[400px]">
      <PageErrorIcon />
      <h2 className='font-medium text-xs'>Failed to load production stages</h2>
      <Button className="bg-gradient-to-r from-brand-800 to-brand-700 text-white" onClick={() => refetch()}>
        Retry
      </Button>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Manage Production Stages</h2>
          <Button className="bg-gradient-to-r from-brand-800 to-brand-700 text-white" onClick={toggleDialog}>
            <IoMdAdd />
            Create Production Stage
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
        ) : productionStages?.length === 0 ? (
          emptyMessage
        ) : (
          <DataTable
            columns={productionStagesColumns}
            data={productionStages || []}
            emptyMessage={emptyMessage}
            onRowClick={handleEdit}
          />
        )}
      </CardContent>

      {/* Dialog for Editing Production Stage */}
      <CustomDialog open={open} toggleOpen={toggleDialog} dialogWidth="sm:max-w-[700px]">
        <ProductionStagesForm closeDialog={toggleDialog} initialValues={editProductionStage} />
      </CustomDialog>
    </Card>
  );
};

export default ProductionStagesTable;
