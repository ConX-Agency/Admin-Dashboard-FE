import { Separator } from "@/components/ui/separator";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { useState } from "react";
import DashboardContent from "./DashboardContent";

const Dashboard = () => {

  return (
    <div className="flex flex-1">
      <div className="md:px-8 xxxs:px-4 py-5 bg-neutral-100 dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-auto overflow-visible">
        <div className="flex flex-row justify-between flex-wrap xxxs:gap-2">
          <h1 className="text-3xl font-semibold items-center">
            Dashboard
          </h1>
        </div>
        <Separator className="mt-1 mb-3" />
        <DashboardContent />
      </div>
    </div>
  );
};

export default Dashboard;