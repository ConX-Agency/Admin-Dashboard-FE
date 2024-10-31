import { useSearchParams } from "next/navigation";
import React from "react";

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
  return (
    <div className="flex flex-row gap-4 xxxs:hidden lg:flex w-full">
      <div className="flex flex-col w-[70%] gap-4">
        {/* Campaign Details Card */}
        <div className="flex-grow bg-neutral-800 p-3 rounded-md">
          <h1 className="text-xl font-bold tracking-[0.5px]">Campaign Details</h1>
        </div>
        {/* Influencer Details List */}
        <div className="flex-grow">
          test
        </div>
      </div>
      {/* Activities Log */}
      <div className="flex w-[30%]">
        test
      </div>
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
