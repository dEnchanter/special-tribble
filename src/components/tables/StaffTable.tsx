"use client"

import React from 'react';
import { DataTableLoader2 } from '../utils/loader';
import Template from '../utils/template';
import { DataTable2 } from './utils/data-table2';
import { useStaff } from '@/hooks/useStaff';
import { staffColumns } from '@/app/(dashboard)/staff-management/columns';

const StaffTable = () => {
  const { data: staff, isLoading, isError  } = useStaff();

  if (isLoading) return <DataTableLoader2 />;
  if (isError) return <div>Error: </div>;

  return (
    <Template>
      <DataTable2
        columns={staffColumns}
        data={staff || []}
        title='Staff Management'
      />
    </Template>
  );
};

export default StaffTable;
