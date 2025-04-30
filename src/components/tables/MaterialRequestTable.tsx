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
import { useMaterialRequest } from '@/hooks/useMaterialRequest';
import { materialRequestColumns } from '@/app/(dashboard)/material-request/columns';
import MaterialRequestForm from '../forms/MaterialRequestForm';

const MaterialRequestTable = () => {
  const { data: materialRequest, isLoading, isError, refetch } = useMaterialRequest();

  const [open, setOpen] = useState(false);
  const [editMaterialRequest, setEditMaterialRequest] = useState<Partial<MaterialRequest> | undefined>(undefined);

  const toggleDialog = () => setOpen(!open);

  const handleEdit = (materialRequest: MaterialRequest) => {
    setEditMaterialRequest(materialRequest);
    setOpen(true);
  };

  const emptyMessage = (
    <div className="flex flex-col space-y-3 items-center justify-center text-center min-h-[400px]">
      <NewPageIcon />
      <h2 className='font-medium text-xs'>No material requests found</h2>
      <Button className="bg-gradient-to-r from-brand-800 to-brand-700 text-white" onClick={toggleDialog}>
        Create Material Request
      </Button>
    </div>
  );

  const errorComp = (
    <div className="flex flex-col space-y-3 items-center justify-center text-center min-h-[400px]">
      <PageErrorIcon />
      <h2 className='font-medium text-xs'>Failed to load material requests</h2>
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
            <h2 className="text-lg font-semibold">Manage Material Requests</h2>
            <Button className="bg-gradient-to-r from-brand-800 0% to-brand-700 70% text-white" onClick={toggleDialog}>
              <IoMdAdd />
              Create Material Request
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
          ) : (materialRequest ?? []).length === 0 ? (
            emptyMessage
          ) : (
            <DataTable
              columns={materialRequestColumns}
              data={materialRequest || []}
              emptyMessage={emptyMessage}
              onRowClick={handleEdit}
            />
          )}

          {/* Custom Dialog for Editing Material Request */}
          <CustomDialog open={open} toggleOpen={toggleDialog} dialogWidth="sm:max-w-[700px]">
            <MaterialRequestForm closeDialog={toggleDialog} initialValues={editMaterialRequest} />
          </CustomDialog>
        </CardContent>
      </Card>
    </Template>
  );
};

export default MaterialRequestTable;
