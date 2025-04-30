/* eslint-disable @typescript-eslint/no-explicit-any */
// src/config/invoiceStagesColumns.ts
import { ColumnDef } from '@tanstack/react-table';

export const invoiceStagesColumns: ColumnDef<InvoiceStages>[] = [
  {
    id: 'state',
    accessorKey: 'state',
    header: 'State',
    cell: (info: { getValue: () => any }) => info.getValue(),
  },
  {
    id: 'stageDate',
    accessorKey: 'stageDate',
    header: 'Stage Date',
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString(),
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
