import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
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
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown } from 'lucide-react';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { ActionButton, Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '../ui/checkbox';
import { Campaign, CampaignLocations, CampaignWithLocation, dummyCampaignsData, getTotalBookedSlotsByCampaign } from '@/data/campaign';
import { getCompanyNameById } from '@/data/clients';
import RegisterCampaignModal from './RegisterCampaignModal';
import UpdateCampaignModal from './UpdateCampaignModal';
import { Filters } from '@/components/ui/filters';

export function ManageCampaignTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [filteredCampaignData, setFilteredCampaignData] = useState<Campaign[]>(dummyCampaignsData);
  const [campaignData, setCampaignData] = useState<Campaign | null>(null);

  const { toast } = useToast();
  const router = useRouter();

  const handleFilterChange = (filteredData: Campaign[]) => {
    setFilteredCampaignData(filteredData);
  };

  //Table Columns Definitions
  const columns: ColumnDef<Campaign>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
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
      accessorKey: 'campaign_name',
      meta: 'Campaign Name',
      header: 'Campaign Name',
      cell: ({ row }) => (
        <div className="capitalize transition-all duration-300 hover:text-black/75 dark:hover:text-white/75">
          {row.getValue('campaign_name')}
        </div>
      ),
    },
    {
      accessorKey: 'company_name',
      meta: 'Company Name',
      header: 'Company Name',
      cell: ({ row }) => (
        <div className="transition-all duration-300 hover:text-black/75 dark:hover:text-white/75">
          {getCompanyNameById(row.original.client_id)}
        </div>
      ),
    },
    {
      accessorKey: 'start_date',
      meta: 'Start Date',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="pl-0 font-semibold"
          >
            Start Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">
          {new Date(row.getValue('start_date')).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        </div>
      ),
    },
    {
      accessorKey: 'end_date',
      meta: 'End Date',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="pl-0 font-semibold"
          >
            End Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">
          {new Date(row.getValue('end_date')).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        </div>
      ),
    },
    {
      accessorKey: 'current_bookings',
      meta: 'Current Bookings',
      header: 'Current Bookings',
      cell: ({ row }) => (
        <div className="capitalize transition-all duration-300 hover:text-black/75 dark:hover:text-white/75">
          {getTotalBookedSlotsByCampaign(row.original.campaign_id!)}
        </div>
      ),
    },
    {
      accessorKey: 'slot_status',
      meta: 'Slot Status',
      header: 'Slot Status',
      cell: ({ row }) => (
        <div className="capitalize transition-all duration-300 hover:text-black/75 dark:hover:text-white/75">
          {row.getValue('slot_status')}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      meta: 'Campaign Status',
      header: 'Campaign Status',
      cell: ({ row }) => (
        <div className="transition-all duration-300 hover:text-black/75 dark:hover:text-white/75">
          {row.getValue('status')}
        </div>
      ),
    },
    {
      accessorKey: 'Action',
      meta: 'Action',
      header: '',
      cell: ({ row }) => (
        <div className="flex flex-row gap-2">
          <ActionButton
            icon="info"
            label="info"
            onClick={() => navigateToCampaignDetails(row.getValue('campaign_name'))}
          />
          <ActionButton
            icon="pencil"
            label="update"
            onClick={() => handleOpenUpdateModal(row.original)}
          />
        </div>
      ),
    },
  ];

  //Table Config
  const table = useReactTable({
    data: filteredCampaignData,
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
  });

  // Action Buttons
  const navigateToCampaignDetails = (campaign_name: string) => {
    router.push(`/campaigns/campaign-details/?name=${campaign_name}`);
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
      const campaignIds = selectedRows.map((row) => row.original.campaign_id);
      const campaignNames = selectedRows.map((row) => row.original.campaign_name);
      var concatenatedNames = "";

      if (campaignNames.length > 1) {
        concatenatedNames = campaignNames.join(", ");
      }

      //To add delete API here.

      toast({
        title: "Deletion is Successful",
        description: `Successfully deleted ${concatenatedNames}'s profile(s).`,
        duration: 5000
      })
    }
  };

  const handleOpenRegisterModal = () => {
    setIsRegisterModalVisible(true);
  };

  const handleCloseRegisterModal = () => {
    setIsRegisterModalVisible(false);
  };

  const handleRegister = (data: CampaignWithLocation) => {
    const token = localStorage.getItem('token');

    const campaign = new FormData();
    campaign.append('client_id', data.client_id);
    campaign.append('campaign_name', data.campaign_name);
    campaign.append('food_offering', data.food_offering);
    campaign.append('key_message', data.key_message);
    campaign.append('total_nano_influencers', data.total_nano_influencers.toString());
    campaign.append('total_micro_influencers', data.total_micro_influencers.toString());
    campaign.append('total_photographer', data.total_photographer.toString());
    campaign.append('total_content_creator', data.total_content_creator.toString());
    campaign.append('max_pax', data.max_pax.toString());
    campaign.append('start_date', data.start_date.toString());
    campaign.append('end_date', data.end_date.toString());
    campaign.append('isHalal', data.isHalal.toString());
    campaign.append('slot_status', data.slot_status.toString());
    campaign.append('status', data.status.toString());
    campaign.append('campaign_locations', JSON.stringify(data.campaign_locations));

  };

  const handleOpenUpdateModal = (data: Campaign) => {
    setCampaignData(data);
    setIsUpdateModalVisible(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalVisible(false);
  };

  const handleUpdate = (data: CampaignWithLocation, initial_locations: CampaignLocations[]) => {
    const token = localStorage.getItem('token');
    console.log(data);

    const campaign = new FormData();
    campaign.append('client_id', data.client_id);
    campaign.append('campaign_name', data.campaign_name);
    campaign.append('food_offering', data.food_offering);
    campaign.append('key_message', data.key_message);
    campaign.append('total_nano_influencers', data.total_nano_influencers.toString());
    campaign.append('total_micro_influencers', data.total_micro_influencers.toString());
    campaign.append('total_photographer', data.total_photographer.toString());
    campaign.append('total_content_creator', data.total_content_creator.toString());
    campaign.append('max_pax', data.max_pax.toString());
    campaign.append('start_date', data.start_date.toString());
    campaign.append('end_date', data.end_date.toString());
    campaign.append('isHalal', data.isHalal.toString());
    campaign.append('slot_status', data.slot_status.toString());
    campaign.append('status', data.status.toString());
    campaign.append('campaign_locations', JSON.stringify(data.campaign_locations));
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-between gap-2 py-4">
        <div className="flex flex-wrap items-start gap-2">
          <Filters onFilterChange={handleFilterChange} />
        </div>
        <div className="flex flex-wrap items-end gap-2">
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
                  const metaContent = column.columnDef.meta || 'No meta';

                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
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
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="border-neutral-500"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="items-start">
          <RowsPerPageDropdown table={table} />
        </div>
        <div className="flex space-x-2">
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
      <RegisterCampaignModal
        closeRegisterModal={handleCloseRegisterModal}
        handleRegister={handleRegister}
        registerModalVisibility={isRegisterModalVisible}
      />

      <UpdateCampaignModal
        campaignData={campaignData}
        closeUpdateModal={handleCloseUpdateModal}
        handleUpdate={handleUpdate}
        updateModalVisibility={isUpdateModalVisible}
      />
    </div>
  );
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
        <Button variant="outline" className="h-[32px] text-sm">
          Rows per page: {rowsPerPage}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {options.map((option) => (
          <DropdownMenuItem
            key={option}
            onClick={() => handleRowsPerPageChange(option)}
            className={rowsPerPage === option ? 'font-bold' : ''}
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
