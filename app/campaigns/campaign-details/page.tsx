"use client"

import { CampaignDetailsContent } from "@/components/campaigns/CampaignDetailsContent";
import { Separator } from "@/components/ui/separator";
import { useSearchParams } from "next/navigation";
import React from "react";

const CampaignDetails = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');

  return (
    <>
      <div className="flex flex-row justify-between flex-wrap xxxs:gap-2">
        <h1 className="text-3xl font-semibold items-center">{name}</h1>
      </div>
      <Separator className="mt-0 mb-0" />
      <CampaignDetailsContent />
    </>
  );
};

export default CampaignDetails;
