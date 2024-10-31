"use client";

import { useState } from "react";
import Search from "@/components/layout/Search";
import { NotificationPanel, ProfileMenu } from "@/components/layout/UserActions";
import { ThemeChanger } from "../themer/ThemeChanger";

export const NavHeader = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div
      className="flex w-full xxxs:justify-end h-auto bg-neutral-50 dark:bg-neutral-900 border-b-[1px] 
        border-b-neutral-200 dark:border-b-neutral-700 md:px-6 xxxs:px-4 items-center py-4 xxxs:fixed lg:static z-[999]"
    >
      {/* Search Command */}
      <div className="xxxs:hidden lg:flex">
        <Search open={isSearchOpen} onOpenChange={setIsSearchOpen} />
      </div>
      {/* Notification & User Icon */}
      <div className="flex flex-row h-[35px] items-center xxxs:gap-0 md:gap-2">
        <div className="xxxs:flex lg:hidden">
          <Search open={isSearchOpen} onOpenChange={setIsSearchOpen} />
        </div>
        <ThemeChanger />
        <NotificationPanel />
        {/* <Separator orientation="vertical" className="mx-4" /> */}
        <ProfileMenu />
      </div>
    </div>
  );
};
