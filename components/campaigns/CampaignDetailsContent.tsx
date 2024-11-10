import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";
import { AceTabs } from "../ui/aceTabs";

const CampaignDetailsContent = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  return (
    <>
      <CampaignDetailsMobile />
      <CampaignDetailsDesktop />
    </>
  );
};

const CampaignDetailsDesktop = () => {
  const tabs = [
    {
      title: "Campaign Details",
      value: "Campaign Details",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-black dark:text-white bg-gradient-to-br bg-neutral-200 dark:bg-neutral-950">
          <p>Campaign Details</p>
        </div>
      ),
    },
    {
      title: "Influencer Involved",
      value: "Influencer Involved",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-black dark:text-white bg-gradient-to-br bg-neutral-200 dark:bg-neutral-950">
          <p>Influencer Involved</p>
        </div>
      ),
    },
    {
      title: "Pending Services",
      value: "Pending Services",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-black dark:text-white bg-gradient-to-br bg-neutral-200 dark:bg-neutral-950">
          <p>Pending Services</p>
        </div>
      ),
    }
  ];

  return (
    <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col mx-auto w-full  items-start justify-start">
      <AceTabs tabs={tabs} />
    </div>
  );
};

const CampaignDetailsMobile = () => {
  return (
    <div className="xxxs:flex lg:hidden">
      test
      <div>test</div>
    </div>
  );
};

export { CampaignDetailsContent };
