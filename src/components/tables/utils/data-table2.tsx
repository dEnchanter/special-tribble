"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { JSX, useState } from "react"
import { Input } from "../../ui/input"
import { FiSearch } from "react-icons/fi"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu"
import { Button } from "../../ui/button"
import { cn } from "@/lib/utils"
import { DataTablePagination2 } from "./data-table-pagination2"
import { Card, CardContent } from "@/components/ui/card"

interface CardStat {
  label: string
  value: number | string
}

interface DataTableProps<TData, TValue> {
  title?: string
  stats?: CardStat[]
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onRowClick?: (item: TData) => void
  emptyMessage?: JSX.Element
  serverSidePagination?: boolean
  onPaginationChange?: (page: number, pageSize: number) => void
  pagination?: {
    currentPage: number
    totalPages: number
    pageSize: number
    totalItems: number
  }
  onDateRangeChange?: (startDate: string, endDate: string) => void
  rowClassName?: string | ((row: TData) => string)
}

export function DataTable2<TData, TValue>({
  title,
  stats,
  columns,
  data,
  onRowClick,
  emptyMessage,
  serverSidePagination = false,
  onPaginationChange,
  rowClassName,
  pagination,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [selectedColumn, setSelectedColumn] = useState<string>(columns[0].id as string)
  const [filterValue, setFilterValue] = useState<string>("")

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
  })

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value)
    table.getColumn(selectedColumn)?.setFilterValue(e.target.value)
  }

  if (data.length === 0) {
    return emptyMessage || <div>No results.</div>
  }

  return (
    <Card className="rounded-2xl shadow-xl mb-5">
      <CardContent className="p-6">
        {title && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">{title}</h2>
          </div>
        )}

        {stats && stats.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-[3rem]">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white border rounded-xl p-4 shadow-sm">
                <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
                <h3 className="text-lg font-semibold">{stat.value}</h3>
              </div>
            ))}
          </div>
        )}

        {stats && stats.length > 0 && <hr className="mb-[3rem]" />}

        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <div className="flex items-center space-x-3 flex-wrap">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="mr-2">
                  {selectedColumn || "Select Column"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanFilter())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.id === selectedColumn}
                      onCheckedChange={() => setSelectedColumn(column.id)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="relative max-w-sm">
              <Input
                placeholder={`Filter by ${selectedColumn}...`}
                value={filterValue}
                onChange={handleFilterChange}
                className="border border-gray-300 shadow-sm pl-10"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>

        <div className="rounded-lg overflow-x-auto border border-gray-200">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="bg-[#F9FAFB] text-gray-700 text-sm">
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="px-4 py-2">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => {
                const additionalRowClassName =
                  typeof rowClassName === "function"
                    ? rowClassName(row.original)
                    : rowClassName || ""

                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={cn(
                      "hover:bg-gray-50 cursor-pointer text-sm",
                      row.index % 2 === 0 ? "bg-white" : "bg-[#F8F9FA]",
                      additionalRowClassName
                    )}
                    onClick={() => onRowClick && onRowClick(row.original)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-4 py-2">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4">
          {serverSidePagination ? (
            <DataTablePagination2
              table={table}
              currentPage={pagination?.currentPage}
              totalPages={pagination?.totalPages}
              onPageChange={(page) =>
                onPaginationChange && onPaginationChange(page, pagination?.pageSize || 10)
              }
              onPageSizeChange={(size) =>
                onPaginationChange &&
                onPaginationChange(pagination?.currentPage || 1, size)
              }
            />
          ) : (
            <DataTablePagination2 table={table} />
          )}
        </div>
      </CardContent>
    </Card>
  )
}
