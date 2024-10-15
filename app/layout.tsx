import type { Metadata } from "next";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/themer/theme-provider";
import { Nav } from "@/components/layout/Nav";
import { NavHeader } from "@/components/layout/NavHeader";

export const metadata: Metadata = {
  title: "ConX Agency",
  description: "Where promotional management has never been easier.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <div className="flex h-full w-full">
              <Nav />
              <div className="bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto overflow-y-hidden min-h-full">
                <main className="bg-bg-light dark:bg-neutral-900 h-full w-full">
                  <div className="flex flex-col w-full">
                    <NavHeader />
                    <div className="flex flex-1 xxxs:pt-[68px] lg:pt-0">
                      <div className="md:px-6 xxxs:px-4 py-5 bg-neutral-100 dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full min-h-full">
                        {children}
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}