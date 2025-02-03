import { FiltersProps, dummyCampaignsData } from '@/data/campaign';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from './dropdown-menu';
import { Popover, PopoverTrigger, PopoverContent } from './popover';
import { AnimatePresence, motion } from 'framer-motion';
import { Filter, FilterX, Calendar as LucideCalendar, ChevronDown } from 'lucide-react';
import { Calendar } from './calendar';
import { useState, useEffect } from 'react';
import { Button } from './button';

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const defaultFilter = {
    slot_status: 'All',
    status: 'All',
    start_date: new Date(new Date().getFullYear(), 0, 1),
    end_date: new Date(new Date().getFullYear(), 11, 31),
  };

  const [isFiltered, setIsFiltered] = useState(false);
  const [multiFilter, setMultiFilter] = useState(defaultFilter);

  const handleSelectStartDate = (date?: Date) => {
    if (date) {
      setMultiFilter((prev) => ({
        ...prev,
        start_date: date,
      }));
    }
  };

  const handleSelectEndDate = (date?: Date) => {
    if (date) {
      setMultiFilter((prev) => ({
        ...prev,
        end_date: date,
      }));
    }
  };

  const filterCampaigns = () => {
    const { slot_status, status, start_date, end_date } = multiFilter;

    const filteredData = dummyCampaignsData.filter((campaign) => {
      let matchesSlotStatus = slot_status === 'All' || campaign.slot_status === slot_status;
      let matchesCampaignStatus = status === 'All' || campaign.status === status;
      let matchesDateRange = true;

      // Apply date range filter
      if (start_date && end_date) {
        const campaignStartDate = new Date(campaign.start_date);
        const campaignEndDate = new Date(campaign.end_date);

        matchesDateRange =
          (campaignStartDate >= start_date && campaignStartDate <= end_date) ||
          (campaignEndDate >= start_date && campaignEndDate <= end_date);
      }

      return matchesSlotStatus && matchesCampaignStatus && matchesDateRange;
    });

    console.log(filteredData);

    onFilterChange(filteredData);
  };

  const unfilterCampaigns = () => {
    setMultiFilter(defaultFilter);
    onFilterChange(dummyCampaignsData);
    setIsFiltered(false);
  };

  const handleFilterChange = (field: string, value: string) => {
    setMultiFilter((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Check if the current filter is the default filter
  const isDefaultFilter = () => {
    return (
      multiFilter.status === defaultFilter.status &&
      multiFilter.slot_status === defaultFilter.slot_status &&
      multiFilter.start_date.getTime() === defaultFilter.start_date.getTime() &&
      multiFilter.end_date.getTime() === defaultFilter.end_date.getTime()
    );
  };

  // Apply filter when multiFilter changes
  useEffect(() => {
    if (isDefaultFilter()) {
      onFilterChange(dummyCampaignsData); // Reset to default data
      setIsFiltered(false); // Reset isFiltered if multiFilter is default
    } else {
      filterCampaigns();
      setIsFiltered(true); // Set isFiltered to true if filters are applied
    }
  }, [multiFilter]);

  return (
    <div className="mb-1 flex w-full flex-row flex-wrap justify-start gap-1">
      <AnimatePresence>
        <Button
          variant={isFiltered ? 'outline' : 'ghost'}
          className={cn(
            `flex h-[40px] w-[40px] items-center justify-center p-2`,
            isFiltered ? 'cursor-pointer' : 'cursor-default hover:bg-transparent',
          )}
          onClick={isFiltered ? unfilterCampaigns : undefined}
        >
          {!isFiltered && (
            <motion.div
              initial={{ translateX: -20, opacity: 0 }}
              animate={{ translateX: 0, opacity: 1 }}
              exit={{ translateX: 20, opacity: 0 }}
            >
              <Filter className="h-[20px] w-[20px]" />
            </motion.div>
          )}
          {isFiltered && (
            <motion.div
              initial={{ translateX: -20, opacity: 0 }}
              animate={{ translateX: 0, opacity: 1 }}
              exit={{ translateX: 20, opacity: 0 }}
            >
              <FilterX className="h-[20px] w-[20px]" />
            </motion.div>
          )}
        </Button>
      </AnimatePresence>

      {/* Filter by Start Date */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="flex h-[40px] min-w-[190px] items-center justify-between p-2"
          >
            <span>
              {multiFilter.start_date ? multiFilter.start_date.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              }) : ''}
            </span>
            <LucideCalendar className="ml-1 h-[20px] w-[20px]" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={multiFilter.start_date}
            onSelect={handleSelectStartDate}
            className="rounded-md border"
          />
        </PopoverContent>
      </Popover>

      {/* Filter by End Date */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="flex h-[40px] min-w-[190px] items-center justify-between p-2"
          >
            <span>
              {multiFilter.end_date ? multiFilter.end_date.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              }) : ''}
            </span>
            <LucideCalendar className="ml-1 h-[20px] w-[20px]" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={multiFilter.end_date}
            onSelect={handleSelectEndDate}
            className="rounded-md border"
          />
        </PopoverContent>
      </Popover>

      {/* Slot Status */}
      <FilterDropdown
        label="Slot Status"
        items={['All', 'Filled', 'Pending']}
        value={multiFilter.slot_status}
        onValueChange={(value) => handleFilterChange('slot_status', value)}
        minWidth="min-w-[140px]"
      />

      {/* Campaign Status */}
      <FilterDropdown
        label="Campaign Status"
        items={['All', 'Pending Result', 'Inactive', 'Completed']}
        value={multiFilter.status}
        onValueChange={(value) => handleFilterChange('status', value)}
        minWidth="min-w-[150px]"
      />
    </div>
  );
};

const FilterDropdown = ({
  label,
  items,
  value,
  onValueChange,
  minWidth,
}: {
  label: string;
  items: string[];
  value: string;
  onValueChange: (value: string) => void;
  minWidth: string;
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="outline"
        className={`h-[40px] ${minWidth} flex items-center justify-between p-2`}
      >
        <span>{value}</span>
        <ChevronDown className="ml-1 h-[20px] w-[20px]" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-max" align="start">
      <DropdownMenuRadioGroup value={value} onValueChange={onValueChange}>
        {items.map((item, idx) => (
          <DropdownMenuRadioItem value={item} key={idx}>
            {item}
          </DropdownMenuRadioItem>
        ))}
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
);

export {Filters, FilterDropdown};