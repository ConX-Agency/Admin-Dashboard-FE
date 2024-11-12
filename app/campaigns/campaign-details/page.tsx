"use client";

import { CampaignDetailsContent } from "@/components/campaigns/CampaignDetailsContent";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

const CampaignDetailsWrapper = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');

  return (
    <>
      {name ? (
        <>
          <div className="flex flex-row justify-between flex-wrap xxxs:gap-2">
            <h1 className="text-3xl font-semibold items-center">{name}</h1>
            <div className="flex flex-row gap-2">
              <Button>
                test
              </Button>
              <Button>
                test
              </Button>
            </div>
          </div>
          <Separator className="mt-0 mb-2" />
          <CampaignDetailsContent />
        </>
      ) : (
        <div className="text-gray-500">No campaign details available.</div>
      )}
    </>
  );
};

const CampaignDetails = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CampaignDetailsWrapper />
    </Suspense>
  );
};

export default CampaignDetails;
