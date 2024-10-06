import DashboardContent from "@/components/dashboard/DashboardContent";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Separator } from "@radix-ui/react-separator";

export default function Home() {
  return (
    <main className="bg-bg-light dark:bg-bg-dark h-full w-full">
      <div className="flex flex-col w-full">
        <DashboardHeader />
        <div className="flex flex-1 xxxs:pt-[68px] lg:pt-0">
          <div className="md:px-8 xxxs:px-4 py-5 bg-neutral-100 dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-auto overflow-visible">
            <div className="flex flex-row justify-between flex-wrap xxxs:gap-2">
              <h1 className="text-3xl font-semibold items-center">Dashboard</h1>
            </div>
            <Separator className="mt-1 mb-3" />
            <DashboardContent />
          </div>
        </div>
      </div>
    </main>
  );
}
