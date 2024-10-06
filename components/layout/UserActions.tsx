import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  IconBell,
  IconChecks,
  IconLogin,
  IconLogout,
  IconMoodPlus,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AnimatePresence, motion } from "framer-motion";
import { dummyNotificationData, profileLinks } from "@/data/nav";
import { Separator } from "../ui/separator";
import Image from "next/image";

const ProfileMenu = () => {
  const [userPfp, setUserPfp] = useState("");
  const [userPfpFallback, setUserPfpFallback] = useState("?");

  useEffect(() => {
    setUserPfp("https://github.com/shadcn.png");
    setUserPfpFallback("RS");

    // const handleKeyDown = (e: KeyboardEvent) => {
    //   // Check for Shift + Command + S (Sign Up)
    //   if (e.shiftKey && e.metaKey && e.key === "S") {
    //     e.preventDefault();
    //     alert("Sign Up triggered");
    //   }
    //   // Check for Shift + Command + G (Login)
    //   if (e.shiftKey && e.metaKey && e.key === "G") {
    //     e.preventDefault();
    //     alert("Login triggered");
    //   }
    //   // Check for Shift + Command + P (Profile)
    //   if (e.shiftKey && e.metaKey && e.key === "P") {
    //     e.preventDefault();
    //     alert("Profile triggered");
    //   }
    //   // Check for Shift + Command + L (Logout)
    //   if (e.shiftKey && e.metaKey && e.key === "L") {
    //     e.preventDefault();
    //     alert("Logout triggered");
    //   }
    // };

    // document.addEventListener("keydown", handleKeyDown);

    // return () => { //Unmounting
    //   document.removeEventListener("keydown", handleKeyDown);
    // };
  }, []);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer ml-3">
            <AvatarImage src={userPfp} alt="@shadcn" />
            <AvatarFallback>{userPfpFallback}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          {profileLinks.map((link, linkIdx) => (
            <div key={linkIdx}>
              <DropdownMenuItem>
                {link.icon}
                <span>{link.label}</span>
                <DropdownMenuShortcut>{link.shortcut}</DropdownMenuShortcut>
              </DropdownMenuItem>
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const NotificationPanel = () => {
  const [anyUnread, setAnyUnread] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const markAllAsRead = () => {
    setAnyUnread(false);
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev); // Toggle open/close state
  };

  return (
    <div>
      <DropdownMenu
        onOpenChange={(open) => {
          setIsOpen(open); // Update the state based on dropdown's open state
          markAllAsRead(); // Mark all as read when closed
        }}
      >
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="dark:hover:bg-neutral-700 relative"
          >
            <AnimatePresence>
              {anyUnread && (
                <motion.div
                  className="w-[15px] h-[15px] rounded-full bg-[#c00000] absolute top-[5px] right-[3px] 
                                        text-white text-xs"
                  key="notification"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  3
                </motion.div>
              )}
            </AnimatePresence>
            <IconBell
              className={`text-black dark:text-white h-5 w-5 flex-shrink-0 transition-all duration-300 
                            ${isOpen ? "fill-black dark:fill-white" : ""}`}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="xxxs:max-w-[300px] xxxs:mr-2 xxs:mr-4 md:mr-6 xs:w-[360px] p-4"
          align="center"
        >
          <div className="flex flex-row justify-between items-center mb-2">
            <span className="text-base font-bold">Notification</span>
            <div className="flex flex-row">
              <IconChecks className="text-black dark:text-white h-[18px] w-[18px] flex-shrink-0 cursor-pointer mr-2" />
              <IconSettings className="text-black dark:text-white h-[18px] w-[18px] flex-shrink-0 cursor-pointer duration-300 transition-all hover:rotate-90" />
            </div>
          </div>
          <Separator className="" />
          {dummyNotificationData.slice(0, 3).map((notifi, notifiId) => (
            <div key={notifiId}>
              <div className="p-2 mt-3 flex flex-row h-full gap-4">
                <div className="w-[40px] h-[40px] relative flex-shrink-0">
                  <div className="rounded-full bg-blue-500 w-[7px] h-[7px] absolute top-0 left-[-5px]" />
                  <Image
                    src={notifi.userPfp}
                    width={40}
                    height={40}
                    alt="Profile Picture"
                    className="rounded-full object-cover w-[40px] h-[40px] flex-shrink-0"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="justify-start text-sm mb-2 w-full">
                    <span className="font-semibold">{notifi.username} </span>
                    <span className="text-wrap">{notifi.description}</span>
                  </div>
                  <div className="flex flex-row items-center justify-between text-sm w-full">
                    <div
                      className={`px-2 py-1 uppercase rounded-full mr-2 
                                            bg-neutral-200 text-xs font-semibold`}
                    >
                      <span
                        className={`${
                          notifi.badgeColor === "red"
                            ? "text-red-600"
                            : notifi.badgeColor === "blue"
                            ? "text-blue-500"
                            : "text-neutral-600"
                        }`}
                      >
                        {notifi.badge}
                      </span>
                    </div>
                    <div className="text-gray-400">{notifi.time} ago</div>
                  </div>
                </div>
              </div>
              <Separator className="mt-2" />
            </div>
          ))}
          <div
            className="mt-4 border bg-neutral-300 dark:bg-neutral-800 w-full p-2 text-center rounded-md cursor-pointer 
                        dark:hover:bg-neutral-800/75 hover:bg-neutral-300/75 duration-300 transition-all"
          >
            <span className="text-[16px] tracking-[.5px] text-black dark:text-white opacity-100">
              View More Notification
            </span>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export { ProfileMenu, NotificationPanel };
