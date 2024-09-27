"use client"

import { Nav } from "@/components/Nav";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-bg-light dark:bg-bg-dark h-full w-full">
      <Nav/>
      {/* <Image src='/images/logo/logo.png' height={150} width={150} alt="test.jpg"/> */}
    </main>
  );
}
