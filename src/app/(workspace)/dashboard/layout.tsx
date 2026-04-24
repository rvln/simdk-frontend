import React from 'react';
import { redirect } from 'next/navigation';
import { SidebarStaff } from '@/components/workspace/dashboard-pengurus/SidebarStaff';
import { HeaderStaff } from '@/components/workspace/dashboard-pengurus/HeaderStaff';

export default function PengurusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Pengecekan peran sederhana
  // Dalam aplikasi nyata, ini akan diambil dari token sesi/autentikasi.
  const userRole: string = "PENGURUS_PANTI"; // Simulasi current user role

  // Isolasi Role: Jika KEPALA_PANTI memaksa masuk /dashboard
  if (userRole === "KEPALA_PANTI") {
    redirect("/dashboard-kepala-panti");
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-800">
      <HeaderStaff />
      <SidebarStaff role={userRole} />

      {/* Main Content Area */}
      <main className="ml-64 pt-20 min-h-screen relative overflow-x-hidden">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
