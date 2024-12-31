import type { Metadata } from "next";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/themer/theme-provider";
import { ToastProvider } from "@/components/ui/toast";
import { LayoutContent } from "@/components/layout/LayoutContent";

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
          <ToastProvider>
            <TooltipProvider>
              <LayoutContent>{children}</LayoutContent>
            </TooltipProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
