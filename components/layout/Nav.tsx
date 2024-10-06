"use client";

// React and Next.js imports
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Third-party imports

// Internal component imports
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

// Data imports
import { CampaignsLink, ClientsLink, InfluencersLink, MainMenuLink, SettingsLink } from "@/data/nav";

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

  const handleLoggedInUser = () => { }

  const handleGuest = () => { }

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <Link className="flex flex-row items-center justify-center cursor-pointer" href="/#">
            {open ? <Logo /> : <LogoIcon />}
            <span className="ml-2 font-bold text-black dark:text-white xxxs:text-xl md:text-3xl lg:text-2xl">
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
    </div>
  );
};

export const LogoIcon = () => {
  return (
    <div
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <Image
        src="https://static.vecteezy.com/system/resources/previews/046/853/019/non_2x/twitter-x-black-and-white-logo-transparent-background-free-png.png"
        className="h-8 w-8 flex-shrink-0 rounded-full invert-0 dark:invert"
        width={50}
        height={50}
        alt="Avatar"
      />
    </div>
  );
};