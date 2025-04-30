// components/tables/CustomerTypeTable.tsx
"use client"

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { IoMdAdd } from 'react-icons/io';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Separator } from '../ui/separator';
import { DataTable } from './utils/data-table';
import CustomDialog from '../dialog/CustomDialog';
import CustomerTypeForm from '../forms/CustomerTypeForm';
import { useCustomerType } from '@/hooks/useCustomerType';
import { customerTypeColumns } from '@/app/(dashboard)/configurations/columns3';
import { DataTableLoader2 } from '../utils/loader';
import { NewPageIcon, PageErrorIcon } from '../utils/icons';

const CustomerTypeTable = () => {

  const { data: customerTypes, isLoading, isError, refetch } = useCustomerType();

  const [open, setOpen] = useState(false);
  const [editCustomerType, setEditCustomerType] = useState<Partial<CustomerType> | undefined>(undefined);

  const toggleDialog = () => setOpen(!open);

  const handleEdit = (customerType: CustomerType) => {
    setEditCustomerType(customerType);
    setOpen(true);
  };

  const emptyMessage = (
    <div className="flex flex-col space-y-3 items-center justify-center text-center min-h-[400px]">
      <NewPageIcon />
      <h2 className='font-medium text-xs'>No customer types found</h2>
      <Button className="bg-gradient-to-r from-brand-800 to-brand-700 text-white" onClick={toggleDialog}>
        Create Customer Type
      </Button>
    </div>
  );

  const errorComp = (
    <div className="flex flex-col space-y-3 items-center justify-center text-center min-h-[400px]">
      <PageErrorIcon />
      <h2 className='font-medium text-xs'>Failed to load customer types</h2>
      <Button className="bg-gradient-to-r from-brand-800 to-brand-700 text-white" onClick={() => refetch()}>
        Retry
      </Button>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Manage Customer Types</h2>
          <Button className="bg-gradient-to-r from-brand-800 to-brand-700 text-white" onClick={toggleDialog}>
            <IoMdAdd />
            Create Customer Type
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
        ) : customerTypes?.length === 0 ? (
          emptyMessage
        ) : (
          <DataTable
            columns={customerTypeColumns}
            data={customerTypes || []}
            emptyMessage={emptyMessage}
            onRowClick={handleEdit}
          />
        )}
      </CardContent>

      {/* Dialog for Editing Customer Type */}
      <CustomDialog open={open} toggleOpen={toggleDialog} dialogWidth="sm:max-w-[450px]">
        <CustomerTypeForm closeDialog={toggleDialog} initialValues={editCustomerType} />
      </CustomDialog>
    </Card>
  );
};

export default CustomerTypeTable;
