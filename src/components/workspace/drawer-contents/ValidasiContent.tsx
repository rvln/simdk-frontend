"use client";

import React, { useState } from "react";
import { FiImage } from "react-icons/fi";
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
  onValidate: () => void;
  onReject: (reason: string) => void;
  onClose: () => void;
}

/**
 * ValidasiContent — Detail + validation panel for a single donation.
 * Extracted from (workspace)/dashboard/validasi-donasi/page.tsx.
 *
 * Local state (isRejecting, rejectReason) is contained here because
 * it is purely transient UI state that does not need to live in the parent.
 * The parent receives the final rejection reason string via the onReject callback.
 */
export function ValidasiContent({
  data,
  onValidate,
  onReject,
  onClose,
}: ValidasiContentProps) {
  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const handleConfirmReject = () => {
    if (!rejectReason.trim()) {
      alert("Mohon isi alasan penolakan terlebih dahulu!");
      return;
    }
    onReject(rejectReason);
    onClose();
  };

  const isBarang = data.type === "BARANG";

  return (
    <>
      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
        {/* Photo Evidence */}
        <div className="w-full h-48 bg-slate-100 rounded-2xl overflow-hidden relative shadow-sm">
          {data.imageUrl ? (
            <img
              src={data.imageUrl}
              alt="Bukti"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
              <FiImage className="text-4xl mb-2" />
              <span className="text-sm font-medium">Tidak ada foto</span>
            </div>
          )}
        </div>

        {/* Basic Info */}
        <div>
          <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-1">
            Nomor Resi
          </p>
          <p className="text-base font-bold text-gray-900 mb-4">{data.resi}</p>

          <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-1">
            Donatur
          </p>
          <p className="text-base font-bold text-gray-900 mb-4">{data.donor}</p>

          <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-1">
            Nama {isBarang ? "Barang" : "Donasi"}
          </p>
          <p className="text-base font-bold text-gray-900">{data.name}</p>
          {data.category && (
            <p className="text-sm text-teal-700 font-medium mt-1">
              Kategori: {data.category}
            </p>
          )}
        </div>

        {/* Conditional block: BARANG vs DANA */}
        {isBarang ? (
          <>
            <div className="bg-slate-50 p-4 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-500">Kondisi</span>
                <span className="text-sm font-bold text-green-600">
                  {data.condition}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Jumlah</span>
                <span className="text-sm font-bold text-gray-900">
                  {data.quantity}
                </span>
              </div>
            </div>

            {/* Rejection textarea — shown when user clicks "Tolak" */}
            {isRejecting && (
              <div className="animate-in fade-in slide-in-from-top-2">
                <p className="text-[10px] font-bold text-red-500 tracking-wider uppercase mb-2">
                  Alasan Penolakan (Wajib Diisi)
                </p>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Masukkan alasan penolakan (misal: barang rusak, tidak sesuai kebutuhan)..."
                  className="w-full bg-red-50/50 border border-red-100 shadow-inner rounded-xl p-4 text-sm text-red-900 placeholder-red-300 focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all resize-none h-28"
                />
              </div>
            )}
          </>
        ) : (
          <div className="bg-green-50 p-4 rounded-2xl border border-green-100">
            <div className="flex justify-between items-center">
              <span className="text-sm text-green-800 font-medium">
                Nominal Transfer
              </span>
              <span className="text-lg font-bold text-green-700">
                {data.amount}
              </span>
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
                onClick={() => { onValidate(); onClose(); }}
                className="w-full py-3.5 bg-teal-700 text-white font-bold rounded-xl shadow-[0_4px_20px_rgba(15,118,110,0.2)] hover:shadow-[0_6px_24px_rgba(15,118,110,0.3)] hover:-translate-y-0.5 transition-all"
              >
                Validasi &amp; Masukkan Inventaris
              </button>
            )}
            <button
              onClick={() => {
                if (!isRejecting) {
                  setIsRejecting(true);
                } else {
                  handleConfirmReject();
                }
              }}
              className={`w-full py-3.5 font-bold rounded-xl transition-all ${
                isRejecting
                  ? "bg-red-600 text-white hover:bg-red-700 shadow-md hover:-translate-y-0.5"
                  : "text-red-600 bg-transparent hover:bg-red-50"
              }`}
            >
              {isRejecting ? "Konfirmasi Tolak & Catat Log" : "Tolak Donasi"}
            </button>
            {isRejecting && (
              <button
                onClick={() => {
                  setIsRejecting(false);
                  setRejectReason("");
                }}
                className="w-full py-3 text-gray-500 font-bold bg-transparent hover:bg-gray-100 rounded-xl transition-colors"
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
