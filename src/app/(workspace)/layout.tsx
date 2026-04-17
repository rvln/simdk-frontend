import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface-container-low flex">
      {/* 
        The navigation core remains entirely decoupled from page content.
        This provides zero-flicker transitions between internal Workspace routes 
      */}
      <Sidebar />
      <DashboardHeader />

      {/* Main Content Area Pushed beyond the Sidebar width & Header height */}
      <div className="flex-1 ml-0 md:ml-64 mt-16 min-h-[calc(100vh-64px)] relative overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
