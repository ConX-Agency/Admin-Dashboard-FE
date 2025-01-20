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
import { dummyClientData, Client } from "@/data/clients"
import { useState } from "react"
import { Input } from "../ui/input"
import { FilterDropdown } from "../ui/filterDropdown"
import { UpdateClientModal } from "./UpdateClientModal"
import { RegisterClientModal } from "./RegisterClientModal"
import { useToast } from "@/hooks/use-toast"
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react"
import { useConx } from "@/context/ConxContext"
import { handleApiError } from "@/lib/utils"

export function ManageClientTable() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [statusFilter, setStatusFilter] = useState<string>("");
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
    const [clientData, setClientData] = useState<Client | null>(null);
    const { toast } = useToast();
    const { addClient } = useConx();

    //Table Columns Definitions
    const columns: ColumnDef<Client>[] = [
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
            accessorKey: "category",
            meta: "Category",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="pl-0 font-semibold"
                    >
                        Category
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("category")}</div>
            ),
        },
        {
            accessorFn: (row) => row.addresses?.[0]?.city || "N/A",
            id: "city",
            meta: "City",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="pl-0 font-semibold"
                    >
                        City
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("city")}</div>
            ),
        },
        {
            accessorFn: (row) => row.addresses?.[0]?.country || "N/A",
            id: "country",
            meta: "Country",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="pl-0 font-semibold"
                    >
                        Country
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("country")}</div>
            ),
        },
        {
            accessorKey: "person_in_charge_name",
            meta: "PIC Name",
            header: "PIC Name",
            cell: ({ row }) => (
                <div className="capitalize transition-all duration-300 hover:text-black/75 dark:hover:text-white/75">
                    {row.getValue("person_in_charge_name")}
                </div>
            ),
        },
        {
            accessorKey: "person_in_charge_email",
            meta: "PIC Email",
            header: "PIC Email",
            cell: ({ row }) => (
                <div className="transition-all duration-300 hover:text-black/75 dark:hover:text-white/75">
                    {row.getValue("person_in_charge_email")}
                </div>
            ),
        },
        {
            accessorKey: "status",
            meta: "Status",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="pl-0 font-semibold"
                    >
                        Status
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("status")}</div>
            ),
        },
        {
            accessorKey: "Action",
            meta: "Action",
            header: "",
            cell: ({ row }) => (
                <ActionButton icon="pencil" label="update" onClick={() => handleOpenUpdateModal(row.original)} />
            ),
        },
    ];

    //Table Config
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

    //Action Buttons' Logics
    const handleSearch = (value: string) => {
        table.setColumnFilters((prev) => [
            ...prev.filter((filter) => filter.id !== "company_name"),
            { id: "company_name", value },
        ]);
    };

    const handleStatusFilter = (value: string) => {
        setStatusFilter(value); // Update the filter value
    };

    const handleDelete = () => {

        const selectedRows = table.getSelectedRowModel().rows;

        if (!selectedRows || selectedRows.length === 0) {
            toast({
                variant: "destructive",
                title: "User not Selected",
                description: `Can't proceed, select a user to delete first!`,
                duration: 3000
            })
        } else {
            // Extract and log client_id from each selected row
            const clientIds = selectedRows.map((row) => row.original.client_id);
            const clientNames = selectedRows.map((row) => row.original.company_name);
            var concatenatedNames = "";

            if (clientNames.length > 1) {
                concatenatedNames = clientNames.join(", ");
            }

            //To add delete API here.

            toast({
                title: "Deletion is Successful",
                description: `Successfully deleted ${concatenatedNames}'s profile(s).`,
                duration: 5000
            })
        }
    };

    const handleOpenUpdateModal = (data: Client) => {
        setClientData(data);
        setIsUpdateModalVisible(true);
    };

    const handleCloseUpdateModal = () => {
        setIsUpdateModalVisible(false);
    };

    const handleOpenRegisterModal = () => {
        setIsRegisterModalVisible(true);
    };

    const handleCloseRegisterModal = () => {
        setIsRegisterModalVisible(false);
    };

    const handleUpdate = (data: Client) => {
        console.log(data);

        //To add Update API here.

        toast({
            title: "Update Profile is Successful",
            description: `Successfully updated ${data.company_name}'s profile.`,
            duration: 3000
        });
    }

    const handleRegister = async (data: Client) => {
        const token = localStorage.getItem('token');

        const client = new FormData();
        client.append('company_name', data.company_name);
        client.append('person_in_charge_name', data.person_in_charge_name);
        client.append('person_in_charge_email', data.person_in_charge_email);
        client.append('company_email', data.company_email);
        client.append('contact_number', data.contact_number);
        client.append('alt_contact_number', data.alt_contact_number);
        //Need to be modify while there added new value for industry field
        client.append('industry', 'Food & Beverage');
        // client.append('cuisine_type', data.cuisine_type);
        //Need to be modify while there added new value for category field
        client.append('category', 'not sure yet');
        client.append('is_non_monetary', data.is_non_monetary.toString());
        client.append('discount', data.discount.toString());
        client.append('ways_to_use', data.ways_to_use.toString());
        client.append('status', data.status);
        client.append('addresses', JSON.stringify(data.addresses));
        //client.append('addresses', formattedClient.addresses.toString());

        try {
            const res = await addClient(client);
            if (res.message != null) {
                toast({
                    title: 'Registration API Failure!',
                    description: 'An error occurred with the API.',
                    variant: 'destructive',
                    duration: 3000,
                });
            } else {
                toast({
                    title: "Registeration is Successful",
                    description: `Successfully registered new client, ${data.company_name}.`,
                    duration: 3000
                });
            }
        } catch (error) {
            handleApiError(error);
        }
    }

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
                        items={["All", "Active", "Pending Approval", "Blacklisted", "Deactivated"]}
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
                    <ActionButton icon="trash" label="delete" onClick={handleDelete} />
                    <ActionButton icon="plus" label="register" onClick={handleOpenRegisterModal} />
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
                        <IconArrowLeft className="h-4 w-4 flex-shrink-0" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <IconArrowRight className="h-4 w-4 flex-shrink-0" />
                    </Button>
                </div>
            </div>

            {/* Update & Register Modals */}
            <UpdateClientModal
                clientData={clientData}
                closeUpdateModal={handleCloseUpdateModal}
                handleUpdate={handleUpdate}
                updateModalVisibility={isUpdateModalVisible}
            />
            <RegisterClientModal
                closeRegisterModal={handleCloseRegisterModal}
                handleRegister={handleRegister}
                registerModalVisibility={isRegisterModalVisible}
            />
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