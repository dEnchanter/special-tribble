// components/tables/CustomerTable.tsx
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
import { useCustomers } from '@/hooks/useCustomer';
import { customerColumns } from '@/app/(dashboard)/user-management/columns2';
import CustomerForm from '../forms/CustomerForm';

const CustomerTable = () => {
  const { data: customers, isLoading, isError, refetch } = useCustomers();

  const [open, setOpen] = useState(false);
  const [editCustomer, setEditCustomer] = useState<Partial<Customer> | undefined>(undefined);

  const toggleDialog = () => setOpen(!open);

  const handleEdit = (customer: Customer) => {
    setEditCustomer(customer);
    setOpen(true);
  };

  const emptyMessage = (
    <div className="flex flex-col space-y-3 items-center justify-center text-center min-h-[400px]">
      <NewPageIcon />
      <h2 className="text-[#1E2022] text-sm font-medium">No customers found</h2>
      <Button className="bg-gradient-to-r from-brand-800 to-brand-700 text-white" onClick={toggleDialog}>
        Create Customer
      </Button>
    </div>
  );

  const errorComp = (
    <div className="flex flex-col space-y-3 items-center justify-center text-center min-h-[400px]">
      <PageErrorIcon />
      <h2 className="text-[#1E2022] text-sm font-medium">Failed to load customer data</h2>
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
            <h2 className="text-lg font-semibold">Manage Customers</h2>
            <Button className="bg-gradient-to-r from-brand-800 0% to-brand-700 70% text-white" onClick={toggleDialog}>
              <IoMdAdd />
              Create Customer
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
          ) : (customers ?? []).length === 0 ? (
            emptyMessage
          ) : (
            <DataTable
              columns={customerColumns}
              data={customers || []}
              emptyMessage={emptyMessage}
              onRowClick={handleEdit}
            />
          )}

          {/* Custom Dialog for Editing Customer */}
          <CustomDialog open={open} toggleOpen={toggleDialog} dialogWidth="sm:max-w-[700px]">
            <CustomerForm closeDialog={toggleDialog} initialValues={editCustomer} />
          </CustomDialog>
        </CardContent>
      </Card>
    </Template>
  );
};

export default CustomerTable;
