import React, { useEffect, useState } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { IconBell, IconLogin, IconLogout, IconMoodPlus, IconSettings, IconUser } from '@tabler/icons-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AnimatePresence, motion } from 'framer-motion'
import { profileLinks } from '@/data'
import { Separator } from '../ui/separator'
import Image from 'next/image'

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
                    <Avatar className='cursor-pointer ml-3'>
                        <AvatarImage src={userPfp} alt="@shadcn" />
                        <AvatarFallback>{userPfpFallback}</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56' align='end'>
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
    )
}

const DesktopNotificationPanel = () => {
    const [anyUnread, setAnyUnread] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    const markAllAsRead = () => {
        setAnyUnread(false);
    }

    const handleToggle = () => {
        setIsOpen((prev) => !prev); // Toggle open/close state
    };

    return (
        <div>
            <DropdownMenu onOpenChange={(open) => {
                setIsOpen(open); // Update the state based on dropdown's open state
                markAllAsRead(); // Mark all as read when closed
            }}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="dark:hover:bg-neutral-700 relative">
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
                        <IconBell className={`text-black dark:text-white h-5 w-5 flex-shrink-0 transition-all duration-300 
                            ${isOpen ? 'fill-black dark:fill-white' : ''}`} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[360px] p-4" align="end">
                    <div className='flex flex-row justify-between items-center mb-2'>
                        <span className='text-sm font-bold'>Notification</span>
                        <IconSettings className="text-black dark:text-white h-4 w-4 flex-shrink-0 cursor-pointer" />
                    </div>
                    <Separator className='' />
                    <div className='border border-neutral-400 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-700 
                        rounded p-2 mt-3 flex flex-row'>
                        <Image
                            src="https://github.com/shadcn.png"
                            width={50}
                            height={50}
                            alt="Profile Picture" // Use a more descriptive alt text
                            className='rounded-full'
                        />
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export { ProfileMenu, DesktopNotificationPanel };