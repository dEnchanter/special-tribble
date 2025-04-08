/* eslint-disable @typescript-eslint/no-explicit-any */
// src/config/productionItemsColumns.ts
import { formatDate } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';

export const productColumns: ColumnDef<Product>[] = [
  {
    id: 'prodCode',
    accessorKey: 'prodCode',
    header: 'Prod Code',
    cell: (info: { getValue: () => any; }) => info.getValue(),
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Name',
    cell: (info: { getValue: () => any; }) => info.getValue(),
  },
  {
    id: 'owner',
    accessorKey: 'owner',
    header: 'Owner',
    cell: (info: { getValue: () => any; }) => info.getValue(),
  },
  {
    id: 'cost',
    accessorKey: 'cost',
    header: 'Cost',
    cell: ({ row }) => {
      const amount: string = row.getValue("cost");

      if (typeof amount === 'number' && /^\d+$/.test(amount)) {
        return (
          <div className="font-medium">
              ₦{parseFloat(amount).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        );
      } else {
        return (
          <div className="font-medium">{amount}</div>
        )
      }
    }
  },
  {
    id: 'createdAt',
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ getValue }) => formatDate(getValue() as string),
  }
];