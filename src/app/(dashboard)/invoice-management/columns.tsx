// app/(dashboard)/invoice-management/columns.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from '@tanstack/react-table';

export const invoiceColumns: ColumnDef<Invoice>[] = [
  {
    id: 'sn',
    header: 'S/N',
    cell: ({ row }: { row: { index: number } }) => row.index + 1,
  },
  {
    id: 'invoiceNo',
    accessorKey: 'invoiceNo',
    header: 'Invoice No',
    cell: (info: { getValue: () => any }) => info.getValue(),
  },
  {
    id: 'customerId',
    accessorKey: 'customerId',
    header: 'Customer ID',
    cell: (info: { getValue: () => any }) => info.getValue(),
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: 'Status',
    cell: (info: { getValue: () => any }) => info.getValue(),
  },
];
