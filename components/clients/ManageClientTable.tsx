import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    HeaderContext,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Checkbox } from "../ui/checkbox"
import { dummyClientData, Client } from "@/data/clients"
import { useState } from "react"
import { Input } from "../ui/input"
import { FilterDropdown } from "../ui/filterDropdown"

export const columns: ColumnDef<Client>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "company_name",
        meta: "Company Name",
        header: "Company Name",
        cell: ({ row }) => (
            <div className="capitalize transition-all duration-300 hover:text-black/75 dark:hover:text-white/75">
                {row.getValue("company_name")}
            </div>
        ),
    },
    {
        accessorKey: "company_email",
        meta: "Company Email",
        header: "Company Email",
        cell: ({ row }) => (
            <div className="transition-all duration-300 hover:text-black/75 dark:hover:text-white/75">
                {row.getValue("company_email")}
            </div>
        ),
    },
    {
        accessorKey: "food_category",
        meta: "Food Category",
        header: "Food Category",
        cell: ({ row }) => (
            <div className="capitalize transition-all duration-300 hover:text-black/75 dark:hover:text-white/75">
                {row.getValue("food_category")}
            </div>
        ),
    },
    {
        accessorFn: (row) => row.company_addresses?.[0]?.city || "N/A",
        id: "city",
        meta: "City",
        header: "City",
        cell: ({ row }) => (
            <div className="capitalize transition-all duration-300 hover:text-black/75 dark:hover:text-white/75">
                {row.getValue("city")}
            </div>
        ),
    },
    {
        accessorFn: (row) => row.company_addresses?.[0]?.country || "N/A",
        id: "country",
        meta: "Country",
        header: "Country",
        cell: ({ row }) => (
            <div className="capitalize transition-all duration-300 hover:text-black/75 dark:hover:text-white/75">
                {row.getValue("country")}
            </div>
        ),
    },
    {
        accessorKey: "pic_name",
        meta: "PIC Name",
        header: "PIC Name",
        cell: ({ row }) => (
            <div className="capitalize transition-all duration-300 hover:text-black/75 dark:hover:text-white/75">
                {row.getValue("pic_name")}
            </div>
        ),
    },
    {
        accessorKey: "pic_email",
        meta: "PIC Email",
        header: "PIC Email",
        cell: ({ row }) => (
            <div className="transition-all duration-300 hover:text-black/75 dark:hover:text-white/75">
                {row.getValue("pic_email")}
            </div>
        ),
    },
    {
        accessorKey: "subscription",
        meta: "Subcription Tier",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="pl-0 font-semibold"
                >
                    Subscription Tier
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("subscription")}</div>
        ),
    },
];

export function ManageClientTable() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [subscriptionFilter, setSubscriptionFilter] = useState<string>("");

    const table = useReactTable({
        data: dummyClientData,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    const handleSearch = (value: string) => {
        table.setColumnFilters((prev) => [
            ...prev.filter((filter) => filter.id !== "company_name"),
            { id: "company_name", value },
        ]);
    };

    const handleSubscriptionFilter = (value: string) => {
        setSubscriptionFilter(value); // Update the filter value
    };

    React.useEffect(() => {
        const subscriptionFilterCondition = subscriptionFilter && subscriptionFilter !== "All"
            ? [{ id: "subscription", value: subscriptionFilter }]
            : [];
    
        // Apply subscription filter without affecting other column filters
        setColumnFilters((prev) => [
            ...prev.filter((filter) => filter.id !== "subscription"),
            ...subscriptionFilterCondition
        ]);
    }, [subscriptionFilter]);

    return (
        <div className="w-full px-4">
            <div className="flex items-center py-4">
                <div className="flex items-start">
                    <Input
                        placeholder="Search by company name..."
                        onChange={(e) => handleSearch(e.target.value)}
                        className="max-w-xs mr-2 h-[40px] bg-neutral-150"
                    />
                    <FilterDropdown
                        label="Subscription Tier"
                        items={["All", "Free Tier", "Bronze Tier", "Silver Tier", "Gold Tier", "Premium Tier"]}
                        value={subscriptionFilter || "All"}
                        onValueChange={handleSubscriptionFilter}
                        minWidth="w-40"
                    />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                let headerContent;

                                // Render the header content as before
                                if (typeof column.columnDef.header === "function") {
                                    // Mock a minimal HeaderContext for rendering header content
                                    headerContent = column.columnDef.header({
                                        column,
                                        table,
                                        header: {}, // Provide dummy header if needed
                                    } as HeaderContext<Client, unknown>);
                                } else {
                                    headerContent = column.columnDef.header || column.id;
                                }

                                // Get the meta property if defined
                                const metaContent = column.columnDef.meta || "No meta";

                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {metaContent.toString()}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border border-neutral-500">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="border-neutral-500">
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="font-semibold">
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
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="border-neutral-500"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between space-x-2 py-4">
                <div className="items-start">
                    <RowsPerPageDropdown table={table} />
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}

function RowsPerPageDropdown({ table }: { table: any }) {
    const options = [5, 10, 20, 50]; // Define row limit options
    const [rowsPerPage, setRowsPerPage] = useState(table.getState().pagination.pageSize);

    const handleRowsPerPageChange = (size: number) => {
        setRowsPerPage(size);
        table.setPageSize(size);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="text-sm">
                    Rows per page: {rowsPerPage}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {options.map((option) => (
                    <DropdownMenuItem
                        key={option}
                        onClick={() => handleRowsPerPageChange(option)}
                        className={rowsPerPage === option ? "font-bold" : ""}
                    >
                        {option}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
