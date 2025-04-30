/* eslint-disable @typescript-eslint/no-explicit-any */
// src/config/customerTypeColumns.ts
import { ColumnDef } from '@tanstack/react-table';

export const customerTypeColumns: ColumnDef<CustomerType>[] = [
  {
    id: 'sn',
    header: 'S/N', // Header for the counter column
    cell: ({ row }: { row: { index: number } }) => row.index + 1, // Indexing starts from 0, so add 1 for S/N
  },
  {
    id: 'type',
    accessorKey: 'type',
    header: 'Customer Type',
    cell: (info: { getValue: () => any }) => info.getValue(),
  },
];
