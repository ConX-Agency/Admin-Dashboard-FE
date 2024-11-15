"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Tab = {
  title: string;
  titleIcon: React.ReactNode;
  value: string;
  content?: string | React.ReactNode | any;
};

export const AceTabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
}) => {
  const [active, setActive] = useState<Tab>(propTabs[0]);
  const [tabs, setTabs] = useState<Tab[]>(propTabs);

  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
  };

  const [hovering, setHovering] = useState(false);

  return (
    <>
      <div
        className={cn(
          `flex flex-row items-center justify-start [perspective:1000px] relative overflow-auto sm:overflow-visible 
            no-visible-scrollbar max-w-full w-full flex-nowrap`,
          containerClassName
        )}
      >
        {propTabs.map((tab, idx) => (
          <button
            key={tab.title}
            onClick={() => {
              moveSelectedTabToTop(idx);
            }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={cn("relative px-4 py-2 rounded-full text-md", tabClassName)}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {active.value === tab.value && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className={cn(
                  "absolute inset-0 bg-gray-200 dark:bg-zinc-800 rounded-full",
                  activeTabClassName
                )}
              />
            )}

            <span className={cn(`relative text-black dark:text-white text-sm flex flex-row flex-nowrap w-max
                gap-2 items-center`, { "font-bold": active.value === tab.value })}>
              {tab.titleIcon}
              {tab.title}
            </span>
          </button>
        ))}
      </div>
      <FadeInDiv
        tabs={tabs}
        active={active}
        key={active.value}
        hovering={hovering}
        className={cn("mt-4", contentClassName)}
      />
    </>
  );
};

export const FadeInDiv = ({
  className,
  tabs,
  hovering,
}: {
  className?: string;
  key?: string;
  tabs: Tab[];
  active: Tab;
  hovering?: boolean;
}) => {
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(window.innerWidth >= 992);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 992);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isActive = (tab: Tab) => {
    return tab.value === tabs[0].value;
  };
  return (
    <div className="relative w-full h-full">
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            scale: 1 - idx * 0.1,
            top: hovering && isLargeScreen ? idx * -20 : 0,
            zIndex: -idx,
            opacity: isActive(tab) ? 1 : 0, // Only active tab gets full opacity
            visibility: isActive(tab) ? "visible" : "hidden", // Hide inactive tabs
            pointerEvents: isActive(tab) ? "auto" : "none", // Prevent interaction with hidden 
          }}
          animate={{
            y: isActive(tab) ? [0, 20, 0] : 0,
          }}
          className={cn("w-full min-h-full", isActive(tab) ? "relative opacity-100" : "absolute opacity-0", className)}
        >
          {tab.content}
        </motion.div>
      ))}
    </div>
  );
};
