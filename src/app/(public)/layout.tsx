import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-surface">
      {/* 
        Global Public Navbar handles sticky auth links and root brand routing. 
      */}
      <Navbar />

      {/* Main Content payload dynamically flexed */}
      <main className="flex-1 pt-16">{children}</main>

      {/* Global Information Footer */}
      <Footer />
    </div>
  );
}
