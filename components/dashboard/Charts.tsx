"use client"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  SalesAnalyticsChartConfigs,
  CampaignsChartConfigs,
  SalesAnalyticsChartData,
  CampaignsChartData,
} from "@/data/chart";
import React from "react";
import {
  CartesianGrid,
  XAxis,
  BarChart,
  Bar,
  Pie,
  PieChart,
} from "recharts";

const SalesAnalyticsChart = () => {
  return (
    <div className="bg-neutral-50 dark:bg-neutral-800 xxxs:h-[250px] xs:h-[300px] xxxs:w-[100%] 
        chartCard p-4 rounded-md items-center justify-center flex drop-shadow-md flex-grow">
      <ChartContainer config={SalesAnalyticsChartConfigs} className="w-full">
        <BarChart accessibilityLayer data={SalesAnalyticsChartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar
            dataKey="desktop"
            stackId="a"
            fill="var(--color-desktop)"
            radius={[0, 0, 4, 4]}
          />
          <Bar
            dataKey="mobile"
            stackId="a"
            fill="var(--color-mobile)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

const CampaignsChart = () => {
  return (
    <div className="bg-neutral-50 dark:bg-neutral-800 xxxs:h-[250px] xs:h-[300px] xxxs:w-[100%] 
        chartCard p-4 rounded-md items-center justify-center flex drop-shadow-md flex-grow">
      <ChartContainer
        config={CampaignsChartConfigs}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={CampaignsChartData}
            dataKey="visitors"
            nameKey="browser"
            stroke="0"
          />
          <ChartLegend
            content={<ChartLegendContent nameKey="browser" />}
            className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
          />
        </PieChart>
      </ChartContainer>
    </div>
  );
};

export { SalesAnalyticsChart, CampaignsChart };
