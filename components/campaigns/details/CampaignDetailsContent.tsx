"use client";

import React, { useEffect, useState } from "react";
import { AceTabs } from "../../ui/aceTabs";
import { IconBuildingStore, IconCalendarMonth, IconClock, IconCopyMinusFilled, IconMapPinFilled, IconMaximize, IconPlus, IconSpeakerphone, IconTicket, IconWorldBolt, IconWorldStar } from "@tabler/icons-react";
import Image from "next/image";
import { dummyCampaignsData } from "@/data/campaign";
import { AnimatedIconButton } from "../../ui/button";
import { Tilt } from 'react-tilt'
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

const CampaignDetailsContent = ({ name, campaignModalVisible, influencerModalVisible }:
  {
    name: string;
    campaignModalVisible?: boolean;
    influencerModalVisible?: boolean;
  }) => {

  return (
    <>
      <CampaignContent name={name} />
    </>
  );
};

const CampaignContent = ({ name }: { name: string }) => {
  const tabs = [
    {
      title: "Campaign Details",
      titleIcon: <IconCalendarMonth className="h-4 w-4 flex-shrink-0" />,
      value: "Campaign Details",
      content: <CampaignDetails name={name} />
    },
    {
      title: "Offering Information",
      titleIcon: <IconTicket className="h-4 w-4 flex-shrink-0" />,
      value: "Offering Information",
      content: <OfferingInformation name={name} />
    },
    {
      title: "Influencer Information",
      titleIcon: <IconWorldStar className="h-4 w-4 flex-shrink-0" />,
      value: "Influencer Information",
      content: <InfluencerInformation name={name} />
    },
    {
      title: "Pending Services",
      titleIcon: <IconClock className="h-4 w-4 flex-shrink-0" />,
      value: "Pending Services",
      content: <PendingServices name={name} />
    }
  ];

  return (
    <div className="h-full [perspective:1000px] relative flex flex-col mx-auto w-full items-start">
      <AceTabs tabs={tabs} />
    </div>
  );
};

const CampaignDetails = ({ name }: { name: string }) => {
  const detailsIcons = {
    Location: {
      icon: <IconMapPinFilled className="h-5 w-5 flex-shrink-0" />
    },
    Organizer: {
      icon: <IconBuildingStore className="h-5 w-5 flex-shrink-0" />
    },
    DateRange: <IconCalendarMonth className="h-5 w-5 flex-shrink-0" />,
    InfluencerLimit: <IconWorldBolt className="h-5 w-5 flex-shrink-0" />
  }

  const FilteredCampaign = dummyCampaignsData.filter((campaign) => campaign.campaign_name === name);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);

  const toggleExpand = () => {
    if (!isLargeScreen) {
      setIsExpanded(!isExpanded);
    }
  };

  useEffect(() => {
    // Ensure code only runs in the browser
    if (typeof window !== "undefined") {
      const checkScreenSize = () => {
        const isNowLargeScreen = window.innerWidth >= 992;
        setIsLargeScreen(isNowLargeScreen);
        setIsExpanded(isNowLargeScreen); // Set isExpanded based on initial screen size
      };

      checkScreenSize(); // Check screen size on initial load

      window.addEventListener("resize", checkScreenSize);
      return () => window.removeEventListener("resize", checkScreenSize);
    }
  }, []);

  return (
    <div className="w-full relative rounded-2xl xxxs:p-3 md:p-4 font-bold flex flex-col gap-3 flex-grow min-h-full
      text-black dark:text-white bg-gradient-to-br bg-neutral-50 dark:bg-neutral-800 shadow-md">
      <div className="w-full h-max bg-black rounded-md overflow-hidden relative z-[1] after:z-[2] after:hidden
        after:content-[''] after:absolute after:w-full after:h-full after:top-0 after:left-0 after:bg-black/25 group
        transition-all duration-300 hover:after:block">
        <div className="absolute bottom-3 -left-48 z-[3] transition-all duration-300 flex
          group-hover:left-3 px-2 py-1 rounded-full bg-white dark:bg-black text-sm font-light">
          Resolution: 1200 x 400
        </div>
        <div className="absolute bottom-3 -right-28 z-[3] transition-all duration-300 flex justify-center items-center
          group-hover:right-3 rounded-full px-2 py-2 bg-white/50 dark:bg-black/50 w-[35px] h-[35px] cursor-pointer 
          hover:bg-white dark:hover:bg-black font-light">
          <IconMaximize className="h-5 w-5 flex-shrink-0 text-black dark:text-white" />
        </div>
        <Image src="/images/banner-test.jpg"
          width={1200}
          height={400}
          alt="banner.jpg"
          className="h-full w-full object-cover object-center transition-all duration-300 group-hover:scale-125"
        />
      </div>
      <div className="flex xxxs:flex-col lg:flex-row w-full h-full gap-3">
        <div className="grid grid-cols-1 gap-2 xxxs:w-full lg:w-[40%] flex-grow">
          <DetailsItem
            icon={detailsIcons.Organizer.icon}
            label="Organizer"
            value={`${FilteredCampaign[0].client_id}}`}
          />
          <DetailsItem
            icon={detailsIcons.Location.icon}
            label="Location"
            value={FilteredCampaign[0].campaign_id!}
          />
          <DetailsItem
            icon={detailsIcons.DateRange}
            label="Campaign Date"
            value={`${FilteredCampaign[0].start_date} - ${FilteredCampaign[0].end_date}`}
          />
          <DetailsItem
            icon={detailsIcons.InfluencerLimit}
            label="Max Booking Pax"
            value={`${FilteredCampaign[0].max_pax} influencers`}
          />
        </div>
        <div className="flex flex-col xxxs:w-full lg:w-[60%] gap-2 flex-grow">
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-lg flex flex-row">
              Campaign Description
              <IconSpeakerphone className="ml-2" />
            </h1>
            <div className="xxxs:flex lg:hidden">
              <AnimatedIconButton
                isActive={isExpanded}
                onClick={toggleExpand}
                IconActive={IconCopyMinusFilled}
                IconInactive={IconPlus}
                className="w-[35px]"
              />
            </div>
          </div>
          <div
            className={`w-full h-full rounded-md p-3 py-2 text-sm bg-neutral-300 text-black dark:bg-black 
          dark:text-white font-light overflow-hidden leading-[1.3] transition-all duration-300 ease-in-out
          ${isExpanded ? "max-h-full" : "xxxs:max-h-[120px] xxxs:line-clamp-6 text-ellipsis"}`}
          >
            {FilteredCampaign[0].key_message}
          </div>
        </div>
      </div>
    </div>
  )
}

const DetailsItem = ({ icon, label, value }:
  {
    icon: React.ReactNode,
    label: string,
    value: string,
  }
) => (

  <div className="flex flex-row w-full gap-2 bg-neutral-300 dark:bg-black rounded-full h-[50px] px-2 py-2 items-center justify-start">
    <Popover>
      <PopoverTrigger asChild>
        <div className="bg-black dark:bg-white rounded-full h-[35px] w-[35px] flex justify-center items-center text-white dark:text-black flex-shrink-0">
          {icon}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full px-2 py-1" side="top" align="center">
        <span className="text-[12px]">{label}</span>
      </PopoverContent>
    </Popover>
    <div className="text-black dark:text-white text-sm font-light overflow-hidden max-h-[50px] line-clamp-2">
      {value}
    </div>
  </div>
);

const OfferingInformation = ({ name }: { name: string }) => {
  const [isTiltDisabled, setIsTiltDisabled] = useState<boolean>(false);
  const defaultOptions = {
    reverse: false, // reverse the tilt direction
    max: isTiltDisabled ? 0 : 25, // Disable tilt if below 992px
    perspective: isTiltDisabled ? 0 : 3000, // Set perspective to 0 to stop tilt
    scale: 1,
    speed: 1000,
    transition: true,
    axis: null,
    reset: true,
    easing: "cubic-bezier(.03,.98,.52,.99)",
  };

  useEffect(() => {
    // Ensure code only runs in the browser
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsTiltDisabled(window.innerWidth < 992); // Disable tilt for screens smaller than 992px
      };

      // Initial check on component mount
      handleResize();

      // Add resize event listener
      window.addEventListener("resize", handleResize);

      // Cleanup on unmount
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <Tilt options={defaultOptions}>
      <div className="w-full relative rounded-2xl xxxs:p-3 md:p-4 font-bold min-h-[450px] text-black dark:text-white bg-gradient-to-br
        bg-white dark:bg-neutral-950 shadow-[0px_4px_0px] shadow-[rgba(0,0,0,0.15)]">
        <div className="content-[''] absolute rounded-t-full bg-neutral-100 dark:bg-neutral-900 w-[80px] h-[40px] z-10 
          xxxs:left-[50%] xxxs:-top-1 sm:left-5 sm:top-1/2 
          translate-x-[-50%] xxxs:translate-y-[0] translate-y-[-50%] xxxs:rotate-180 sm:rotate-90"></div>
        <div className="content-[''] absolute rounded-t-full bg-neutral-100 dark:bg-neutral-900 w-[80px] h-[40px] z-10 
          xxxs:right-[50%] xxxs:-bottom-1 sm:right-5 sm:top-1/2 
          translate-x-[50%] xxxs:translate-y-[0] sm:translate-y-[-50%] xxxs:rotate-0 sm:-rotate-90"></div>
      </div>
    </Tilt>
  )
}

const InfluencerInformation = ({ name }: { name: string }) => {
  return (
    <div className="w-full overflow-hidden relative rounded-2xl xxxs:p-3 md:p-4 font-bold min-h-full
      text-black dark:text-white bg-gradient-to-br bg-neutral-50 dark:bg-neutral-950 shadow-md">
    </div>
  )
}

const PendingServices = ({ name }: { name: string }) => {
  return (
    <div className="w-full overflow-hidden relative rounded-2xl xxxs:p-3 md:p-4 font-bold min-h-full
      text-black dark:text-white bg-gradient-to-br bg-neutral-50 dark:bg-neutral-950 shadow-md">
    </div>
  )
}

export { CampaignDetailsContent };
