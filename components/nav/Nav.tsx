"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CampaignsLink, ClientsLink, InfluencersLink, MainMenuLink, SettingsLink } from "@/data";
import { Separator } from "@/components/ui/separator"
import { ThemeChanger } from "../themer/ThemeChanger";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { IconBell } from "@tabler/icons-react";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Dashboard"); // Active link state
  const sections = [
    { title: "Main Menu", links: MainMenuLink },
    { title: "Campaigns", links: CampaignsLink },
    { title: "Clients", links: ClientsLink },
    { title: "Influencers", links: InfluencersLink },
    { title: "Help & Settings", links: SettingsLink }
  ];

  const handleLinkClick = (label: string) => {
    setActiveLink(label);
  };

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto overflow-hidden",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div className="flex flex-row items-center justify-center">
              {open ? <Logo /> : <LogoIcon />}
              <span className="ml-2 font-bold text-black dark:text-white text-2xl">
                ConX Agency
              </span>
            </div>
            <div className="mt-5 flex flex-col gap-1 mb-3">
              {sections.map((section, idx) => (
                <div key={idx}>
                  {section.title == "Help & Settings" && (
                    <Separator className="mb-2" />
                  )}
                  <span className="text-[11px] text-neutral-600 dark:text-neutral-200">
                    {section.title}
                  </span>
                  {section.links.map((link, linkIdx) => (
                    <div key={linkIdx}>
                      <SidebarLink
                        className={`opacity-50 hover:opacity-100 duration-300 text-[12px] ${activeLink === link.label ? "opacity-100 font-bold" : "opacity-50"
                          }`}
                        link={link}
                        onClick={() => handleLinkClick(link.label)}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex flex-col w-full">
        <DesktopHeader />
        <Dashboard />
      </div>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <Image
        src="/images/logo/logo.png"
        className="h-8 w-8 flex-shrink-0 rounded-full invert-0 dark:invert"
        width={50}
        height={50}
        alt="Avatar"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        ConX Agency
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <Image
        src="/images/logo/logo.png"
        className="h-8 w-8 flex-shrink-0 rounded-full invert-0 dark:invert"
        width={50}
        height={50}
        alt="Avatar"
      />
    </Link>
  );
};

const DesktopHeader = () => {
  return (
    <div className="flex w-full justify-between h-[80px] bg-neutral-50 dark:bg-neutral-800 border-b-[1px] 
      border-b-neutral-200 dark:border-b-neutral-700 px-8 items-center">
      <div className="">
        Search Bar
      </div>
      {/* Notification & User Icon */}
      <div className="flex flex-row h-[35px] items-center">
        <ThemeChanger />
        <Button variant="ghost" size="icon" className="dark:hover:bg-neutral-700">
          <IconBell className="text-black dark:text-white h-5 w-5 flex-shrink-0" />
        </Button>
        <Separator orientation="vertical" className="mx-4" />
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="px-1 md:p-10 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        test
        {/* <div className="flex gap-2">
                    {[...new Array(4)].map((i) => (
                        <div
                            key={"first-array" + i}
                            className="h-20 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
                        ></div>
                    ))}
                </div>
                <div className="flex gap-2 flex-1">
                    {[...new Array(2)].map((i) => (
                        <div
                            key={"second-array" + i}
                            className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
                        ></div>
                    ))}
                </div> */}
      </div>
    </div>
  );
};
