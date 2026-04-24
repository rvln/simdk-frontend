import React from 'react';
import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/workspace/dashboard-kepala-panti/Sidebar';
import { Header } from '@/components/workspace/dashboard-kepala-panti/Header';

export default function KepalaPantiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Pengecekan peran sederhana
  // Dalam aplikasi nyata, ini akan diambil dari token sesi/autentikasi.
  const userRole: string = "KEPALA_PANTI"; // Simulasi current user role

  // Isolasi Role: Jika PENGURUS_PANTI memaksa masuk /dashboard-kepala-panti
  if (userRole === "PENGURUS_PANTI") {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-800">
      <Header />
      <Sidebar role={userRole} />

      {/* Main Content Area Pushed beyond the Sidebar width & Header height */}
      <main className="ml-64 pt-20 min-h-screen relative overflow-x-hidden">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
