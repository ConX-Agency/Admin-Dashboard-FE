import type { Metadata } from "next";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/themer/theme-provider";
import { Nav } from "@/components/layout/Nav";

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
              <Nav/>
              <div className="bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto overflow-y-hidden min-h-full">
                {children}
              </div>
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}