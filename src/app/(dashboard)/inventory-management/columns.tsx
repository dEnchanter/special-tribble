/* eslint-disable @typescript-eslint/no-explicit-any */
// src/config/productionItemsColumns.ts
import { formatDate } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';

export const inventoryColumns: ColumnDef<Inventory>[] = [
  {
    id: 'Code',
    accessorKey: 'itemCode',
    header: 'Inventory Code',
    cell: (info: { getValue: () => any; }) => info.getValue(),
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Name',
    cell: (info: { getValue: () => any; }) => info.getValue(),
  },
  {
    id: 'type',
    accessorKey: 'type',
    header: 'Type',
    cell: (info: { getValue: () => any; }) => info.getValue(),
  },
  {
    id: 'quantity',
    accessorKey: 'quantity',
    header: 'Quantity',
    cell: (info: { getValue: () => any; }) => info.getValue(),
  },
  {
    id: 'createdAt',
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ getValue }) => formatDate(getValue() as string),
  }
];