"use client";

import React, { useState, useEffect, useCallback } from "react";
import { FiSearch, FiFilter, FiAlertCircle, FiRefreshCw, FiBox, FiCalendar, FiUser } from "react-icons/fi";
import { GlobalDomainDrawer } from "@/components/workspace/GlobalDomainDrawer";
import { useAuth } from "@/hooks/useAuth";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export default function DistribusiPage() {
  const { user } = useAuth();
  const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [distributions, setDistributions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const fetchDistributions = useCallback(async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const res = await fetch(`${API_BASE}/api/distribusi`, {
        credentials: 'include',
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
      });
      if (!res.ok) throw new Error("Gagal memuat riwayat distribusi");
      const json = await res.json();
      const data = Array.isArray(json) ? json : json.data ?? [];
      setDistributions(data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchDistributions();
  }, [fetchDistributions]);

  return (
    <div className="flex h-full w-full relative overflow-hidden bg-[#F9FAFB]">
      <div className={`flex-1 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] p-8 overflow-y-auto ${isPanelOpen ? 'pr-[450px]' : ''}`}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Riwayat Distribusi</h1>
              <p className="text-gray-500 text-lg">Catat dan pantau pengeluaran barang untuk transparansi alokasi publik.</p>
            </div>
            <button 
              onClick={() => setIsPanelOpen(true)}
              className="flex items-center gap-2 px-6 py-3.5 bg-[#0B648C] text-white rounded-xl text-sm font-bold shadow-[0_4px_14px_rgba(11,100,140,0.3)] hover:shadow-[0_6px_24px_rgba(11,100,140,0.4)] hover:-translate-y-0.5 transition-all"
            >
              + Distribusi Baru
            </button>
          </div>

          {/* Action Bar */}
          <div className="flex gap-4 mb-8 items-center flex-wrap">
            <div className="relative w-80">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400 text-lg" />
              </div>
              <input 
                type="text" 
                placeholder="Cari Riwayat..." 
                className="w-full pl-11 pr-4 py-3.5 bg-white rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B648C]/20 shadow-sm border-none"
              />
            </div>
            <button className="flex items-center gap-2 px-6 py-3.5 bg-white rounded-xl text-gray-700 shadow-sm text-sm font-medium hover:bg-gray-50 transition-colors">
              <FiFilter /> Filter Kategori
            </button>
          </div>

          {/* Error Banner */}
          {fetchError && (
            <div className="mb-8 flex items-center gap-3 px-5 py-4 bg-red-50 border border-red-200 rounded-2xl text-red-800 text-sm">
              <FiAlertCircle className="text-lg flex-shrink-0" />
              <span className="flex-1">{fetchError}</span>
              <button onClick={fetchDistributions} className="flex items-center gap-1.5 text-red-700 font-bold hover:text-red-900">
                <FiRefreshCw className="text-base" /> Coba lagi
              </button>
            </div>
          )}

          {/* Grid of UI Cards */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1,2,3].map(i => (
                <div key={i} className="bg-white h-48 rounded-2xl animate-pulse shadow-sm"></div>
              ))}
            </div>
          ) : distributions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm border border-dashed border-gray-200">
              <FiBox className="text-5xl text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium">Belum ada riwayat distribusi yang dicatat.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {distributions.map((item: any) => (
                <div key={item.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-[#E6F4F1] text-[#0B648C] px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest">
                      {item.inventory?.category ?? "Umum"}
                    </div>
                  </div>
                  
                  <h3 className="text-[17px] font-bold text-gray-900 leading-tight mb-2 group-hover:text-[#0B648C] transition-colors line-clamp-2">
                    {item.inventory?.itemName ?? "Unknown Item"}
                  </h3>
                  
                  <div className="mt-auto pt-4 space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FiBox className="text-gray-400" />
                      <span className="font-bold text-gray-900">{item.qty} {item.inventory?.unit ?? "Pcs"}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FiUser className="text-gray-400" />
                      <span className="truncate" title={item.target_recipient}>{item.target_recipient}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500 pt-3 border-t border-gray-100">
                      <FiCalendar className="text-gray-400" />
                      <span>{item.distributed_at ? new Date(item.distributed_at).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' }) : "-"}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <GlobalDomainDrawer
        domain="DISTRIBUSI"
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        token={token}
        onSuccess={() => {
          setIsPanelOpen(false);
          fetchDistributions();
        }}
      />
    </div>
  );
}
