// components/tables/InvoiceTable.tsx
"use client"

import React, { useState } from 'react';
import { DataTableLoader2 } from '../utils/loader';
import Template from '../utils/template';
import { NewPageIcon, PageErrorIcon } from '../utils/icons';
import { Button } from '../ui/button';
import { IoMdAdd } from "react-icons/io";
import { Card, CardContent, CardHeader } from '../ui/card';
import { Separator } from '../ui/separator';
import { DataTable } from './utils/data-table';
import CustomDialog from '../dialog/CustomDialog';
import { invoiceColumns } from '@/app/(dashboard)/invoice-management/columns';
import { useInvoice } from '@/hooks/useInvoice';
import InvoiceForm from '../forms/InvoiceForm';

const InvoiceTable = () => {
  const { data: invoices, isLoading, isError, refetch } = useInvoice();

  const [open, setOpen] = useState(false);
  const [editInvoice, setEditInvoice] = useState<Partial<Invoice> | undefined>(undefined);

  const toggleDialog = () => setOpen(!open);

  const handleEdit = (invoice: Invoice) => {
    setEditInvoice(invoice);
    setOpen(true);
  };

  const emptyMessage = (
    <div className="flex flex-col space-y-3 items-center justify-center text-center min-h-[400px]">
      <NewPageIcon />
      <h2 className='font-medium text-xs'>No invoices found</h2>
      <Button className="bg-gradient-to-r from-brand-800 to-brand-700 text-white" onClick={toggleDialog}>
        Create Invoice
      </Button>
    </div>
  );

  const errorComp = (
    <div className="flex flex-col space-y-3 items-center justify-center text-center min-h-[400px]">
      <PageErrorIcon />
      <h2 className='font-medium text-xs'>Failed to load invoice data</h2>
      <Button className="bg-gradient-to-r from-brand-800 to-brand-700 text-white" onClick={() => refetch()}>
        Retry
      </Button>
    </div>
  );

  return (
    <Template>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Manage Invoices</h2>
            <Button className="bg-gradient-to-r from-brand-800 0% to-brand-700 70% text-white" onClick={toggleDialog}>
              <IoMdAdd />
              Create Invoice
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
          ) : (invoices ?? []).length === 0 ? (
            emptyMessage
          ) : (
            <DataTable
              columns={invoiceColumns}
              data={invoices || []}
              emptyMessage={emptyMessage}
              onRowClick={handleEdit}
            />
          )}

          {/* Custom Dialog for Editing Invoice */}
          <CustomDialog open={open} toggleOpen={toggleDialog} dialogWidth="sm:max-w-[700px]">
            <InvoiceForm closeDialog={toggleDialog} initialValues={editInvoice} />
          </CustomDialog>
        </CardContent>
      </Card>
    </Template>
  );
};

export default InvoiceTable;
