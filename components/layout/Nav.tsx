'use client';

// React and Next.js imports
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation'; // Import the usePathname hook

// Internal component imports
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';

// Data imports
import {
  CampaignsLink,
  ClientsLink,
  InfluencersLink,
  MainMenuLink,
  SettingsLink,
} from '@/data/nav';
import { useAuth } from '@/context/AuthContext';

export function Nav() {
  const [open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Dashboard'); // Active link state
  const pathname = usePathname(); // Get the current URL path
  const sections = [
    { title: 'Main Menu', links: MainMenuLink },
    { title: 'Campaigns', links: CampaignsLink },
    { title: 'Clients', links: ClientsLink },
    { title: 'Influencers', links: InfluencersLink },
    { title: 'Help & Settings', links: SettingsLink },
  ];
  const [showNav, setShowNav] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  }, []);

  // Check if the link's href matches the current path
  const checkActiveLink = (linkHref: string) => {
    return pathname === linkHref;
  };

  // Set active link on click
  const handleLinkClick = (label: string) => {
    setActiveLink(label);
  };

  // Set the active link based on the current path when the component mounts
  useEffect(() => {
    sections.forEach((section) => {
      section.links.forEach((link) => {
        if (checkActiveLink(link.href)) {
          setActiveLink(link.label);
        }
      });
    });
  }, [pathname]);

  const handleLoggedInUser = () => {};

  const handleGuest = () => {};

  return (
    showNav && (
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="fixed flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Link className="flex cursor-pointer flex-row items-center justify-center" href="/#">
              {open ? <Logo /> : <LogoIcon />}
              <span className="ml-1 font-bold text-black dark:text-white xxxs:text-xl md:text-3xl lg:text-2xl">
                onX Agency
              </span>
            </Link>
            <div className="mb-3 mt-5 flex flex-col gap-1">
              {sections.map((section, idx) => (
                <div key={idx}>
                  {section.title == 'Help & Settings' && <Separator className="mb-2" />}
                  <span className="text-[11px] text-neutral-600 dark:text-neutral-200">
                    {section.title}
                  </span>
                  {section.links.map((link, linkIdx) => (
                    <div key={linkIdx}>
                      <SidebarLink
                        className={`text-[12px] opacity-50 duration-300 hover:opacity-100 ${
                          activeLink === link.label ? 'font-bold opacity-100' : 'opacity-50'
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
    )
  );
}

export const Logo = () => {
  const basePath = process.env.NODE_ENV === 'production' ? '/Admin-Dashboard-FE' : '';

  return (
    <div className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black">
      <Image
        src={`${basePath}/images/logo/logo.png`}
        className="h-8 w-8 flex-shrink-0 rounded-full invert-0 dark:invert"
        width={50}
        height={50}
        alt="Avatar"
      />
    </div>
  );
};

export const LogoIcon = () => {
  const basePath = process.env.NODE_ENV === 'production' ? '/Admin-Dashboard-FE' : '';

  return (
    <div className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black">
      <Image
        src={`${basePath}/images/logo/logo.png`}
        className="h-8 w-8 flex-shrink-0 rounded-full invert-0 dark:invert"
        width={50}
        height={50}
        alt="Avatar"
      />
    </div>
  );
};
