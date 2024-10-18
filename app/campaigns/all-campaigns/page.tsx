"use client"

import { CampaignCards, Filters } from "@/components/campaigns/AllCampaignContent";
import { Separator } from "@/components/ui/separator";
import { Campaign, dummyCampaignsData } from "@/data/campaign";
import React, { useState } from "react";

const AllCampaigns = () => {
  const [filteredCampaignData, setFilteredCampaignData] = useState<Campaign[]>(dummyCampaignsData);

  // Function to update filtered campaigns
  const handleFilterChange = (filteredData: Campaign[]) => {
    setFilteredCampaignData(filteredData);
  };

  return (
    <>
      <div className="flex flex-row justify-between flex-wrap xxxs:gap-2">
        <h1 className="text-3xl font-semibold items-center">All Campaigns</h1>
      </div>
      <Separator className="mt-0 mb-0" />
      <Filters onFilterChange={handleFilterChange} />
      <CampaignCards campaigns={filteredCampaignData} />
    </>
  );
};

export default AllCampaigns;
