/* eslint-disable @typescript-eslint/no-explicit-any */
// src/config/productionItemsColumns.ts
import { formatDate } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';

export const productionItemsColumns: ColumnDef<ProductionItem>[] = [
  {
    id: 'itemName',
    accessorKey: 'itemName',
    header: 'Item Name',
    cell: (info: { getValue: () => any; }) => info.getValue(),
  },
  {
    id: 'size',
    accessorKey: 'size',
    header: 'Size',
    cell: (info: { getValue: () => any; }) => info.getValue(),
  },
  {
    id: 'tailor',
    accessorKey: 'tailor',
    header: 'Tailor',
    cell: (info: { getValue: () => any; }) => info.getValue(),
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: 'Status',
    cell: (info: { getValue: () => any; }) => info.getValue(),
  },
  {
    id: 'expectedTime',
    accessorKey: 'expectedTime',
    header: 'Expected Time',
    cell: ({ getValue }) => formatDate(getValue() as string),
  }
];
  