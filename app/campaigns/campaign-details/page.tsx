"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { CampaignDetailsContent } from "@/components/campaigns/CampaignDetailsContent";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { IconCalendarCog, IconWorldPlus } from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

const CampaignDetailsWrapper = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');

  return (
    <ProtectedRoute>
      {name ? (
        <>
          <div className="flex flex-row justify-between flex-wrap xxxs:gap-2">
            <h1 className="text-3xl font-semibold items-center">{name}</h1>
            <div className="flex flex-row gap-2">
              <Button variant={'outline'} className="w-[35px] p-0">
                <IconCalendarCog className="text-black dark:text-white flex-shrink-0" />
              </Button>
              <Button variant={'outline'} className="w-[35px] p-0">
                <IconWorldPlus className="text-black dark:text-white flex-shrink-0" />
              </Button>
            </div>
          </div>
          <Separator className="mt-0 mb-2" />
          <CampaignDetailsContent name={name} />
        </>
      ) : (
        <div className="text-gray-500">No campaign details available.</div>
      )}
    </ProtectedRoute>
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
