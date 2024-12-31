import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { SalesAnalyticsChart, CampaignsChart } from "@/components/dashboard/Charts";
import { RecentCompletedCampaigns, RecentOrders, StatsCard, TopInfluencers } from "@/components/dashboard/DashboardContent";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <ProtectedRoute>
      <div className="flex flex-row justify-between flex-wrap xxxs:gap-2">
        <h1 className="text-3xl font-semibold items-center">Dashboard</h1>
      </div>
      <Separator className="mt-0 mb-3" />
      <div className="flex xl:flex-row xxxs:flex-col xxxs:gap-3 xl:gap-4 xxl:gap-5">
        {/* Left-Hand-Container */}
        <div className="lhc flex flex-col xxxs:w-[100%] xl:w-[70%] xxl:w-[75%] xxxs:gap-3 xs:gap-2 xl:gap-3">
          {/* Cards' Container */}
          <div className="flex flex-row w-full flex-wrap xxxs:gap-3 xs:gap-2 xl:gap-3">
            {/* Cards */}
            <StatsCard />
          </div>
          <div className="flex flex-row w-full flex-wrap xxxs:gap-3 xs:gap-2 xl:gap-3">
            <SalesAnalyticsChart />
            <CampaignsChart />
            <RecentOrders />
          </div>
          <div className="flex flex-col w-full"></div>
        </div>
        {/* Right-Hand-Container */}
        <div className="rhc flex flex-col xxxs:w-[100%] xl:w-[30%] xxl:w-[25%] h-max xxxs:gap-3 xs:gap-2 xl:gap-3">
          <RecentCompletedCampaigns />
          <TopInfluencers />
        </div>
      </div>
    </ProtectedRoute>
  );
}
