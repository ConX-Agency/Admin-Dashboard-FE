// import * as React from "react"
// import {
//     ColumnDef,
//     ColumnFiltersState,
//     SortingState,
//     VisibilityState,
//     flexRender,
//     getCoreRowModel,
//     getFilteredRowModel,
//     getPaginationRowModel,
//     getSortedRowModel,
//     useReactTable,
// } from "@tanstack/react-table"
// import { ArrowUpDown, ChevronDown } from "lucide-react"

// import { ActionButton, Button } from "@/components/ui/button"
// import {
//     DropdownMenu,
//     DropdownMenuCheckboxItem,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table"
// import { Checkbox } from "../ui/checkbox"
// import { dummyInfluencerData, Influencer } from "@/data/influencer"
// import { useState } from "react"
// import { Input } from "../ui/input"
// import { FilterDropdown } from "../ui/filterDropdown"
// import { UpdateInfluencerModal } from "./UpdateInfluencerModal"
// import { RegisterInfluencerModal } from "./RegisterInfluencerModal"
// import { useToast } from "@/hooks/use-toast"

// export function ManageInfluencerTable() {
//     const [sorting, setSorting] = React.useState<SortingState>([]);
//     const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
//     const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
//     const [rowSelection, setRowSelection] = React.useState({});
//     const [subscriptionFilter, setSubscriptionFilter] = useState<string>("");
//     const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
//     const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
//     const [influencerData, setInfluencerData] = useState<Influencer | null>(null);
//     const { toast } = useToast();

//     //Table Columns Definitions
//     const columns: ColumnDef<Influencer>[] = [
//         {
//             id: "select",
//             header: ({ table }) => (
//                 <Checkbox
//                     checked={
//                         table.getIsAllPageRowsSelected() ||
//                         (table.getIsSomePageRowsSelected() && "indeterminate")
//                     }
//                     onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//                     aria-label="Select all"
//                 />
//             ),
//             cell: ({ row }) => (
//                 <Checkbox
//                     checked={row.getIsSelected()}
//                     onCheckedChange={(value) => row.toggleSelected(!!value)}
//                     aria-label="Select row"
//                 />
//             ),
//             enableSorting: false,
//             enableHiding: false,
//         },
//         {
//             accessorKey: "full_name",
//             meta: "Full Name",
//             header: "Full Name",
//             cell: ({ row }) => (
//                 <div className="capitalize transition-all duration-300 hover:text-black/75 dark:hover:text-white/75">
//                     {row.getValue("full_name")}
//                 </div>
//             ),
//         },
//         {
//             accessorFn: (row) => row.total_follower_count || "N/A",
//             id: "total_follower_count",
//             meta: "Follower Count",
//             header: ({ column }) => {
//                 return (
//                     <Button
//                         variant="ghost"
//                         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//                         className="pl-0 font-semibold"
//                     >
//                         Follower Count
//                         <ArrowUpDown className="ml-2 h-4 w-4" />
//                     </Button>
//                 )
//             },
//             cell: ({ row }) => (
//                 <div className="capitalize">{row.getValue("total_follower_count")}</div>
//             ),
//         },
//         {
//             accessorKey: "email_address",
//             meta: "Email Address",
//             header: ({ column }) => {
//                 return (
//                     <Button
//                         variant="ghost"
//                         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//                         className="pl-0 font-semibold"
//                     >
//                         Email Address
//                         <ArrowUpDown className="ml-2 h-4 w-4" />
//                     </Button>
//                 )
//             },
//             cell: ({ row }) => (
//                 <div className="capitalize">{row.getValue("email_address")}</div>
//             ),
//         },
//         {
//             accessorFn: (row) => row.address.country || "N/A",
//             id: "country",
//             meta: "Country",
//             header: ({ column }) => {
//                 return (
//                     <Button
//                         variant="ghost"
//                         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//                         className="pl-0 font-semibold"
//                     >
//                         Country
//                         <ArrowUpDown className="ml-2 h-4 w-4" />
//                     </Button>
//                 )
//             },
//             cell: ({ row }) => (
//                 <div className="capitalize">{row.getValue("country")}</div>
//             ),
//         },
//         {
//             accessorKey: "contact_no",
//             meta: "Contact Number",
//             header: "Contact Number",
//             cell: ({ row }) => (
//                 <div className="capitalize transition-all duration-300 hover:text-black/75 dark:hover:text-white/75">
//                     {row.getValue("contact_no")}
//                 </div>
//             ),
//         },
//         {
//             accessorKey: "alt_contact_no",
//             meta: "Alt Contact Number",
//             header: "Alt Contact Number",
//             cell: ({ row }) => (
//                 <div className="transition-all duration-300 hover:text-black/75 dark:hover:text-white/75">
//                     {row.getValue("alt_contact_no")}
//                 </div>
//             ),
//         },
//         {
//             accessorKey: "Action",
//             meta: "Action",
//             header: "",
//             cell: ({ row }) => (
//                 <ActionButton icon="pencil" label="update" onClick={() => handleOpenUpdateModal(row.original)} />
//             ),
//         },
//     ];

//     //Table Config
//     const table = useReactTable({
//         data: dummyInfluencerData,
//         columns,
//         onSortingChange: setSorting,
//         onColumnFiltersChange: setColumnFilters,
//         getCoreRowModel: getCoreRowModel(),
//         getPaginationRowModel: getPaginationRowModel(),
//         getSortedRowModel: getSortedRowModel(),
//         getFilteredRowModel: getFilteredRowModel(),
//         onColumnVisibilityChange: setColumnVisibility,
//         onRowSelectionChange: setRowSelection,
//         state: {
//             sorting,
//             columnFilters,
//             columnVisibility,
//             rowSelection,
//         },
//     })

//     //Action Buttons' Logics
//     const handleSearch = (value: string) => {
//         table.setColumnFilters((prev) => [
//             ...prev.filter((filter) => filter.id !== "company_name"),
//             { id: "company_name", value },
//         ]);
//     };

//     const handleSubscriptionFilter = (value: string) => {
//         setSubscriptionFilter(value); // Update the filter value
//     };

//     const handleDelete = () => {

//         const selectedRows = table.getSelectedRowModel().rows;

//         if (!selectedRows || selectedRows.length === 0) {
//             toast({
//                 variant: "destructive",
//                 title: "User not Selected",
//                 description: `Can't proceed, select a user to delete first!`,
//                 duration: 3000
//             })
//         } else {
//             // Extract and log client_id from each selected row
//             const influencerIds = selectedRows.map((row) => row.original.influencer_id);
//             const influecnerNames = selectedRows.map((row) => row.original.full_name);
//             var concatenatedNames = "";

//             if (influecnerNames.length > 1) {
//                 concatenatedNames = influecnerNames.join(", ");
//             }

//             //To add delete API here.

//             toast({
//                 title: "Deletion is Successful",
//                 description: `Successfully deleted ${concatenatedNames}'s profile(s).`,
//                 duration: 5000
//             })
//         }
//     };

//     const handleOpenUpdateModal = (data: Influencer) => {
//         setInfluencerData(data);
//         setIsUpdateModalVisible(true);
//     };

//     const handleCloseUpdateModal = () => {
//         setIsUpdateModalVisible(false);
//     };

//     const handleOpenRegisterModal = () => {
//         setIsRegisterModalVisible(true);
//     };

//     const handleCloseRegisterModal = () => {
//         setIsRegisterModalVisible(false);
//     };

//     const handleUpdate = (data: Influencer) => {
//         console.log(data);

//         //To add Update API here.

//         toast({
//             title: "Update Profile is Successful",
//             description: `Successfully updated ${data.full_name}'s profile.`,
//             duration: 3000
//         });
//     }

//     const handleRegister = (data: Influencer) => {
//         console.log(data);

//         //To add Register API here.

//         toast({
//             title: "Registeration is Successful",
//             description: `Successfully registered new client, ${data.full_name}.`,
//             duration: 3000
//         });
//     }

//     React.useEffect(() => {
//         const subscriptionFilterCondition = subscriptionFilter && subscriptionFilter !== "All"
//             ? [{ id: "subscription", value: subscriptionFilter }]
//             : [];

//         // Apply subscription filter without affecting other column filters
//         setColumnFilters((prev) => [
//             ...prev.filter((filter) => filter.id !== "subscription"),
//             ...subscriptionFilterCondition
//         ]);
//     }, [subscriptionFilter]);

//     return (
//         <div className="w-full">
//             <div className="flex items-center justify-between py-4 xxxs:flex-wrap md:flex-nowrap gap-2">
//                 <div className="flex items-start gap-2">
//                     <Input
//                         placeholder="Search by Company Name"
//                         onChange={(e) => handleSearch(e.target.value)}
//                         className="max-w-xs h-[40px] bg-neutral-150 w-[202px]"
//                     />
//                     <FilterDropdown
//                         label="Subscription Tier"
//                         items={["All", "Free Tier", "Bronze Tier", "Silver Tier", "Gold Tier", "Premium Tier"]}
//                         value={subscriptionFilter || "All"}
//                         onValueChange={handleSubscriptionFilter}
//                         minWidth="min-w-[121px]"
//                     />
//                 </div>
//                 <div className="flex items-end gap-2">
//                     <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                             <Button variant="outline" className="h-[40px]">
//                                 Columns <ChevronDown className="ml-2 h-4 w-4" />
//                             </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end">
//                             {table
//                                 .getAllColumns()
//                                 .filter((column) => column.getCanHide())
//                                 .map((column) => {

//                                     // Get the meta property if defined
//                                     const metaContent = column.columnDef.meta || "No meta";

//                                     return (
//                                         <DropdownMenuCheckboxItem
//                                             key={column.id}
//                                             className="capitalize"
//                                             checked={column.getIsVisible()}
//                                             onCheckedChange={(value) =>
//                                                 column.toggleVisibility(!!value)
//                                             }
//                                         >
//                                             {metaContent.toString()}
//                                         </DropdownMenuCheckboxItem>
//                                     );
//                                 })}
//                         </DropdownMenuContent>
//                     </DropdownMenu>
//                     <ActionButton icon="trash" label="delete" onClick={handleDelete} />
//                     <ActionButton icon="plus" label="register" onClick={handleOpenRegisterModal} />
//                 </div>
//             </div>
//             <div className="rounded-md border border-neutral-500">
//                 <Table>
//                     <TableHeader>
//                         {table.getHeaderGroups().map((headerGroup) => (
//                             <TableRow key={headerGroup.id} className="border-neutral-500">
//                                 {headerGroup.headers.map((header) => {
//                                     return (
//                                         <TableHead key={header.id} className="font-semibold">
//                                             {header.isPlaceholder
//                                                 ? null
//                                                 : flexRender(
//                                                     header.column.columnDef.header,
//                                                     header.getContext()
//                                                 )}
//                                         </TableHead>
//                                     )
//                                 })}
//                             </TableRow>
//                         ))}
//                     </TableHeader>
//                     <TableBody>
//                         {table.getRowModel().rows?.length ? (
//                             table.getRowModel().rows.map((row) => (
//                                 <TableRow
//                                     key={row.id}
//                                     data-state={row.getIsSelected() && "selected"}
//                                     className="border-neutral-500"
//                                 >
//                                     {row.getVisibleCells().map((cell) => (
//                                         <TableCell key={cell.id}>
//                                             {flexRender(
//                                                 cell.column.columnDef.cell,
//                                                 cell.getContext()
//                                             )}
//                                         </TableCell>
//                                     ))}
//                                 </TableRow>
//                             ))
//                         ) : (
//                             <TableRow>
//                                 <TableCell
//                                     colSpan={columns.length}
//                                     className="h-24 text-center"
//                                 >
//                                     No results.
//                                 </TableCell>
//                             </TableRow>
//                         )}
//                     </TableBody>
//                 </Table>
//             </div>
//             <div className="flex items-center justify-between space-x-2 py-4">
//                 <div className="items-start">
//                     <RowsPerPageDropdown table={table} />
//                 </div>
//                 <div className="space-x-2">
//                     <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => table.previousPage()}
//                         disabled={!table.getCanPreviousPage()}
//                     >
//                         Previous
//                     </Button>
//                     <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => table.nextPage()}
//                         disabled={!table.getCanNextPage()}
//                     >
//                         Next
//                     </Button>
//                 </div>
//             </div>

//             {/* Update & Register Modals */}
//             <UpdateInfluencerModal 
//                 influencerData={influencerData} 
//                 closeUpdateModal={handleCloseUpdateModal} 
//                 handleUpdate={handleUpdate} 
//                 updateModalVisibility={isUpdateModalVisible} 
//             />
//             <RegisterInfluencerModal 
//                 closeRegisterModal={handleCloseRegisterModal} 
//                 handleRegister={handleRegister} 
//                 registerModalVisibility={isRegisterModalVisible} 
//             />
//         </div>
//     )
// }

// function RowsPerPageDropdown({ table }: { table: any }) {
//     const options = [5, 10, 20, 50]; // Define row limit options
//     const [rowsPerPage, setRowsPerPage] = useState(table.getState().pagination.pageSize);

//     const handleRowsPerPageChange = (size: number) => {
//         setRowsPerPage(size);
//         table.setPageSize(size);
//     };

//     return (
//         <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//                 <Button variant="outline" className="text-sm">
//                     Rows per page: {rowsPerPage}
//                 </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent>
//                 {options.map((option) => (
//                     <DropdownMenuItem
//                         key={option}
//                         onClick={() => handleRowsPerPageChange(option)}
//                         className={rowsPerPage === option ? "font-bold" : ""}
//                     >
//                         {option}
//                     </DropdownMenuItem>
//                 ))}
//             </DropdownMenuContent>
//         </DropdownMenu>
//     );
// }