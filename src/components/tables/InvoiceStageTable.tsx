// components/tables/InvoiceStagesTable.tsx
"use client"

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { IoMdAdd } from 'react-icons/io';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Separator } from '../ui/separator';
import { DataTable } from './utils/data-table';
import CustomDialog from '../dialog/CustomDialog';
import { useInvoiceStages } from '@/hooks/useInvoiceStages';  // Custom hook to fetch invoice stages
import { NewPageIcon, PageErrorIcon } from '../utils/icons';
import { DataTableLoader2 } from '../utils/loader';
import { invoiceStagesColumns } from '@/app/(dashboard)/invoice-management/columns2';
import InvoiceStagesForm from '../forms/InvoiceStagesForm';

const InvoiceStagesTable = () => {

  const { data: invoiceStages, isLoading, isError, refetch } = useInvoiceStages();

  const [open, setOpen] = useState(false);
  const [editInvoiceStage, setEditInvoiceStage] = useState<Partial<InvoiceStages> | undefined>(undefined);

  const toggleDialog = () => setOpen(!open);

  const handleEdit = (invoiceStage: InvoiceStages) => {
    setEditInvoiceStage(invoiceStage);
    setOpen(true);
  };

  const emptyMessage = (
    <div className="flex flex-col space-y-3 items-center justify-center text-center min-h-[400px]">
      <NewPageIcon />
      <h2 className='font-medium text-xs'>No invoice stages found</h2>
      <Button className="bg-gradient-to-r from-brand-800 to-brand-700 text-white" onClick={toggleDialog}>
        Create Invoice Stage
      </Button>
    </div>
  );

  const errorComp = (
    <div className="flex flex-col space-y-3 items-center justify-center text-center min-h-[400px]">
      <PageErrorIcon />
      <h2 className='font-medium text-xs'>Failed to load invoice stages</h2>
      <Button className="bg-gradient-to-r from-brand-800 to-brand-700 text-white" onClick={() => refetch()}>
        Retry
      </Button>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Manage Invoice Stages</h2>
          <Button className="bg-gradient-to-r from-brand-800 to-brand-700 text-white" onClick={toggleDialog}>
            <IoMdAdd />
            Create Invoice Stage
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
        ) : invoiceStages?.length === 0 ? (
          emptyMessage
        ) : (
          <DataTable
            columns={invoiceStagesColumns}
            data={invoiceStages || []}
            emptyMessage={emptyMessage}
            onRowClick={handleEdit}
          />
        )}
      </CardContent>

      {/* Dialog for Editing Invoice Stage */}
      <CustomDialog open={open} toggleOpen={toggleDialog} dialogWidth="sm:max-w-[700px]">
        <InvoiceStagesForm closeDialog={toggleDialog} initialValues={editInvoiceStage} />
      </CustomDialog>
    </Card>
  );
};

export default InvoiceStagesTable;
