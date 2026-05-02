"use client";

import React, { useState } from "react";
import {
  FiCalendar,
  FiClock,
  FiBox,
  FiXCircle,
  FiAlertCircle,
  FiLoader,
} from "react-icons/fi";
import { FaCalendarCheck } from "react-icons/fa6";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

export interface ApprovalData {
  id: string;
  name: string;
  date: string;
  session: string;
  timeRange: string;
  badge: string;
  iconBg: string;
  applicant: string;
  applicantRole: string;
  details: string;
  bringsDonation: boolean;
  capacityAvailable: boolean;
  status: string;
  is_expired?: boolean;
}

interface ApprovalContentProps {
  data: ApprovalData;
  token: string | null;
  onSuccess: () => void;
  onClose: () => void;
}

export function ApprovalContent({
  data,
  token,
  onSuccess,
  onClose,
}: ApprovalContentProps) {
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [rejectReason, setRejectReason] = useState("");
  const [rescheduleNotes, setRescheduleNotes] = useState("");
  const [apiError, setApiError] = useState<string | null>(null);

  const resetStates = () => {
    setIsApproving(false);
    setIsRejecting(false);
    setIsRescheduling(false);
    setApiError(null);
  };

  const handleApprove = async () => {
    if (!isApproving) {
      resetStates();
      setIsApproving(true);
      return;
    }

    setIsSubmitting(true);
    setApiError(null);
    try {
      const res = await fetch(`${API_BASE}/kunjungan/${data.id}/approve`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 422) {
          throw new Error(
            body?.errors?.session?.[0] || body?.message || "Validasi gagal.",
          );
        }
        throw new Error(body?.message ?? `HTTP ${res.status}`);
      }
      onSuccess();
      onClose();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setApiError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!isRejecting) {
      resetStates();
      setIsRejecting(true);
      return;
    }

    if (!rejectReason.trim()) {
      setApiError("Alasan penolakan wajib diisi.");
      return;
    }

    setIsSubmitting(true);
    setApiError(null);
    try {
      const res = await fetch(`${API_BASE}/kunjungan/${data.id}/reject`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reason: rejectReason }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body?.message ?? `HTTP ${res.status}`);
      onSuccess();
      onClose();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setApiError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReschedule = async () => {
    if (!isRescheduling) {
      resetStates();
      setIsRescheduling(true);
      return;
    }

    if (!rescheduleNotes.trim()) {
      setApiError("Saran jadwal ulang wajib diisi.");
      return;
    }

    setIsSubmitting(true);
    setApiError(null);
    try {
      const res = await fetch(
        `${API_BASE}/kunjungan/${data.id}/request-reschedule`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ recommendation_notes: rescheduleNotes }),
        },
      );
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body?.message ?? `HTTP ${res.status}`);
      onSuccess();
      onClose();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setApiError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
        {apiError && (
          <div className="flex items-start gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            <FiAlertCircle className="text-lg flex-shrink-0 mt-0.5" />
            <span>{apiError}</span>
          </div>
        )}

        {/* Pemohon Info */}
        <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-4">
          <div className="w-14 h-14 bg-gray-800 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
            <img
              src={`https://api.dicebear.com/7.x/notionists/svg?seed=${data.applicant}`}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-1">
              Pemohon
            </p>
            <p className="text-base font-bold text-gray-900">
              {data.applicant}
            </p>
            <p className="text-xs text-gray-500">{data.applicantRole}</p>
          </div>
        </div>

        {/* Tanggal & Waktu */}
        <div className="flex gap-4">
          <div className="flex-1 bg-slate-50 p-4 rounded-2xl">
            <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-2">
              Tanggal
            </p>
            <div className="flex items-center gap-2 text-gray-900 font-semibold">
              <FiCalendar className="text-teal-600 text-lg" />
              {data.date}
            </div>
          </div>
          <div className="flex-1 bg-slate-50 p-4 rounded-2xl">
            <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-2">
              Waktu / Sesi
            </p>
            <div className="flex items-center gap-2 text-gray-900 font-semibold">
              <FiClock className="text-teal-600 text-lg" />
              {data.session}
            </div>
          </div>
        </div>

        {/* Kapasitas Sesi Aktual */}
        <div
          className={`p-4 rounded-2xl flex items-center justify-between bg-white border shadow-sm relative overflow-hidden ${data.capacityAvailable ? "border-blue-50" : "border-red-50"}`}
        >
          <div
            className={`absolute top-0 left-0 w-1 h-full ${data.capacityAvailable ? "bg-blue-500" : "bg-red-500"}`}
          ></div>
          <div className="pl-2">
            <p
              className={`text-[10px] font-bold tracking-wider uppercase mb-1 ${data.capacityAvailable ? "text-blue-500" : "text-red-500"}`}
            >
              Kapasitas Sesi Aktual
            </p>
            <p className="text-sm font-bold text-slate-800">
              {data.capacityAvailable
                ? "Sesi Tersedia"
                : "Sesi Penuh / Konflik"}
            </p>
          </div>
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${data.capacityAvailable ? "bg-blue-50 text-blue-600" : "bg-red-50 text-red-600"}`}
          >
            {data.capacityAvailable ? (
              <FaCalendarCheck className="text-lg" />
            ) : (
              <FiXCircle className="text-lg" />
            )}
          </div>
        </div>

        {/* Dynamic Forms */}
        {isApproving && data.capacityAvailable && (
          <div className="animate-in fade-in slide-in-from-top-2 bg-teal-50/50 p-4 rounded-2xl border border-teal-100">
            <p className="text-sm text-teal-800">
              Anda akan menyetujui kunjungan ini. Pastikan jadwal tidak
              bertabrakan dengan agenda panti lainnya.
            </p>
          </div>
        )}

        {isRejecting && (
          <div className="animate-in fade-in slide-in-from-top-2">
            <label className="block text-[11px] font-bold text-red-500 tracking-wider uppercase mb-2">
              Alasan Penolakan (Wajib)
            </label>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              disabled={isSubmitting}
              placeholder="Mohon maaf, acara bertabrakan dengan kegiatan panti..."
              className="w-full bg-red-50/50 border border-red-100 shadow-inner rounded-xl p-4 text-sm text-red-900 placeholder-red-300 focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all resize-none h-28 disabled:opacity-60"
            />
          </div>
        )}

        {isRescheduling && !data.capacityAvailable && (
          <div className="animate-in fade-in slide-in-from-top-2">
            <label className="block text-[11px] font-bold text-amber-600 tracking-wider uppercase mb-2">
              Rekomendasi Jadwal Ulang (Wajib)
            </label>
            <textarea
              value={rescheduleNotes}
              onChange={(e) => setRescheduleNotes(e.target.value)}
              disabled={isSubmitting}
              placeholder="Tuliskan alasan dan berikan rekomendasi jadwal alternatif."
              className="w-full bg-gray-50 border border-gray-200 shadow-inner rounded-xl p-4 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-all resize-none h-28 disabled:opacity-60 placeholder:italic"
            />
          </div>
        )}
      </div>

      <div className="p-6 flex items-center gap-4 bg-white border-t border-gray-50/50 mt-auto">
        {["APPROVED", "NEEDS_RESCHEDULE", "REJECTED"].includes(data.status) ? (
          (() => {
            // Kamus Keadaan (State Dictionary)
            const stateConfig: Record<
              string,
              { bg: string; icon: string; text: string; message: string }
            > = {
              APPROVED: {
                bg: "bg-emerald-50 border-emerald-200",
                icon: "text-emerald-500",
                text: "text-emerald-700",
                message: "Kunjungan telah disetujui.",
              },
              NEEDS_RESCHEDULE: {
                bg: "bg-amber-50 border-amber-200",
                icon: "text-amber-500",
                text: "text-amber-700",
                message: "Menunggu respons Reschedule dari pengunjung.",
              },
              REJECTED: {
                bg: "bg-red-50 border-red-200",
                icon: "text-red-500",
                text: "text-red-700",
                message: "Pengajuan kunjungan telah ditolak.",
              },
            };

            const config = stateConfig[data.status] || {
              bg: "bg-slate-50 border-slate-200",
              icon: "text-slate-500",
              text: "text-slate-700",
              message: `Kunjungan ini telah diproses (${data.status})`,
            };

            return (
              <div
                className={`w-full py-4 px-6 border rounded-xl flex items-center justify-center gap-3 ${config.bg}`}
              >
                <FiAlertCircle className={`text-xl ${config.icon}`} />
                <span className={`font-bold ${config.text}`}>
                  {config.message}
                </span>
              </div>
            );
          })()
        ) : data.status === "PENDING" && data.is_expired ? (
          <div className="w-full py-4 px-6 border rounded-xl flex items-center justify-center gap-3 bg-red-50 border-red-200">
            <FiAlertCircle className="text-xl text-red-500" />
            <span className="font-bold text-red-700 text-sm text-left">
              Pengajuan ini telah melewati batas waktu jadwal kunjungan dan
              dibatalkan secara otomatis oleh sistem.
            </span>
          </div>
        ) : (
          <>
            {/* TOMBOL AKSI: Dieksekusi jika status adalah PENDING */}
            {!isApproving && !isRescheduling && (
              <button
                onClick={handleReject}
                disabled={isSubmitting}
                className={`flex-1 py-3 font-bold rounded-xl transition-all disabled:opacity-50 ${isRejecting ? "bg-red-600 text-white shadow-md" : "text-red-600 hover:bg-red-50"}`}
              >
                {isSubmitting && isRejecting ? (
                  <>
                    <FiLoader className="inline animate-spin mr-2" />
                    Memproses
                  </>
                ) : isRejecting ? (
                  "Konfirmasi Tolak"
                ) : (
                  "Tolak Pengajuan"
                )}
              </button>
            )}

            {!isRejecting && !isRescheduling && data.capacityAvailable && (
              <button
                onClick={handleApprove}
                disabled={isSubmitting}
                className="flex-1 py-3 bg-teal-700 text-white font-bold hover:bg-teal-800 rounded-xl shadow-[0_4px_20px_rgba(15,118,110,0.2)] hover:shadow-[0_6px_24px_rgba(15,118,110,0.3)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:translate-y-0 flex justify-center items-center"
              >
                {isSubmitting && isApproving ? (
                  <>
                    <FiLoader className="inline animate-spin mr-2" />
                    Memproses
                  </>
                ) : isApproving ? (
                  "Konfirmasi Setujui"
                ) : (
                  "Terima Pengajuan"
                )}
              </button>
            )}

            {!isRejecting && !isApproving && !data.capacityAvailable && (
              <button
                onClick={handleReschedule}
                disabled={isSubmitting}
                className="flex-1 py-3 bg-amber-500 text-white font-bold hover:bg-amber-600 rounded-xl shadow-[0_4px_20px_rgba(245,158,11,0.2)] hover:shadow-[0_6px_24px_rgba(245,158,11,0.3)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:translate-y-0 flex justify-center items-center"
              >
                {isSubmitting && isRescheduling ? (
                  <>
                    <FiLoader className="inline animate-spin mr-2" />
                    Memproses
                  </>
                ) : isRescheduling ? (
                  "Kirim Permintaan"
                ) : (
                  "Minta Reschedule"
                )}
              </button>
            )}

            {(isApproving || isRejecting || isRescheduling) &&
              !isSubmitting && (
                <button
                  onClick={resetStates}
                  className="px-4 py-3 text-gray-500 font-bold hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Batal
                </button>
              )}
          </>
        )}
      </div>
    </>
  );
}
