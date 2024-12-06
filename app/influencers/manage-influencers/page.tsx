"use client"

import ManageInfluencerContent from "@/components/influencers/ManageInfluencerContent";
import { Separator } from "@/components/ui/separator";
import React from "react";

const ManageInfluencers = () => {
  return (
    <>
      <div className="flex flex-row justify-between flex-wrap xxxs:gap-2">
        <h1 className="text-3xl font-semibold items-center">Manage Influencers</h1>
      </div>
      <Separator className="mt-0 mb-0" />
      <ManageInfluencerContent />
    </>
  );
};

export default ManageInfluencers;
