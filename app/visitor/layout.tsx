/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Sidebar from "@/components/sidebar";
import ThemeSwitcher from "@/components/theme-switcher";
import TopBar from "@/components/topbar";
import { useState } from "react";

export default function VisitorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [display, setDisplay] = useState<string>("hidden");

  const handleMenuClick = () => {
    setDisplay((prevState) => (prevState === "hidden" ? "show" : "hidden"));
  };

  return (
    <main className="w-full min-h-screen h-full bg-brand-10/[.16] relative bg-white dark:bg-black">
      <Sidebar display={display} />

      <div className="h-full lg:ml-60 flex flex-col">
        <ThemeSwitcher />
        <TopBar onMenuClick={handleMenuClick} />
        {children}
      </div>
    </main>
  );
}
