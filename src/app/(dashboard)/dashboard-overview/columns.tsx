/* eslint-disable @typescript-eslint/no-explicit-any */
// src/config/productionItemsColumns.ts
import { formatDate } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';

export const dashboardColumns: ColumnDef<Dashboard>[] = [
  {
    id: 'itemCode',
    accessorKey: 'itemCode',
    header: 'item ID',
    cell: (info: { getValue: () => any; }) => info.getValue(),
  },
  {
    id: 'requester',
    accessorKey: 'requester',
    header: 'Request By',
    cell: (info: { getValue: () => any; }) => info.getValue(),
  },
  {
    id: 'approver',
    accessorKey: 'approver',
    header: 'Approved By',
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
    header: 'Date Created',
    cell: ({ getValue }) => formatDate(getValue() as string),
  }
];
  