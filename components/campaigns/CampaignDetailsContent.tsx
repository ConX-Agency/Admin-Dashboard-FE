import React from "react";
import { AceTabs } from "../ui/aceTabs";
import { IconCalendarClock, IconCalendarMonth, IconTicket, IconWorldStar } from "@tabler/icons-react";
import Image from "next/image";

const CampaignDetailsContent = () => {

  return (
    <>
      <CampaignContent />
    </>
  );
};

const CampaignContent = () => {
  const tabs = [
    {
      title: "Campaign Details",
      titleIcon: <IconCalendarMonth className="h-4 w-4 flex-shrink-0" />,
      value: "Campaign Details",
      content: <CampaignDetails />
    },
    {
      title: "Offering Information",
      titleIcon: <IconTicket className="h-4 w-4 flex-shrink-0" />,
      value: "Offering Information",
      content: <OfferingInformation />
    },
    {
      title: "Influencer Information",
      titleIcon: <IconWorldStar className="h-4 w-4 flex-shrink-0" />,
      value: "Influencer Information",
      content: <InfluencerInformation />
    },
    {
      title: "Pending Services",
      titleIcon: <IconCalendarClock className="h-4 w-4 flex-shrink-0" />,
      value: "Pending Services",
      content: <PendingServices />
    }
  ];

  return (
    <div className="min-h-[40rem] h-full [perspective:1000px] relative b flex flex-col mx-auto w-full  items-start justify-start">
      <AceTabs tabs={tabs} />
    </div>
  );
};

const CampaignDetails = () => {
  const basePath = process.env.NODE_ENV === 'production' ? '/Admin-Dashboard-FE' : '';

  return (
    <div className="w-full overflow-hidden relative h-full rounded-2xl p-5 font-bold flex flex-col gap-3
      text-black dark:text-white bg-gradient-to-br bg-neutral-50 dark:bg-neutral-950 shadow-md">
      <div className="w-full h-[400px] bg-black rounded-md overflow-hidden">
        <Image src={`${basePath}/images/banner-test.jpg`}
          width={1166} 
          height={200} 
          alt="banner.jpg" 
          className="h-full w-full object-cover object-center transition-all duration-300 hover:scale-125"
        />
      </div>
      <div className="flex flex-row w-full h-full gap-3">
        <div className="flex flex-col w-[30%] bg-blue-100 flex-grow">

        </div>
        <div className="flex flex-col w-[70%] bg-black flex-grow">
          test
        </div>
      </div>
    </div>
  )
}

const OfferingInformation = () => {
  return (
    <div className="w-full overflow-hidden relative h-full rounded-2xl p-5 font-bold 
      text-black dark:text-white bg-gradient-to-br bg-neutral-50 dark:bg-neutral-950 shadow-md">
    </div>
  )
}

const InfluencerInformation = () => {
  return (
    <div className="w-full overflow-hidden relative h-full rounded-2xl p-5 font-bold 
      text-black dark:text-white bg-gradient-to-br bg-neutral-50 dark:bg-neutral-950 shadow-md">
    </div>
  )
}

const PendingServices = () => {
  return (
    <div className="w-full overflow-hidden relative h-full rounded-2xl p-5 font-bold 
      text-black dark:text-white bg-gradient-to-br bg-neutral-50 dark:bg-neutral-950 shadow-md">
    </div>
  )
}

export { CampaignDetailsContent };
