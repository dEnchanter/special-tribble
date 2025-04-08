/* eslint-disable @typescript-eslint/no-explicit-any */
// src/config/productionItemsColumns.ts
import { formatDate } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';

export const staffColumns: ColumnDef<Staff>[] = [
  {
    id: 'code',
    accessorKey: 'code',
    header: 'code',
    cell: (info: { getValue: () => any; }) => info.getValue(),
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Name',
    cell: (info: { getValue: () => any; }) => info.getValue(),
  },
  {
    id: 'role',
    accessorKey: 'role',
    header: 'Role',
    cell: (info: { getValue: () => any; }) => info.getValue(),
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: 'Status',
    cell: (info: { getValue: () => any; }) => info.getValue(),
  },

  {
    id: 'createdAt',
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ getValue }) => formatDate(getValue() as string),
  }
];