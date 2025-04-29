/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatDate } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';

export const materialRequestColumns: ColumnDef<MaterialRequest>[] = [
  {
    id: 'sn',
    header: 'S/N', // Header for the counter column
    cell: ({ row }: { row: { index: number } }) => row.index + 1, // Indexing starts from 0, so add 1 for S/N
  },
  {
    id: 'requestDate',
    accessorKey: 'requestDate',
    header: 'Request Date',
    cell: ({ getValue }) => formatDate(getValue() as string),
  },
  {
    id: 'approveDate',
    accessorKey: 'approveDate',
    header: 'Approve Date',
    cell: ({ getValue }) => formatDate(getValue() as string),
  },
  {
    id: 'requesterId',
    accessorKey: 'requesterId',
    header: 'Requester ID',
    cell: (info: { getValue: () => any; }) => info.getValue(),
  },
  {
    id: 'approvedId',
    accessorKey: 'approvedId',
    header: 'Approved By',
    cell: (info: { getValue: () => any; }) => info.getValue(),
  },
  {
    id: 'isAssigned',
    accessorKey: 'isAssigned',
    header: 'Assigned',
    cell: ({ getValue }) => getValue() ? 'Yes' : 'No',
  },
];
