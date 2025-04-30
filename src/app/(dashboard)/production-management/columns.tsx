/* eslint-disable @typescript-eslint/no-explicit-any */
// src/config/productionStagesColumns.ts
import { ColumnDef } from '@tanstack/react-table';

export const productionStagesColumns: ColumnDef<ProductionStages>[] = [
  {
    id: 'stageName',
    accessorKey: 'stageName',
    header: 'Stage Name',
    cell: (info: { getValue: () => any }) => info.getValue(),
  },
  {
    id: 'description',
    accessorKey: 'description',
    header: 'Description',
    cell: (info: { getValue: () => any }) => info.getValue(),
  },
  {
    id: 'productionId',
    accessorKey: 'productionId',
    header: 'Production ID',
    cell: (info: { getValue: () => any }) => info.getValue(),
  },
  {
    id: 'staffId',
    accessorKey: 'staffId',
    header: 'Staff ID',
    cell: (info: { getValue: () => any }) => info.getValue(),
  },
  {
    id: 'changeDate',
    accessorKey: 'changeDate',
    header: 'Change Date',
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString(),
  },
];
