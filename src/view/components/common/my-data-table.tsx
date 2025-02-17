import { Constant } from "@/config/constant/common.constant"
import { KeyConstant } from "@/constants/key.constant"
import {
    ColumnDef,
    ColumnFiltersState,
    ExpandedState,
    PaginationState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getExpandedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    dataLength?: number
    variant?: "horizontal" | "vertical"
    textFilter?: {
        placeholder: string
        filteredField: string
    }

    hidePagination?: boolean
}

export function MyDataTable<TData, TValue>({
    columns,
    data,
    dataLength,
    textFilter,
    hidePagination = false,
}: DataTableProps<TData, TValue>) {
    const [searchParams, setSearchParams] = useSearchParams()
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: Number(searchParams.get(KeyConstant.SEARCH_PARAMS.page) || 1) - 1,
        pageSize: Number(searchParams.get(KeyConstant.SEARCH_PARAMS.size)) || Constant.PAGE_SIZE,
    })
    // const [filteredData, setFilteredData] = useState(data)
    const [expanded, setExpanded] = useState<ExpandedState>({})

    const table = useReactTable({
        data: data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onExpandedChange: setExpanded,
        //@ts-ignore
        getSubRows: (row) => row.subRows,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        getRowCanExpand: () => true, // Enable expansion for all rows
        // getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        autoResetPageIndex: false,
        manualPagination: true,
        pageCount: hidePagination
            ? 1
            : Math.ceil((dataLength || data.length) / pagination.pageSize || Constant.PAGE_SIZE),
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination: hidePagination ? undefined : pagination,
            expanded,
        },
        ...(hidePagination ? {} : { getPaginationRowModel: getPaginationRowModel() }),
    })

    // todo: using useEffect set page on the url
    useEffect(() => {
        if (!hidePagination) {
            setSearchParams((old) => {
                old.set(KeyConstant.SEARCH_PARAMS.page, (pagination.pageIndex + 1).toString())
                old.set(
                    KeyConstant.SEARCH_PARAMS.size,
                    pagination.pageSize.toString() || Constant.PAGE_SIZE.toString()
                )
                return old
            })
        }
    }, [pagination.pageIndex, setSearchParams, hidePagination, pagination.pageSize])

    return (
        <>
            <div className="">
                <div className="md:grid grid-flow-col justify-between items-end">
                    {textFilter && (
                        <div className="md:w-72">
                            <Input
                                placeholder={`${textFilter.placeholder} ...`}
                                value={
                                    (table.getColumn(textFilter.filteredField)?.getFilterValue() as string) ?? ""
                                }
                                onChange={(event) =>
                                    table.getColumn(textFilter.filteredField)?.setFilterValue(event.target.value)
                                }
                                className="w-full md:max-w-lg bg-grey-50 dark:bg-grey-900"
                            />
                        </div>
                    )}
                </div>

                <div className="my-2">
                    <Table className="table-auto">
                        <TableHeader className="capitalize [&_tr]:border-b-0">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead
                                                key={header.id}
                                                className="font-semibold text-primary-500 border-transparent"
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column.columnDef.header,
                                                          header.getContext()
                                                      )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody className="text-xs">
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                        className={`border-b-2 border-[#F6F9FF] bg-white hover:bg-primary-100 ${
                                            row.getIsExpanded() && "bg-[#E3F2FF]"
                                        }`}
                                    >
                                        {row.getVisibleCells().map((cell, index) => (
                                            <TableCell
                                                key={cell.id}
                                                className={`${index === 0 ? "rounded-s-full pl-8 py-0" : ""} ${
                                                    index === row.getVisibleCells().length - 1
                                                        ? "rounded-e-full pr-8"
                                                        : ""
                                                } ${row.getParentRow()?.getIsExpanded() && "bg-[#E3F2FF]"} ${
                                                    row.getParentRow()?.getIsExpanded() && index === 0
                                                        ? "bg-[#F6F9FF]"
                                                        : ""
                                                } `}
                                            >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* footer */}
                {!hidePagination && (
                    <div className="flex justify-between p-4 my-4">
                        <div>
                            Page <b>{table.getState().pagination.pageIndex + 1} </b> of{" "}
                            <b>{table.getPageCount()}</b>
                        </div>
                        <div className="flex items-center justify-end">
                            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                            </div>
                            <div className="flex items-center justify-end space-x-2 text-primary-dark">
                                <Button
                                    variant="outline"
                                    className="hidden h-8 w-8 p-0 lg:flex"
                                    onClick={() => table.setPageIndex(0)}
                                    disabled={!table.getCanPreviousPage()}
                                >
                                    <span className="sr-only">Go to first page</span>
                                    <ChevronsLeft className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    className="h-8 w-8 p-0"
                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}
                                >
                                    <span className="sr-only">Go to previous page</span>
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    className="h-8 w-8 p-0"
                                    onClick={() => table.nextPage()}
                                    disabled={!table.getCanNextPage()}
                                >
                                    <span className="sr-only">Go to next page</span>
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    className="hidden h-8 w-8 p-0 lg:flex"
                                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                    disabled={!table.getCanNextPage()}
                                >
                                    <span className="sr-only">Go to last page</span>
                                    <ChevronsRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
