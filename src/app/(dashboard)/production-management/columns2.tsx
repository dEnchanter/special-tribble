/* eslint-disable @typescript-eslint/no-explicit-any */
// src/config/productDefColumns.ts
import { formatDate } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';

export const productDefColumns: ColumnDef<ProductDef>[] = [
  {
    id: 'code',
    accessorKey: 'code',
    header: 'Code',
    cell: (info: { getValue: () => any }) => info.getValue(),
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Name',
    cell: (info: { getValue: () => any }) => info.getValue(),
  },
  {
    id: 'cost',
    accessorKey: 'cost',
    header: 'Cost',
    cell: (info: { getValue: () => any }) => info.getValue(),
  },
  {
    id: 'createdAt',
    accessorKey: 'createdAt',
    header: 'Date Created',
    cell: ({ getValue }) => formatDate(getValue() as string),
  },
];
