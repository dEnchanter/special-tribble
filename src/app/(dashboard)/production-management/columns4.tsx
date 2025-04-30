/* eslint-disable @typescript-eslint/no-explicit-any */
// src/config/productInProductionColumns.ts
import { ColumnDef } from '@tanstack/react-table';

export const productInProductionColumns: ColumnDef<ProductInProduction>[] = [
  {
    id: 'productionCode',
    accessorKey: 'productionCode',
    header: 'Production Code',
    cell: (info: { getValue: () => any }) => info.getValue(),
  },
  {
    id: 'quantity',
    accessorKey: 'quantity',
    header: 'Quantity',
    cell: (info: { getValue: () => any }) => JSON.stringify(info.getValue()), // Handle dynamic data
  },
  {
    id: 'productGuide',
    accessorKey: 'productGuide',
    header: 'Product Guide',
    cell: (info: { getValue: () => any }) => JSON.stringify(info.getValue()), // Handle dynamic data
  },
  {
    id: 'isActive',
    accessorKey: 'isActive',
    header: 'Status',
    cell: (info: { getValue: () => any }) => info.getValue() ? 'Active' : 'Inactive',
  },
  {
    id: 'createdAt',
    accessorKey: 'createdAt',
    header: 'Date Requested',
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString(),
  },
];
