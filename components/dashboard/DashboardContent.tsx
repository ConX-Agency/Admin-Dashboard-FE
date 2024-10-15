"use client";

import { dummyDashboardCardData, dummyLastCompletedData, dummyTopInfluencerData } from "@/data/dashboard";
import { IconArrowDownRight, IconArrowUpRight, IconSpeakerphone } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";
import { CampaignsChart, SalesAnalyticsChart } from "./Charts";
import { calculateChanges } from "@/lib/calculateChanges";
import { MapPin } from "lucide-react";
import { DashboardTable } from "./DashboardTable";
import { Separator } from "../ui/separator";

const DashboardContent = () => {
  return (
    <>
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
    </>
  );
};

const StatsCard = () => {
  function updateDashboardData(dataArray: typeof dummyDashboardCardData) {
    return dataArray.map((item) => ({
      ...item,
      changes: calculateChanges(item.previous, item.current), // Calculate and update the 'changes'
    }));
  }

  const updatedDashboardCardData = updateDashboardData(dummyDashboardCardData);

  return updatedDashboardCardData.slice(0, 4).map((cardData, cardDataId) => (
    <div
      className="rounded-md bg-neutral-50 drop-shadow-md dark:bg-neutral-800 justify-between
                                xxxs:w-[100%] h-[150px] p-4 flex flex-col statCard flex-grow"
      key={cardDataId}
    >
      <div className="flex flex-row justify-between w-full items-center">
        <div className="rounded-full bg-neutral-200 dark:bg-neutral-900 w-[40px] h-[40px] flex justify-center items-center">
          {cardData.icon}
        </div>
        <div className="flex flex-row text-sm">
          <span
            className={
              parseFloat(cardData.changes) >= 0
                ? "text-green-600"
                : "text-red-600"
            }
          >
            {cardData.changes}
          </span>
          {parseFloat(cardData.changes) >= 0 ? (
            <IconArrowUpRight className="text-green-600 h-4 w-4 flex-shrink-0 ml-1" />
          ) : (
            <IconArrowDownRight className="text-red-600 h-4 w-4 flex-shrink-0 ml-1" />
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-semibold tracking-[0.5px]">
          {cardData.current}
        </span>
        <span className="text-sm text-neutral-600 dark:text-neutral-400">
          {cardData.label}
        </span>
      </div>
    </div>
  ));
};

const RecentOrders = () => {
  return (
    <div className="w-full rounded-md bg-neutral-50 drop-shadow-md dark:bg-neutral-800 flex 
      flex-col xxxs:mb-[-0.75rem] xs:mb-[-0.5rem] xl:mb-0">
      <DashboardTable />
    </div>
  )
};

const RecentCompletedCampaigns = () => {
  return (
    <div className="rounded-md bg-neutral-50 drop-shadow-md dark:bg-neutral-800
        xxxs:w-full min-h-[400px] p-4 flex flex-col flex-grow justify-between">
      <div className="flex flex-row justify-between w-full items-center mb-4">
        <h1 className="poppins-bold text-[20px] text-black dark:text-white">
          Last Completed
        </h1>
        <span className="text-blue-600 dark:text-blue-500 text-[13px] tracking-[1px] cursor-pointer transition-all duration-300 hover:text-blue-500/75">
          View All
        </span>
      </div>
      <div>
        {dummyLastCompletedData.map((data, idx) => (
          <div className="flex flex-row gap-4 w-full mb-6 items-center">
            <div className="rounded-full bg-blue-200 w-[50px] h-[50px] flex justify-center items-center flex-shrink-0">
              {data.icon}
            </div>
            <div className="flex flex-col w-full">
              <div className="flex flex-row justify-between items-center">
                <span className="text-black dark:text-white font-bold text-[15px] xxxs:w-[115px] xs:w-full xl:w-[115px] whitespace-nowrap overflow-hidden text-ellipsis
                            cursor-pointer transition-all duration-300 hover:text-black/75" title={data.label}>
                  {data.label}
                </span>
                <span className="text-neutral-400 text-[12px]">
                  {data.date}
                </span>
              </div>
              <span className="text-[14px] text-neutral-500 dark:text-neutral-400 flex flex-row items-center justify-start">
                <MapPin className="w-[18px] h-[18px] mr-1" /> {data.location}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="border-[2px] shadow-md border-neutral-300 dark:border-neutral-500 w-full h-[55px] rounded-md flex 
        items-center justify-center cursor-pointer transition-all duration-300 hover:translate-y-[-5px]">
        <span className="font-bold text-neutral-500 dark:text-neutral-50">New Campaign</span>
      </div>
    </div>
  );
};

const TopInfluencers = () => {
  function updateChangesData(dataArray: typeof dummyTopInfluencerData) {
    return dataArray.map((item) => ({
      ...item,
      changes: calculateChanges(item.previous, item.current), // Calculate and update the 'changes'
    }));
  }

  const updatedTopInfluencerData = updateChangesData(dummyTopInfluencerData);

  return (
    <div className="rounded-md bg-neutral-50 drop-shadow-md dark:bg-neutral-800 
        xxxs:w-full min-h-[450px] p-4 flex flex-col flex-grow justify-between">
      <div className="flex flex-row justify-between w-full items-center mb-4">
        <h1 className="poppins-bold text-[20px] text-black dark:text-white">
          Top Influencers
        </h1>
        <span className="text-blue-600 dark:text-blue-500 text-[13px] tracking-[1px] cursor-pointer transition-all duration-300 hover:text-blue-500/75">
          View All
        </span>
      </div>
      <div>
        {updatedTopInfluencerData.map((data, idx) => (
          <div className="flex flex-row gap-4 w-full mb-6 items-center">
            <div className="rounded-full w-[50px] h-[50px] flex justify-center items-center flex-shrink-0">
              <Image src={data.pic} width={50} height={50} className="object-cover rounded-full" alt="pic.jpg" />
            </div>
            <div className="flex flex-col w-full">
              <div className="flex flex-row justify-between w-full items-center">
                <span className="text-black dark:text-white font-bold text-[15px] xxxs:w-[115px] xs:w-full xl:w-[115px] whitespace-nowrap overflow-hidden text-ellipsis 
                            cursor-pointer transition-all duration-300 hover:text-black/75" title={data.name}>
                  {data.name}
                </span>
                <span className="text-[12px] text-neutral-400">
                  Revenue
                </span>
              </div>
              <div className="flex flex-row justify-between w-full items-center">
                <span className="text-[13px] whitespace-nowrap overflow-hidden text-ellipsis text-green-500"
                  title="xQc">
                  {data.changes}
                </span>
                <span className="text-[14px] text-neutral-950 dark:text-neutral-50 font-[600]">
                  RM{data.current}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardContent;
