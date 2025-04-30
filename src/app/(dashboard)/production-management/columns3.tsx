/* eslint-disable @typescript-eslint/no-explicit-any */
// src/config/productStockColumns.ts
import { ColumnDef } from '@tanstack/react-table';

export const productStockColumns: ColumnDef<ProductStock>[] = [
  {
    id: 'productionCode',
    accessorKey: 'productionCode',
    header: 'Production Code',
    cell: (info: { getValue: () => any }) => info.getValue(),
  },
  {
    id: 'pushedBy',
    accessorKey: 'pushedBy',
    header: 'Pushed By (User ID)',
    cell: (info: { getValue: () => any }) => info.getValue(),
  },
  {
    id: 'receivedBy',
    accessorKey: 'receivedBy',
    header: 'Received By (User ID)',
    cell: (info: { getValue: () => any }) => info.getValue(),
  },
  {
    id: 'isAvailable',
    accessorKey: 'isAvailable',
    header: 'Availability',
    cell: (info: { getValue: () => any }) => info.getValue() ? 'Available' : 'Out of Stock',
  },
  {
    id: 'createdAt',
    accessorKey: 'createdAt',
    header: 'Date Created',
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString(),
  },
];
