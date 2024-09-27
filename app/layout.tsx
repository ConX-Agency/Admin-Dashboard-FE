import type { Metadata } from "next";
import "./globals.css";

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
      <body
      >
        {children}
      </body>
    </html>
  );
}
