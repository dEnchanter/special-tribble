// components/tables/ItemTypeTable.tsx
"use client"

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { IoMdAdd } from 'react-icons/io';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Separator } from '../ui/separator';
import { DataTable } from './utils/data-table';
import CustomDialog from '../dialog/CustomDialog';
import ItemTypeForm from '../forms/ItemTypeForm';
import { useItemTypes } from '@/hooks/useItemTypes';
import { itemTypeColumns } from '@/app/(dashboard)/configurations/columns2';
import { DataTableLoader2 } from '../utils/loader';
import { PageErrorIcon } from '../utils/icons';

const ItemTypeTable = () => {

  const { data: itemTypes, isLoading, isError, refetch } = useItemTypes();

  const [open, setOpen] = useState(false);
  const [editItemType, setEditItemType] = useState<Partial<ItemType> | undefined>(undefined);

  const toggleDialog = () => setOpen(!open);

  const handleEdit = (itemType: ItemType) => {
    setEditItemType(itemType);
    setOpen(true);
  };

  const emptyMessage = (
    <div className="flex flex-col space-y-3 items-center justify-center text-center min-h-[400px]">
      <h2 className='font-medium text-xs'>No item types found</h2>
      <Button className="bg-gradient-to-r from-brand-800 to-brand-700 text-white" onClick={toggleDialog}>
        Create Item Type
      </Button>
    </div>
  );

  const errorComp = (
    <div className="flex flex-col space-y-3 items-center justify-center text-center min-h-[400px]">
      <PageErrorIcon />
      <h2 className='font-medium text-xs'>Failed to load item types</h2>
      <Button className="bg-gradient-to-r from-brand-800 to-brand-700 text-white" onClick={() => refetch()}>
        Retry
      </Button>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Manage Item Types</h2>
          <Button className="bg-gradient-to-r from-brand-800 to-brand-700 text-white" onClick={toggleDialog}>
            <IoMdAdd />
            Create Item Type
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
        ) : itemTypes?.length === 0 ? (
          emptyMessage
        ) : (
          <DataTable
            columns={itemTypeColumns}
            data={itemTypes || []}
            emptyMessage={emptyMessage}
            onRowClick={handleEdit}
          />
        )}
      </CardContent>

      {/* Dialog for Editing Item Type */}
      <CustomDialog open={open} toggleOpen={toggleDialog} dialogWidth="sm:max-w-[450px]">
        <ItemTypeForm closeDialog={toggleDialog} initialValues={editItemType} />
      </CustomDialog>
    </Card>
  );
};

export default ItemTypeTable;
