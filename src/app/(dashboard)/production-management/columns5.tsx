/* eslint-disable @typescript-eslint/no-explicit-any */
// src/config/productionColumns.ts
import { ColumnDef } from '@tanstack/react-table';

export const productionColumns: ColumnDef<Product>[] = [
  {
    id: 'code',
    accessorKey: 'code',
    header: 'Production Code',
    cell: (info: { getValue: () => any }) => info.getValue(),
  },
  {
    id: 'stage',
    accessorKey: 'stage',
    header: 'Stage',
    cell: (info: { getValue: () => any }) => info.getValue(),
  },
  {
    id: 'tailorId',
    accessorKey: 'tailorId',
    header: 'Tailor ID',
    cell: (info: { getValue: () => any }) => info.getValue(),
  },
  {
    id: 'isActive',
    accessorKey: 'isActive',
    header: 'Status',
    cell: (info: { getValue: () => any }) => info.getValue() ? 'Active' : 'Inactive',
  },
  {
    id: 'assignDate',
    accessorKey: 'assignDate',
    header: 'Assigned Date',
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString(),
  },
];
