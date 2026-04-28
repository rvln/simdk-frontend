"use client";

import React from "react";
import {
  FiCalendar,
  FiClock,
  FiBox,
  FiXCircle,
} from "react-icons/fi";
import { FaCalendarCheck } from "react-icons/fa6";

export interface ApprovalData {
  id: number;
  name: string;
  date: string;
  session: string;
  timeRange: string;
  badge: string;
  icon: React.ReactNode;
  iconBg: string;
  applicant: string;
  applicantRole: string;
  details: string;
  bringsDonation: boolean;
  capacityAvailable: boolean;
}

interface ApprovalContentProps {
  data: ApprovalData;
  onApprove: () => void;
  onReject: () => void;
}

/**
 * ApprovalContent — Detail view for a single visit request.
 * Extracted from (workspace)/dashboard/approval-kunjungan/page.tsx.
 * This component is presentation-only; all actions are lifted to the parent
 * via callbacks (onApprove / onReject) to keep business logic out of the UI layer.
 */
export function ApprovalContent({ data, onApprove, onReject }: ApprovalContentProps) {
  return (
    <>
      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
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
            <p className="text-base font-bold text-gray-900">{data.applicant}</p>
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
              Waktu
            </p>
            <div className="flex items-center gap-2 text-gray-900 font-semibold">
              <FiClock className="text-teal-600 text-lg" />
              {data.timeRange}
            </div>
          </div>
        </div>

        {/* Rincian Kegiatan */}
        <div>
          <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-2">
            Rincian Kegiatan
          </p>
          <div className="bg-slate-50 p-5 rounded-2xl text-sm text-gray-600 leading-relaxed italic border-l-2 border-teal-100">
            {data.details}
          </div>
        </div>

        {/* Status Barang Bawaan */}
        <div
          className={`p-4 rounded-2xl flex items-center justify-between ${
            data.bringsDonation ? "bg-teal-50/50" : "bg-slate-50"
          }`}
        >
          <div>
            <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-1">
              Status Barang Bawaan
            </p>
            <p
              className={`text-sm font-bold ${
                data.bringsDonation ? "text-teal-800" : "text-gray-600"
              }`}
            >
              {data.bringsDonation
                ? "Ya, Membawa Donasi Fisik"
                : "Tidak Membawa Barang"}
            </p>
          </div>
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              data.bringsDonation
                ? "bg-teal-600 text-white shadow-[0_4px_12px_rgba(13,148,136,0.3)]"
                : "bg-gray-200 text-gray-400"
            }`}
          >
            <FiBox className="text-lg" />
          </div>
        </div>

        {/* Kapasitas Sesi Aktual */}
        <div className="p-4 rounded-2xl flex items-center justify-between bg-white border border-blue-50 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
          <div className="pl-2">
            <p className="text-[10px] font-bold text-blue-500 tracking-wider uppercase mb-1">
              Kapasitas Sesi Aktual
            </p>
            <p className="text-sm font-bold text-slate-800">
              {data.capacityAvailable
                ? "Sesi Tersedia"
                : "Sesi Penuh / Konflik"}
            </p>
          </div>
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              data.capacityAvailable
                ? "bg-blue-50 text-blue-600"
                : "bg-red-50 text-red-600"
            }`}
          >
            {data.capacityAvailable ? (
              <FaCalendarCheck className="text-lg" />
            ) : (
              <FiXCircle className="text-lg" />
            )}
          </div>
        </div>
      </div>

      {/* Sticky footer actions */}
      <div className="p-6 flex items-center gap-4 bg-white border-t border-gray-50/50 mt-auto">
        <button
          onClick={onReject}
          className="flex-1 py-3 text-red-600 font-bold hover:bg-red-50 rounded-xl transition-colors"
        >
          Tolak Pengajuan
        </button>
        <button
          onClick={onApprove}
          className="flex-1 py-3 bg-teal-700 text-white font-bold hover:bg-teal-800 rounded-xl shadow-[0_4px_20px_rgba(15,118,110,0.2)] hover:shadow-[0_6px_24px_rgba(15,118,110,0.3)] hover:-translate-y-0.5 transition-all"
        >
          Terima Pengajuan
        </button>
      </div>
    </>
  );
}
