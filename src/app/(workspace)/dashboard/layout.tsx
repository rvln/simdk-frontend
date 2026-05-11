"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SidebarStaff } from "@/components/workspace/dashboard-pengurus/SidebarStaff";
import { HeaderStaff } from "@/components/workspace/dashboard-pengurus/HeaderStaff";
import { useAuth } from "@/hooks/useAuth";
import { MdBlock } from "react-icons/md";

/**
 * Dashboard Pengurus Layout — Route Guard
 *
 * ONLY accessible by users with role === 'PENGURUS_PANTI'.
 * All other roles (PENGUNJUNG, KEPALA_PANTI) are redirected to /profil-saya.
 * While the auth check is in-flight, a loading skeleton is shown.
 */
export default function PengurusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useAuth();
  const [forbidden, setForbidden] = useState(false);

  useEffect(() => {
    if (isLoading) return; // Still fetching — wait

    if (!isAuthenticated || !user) {
      // Not logged in — redirect to login with callback
      router.push("/login?callbackUrl=%2Fdashboard");
      return;
    }

    if (user.role !== "PENGURUS_PANTI") {
      // Wrong role — show 403 briefly, then redirect
      setForbidden(true);
      const timeout = setTimeout(() => {
        router.push("/profil-saya");
      }, 2500);
      return () => clearTimeout(timeout);
    }
  }, [isLoading, isAuthenticated, user, router]);

  /* ── Loading State ── */
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin" />
          <p className="text-sm font-medium text-gray-500 animate-pulse">
            Memverifikasi akses...
          </p>
        </div>
      </div>
    );
  }

  /* ── 403 Forbidden State ── */
  if (forbidden || !user || user.role !== "PENGURUS_PANTI") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-600">
            <MdBlock className="text-3xl" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Akses Ditolak</h2>
          <p className="text-sm text-gray-500">
            Anda tidak memiliki izin untuk mengakses halaman ini.
            Mengalihkan ke halaman profil...
          </p>
        </div>
      </div>
    );
  }

  /* ── Authorized: Render Dashboard ── */
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-800">
      <HeaderStaff />
      <SidebarStaff role={user.role} />

      {/* Main Content Area */}
      <main className="md:ml-64 pt-20 min-h-screen relative overflow-x-hidden">
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
