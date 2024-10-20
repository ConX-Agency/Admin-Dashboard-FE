import { CampaignCardsProps, dummyCampaignsData, dummyCountries, FiltersProps, IconWithToolTipProps, status, types } from "@/data/campaign";
import { Calendar as LucideCalendar, ChevronDown, Clock, Filter, FilterX, Globe, MapPinned } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { cn, parseDate, formatURL } from "@/lib/utils";
import { DropdownMenu, DropdownMenuRadioItem, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuRadioGroup } from "../ui/dropdown-menu";
import { Calendar } from "@/components/ui/calendar"
import { DateRange } from "react-day-picker";

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const defaultFilter = {
    status: "All",
    type: "All",
    location: "All",
    dateRange: {
      from: new Date(), // Start date is today
      to: new Date(new Date().setDate(new Date().getDate() + 30)), // End date is 30 days from today
    } as DateRange,
  };

  const [isFiltered, setIsFiltered] = useState(false);
  const [multiFilter, setMultiFilter] = useState(defaultFilter);

  const handleSelect = (date?: DateRange) => {
    if (date && date.from && date.to) {
      // Update the multiFilter state with the selected date range
      setMultiFilter((prev) => ({
        ...prev,
        dateRange: {
          from: date.from,
          to: date.to,
        },
      }));
    }
  };

  const filterCampaigns = () => {
    const { status, type, location, dateRange } = multiFilter;

    const filteredData = dummyCampaignsData.filter((campaign) => {
      let matchesStatus = status === "All" || campaign.status === status;
      let matchesType = type === "All" || campaign.tags.includes(type);
      let matchesLocation =
        location === "All" ||
        campaign.location.toLowerCase().includes(location.toLowerCase());
      let matchesDateRange = true;

      // Apply date range filter
      if (dateRange.from && dateRange.to) {
        const campaignStartDate = parseDate(campaign.dateRange.from);
        const campaignEndDate = parseDate(campaign.dateRange.to);

        const selectedStartDate = dateRange.from;
        const selectedEndDate = dateRange.to;

        matchesDateRange =
          (campaignStartDate >= selectedStartDate &&
            campaignStartDate <= selectedEndDate) ||
          (campaignEndDate >= selectedStartDate &&
            campaignEndDate <= selectedEndDate);
      }

      return (
        matchesStatus && matchesType && matchesLocation && matchesDateRange
      );
    });

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
      multiFilter.type === defaultFilter.type &&
      multiFilter.location === defaultFilter.location &&
      multiFilter.dateRange.from === defaultFilter.dateRange.from &&
      multiFilter.dateRange.to === defaultFilter.dateRange.to
    );
  };

  // Apply filter when multiFilter changes
  useEffect(() => {
    if (isDefaultFilter()) {
      onFilterChange(dummyCampaignsData); //Reset to default data
      setIsFiltered(false); // Reset isFiltered if multiFilter is default
    } else {
      filterCampaigns();
      setIsFiltered(true);  // Set isFiltered to true if filters are applied
    }
  }, [multiFilter]);

  return (
    <div className="flex flex-row flex-wrap justify-start w-full gap-1">
      <AnimatePresence>
        <Button
          variant={isFiltered ? "outline" : "ghost"}
          className={cn(
            `h-[40px] w-[40px] p-2 flex justify-center items-center`,
            isFiltered
              ? "cursor-pointer"
              : "cursor-default hover:bg-transparent"
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

      {/* Filter Status */}
      <FilterDropdown
        label="Status"
        items={status}
        value={multiFilter.status}
        onValueChange={(value) => handleFilterChange("status", value)}
        minWidth="105px"
      />

      {/* Filter Location */}
      <FilterDropdown
        label="Location"
        items={dummyCountries}
        value={multiFilter.location}
        onValueChange={(value) => handleFilterChange("location", value)}
        minWidth="126px"
      />

      {/* Filter Type */}
      <FilterDropdown
        label="Type"
        items={types}
        value={multiFilter.type}
        onValueChange={(value) => handleFilterChange("type", value)}
        minWidth="115px"
      />

      {/* Filter by Date */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="h-[40px] min-w-[190px] p-2 flex justify-between items-center"
          >
            <span>
              {multiFilter.dateRange.from!.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })} 
              <span> - </span> 
              {multiFilter.dateRange.to!.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}
            </span>
            <LucideCalendar className="h-[20px] w-[20px] ml-1" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={multiFilter.dateRange} // Ensure this is correctly structured as { from: Date, to: Date }
            onSelect={handleSelect}
            className="rounded-md border"
            />
        </PopoverContent>
      </Popover>
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
        className={`h-[40px] min-w-[${minWidth}] p-2 flex justify-between items-center`}
      >
        <span>{value}</span>
        <ChevronDown className="h-[20px] w-[20px] ml-1" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-max">
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

const CampaignCards: React.FC<CampaignCardsProps> = ({ campaigns }) => {
  const scrollRefs = useRef<(HTMLDivElement | null)[]>([]); // Store refs in an array

  const handleWheel = (e: React.WheelEvent, index: number) => {
    if (scrollRefs.current[index]) {
      e.preventDefault();

      const container = scrollRefs.current[index];
      const scrollAmount = e.deltaY * 2; // Adjust this multiplier for faster/slower scroll

      if (container) {
        let start = container.scrollLeft;
        const target = start + scrollAmount;

        const smoothScroll = () => {
          start += (target - start) * 0.2; // Control speed here by changing 0.2 (smoothing factor)
          container.scrollLeft = start;

          if (Math.abs(target - start) > 1) {
            window.requestAnimationFrame(smoothScroll); // Continue animation until target is reached
          }
        };

        window.requestAnimationFrame(smoothScroll);
      }
    }
  };

  function directToCampaign(campaign: string) {
    console.log(formatURL(campaign));
  }

  return (
    <div className="grid xxxs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xxl:grid-cols-4 gap-3 h-full">
      {campaigns.map((data, idx) => (
        <div
          className="shadow-md rounded-md cursor-pointer group bg-neutral-50 hover:bg-neutral-200/25 dark:bg-neutral-800 
          dark:hover:bg-neutral-700 transition-all duration-300 relative max-h-[300px]"
          key={data.id}
          onClick={() => directToCampaign(data.campaign)}
        >
          <div className="pt-3 px-3 w-full text-ellipsis text-nowrap overflow-hidden">
            <span
              className="font-semibold text-[17px] text-black hover:text-black/50
              transition-all duration-300 dark:text-white dark:hover:text-white/75"
              title={data.campaign}
            >
              {data.campaign}
            </span>
            <div className="w-full">
              <span className="text-[12px]">{data.name}</span>
            </div>
          </div>
          {/* Tags */}
          <div
            className="mt-6 flex flex-row flex-nowrap w-full px-3 gap-2 overflow-x-scroll scroll-smooth scrollbar-hide"
            ref={(el) => {
              scrollRefs.current[idx] = el;
            }}
            onWheel={(e) => handleWheel(e, idx)}
          >
            <div
              className={cn(
                "rounded-3xl px-2 py-[2px] text-black dark:text-white text-[13px] text-nowrap font-bold tracking-[0.5px]",
                data.status === "Active" && "bg-yellow-400 dark:bg-yellow-600",
                data.status === "Cancelled" && "bg-red-500",
                data.status === "Completed" && "bg-green-500"
              )}
            >
              {data.status}
            </div>
            {data.tags.map((tag, tagIdx) => (
              <div
                className="rounded-3xl px-2 py-[2px] bg-neutral-300 text-black dark:bg-neutral-600 dark:text-white
                text-[13px] text-nowrap"
                key={tagIdx}
              >
                {tag}
              </div>
            ))}
          </div>
          {/* Bottom Half */}
          <div className="mt-4 bg-black p-2 px-3 rounded-b-md w-full flex flex-row items-center justify-between gap-2 flex-wrap-reverse">
            <div className="flex flex-col justify-center">
              <span className="text-[11px] text-neutral-200 font-semibold tracking-[.3px]">
                Due Date
              </span>
              <span className="text-[14px] text-neutral-50">
                {data.dateRange.to}
              </span>
            </div>
            <div className="flex flex-row flex-nowrap gap-2 justify-end items-center">
              <IconWithTooltip
                IconComponent={MapPinned}
                popoverText={data.location}
              />
              <IconWithTooltip
                IconComponent={LucideCalendar}
                popoverText={`${data.dateRange.from} - ${data.dateRange.to}`}
              />
              <IconWithTooltip
                IconComponent={Globe}
                popoverText={`${data.influencers.length} Active Influencer(s)`}
              />
              <IconWithTooltip
                IconComponent={Clock}
                popoverText={`${data.activities_remaining} Activities Left`}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const IconWithTooltip: React.FC<IconWithToolTipProps> = ({
  IconComponent,
  popoverText,
}) => (
  <Popover>
    <PopoverTrigger asChild>
      <div
        className="flex items-center justify-center bg-neutral-50 rounded-full w-[30px] h-[30px] transition-all duration-300 
      text-black hover:bg-neutral-200"
      >
        <IconComponent className="w-[15px] h-[15px]" />
      </div>
    </PopoverTrigger>
    <PopoverContent className="w-full px-2 py-1" side="top" align="center">
      <span className="text-[12px]">{popoverText}</span>
    </PopoverContent>
  </Popover>
);

export { Filters, CampaignCards };
