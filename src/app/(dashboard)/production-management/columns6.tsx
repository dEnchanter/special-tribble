/* eslint-disable @typescript-eslint/no-explicit-any */
// src/config/productStockStageColumns.ts
import { ColumnDef } from '@tanstack/react-table';

export const productStockStageColumns: ColumnDef<ProductStockStage>[] = [
  {
    id: 'stage',
    accessorKey: 'stage',
    header: 'Stage',
    cell: (info: { getValue: () => any }) => info.getValue(),
  },
  {
    id: 'stageDate',
    accessorKey: 'stageDate',
    header: 'Stage Date',
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString(),
  },
  {
    id: 'stockId',
    accessorKey: 'stockId',
    header: 'Stock ID',
    cell: (info: { getValue: () => any }) => info.getValue(),
  },
  {
    id: 'invoiceId',
    accessorKey: 'invoiceId',
    header: 'Invoice ID',
    cell: (info: { getValue: () => any }) => info.getValue(),
  },
  {
    id: 'staffId',
    accessorKey: 'staffId',
    header: 'Staff ID',
    cell: (info: { getValue: () => any }) => info.getValue(),
  },
];
