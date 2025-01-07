import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ManageCampaignContent from "@/components/campaigns/ManageCampaignContent";
import { Separator } from "@/components/ui/separator";
import React from "react";

const ManageAllCampaigns = () => {

  return (
    <ProtectedRoute>
      <div className="flex flex-row justify-between flex-wrap xxxs:gap-2">
        <h1 className="text-3xl font-semibold items-center">Manage All Campaigns</h1>
      </div>
      <Separator className="mt-0 mb-0" />
      <ManageCampaignContent />
    </ProtectedRoute>
  );
};

export default ManageAllCampaigns;
