import * as React from "react"
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
import { ArrowUpDown, ChevronDown } from "lucide-react"

import { ActionButton, Button } from "@/components/ui/button"
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
import { useState } from "react"
import { Input } from "../ui/input"
import { FilterDropdown } from "../ui/filterDropdown"
import { useToast } from "@/hooks/use-toast"
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import { Campaign, dummyCampaignsData } from "@/data/campaign"

export function ManageCampaignTable() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [statusFilter, setStatusFilter] = useState<string>("");
    const [campaignData, setCampaignData] = useState<Campaign | null>(null);
    const { toast } = useToast();
    const router = useRouter();

    //Table Columns Definitions
    const columns: ColumnDef<Campaign>[] = [
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
            accessorKey: "campaign_name",
            meta: "Campaign Name",
            header: "Campaign Name",
            cell: ({ row }) => (
                <div className="capitalize transition-all duration-300 hover:text-black/75 dark:hover:text-white/75">
                    {row.getValue("campaign_name")}
                </div>
            ),
        },
        {
            accessorKey: "company_name",
            meta: "Company Name",
            header: "Company Name",
            cell: ({ row }) => (
                <div className="transition-all duration-300 hover:text-black/75 dark:hover:text-white/75">
                    {row.getValue("company_name")}
                </div>
            ),
        },
        {
            accessorKey: "dateRange",
            meta: "Start Date",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="pl-0 font-semibold"
                    >
                        Start Date
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => (
                <div className="capitalize">{(row.getValue("dateRange") as { from: string }).from}</div>
            ),
        },
        {
            accessorKey: "dateRange",
            meta: "End Date",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="pl-0 font-semibold"
                    >
                        End Date
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => (
                <div className="capitalize">{(row.getValue("dateRange") as { to: string }).to}</div>
            ),
        },
        {
            accessorKey: "current_bookings",
            meta: "Current Bookings",
            header: "Current Bookings",
            cell: ({ row }) => (
                <div className="capitalize transition-all duration-300 hover:text-black/75 dark:hover:text-white/75">
                    {row.getValue("current_bookings")}
                </div>
            ),
        },
        {
            accessorKey: "slot_status",
            meta: "Slot Status",
            header: "Slot Status",
            cell: ({ row }) => (
                <div className="capitalize transition-all duration-300 hover:text-black/75 dark:hover:text-white/75">
                    {row.getValue("slot_status")}
                </div>
            ),
        },
        {
            accessorKey: "status",
            meta: "Campaign Status",
            header: "Campaign Status",
            cell: ({ row }) => (
                <div className="transition-all duration-300 hover:text-black/75 dark:hover:text-white/75">
                    {row.getValue("status")}
                </div>
            ),
        },
        {
            accessorKey: "Action",
            meta: "Action",
            header: "",
            cell: ({ row }) => (
                <ActionButton icon="info" label="update" onClick={() => navigateToCampaignDetails(row.getValue('campaign_name'))} />
            ),
        },
    ];

    //Table Config
    const table = useReactTable({
        data: dummyCampaignsData,
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

    const navigateToCampaignDetails = (campaign_name: string) => {
        router.push(`/campaigns/campaign-details/?name=${campaign_name}`);
    }

    //Action Buttons' Logics
    const handleSearch = (value: string) => {
        table.setColumnFilters((prev) => [
            ...prev.filter((filter) => filter.id !== "campaign_name"),
            { id: "campaign_name", value },
        ]);
    };

    const handleStatusFilter = (value: string) => {
        setStatusFilter(value); // Update the filter value
    };

    React.useEffect(() => {
        const statusFilterCondition = statusFilter && statusFilter !== "All"
            ? [{ id: "status", value: statusFilter }]
            : [];

        // Apply status filter without affecting other column filters
        setColumnFilters((prev) => [
            ...prev.filter((filter) => filter.id !== "status"),
            ...statusFilterCondition
        ]);
    }, [statusFilter]);

    return (
        <div className="w-full">
            <div className="flex items-center justify-between py-4 flex-wrap gap-2">
                <div className="flex items-start gap-2 flex-wrap">
                    <Input
                        placeholder="Search by Company Name"
                        onChange={(e) => handleSearch(e.target.value)}
                        className="max-w-xs h-[40px] bg-neutral-150 w-[202px]"
                    />
                    <FilterDropdown
                        label="Subscription Tier"
                        items={["All", "Active" , "Completed" , "Pending Approval" , "Cancelled"]}
                        value={statusFilter || "All"}
                        onValueChange={handleStatusFilter}
                        minWidth="min-w-[121px]"
                    />
                </div>
                <div className="flex items-end gap-2 flex-wrap">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="h-[40px]">
                                Columns <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {

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
                <div className="space-x-2 flex">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <IconArrowLeft className="h-4 w-4 flex-shrink-0"/>
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <IconArrowRight className="h-4 w-4 flex-shrink-0"/>
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
                <Button variant="outline" className="text-sm h-[32px]">
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