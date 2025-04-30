// components/tables/RoleTable.tsx
"use client"

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { IoMdAdd } from 'react-icons/io';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Separator } from '../ui/separator';
import { DataTable } from './utils/data-table';
import CustomDialog from '../dialog/CustomDialog';
import RoleForm from '../forms/RoleForm';
import { useRoles } from '@/hooks/useRole';
import { rolesColumns } from '@/app/(dashboard)/configurations/columns';
import { DataTableLoader2 } from '../utils/loader';
import { NewPageIcon, PageErrorIcon } from '../utils/icons';

const RoleTable = () => {

  const { data: roles, isLoading, isError, refetch } = useRoles();
  
  const [open, setOpen] = useState(false);
  const [editRole, setEditRole] = useState<Partial<Role> | undefined>(undefined);

  const toggleDialog = () => setOpen(!open);

  const handleEdit = (role: Role) => {
    setEditRole(role);
    setOpen(true);
  };

  const emptyMessage = (
    <div className="flex flex-col space-y-3 items-center justify-center text-center min-h-[400px]">
      <NewPageIcon />
      <h2 className='font-medium text-xs'>No roles found</h2>
      <Button className="bg-gradient-to-r from-brand-800 to-brand-700 text-white" onClick={toggleDialog}>
        Create Role
      </Button>
    </div>
  );

  const errorComp = (
    <div className="flex flex-col space-y-3 items-center justify-center text-center min-h-[400px]">
      <PageErrorIcon />
      <h2 className='font-medium text-xs'>Failed to load roles</h2>
      <Button className="bg-gradient-to-r from-brand-800 to-brand-700 text-white" onClick={() => refetch()}>
        Retry
      </Button>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Manage Roles</h2>
          <Button className="bg-gradient-to-r from-brand-800 to-brand-700 text-white" onClick={toggleDialog}>
            <IoMdAdd />
            Create Role
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
        ) : roles?.length === 0 ? (
          emptyMessage
        ) : (
          <DataTable
            columns={rolesColumns}
            data={roles || []}
            emptyMessage={emptyMessage}
            onRowClick={handleEdit}
          />
        )}
      </CardContent>

      {/* Dialog for Editing Role */}
      <CustomDialog open={open} toggleOpen={toggleDialog} dialogWidth="sm:max-w-[450px]">
        <RoleForm closeDialog={toggleDialog} initialValues={editRole} />
      </CustomDialog>
    </Card>
  );
};

export default RoleTable;
