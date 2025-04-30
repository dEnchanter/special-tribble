/* eslint-disable @typescript-eslint/no-explicit-any */
// src/config/rolesColumns.ts
import { formatDate } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';

export const rolesColumns: ColumnDef<Role>[] = [
  {
    id: 'sn',
    header: 'S/N', // Header for the counter column
    cell: ({ row }: { row: { index: number } }) => row.index + 1, // Indexing starts from 0, so add 1 for S/N
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Role Name',
    cell: (info: { getValue: () => any }) => info.getValue(),
  },
  {
    id: 'code',
    accessorKey: 'code',
    header: 'Code',
    cell: (info: { getValue: () => any }) => info.getValue(),
  },
  {
    id: 'unit',
    accessorKey: 'unit',
    header: 'Unit',
    cell: (info: { getValue: () => any }) => info.getValue(),
  },
  {
    id: 'isLogin',
    accessorKey: 'isLogin',
    header: 'Is Login?',
    cell: (info: { getValue: () => any }) => (info.getValue() ? 'Yes' : 'No'),
  },
  {
    id: 'createdAt',
    accessorKey: 'createdAt',
    header: 'Date Created',
    cell: ({ getValue }) => formatDate(getValue() as string),
  },
];
