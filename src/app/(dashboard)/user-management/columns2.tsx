// app/(dashboard)/customer-management/columns.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { capitalize } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';

export const customerColumns: ColumnDef<Customer>[] = [
  {
    id: 'sn',
    header: 'S/N',
    cell: ({ row }: { row: { index: number } }) => row.index + 1,
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Name',
    cell: (info: { getValue: () => any }) => info.getValue(),
  },
  {
    id: 'address',
    accessorKey: 'address',
    header: 'Address',
    cell: (info: { getValue: () => any }) => info.getValue(),
  },
  {
    id: 'country',
    accessorKey: 'country',
    header: 'Country',
    cell: (info: { getValue: () => any }) => info.getValue(),
  },
  {
    id: 'customerType',
    accessorKey: 'customerType.type',
    header: 'Customer Type',
    cell: (info: { getValue: () => any }) => capitalize(info.getValue()),
  },
];
