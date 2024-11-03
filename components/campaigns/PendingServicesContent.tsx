import React, { useEffect, useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import Image from 'next/image'
import { Separator } from '../ui/separator'
import { Campaign, CampaignCardsProps, dummyCampaignsData, FiltersProps, monthRanges, months } from '@/data/campaign'
import { cn, parseDate } from '@/lib/utils'
import { IconCircleCheckFilled, IconClockHour2Filled, IconCircleXFilled } from '@tabler/icons-react'
import { FilterDropdown } from './AllCampaignContent'

const PendingServicesContent = () => {
  const [filteredCampaignData, setFilteredCampaignData] = useState<Campaign[]>(dummyCampaignsData);

  // Function to update filtered campaigns
  const handleFilterChange = (filteredData: Campaign[]) => {
    setFilteredCampaignData(filteredData);
  };

  return (
    <div className='flex flex-col gap-3'>
      <PendingServicesFilter onFilterChange={handleFilterChange}/>
      <PendingServicesAccordion campaigns={filteredCampaignData} />
    </div>
  )
}

const PendingServicesFilter: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const defaultFilter = {
    status: "All",
    month: "All",
    name: ""
  };

  const [isFiltered, setIsFiltered] = useState(false);
  const [multiFilter, setMultiFilter] = useState(defaultFilter);

  const filterCampaigns = () => {
    const { status, name, month } = multiFilter;

    const filteredData = dummyCampaignsData.filter((campaign) => {
      let matchesStatus = status === "All" || campaign.status === status;
      let matchesMonth = month === "All";
      let matchesName = name === null || campaign.campaign_name.toLowerCase().includes(name.toLowerCase());
    
    // Add month logic
    if (month !== "All") {
      const { from, to } = monthRanges[month];

      const campaignStartDate = parseDate(campaign.dateRange.from);
      const campaignEndDate = parseDate(campaign.dateRange.to);

      // Log campaign details for debugging
      // console.log(`Campaign: ${campaign.campaign_name}, Status: ${matchesStatus}, Start Date: ${campaignStartDate}, End Date: ${campaignEndDate}, Month: ${month}, From: ${from}, To: ${to}`);

      // Check if the campaign's date falls within the month range
      matchesMonth =
        (campaignStartDate >= from && campaignStartDate <= to) || // Campaign starts in the month of?
        (campaignEndDate >= from && campaignEndDate <= to) ||     // Campaign ends in the month of?
        (campaignStartDate < from && campaignEndDate > to);      // Campaign spans the month
    }

      return matchesStatus && matchesMonth && matchesName;
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
      multiFilter.name === defaultFilter.name &&
      multiFilter.month === defaultFilter.month
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
    <div>
      <FilterDropdown
        label='Month'
        items={months}
        value={multiFilter.month}
        onValueChange={(value) => handleFilterChange("month", value)}
        minWidth="min-w-[115px]"
      />
    </div>
  )
}

const PendingServicesAccordion: React.FC<CampaignCardsProps> = ({ campaigns }) => {
  console.log(campaigns);

  const platformIcons = {
    Instagram: {
      src: "/images/logo/instagram.svg",
      width: 35,
      height: 35,
      alt: 'instagram.svg',
      className: 'invert-0',
      containerClassName: 'bg-white dark:bg-black'
    },
    TikTok: {
      src: "/images/logo/tiktok.svg",
      width: 25,
      height: 25,
      alt: 'tiktok.svg',
      className: 'invert-0 dark:invert',
      containerClassName: 'bg-white dark:bg-black'
    },
    "Google Review": {
      src: "/images/logo/google.svg",
      width: 35,
      height: 35,
      alt: 'google.svg',
      className: '',
      containerClassName: 'bg-white dark:bg-black'
    },
    RED: {
      src: "/images/logo/red.svg",
      width: 35,
      height: 35,
      alt: 'red.svg',
      className: 'invert-0',
      containerClassName: 'bg-white rounded-[9px]'
    },
  };

  const statusIcons = {
    Active: <IconClockHour2Filled className="w-[20px] h-[20px] text-yellow-500" />,
    Completed: <IconCircleCheckFilled className="w-[20px] h-[20px] text-green-500 dark:text-green-500" />,
    Cancelled: <IconCircleXFilled className="w-[20px] h-[20px] text-red-500 dark:text-red-500" />
  };

  return (
    <div>
    <Accordion type="single" collapsible>
      {campaigns.map(campaign => (
        <AccordionItem key={campaign.id} value={`item-${campaign.id}`}>
          <AccordionTrigger>
            <span className='text-xl font-bold xxxs:text-[16px] xxs:text-[18px] xs:text-[20px]'>
              {campaign.campaign_name}
            </span>
          </AccordionTrigger>
          <AccordionContent>
          {Array.from(new Set(campaign.services.map(service => service.platform))).map(platform => {
            // Filter services by platform and group by influencers for that platform
            const platformServices = campaign.services.filter(service => service.platform === platform);

            return (
              <div key={platform}>
                <div className="mt-3 flex flex-row w-full gap-3 items-center">
                  <div className="w-[60px] h-[60px] flex justify-center items-center bg-white dark:bg-neutral-950 rounded-full flex-shrink-0">
                    <div className={cn("w-max h-max rounded-full", platformIcons[platform]?.containerClassName || "")}>
                      <Image
                        src={platformIcons[platform]?.src || "/images/logo/default.svg"}
                        width={platformIcons[platform]?.width || 35}
                        height={platformIcons[platform]?.height || 35}
                        alt={platformIcons[platform]?.alt || "default"}
                        className={platformIcons[platform]?.className || ""}
                      />
                    </div>
                  </div>
                  <div className="flex justify-start flex-row w-full flex-wrap gap-2">
                    {platformServices.map(service => (
                      <div key={`${service.assigned_influencer}-${service.platform}`} className="rounded-xl bg-neutral-200 dark:bg-neutral-600 h-[35px] px-4 flex justify-center items-center tracking-[.7px] gap-1">
                        {service.assigned_influencer}
                        {statusIcons[service.status]} {/* Render icon based on status */}
                      </div>
                    ))}
                  </div>
                </div>
                <Separator className="mt-3 mb-3 px-3 mx-auto border-neutral-400 dark:border-neutral-600" />
              </div>
            );
          })}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
  )
}

export default PendingServicesContent