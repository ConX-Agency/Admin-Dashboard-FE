"use client";

// React and Next.js imports
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Third-party imports
import { motion } from "framer-motion";

// Internal component imports
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ThemeChanger } from "../themer/ThemeChanger";
import Search from "./Search";
import { ProfileMenu, DesktopNotificationPanel } from "./UserActions";

// Data imports
import { cn } from "@/lib/utils";
import { CampaignsLink, ClientsLink, InfluencersLink, MainMenuLink, SettingsLink } from "@/data/nav";
import Dashboard from "../content/dashboard/Dashboard";


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

  const handleLoggedInUser = () => {

  }

  const handleGuest = () => {

  }

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
            <Link className="flex flex-row items-center justify-center cursor-pointer" href="/#">
              {open ? <Logo /> : <LogoIcon />}
              <span className="ml-2 font-bold text-black dark:text-white text-2xl">
                ConX Agency
              </span>
            </Link>
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
      <div className="flex flex-col w-full overflow-y-scroll">
        <DesktopHeader />
        <Dashboard />
      </div>
    </div>
  );
}

export const Logo = () => {

  return (
    <div
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
    </div>
  );
};
export const LogoIcon = () => {

  return (
    <div
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <Image
        src="/images/logo/logo.png"
        className="h-8 w-8 flex-shrink-0 rounded-full invert-0 dark:invert"
        width={50}
        height={50}
        alt="Avatar"
      />
    </div>
  );
};

const DesktopHeader = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="flex w-full justify-between h-[80px] bg-neutral-50 dark:bg-neutral-900 border-b-[1px] 
      border-b-neutral-200 dark:border-b-neutral-700 px-8 items-center py-4">
      {/* Search Command */}
      <Search open={isSearchOpen} onOpenChange={setIsSearchOpen} />

      {/* Notification & User Icon */}
      <div className="flex flex-row h-[35px] items-center gap-3">
        <ThemeChanger />
        <DesktopNotificationPanel />
        {/* <Separator orientation="vertical" className="mx-4" /> */}
        <ProfileMenu />
      </div>
    </div>
  );
};