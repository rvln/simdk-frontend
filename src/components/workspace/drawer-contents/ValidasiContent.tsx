"use client";

import React, { useState } from "react";
import { FiImage, FiLoader, FiAlertCircle } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";

export type DonationType = "BARANG" | "DANA";

export interface ValidasiData {
  id: string;
  resi: string;
  name: string;
  type: DonationType;
  donor: string;
  timeInfo: string;
  statusBadge: string;
  category?: string;
  condition?: string;
  quantity?: string;
  amount?: string;
  imageUrl?: string;
}

interface ValidasiContentProps {
  data: ValidasiData;
  /** Token for authenticated API calls */
  token: string | null;
  /** Called on successful approve OR reject so parent can refresh its list */
  onSuccess: () => void;
  onClose: () => void;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

/**
 * ValidasiContent — Detail + validation panel for a single PENDING_DELIVERY donation.
 *
 * Wires:
 *   "Validasi & Masukkan Inventaris" → POST /api/validasi-donasi/{id}/approve
 *   "Tolak Donasi"                   → POST /api/validasi-donasi/{id}/reject { reason }
 *
 * isSubmitting and rejection textarea state are local — they are transient UI state
 * that does not need to live in the parent.
 */
export function ValidasiContent({ data, token, onSuccess, onClose }: ValidasiContentProps) {
  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const authHeaders = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const handleApprove = async () => {
    setIsSubmitting(true);
    setApiError(null);
    try {
      const res = await fetch(`${API_BASE}/validasi-donasi/${data.id}/approve`, {
        method: "POST",
        headers: authHeaders,
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body?.message ?? `HTTP ${res.status}`);
      onSuccess();
      onClose();
    } catch (err: unknown) {
      setApiError(err instanceof Error ? err.message : "Terjadi kesalahan. Coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      setApiError("Mohon isi alasan penolakan terlebih dahulu!");
      return;
    }
    setIsSubmitting(true);
    setApiError(null);
    try {
      const res = await fetch(`${API_BASE}/validasi-donasi/${data.id}/reject`, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({ reason: rejectReason }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body?.message ?? `HTTP ${res.status}`);
      onSuccess();
      onClose();
    } catch (err: unknown) {
      setApiError(err instanceof Error ? err.message : "Terjadi kesalahan. Coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isBarang = data.type === "BARANG";

  return (
    <>
      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
        {/* Inline API error */}
        {apiError && (
          <div className="flex items-start gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            <FiAlertCircle className="text-lg flex-shrink-0 mt-0.5" />
            <span>{apiError}</span>
          </div>
        )}

        {/* Photo Evidence */}
        <div className="w-full h-48 bg-slate-100 rounded-2xl overflow-hidden relative shadow-sm">
          {data.imageUrl ? (
            <img src={data.imageUrl} alt="Bukti" className="w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
              <FiImage className="text-4xl mb-2" />
              <span className="text-sm font-medium">Tidak ada foto</span>
            </div>
          )}
        </div>

        {/* Basic Info */}
        <div>
          <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-1">Nomor Resi</p>
          <p className="text-base font-bold text-gray-900 mb-4">{data.resi}</p>

          <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-1">Donatur</p>
          <p className="text-base font-bold text-gray-900 mb-4">{data.donor}</p>

          <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-1">
            Nama {isBarang ? "Barang" : "Donasi"}
          </p>
          <p className="text-base font-bold text-gray-900">{data.name}</p>
          {data.category && (
            <p className="text-sm text-teal-700 font-medium mt-1">Kategori: {data.category}</p>
          )}
        </div>

        {/* Conditional block */}
        {isBarang ? (
          <>
            <div className="bg-slate-50 p-4 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-500">Kondisi</span>
                <span className="text-sm font-bold text-green-600">{data.condition}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Jumlah</span>
                <span className="text-sm font-bold text-gray-900">{data.quantity}</span>
              </div>
            </div>

            {isRejecting && (
              <div className="animate-in fade-in slide-in-from-top-2">
                <p className="text-[10px] font-bold text-red-500 tracking-wider uppercase mb-2">
                  Alasan Penolakan (Wajib Diisi)
                </p>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Masukkan alasan penolakan (misal: barang rusak, tidak sesuai kebutuhan)..."
                  disabled={isSubmitting}
                  className="w-full bg-red-50/50 border border-red-100 shadow-inner rounded-xl p-4 text-sm text-red-900 placeholder-red-300 focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all resize-none h-28 disabled:opacity-60"
                />
              </div>
            )}
          </>
        ) : (
          <div className="bg-green-50 p-4 rounded-2xl border border-green-100">
            <div className="flex justify-between items-center">
              <span className="text-sm text-green-800 font-medium">Nominal Transfer</span>
              <span className="text-lg font-bold text-green-700">{data.amount}</span>
            </div>
          </div>
        )}
      </div>

      {/* Sticky footer */}
      <div className="p-6 flex flex-col gap-3 bg-white border-t border-gray-50/50 mt-auto">
        {isBarang ? (
          <>
            {!isRejecting && (
              <button
                onClick={handleApprove}
                disabled={isSubmitting}
                className="w-full py-3.5 bg-teal-700 text-white font-bold rounded-xl shadow-[0_4px_20px_rgba(15,118,110,0.2)] hover:shadow-[0_6px_24px_rgba(15,118,110,0.3)] hover:-translate-y-0.5 border-none transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 flex items-center justify-center gap-2"
              >
                {isSubmitting && !isRejecting ? (
                  <><FiLoader className="animate-spin" /> Memproses...</>
                ) : (
                  "Validasi & Masukkan Inventaris"
                )}
              </button>
            )}

            <button
              onClick={() => {
                if (!isRejecting) {
                  setIsRejecting(true);
                  setApiError(null);
                } else {
                  handleReject();
                }
              }}
              disabled={isSubmitting}
              className={`w-full py-3.5 font-bold rounded-xl transition-all border-none disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
                isRejecting
                  ? "bg-red-600 text-white hover:bg-red-700 shadow-md hover:-translate-y-0.5"
                  : "text-red-600 bg-transparent hover:bg-red-50"
              }`}
            >
              {isSubmitting && isRejecting ? (
                <><FiLoader className="animate-spin" /> Mencatat Log...</>
              ) : isRejecting ? (
                "Konfirmasi Tolak & Catat Log"
              ) : (
                "Tolak Donasi"
              )}
            </button>

            {isRejecting && (
              <button
                onClick={() => { setIsRejecting(false); setRejectReason(""); setApiError(null); }}
                disabled={isSubmitting}
                className="w-full py-3 text-gray-500 font-bold bg-transparent hover:bg-gray-100 rounded-xl transition-colors border-none disabled:opacity-50"
              >
                Batal
              </button>
            )}
          </>
        ) : (
          <div className="w-full py-3.5 bg-green-50 text-green-700 font-bold text-center rounded-xl border border-green-200">
            <FaCheckCircle className="inline-block mr-2 text-lg mb-0.5" />
            Selesai / Terkonfirmasi Sistem
          </div>
        )}
      </div>
    </>
  );
}
