"use client"

import React, { useEffect, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import Image from 'next/image';
import { Separator } from '../ui/separator';
import { Campaign, CampaignCardsProps, dummyCampaignsData, FiltersProps, monthRanges, months, Services } from '@/data/campaign';
import { cn, parseDate } from '@/lib/utils';
import { IconCircleCheckFilled, IconClockHour2Filled, IconCircleXFilled, IconSearch, IconArrowUpRight, IconMoodEmpty } from '@tabler/icons-react';
import { Filter, FilterX, PencilIcon, PencilOffIcon, SaveIcon } from 'lucide-react';
import { AnimatedIconButton, Button } from '../ui/button';
import { FilterDropdown } from '../ui/filterDropdown';

const PendingServicesContent = () => {
  const [filteredCampaignData, setFilteredCampaignData] = useState<Campaign[]>(dummyCampaignsData);
  const [originalCampaignData, setOriginalCampaignData] = useState<Campaign[]>(dummyCampaignsData);
  const [isEditable, setIsEditable] = useState(false);

  // Function to update filtered campaigns
  const handleFilterChange = (filteredData: Campaign[]) => {
    setFilteredCampaignData(filteredData);
  };

  // Toggle edit mode
  const toggleEdit = () => setIsEditable(prev => !prev);

  const resetChanges = () => {
    setFilteredCampaignData(originalCampaignData);
    setIsEditable(false);
  };

  const saveChanges = () => {
    setOriginalCampaignData(filteredCampaignData);
    setIsEditable(false);
  };

  const toggleStatus = (campaignId: string, serviceId: string) => {
    setFilteredCampaignData((prevData) =>
      prevData.map((campaign) => {
        if (campaign.id === campaignId) {
          const updatedServices = campaign.services.map((service: any) => {
            if (service.id === serviceId) {
              const newStatus =
                service.status === "Completed"
                  ? "Active"
                  : service.status === "Active"
                  ? "Cancelled"
                  : "Completed";
              return { ...service, status: newStatus };
            }
            return service;
          });
          return { ...campaign, services: updatedServices };
        }
        return campaign;
      })
    );
  };

  return (
    <div className='flex flex-col gap-3'>
      <PendingServicesFilter 
        onFilterChange={handleFilterChange} 
        isEditable={isEditable} 
        toggleEdit={toggleEdit} 
        resetChanges={resetChanges} 
        saveChanges={saveChanges}   
      />
      <PendingServicesAccordion 
        campaigns={filteredCampaignData} 
        isEditable={isEditable} 
        onStatusToggle={toggleStatus} 
      />
    </div>
  );
}

const PendingServicesFilter: React.FC<FiltersProps & {
  isEditable: boolean;
  toggleEdit: () => void;
  resetChanges: () => void;
  saveChanges: () => void;
}> = ({ onFilterChange, isEditable, toggleEdit, resetChanges, saveChanges }) => {
  const defaultFilter = {
    month: "All",
    name: ""
  };

  const [isFiltered, setIsFiltered] = useState(false);
  const [multiFilter, setMultiFilter] = useState(defaultFilter);

  const filterCampaigns = () => {
    const { name, month } = multiFilter;
    const filteredData = dummyCampaignsData.filter((campaign) => {
      let matchesMonth = month === "All";
      let matchesName = name === null || campaign.campaign_name.toLowerCase().includes(name.toLowerCase());

      if (month !== "All") {
        const { from, to } = monthRanges[month];
        const campaignStartDate = parseDate(campaign.dateRange.from);
        const campaignEndDate = parseDate(campaign.dateRange.to);

        matchesMonth =
          (campaignStartDate >= from && campaignStartDate <= to) ||
          (campaignEndDate >= from && campaignEndDate <= to) ||
          (campaignStartDate < from && campaignEndDate > to);
      }

      return matchesMonth && matchesName;
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

  const isDefaultFilter = () => (
    multiFilter.name === defaultFilter.name &&
    multiFilter.month === defaultFilter.month
  );

  useEffect(() => {
    if (isDefaultFilter()) {
      onFilterChange(dummyCampaignsData);
      setIsFiltered(false);
    } else {
      filterCampaigns();
      setIsFiltered(true);
    }
  }, [multiFilter]);

  return (
    <div className='flex flex-row gap-1 flex-wrap'>
      <AnimatedIconButton
        isActive={isFiltered}
        onClick={isFiltered ? unfilterCampaigns : undefined}
        IconActive={FilterX} 
        IconInactive={Filter}
        variant={isFiltered ? "outline" : "ghost"}
        className="max-h-[40px] h-full w-[40px] p-2 flex justify-center items-center"
      />

      <div className="flex items-center border border-neutral-200 dark:border-muted rounded-md w-[230px] shadow-sm bg-white dark:bg-neutral-950">
        <span className="pl-2">
          <IconSearch className="h-4 w-4 text-neutral-400" />
        </span>
        <input
          className="flex-1 border-0 focus-visible:outline-none px-2 py-2 text-[14px] rounded-md placeholder-neutral-400 text-neutral-950 dark:text-neutral-100 bg-white dark:bg-neutral-950"
          value={multiFilter.name}
          placeholder='Campaign Name Filter'
          onChange={(event) => handleFilterChange("name", event.target.value)}
        />
      </div>

      <FilterDropdown
        label='Month'
        items={months}
        value={multiFilter.month}
        onValueChange={(value: any) => handleFilterChange("month", value)}
        minWidth="min-w-[115px]"
      />

      <AnimatedIconButton
        isActive={isEditable}
        onClick={isEditable ? resetChanges : toggleEdit}
        IconActive={PencilOffIcon} 
        IconInactive={PencilIcon} 
        variant="outline"
        className="max-h-[40px] h-full p-2 flex justify-center items-center cursor-pointer px-3"
      />

      {isEditable && (
        <Button className='px-3 h-full flex justify-center items-center bg-neutral-950 dark:bg-neutral-50 text-neutral-50 
          dark:text-neutral-950 hover:bg-neutral-950/90 hover:text-neutral-50/90 dark:hover:bg-neutral-50/90
          dark:hover:text-neutral-950/90' 
          variant="outline" 
          onClick={saveChanges}>
          <SaveIcon className='h-5 w-5' />
        </Button>
      )}
    </div>
  );
}

const PendingServicesAccordion: React.FC<
  CampaignCardsProps & { 
  isEditable: boolean; 
  onStatusToggle: (campaignId: string, serviceId: string) => void 
}> = ({ 
  campaigns, 
  isEditable, 
  onStatusToggle 
}) => {
  return (
    <div>
      <Accordion type="single" collapsible>
        {campaigns.length === 0 ? (
          <div className="flex items-center justify-center w-full h-full flex-col text-center">
            <IconMoodEmpty className='mb-2 w-[256px] h-[256px]' />
            <span className="text-3xl font-bold mb-2">Hmm... Something's Wrong Here.</span>
            <span className="text-lg italic">No Pending Services were Found.</span>
          </div>
        ) : (
          campaigns.map(campaign => (
            <AccordionItem key={campaign.id} value={`item-${campaign.id}`}>
              <AccordionTrigger>
                <span className='font-bold xxxs:text-[13px] xs:text-[16px] flex gap-1 items-center group text-neutral-950 hover:text-neutral-950/50 
                  dark:text-neutral-100 dark:hover:text-neutral-100/50 transition-all duration-200'>
                  {campaign.campaign_name}
                  <IconArrowUpRight className='h-full w-auto rotate-0 group-hover:rotate-45 duration-200 transition-all' />
                </span>
              </AccordionTrigger>
              <AccordionContent>
              {Array.from(new Set(campaign.services.map(service => service.platform))).map(platform => {
                  // Filter services by platform and group by influencers for that platform
                  const platformServices = campaign.services.filter(service => service.platform === platform);

                  return (
                    <div key={platform}>
                      <div className="mt-3 flex flex-row w-full gap-3 items-center">
                        <div className="w-[60px] h-[60px] flex justify-center items-center bg-white dark:bg-neutral-950 
                          rounded-full flex-shrink-0">
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
                        <div className="flex justify-start flex-row w-full flex-wrap gap-2 xxxs:text-[12px]">
                          {platformServices.map((service, index) => (
                            <div key={`${service.assigned_influencer}-${service.platform}`} 
                              className={cn(`rounded-xl bg-neutral-200 dark:bg-neutral-600 h-[35px] px-4 flex 
                                justify-center items-center tracking-[.7px] gap-1 shadow-md hover:opacity-90 
                                transition-all duration-300`,
                                isEditable ? 'hover:-translate-y-1 cursor-pointer' : 'cursor-default'
                              )}
                              onClick={() => isEditable && onStatusToggle(campaign.id, service.id)}>
                              {service.assigned_influencer}
                              {statusIcons[service.status]}
                            </div>
                          ))}
                        </div>
                      </div>
                      <Separator className="mt-3 mb-3 px-3 mx-auto border-[1px] border-neutral-200 dark:border-neutral-600" />
                    </div>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          ))
        )}
      </Accordion>
    </div>
  );
}

const basePath = process.env.NODE_ENV === 'production' ? '/Admin-Dashboard-FE' : '';
const platformIcons = {
  Instagram: {
    src: `${basePath}/images/logo/instagram.svg`,
    width: 35,
    height: 35,
    alt: 'instagram.svg',
    className: 'invert-0',
    containerClassName: 'bg-white dark:bg-black'
  },
  TikTok: {
    src: `${basePath}/images/logo/tiktok.svg`,
    width: 25,
    height: 25,
    alt: 'tiktok.svg',
    className: 'invert-0 dark:invert',
    containerClassName: 'bg-white dark:bg-black'
  },
  "Google Review": {
    src: `${basePath}/images/logo/google.svg`,
    width: 35,
    height: 35,
    alt: 'google.svg',
    className: '',
    containerClassName: 'bg-white dark:bg-black'
  },
  RED: {
    src: `${basePath}/images/logo/red.svg`,
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

export default PendingServicesContent;
