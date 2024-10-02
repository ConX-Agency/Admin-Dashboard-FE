import { Separator } from "@/components/ui/separator";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import DashboardGridLayout from "./GridLayout";
import { dashboardChartTypeFilters, FilterType, TabKey } from "@/data/dashboard";
import { useState } from "react";
import { IconCalendarStar, IconCoin, IconMessageCircle, IconUserStar, IconWorld, IconWorldStar } from "@tabler/icons-react";

const Dashboard = () => {
  const [tab, setTab] = useState<TabKey>(TabKey.All);
  const [selectedFilter, setSelectedFilter] = useState<FilterType | undefined>(undefined);

  const handleFilterChange = (
    filter: FilterType | undefined,
  ) => {
    if (filter) {
      setTab(filter.key);
    } else {
      setTab(TabKey.All);
    }
    setSelectedFilter(filter);
  };

  return (
    <div className="flex flex-1">
      <div className="lg:px-8 lg:py-5 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-auto overflow-visible">
        <div className="flex flex-row justify-between">
          <h1 className="text-3xl font-semibold items-center">
            Dashboard
          </h1>
          <div>
            <ToggleGroup
              variant="outline"
              type="single"
              value={selectedFilter ? selectedFilter.key : undefined}
              onValueChange={(value) => {
                const selected = dashboardChartTypeFilters.find(filter => filter.key === value);  // Find the filter based on key
                handleFilterChange(selected);  // Pass the entire filter object to the handler
              }}
            >
              {dashboardChartTypeFilters.map((filter, filterId) => (
                <div key={filterId}>
                  <ToggleGroupItem value={filter.key} aria-label={filter.label}>
                    {filter.icon}
                  </ToggleGroupItem>
                </div>
              ))}
            </ToggleGroup>
          </div>
        </div>
        <Separator className="mt-1 mb-1" />
        <DashboardGridLayout tab={tab} setTab={setTab} />
      </div>
    </div>
  );
};

export default Dashboard;