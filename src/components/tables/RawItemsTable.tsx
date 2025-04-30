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
import { useRawItems } from '@/hooks/useRawItems';
import { rawItemsColumns } from '@/app/(dashboard)/items-management/columns';
import RawItemsForm from '../forms/RawItemsForm';

const RawItemsTable = () => {
  const { data: rawItems, isLoading, isError, refetch } = useRawItems();

  const [open, setOpen] = useState(false);
  const [editRawItems, setEditRawItems] = useState<Partial<RawItems> | undefined>(undefined);

  const toggleDialog = () => setOpen(!open);

  const handleEdit = (rawItems: RawItems) => {
    setEditRawItems(rawItems);
    setOpen(true);
  };

  const emptyMessage = (
    <div className="flex flex-col space-y-3 items-center justify-center text-center min-h-[400px]">
      <NewPageIcon />
      <h2 className='font-medium text-xs'>Team Work Makes the dream work</h2>
      <Button className="bg-gradient-to-r from-brand-800 to-brand-700 text-white" onClick={toggleDialog}>
        Create Raw Items
      </Button>
    </div>
  );

  const errorComp = (
    <div className="flex flex-col space-y-3 items-center justify-center text-center min-h-[400px]">
      <PageErrorIcon />
      <h2 className='font-medium text-xs'>Failed to load items data</h2>
      <Button className="bg-gradient-to-r from-brand-800 to-brand-700 text-white" onClick={() => refetch()}>
        Retry
      </Button>
    </div>
  );

  return (
    <Template>
      <Card>
        <CardHeader className="">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Manage Raw Items</h2>
            <Button className="bg-gradient-to-r from-brand-800 0% to-brand-700 70% text-white" onClick={toggleDialog}>
              <IoMdAdd />
              Create Raw Items
            </Button>
          </div>
          <Separator />
        </CardHeader>
        <CardContent className="">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <DataTableLoader2 /> {/* Show loading spinner */}
            </div>
          ) : isError ? (
            errorComp
          ) : (rawItems ?? []).length === 0 ? (
            emptyMessage // Show empty message if there are no staff data
          ) : (
            <DataTable
              columns={rawItemsColumns}
              data={rawItems || []}
              emptyMessage={emptyMessage}
              onRowClick={handleEdit} // Open the edit dialog when a row is clicked
            />
          )}

          {/* Custom Dialog for Editing Staff */}
          <CustomDialog open={open} toggleOpen={toggleDialog} dialogWidth="sm:max-w-[700px]">
            <RawItemsForm closeDialog={toggleDialog} initialValues={editRawItems} />
          </CustomDialog>
        </CardContent>
      </Card>
    </Template>
  );
};

export default RawItemsTable;
