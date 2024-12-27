"use client"

import { useState, useEffect } from "react";
import { Nav } from "./Nav";
import { NavHeader } from "./NavHeader";
import { Toaster } from "../ui/toaster";

export function LayoutContent({ children }: { children: React.ReactNode }) {
    const [showNav, setShowNav] = useState(false);

    useEffect(() => {
        // Check if session-token and isLoggedIn exist in localStorage
        const sessionToken = localStorage.getItem('session-token')
        const isLoggedIn = localStorage.getItem('isLoggedIn')

        // If the user is not authenticated and on the public-client-registration page, hide both navbar and header
        if (!sessionToken || isLoggedIn !== 'true') {
            setShowNav(false)
        } else {
            setShowNav(true)
        }
    }, [])

    return (
        <div className="flex h-full w-full">
            {showNav && <Nav />}
            <div className="bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto overflow-y-hidden min-h-[100vh]">
                <main className="bg-bg-light dark:bg-neutral-900 h-full w-full">
                    <div className="flex flex-col w-full">
                        <NavHeader />
                        <div className="flex flex-1 xxxs:pt-[68px] lg:pt-0">
                            <div
                                className="md:px-6 xxxs:px-4 py-5 bg-neutral-100 dark:bg-neutral-900 flex flex-col gap-2 flex-1 
                                    w-full min-h-[100vh]"
                            >
                                {children}
                            </div>
                        </div>
                    </div>
                    <Toaster />
                </main>
            </div>
        </div>
    );
}
