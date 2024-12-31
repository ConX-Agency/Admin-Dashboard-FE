import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { AllCampaignContent } from "@/components/campaigns/AllCampaignContent";
import { Separator } from "@/components/ui/separator";
import React from "react";

const AllCampaigns = () => {

  return (
    <ProtectedRoute>
      <div className="flex flex-row justify-between flex-wrap xxxs:gap-2">
        <h1 className="text-3xl font-semibold items-center">All Campaigns</h1>
      </div>
      <Separator className="mt-0 mb-0" />
      <AllCampaignContent />
    </ProtectedRoute>
  );
};

export default AllCampaigns;
