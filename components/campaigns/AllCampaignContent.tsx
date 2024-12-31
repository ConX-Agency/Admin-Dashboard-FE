"use client"

import { Campaign, CampaignCardsProps, dummyCampaignsData, dummyCountries, FiltersProps, IconWithToolTipProps, status, types } from "@/data/campaign";
import { Calendar as LucideCalendar, ChevronDown, Clock, Filter, FilterX, Globe, MapPinned } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { AnimatedIconButton, Button } from "../ui/button";
import { cn, parseDate } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar"
import { DateRange } from "react-day-picker";
import { useRouter } from 'next/navigation';
import { IconMoodEmpty } from "@tabler/icons-react";
import Image from "next/image";
import { FilterDropdown } from "../ui/filterDropdown";

const AllCampaignContent = () => {
  const [filteredCampaignData, setFilteredCampaignData] = useState<Campaign[]>(dummyCampaignsData);

  // Function to update filtered campaigns
  const handleFilterChange = (filteredData: Campaign[]) => {
    setFilteredCampaignData(filteredData);
  };

  return (
    <>
      <Filters onFilterChange={handleFilterChange} />
      <CampaignCards campaigns={filteredCampaignData} />
    </>
  )
}

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
    <div className="flex flex-row flex-wrap justify-start w-full gap-1 mb-1">
      <AnimatedIconButton
        isActive={isFiltered}
        onClick={isFiltered ? unfilterCampaigns : undefined}
        IconActive={FilterX} 
        IconInactive={Filter}
        variant={isFiltered ? "outline" : "ghost"}
        className="max-h-[40px] h-full w-[40px] p-2 flex justify-center items-center"
      />

      {/* Filter Status */}
      <FilterDropdown
        label="Status"
        items={status}
        value={multiFilter.status}
        onValueChange={(value) => handleFilterChange("status", value)}
        minWidth="min-w-[105px]"
      />

      {/* Filter Location */}
      <FilterDropdown
        label="Location"
        items={dummyCountries}
        value={multiFilter.location}
        onValueChange={(value) => handleFilterChange("location", value)}
        minWidth="min-w-[126px]"
      />

      {/* Filter Type */}
      <FilterDropdown
        label="Type"
        items={types}
        value={multiFilter.type}
        onValueChange={(value) => handleFilterChange("type", value)}
        minWidth="min-w-[115px]"
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

const CampaignCards: React.FC<CampaignCardsProps> = ({ campaigns }) => {
  const scrollRefs = useRef<(HTMLDivElement | null)[]>([]); // Store refs in an array
  const router = useRouter();

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
    router.push(`/campaigns/campaign-details?name=${campaign}`);
  }

  return (
    <div className="grid xxxs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xxl:grid-cols-3 gap-3">
      {campaigns.length === 0 ? ( // Check if campaigns array is empty
        <div className="col-span-full flex items-center justify-center w-full h-full flex-col text-center">
          <IconMoodEmpty className='mb-2 w-[256px] h-[256px]'/>
          <span className="text-3xl font-bold mb-2">Hmm... Something's Wrong Here.</span>
          <span className="text-lg italic">No Campaigns were Found.</span>
        </div>
      ) : (
        campaigns.map((data, idx) => (
          <div
            className="shadow-md rounded-md cursor-pointer group bg-neutral-50 hover:bg-neutral-200/25 dark:bg-neutral-800 
            dark:hover:bg-neutral-700 transition-all duration-300 relative max-h-[300px] z-[1] after:content-[''] overflow-hidden
            after:absolute after:top-0 after:left-0 after:bg-neutral-950/70 after:h-full after:w-full after:rounded-md after:z-[-1]"
            key={data.id}
          >
            <Image src={data.campaign_image} width={200} height={100} alt="bg.jpg" 
              className="absolute top-0 left-0 z-[-1] object-cover w-full h-full rounded-md group-hover:scale-125 duration-500
                transition-all"/>
            <div className="pt-3 px-3 w-full text-ellipsis text-nowrap overflow-hidden">
              <span
                className="font-semibold text-[17px] text-neutral-50 tracking-[0.5px] hover:text-neutral-50/75
                transition-all duration-300 dark:text-white dark:hover:text-white/75"
                title={data.campaign_name}
                onClick={() => directToCampaign(data.campaign_name)}
              >
                {data.campaign_name}
              </span>
              <div className="w-full">
                <span className="text-[12px] text-neutral-300/75">{data.organizer}</span>
              </div>
            </div>
            {/* Tags */}
            <div
              className="mt-6 flex flex-row flex-nowrap w-full px-3 gap-2 overflow-x-scroll scroll-smooth scrollbar-hide cursor-default"
              ref={(el) => {
                scrollRefs.current[idx] = el;
              }}
              onWheel={(e) => handleWheel(e, idx)}
            >
              <div
                className={cn(
                  "rounded-3xl px-2 py-[2px] text-black dark:text-white text-[13px] text-nowrap font-bold tracking-[0.5px]",
                  data.status === "Active" && "bg-yellow-400 dark:bg-yellow-600",
                  data.status === "Cancelled" && "bg-red-400 dark:bg-red-500",
                  data.status === "Completed" && "bg-green-400 dark:bg-green-500"
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
            <div className="mt-4 bg-white dark:bg-black p-2 px-3 rounded-b-md w-full flex flex-row items-center justify-between gap-2 flex-wrap-reverse">
              <div className="flex flex-col justify-center">
                <span className="text-[11px] text-neutral-500 dark:text-neutral-200 font-semibold tracking-[.3px]">
                  Due Date
                </span>
                <span className="text-[14px] text-neutral-950 dark:text-neutral-50">
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
                  popoverText={`${data.services.length} Activities Left`}
                />
              </div>
            </div>
          </div>
        ))
      )}
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
        className="flex items-center justify-center bg-neutral-950 dark:bg-neutral-50 rounded-full w-[30px] h-[30px] transition-all duration-300 
      text-black hover:bg-neutral-200"
      >
        <IconComponent className="w-[15px] h-[15px] text-neutral-50 dark:text-neutral-950" />
      </div>
    </PopoverTrigger>
    <PopoverContent className="w-full px-2 py-1" side="top" align="center">
      <span className="text-[12px]">{popoverText}</span>
    </PopoverContent>
  </Popover>
);

export { AllCampaignContent };
