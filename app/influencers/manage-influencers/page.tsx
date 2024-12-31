import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ManageInfluencerContent from "@/components/influencers/ManageInfluencerContent";
import { Separator } from "@/components/ui/separator";
import React from "react";

const ManageInfluencers = () => {
  return (
    <ProtectedRoute>
      <div className="flex flex-row justify-between flex-wrap xxxs:gap-2">
        <h1 className="text-3xl font-semibold items-center">Manage Influencers</h1>
      </div>
      <Separator className="mt-0 mb-0" />
      <ManageInfluencerContent />
    </ProtectedRoute>
  );
};

export default ManageInfluencers;
