import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  currentPage?: number
  totalPages?: number
  pageSize?: number  // Accept pageSize as a prop
  onPageChange?: (page: number) => void
  onPageSizeChange?: (size: number) => void
}

export function DataTablePagination<TData>({
  table,
  currentPage,
  totalPages,
  pageSize,  // Use the pageSize prop
  onPageChange,
  onPageSizeChange,
}: DataTablePaginationProps<TData>) {
  const isServerSide = currentPage !== undefined && totalPages !== undefined;

  const handlePageSizeChange = (value: string) => {
    const newSize = Number(value);
    if (onPageSizeChange) {
      onPageSizeChange(newSize);  // Trigger page size change callback
    } else {
      table.setPageSize(newSize);  // Handle local pagination
    }
  };

  return (
    <div className="flex items-center justify-between px-2 mt-5">
      <div className="flex-1 text-xs text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-xs font-normal">Rows per page</p>
          <Select
            value={`${pageSize}`}  // Use the prop pageSize value
            onValueChange={handlePageSizeChange}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={`${pageSize}`} />  {/* Display the current page size */}
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-xs font-normal">
          Page {isServerSide ? currentPage : table.getState().pagination.pageIndex + 1} of{" "}
          {isServerSide ? totalPages : table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => isServerSide ? onPageChange?.(1) : table.setPageIndex(0)}
            disabled={isServerSide ? currentPage === 1 : !table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => isServerSide ? onPageChange?.(currentPage! - 1) : table.previousPage()}
            disabled={isServerSide ? currentPage === 1 : !table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => isServerSide ? onPageChange?.(currentPage! + 1) : table.nextPage()}
            disabled={isServerSide ? currentPage === totalPages : !table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => isServerSide ? onPageChange?.(totalPages!) : table.setPageIndex(table.getPageCount() - 1)}
            disabled={isServerSide ? currentPage === totalPages : !table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
