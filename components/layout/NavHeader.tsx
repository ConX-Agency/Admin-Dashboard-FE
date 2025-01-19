"use client";

import { useEffect, useState } from "react";
import Search from "@/components/layout/Search";
import { NotificationPanel, ProfileMenu } from "@/components/layout/UserActions";
import { ThemeChanger } from "../themer/ThemeChanger";
import { LogoIcon } from "./Nav";
import { useAuth } from "@/context/AuthContext";

export const NavHeader = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showNavItems, setShowNavItems] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      setShowNavItems(false)
    } else {
      setShowNavItems(true)
    }
  }, [token])

  return (
    <div
      className="flex w-full xxxs:justify-end h-auto bg-neutral-50 dark:bg-neutral-900 border-b-[1px] 
        border-b-neutral-200 dark:border-b-neutral-700 md:px-6 xxxs:px-4 items-center py-4 xxxs:fixed lg:static z-[999]"
    >
      {!showNavItems &&
        <div className="flex items-center w-full">
          <LogoIcon />
          <span className="ml-1 font-bold text-black dark:text-white xxxs:text-xl md:text-3xl lg:text-2xl">
            onX Agency
          </span>
        </div>
      }

      {/* Notification & User Icon */}
      <div className="flex flex-row h-[35px] items-center xxxs:gap-0 md:gap-2">
        {showNavItems &&
          <div className="flex">
            <Search open={isSearchOpen} onOpenChange={setIsSearchOpen} />
          </div>
        }
        <ThemeChanger />
        {showNavItems && <NotificationPanel />}
        {/* <Separator orientation="vertical" className="mx-4" /> */}
        {showNavItems && <ProfileMenu />}
      </div>
    </div>
  );
};
