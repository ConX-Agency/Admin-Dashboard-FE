import { CampaignCards, Filters } from "@/components/campaigns/AllCampaignContent";
import { Separator } from "@/components/ui/separator";
import React from "react";

const AllCampaigns = () => {
  return (
    <>
      <div className="flex flex-row justify-between flex-wrap xxxs:gap-2">
        <h1 className="text-3xl font-semibold items-center">All Campaigns</h1>
      </div>
      <Separator className="mt-0 mb-3" />
      <Filters />
      <CampaignCards />
    </>
  );
};

export default AllCampaigns;
