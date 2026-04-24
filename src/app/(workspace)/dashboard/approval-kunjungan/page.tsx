"use client";

import React, { useState } from "react";
import { 
  FiSearch, 
  FiCalendar, 
  FiX, 
  FiCheckCircle,
  FiXCircle, 
  FiBox,
  FiClock,
  FiChevronRight
} from "react-icons/fi";
import { FaUserGraduate, FaBuilding, FaUsers, FaCalendarCheck } from "react-icons/fa6";

// Mock Data
const MOCK_DATA = [
  {
    id: 1,
    name: "BEM Universitas X",
    date: "15 Okt 2024",
    session: "Sesi Siang (13:00)",
    timeRange: "13:00 - 15:00",
    badge: "WORKSHOP & DONASI",
    icon: <FaUserGraduate className="text-2xl text-blue-500" />,
    iconBg: "bg-blue-100/70",
    applicant: "Budi Santoso",
    applicantRole: "Ketua Divisi Sosial - BEM Universitas X",
    details: '"Mengadakan workshop kerajinan tangan untuk anak-anak panti serta melakukan donasi kolektif buku-buku cerita dan alat tulis sekolah."',
    bringsDonation: true,
    capacityAvailable: true,
  },
  {
    id: 2,
    name: "PT Amanah Sejahtera",
    date: "16 Okt 2024",
    session: "Sesi Pagi (09:00)",
    timeRange: "09:00 - 11:00",
    badge: "CORPORATE VISIT",
    icon: <FaBuilding className="text-2xl text-gray-500" />,
    iconBg: "bg-gray-200/70",
    applicant: "Siti Rahmawati",
    applicantRole: "HR Manager - PT Amanah Sejahtera",
    details: '"Kunjungan CSR tahunan dari perusahaan. Kami akan mengadakan makan bersama dan memberikan bingkisan sembako."',
    bringsDonation: true,
    capacityAvailable: true,
  },
  {
    id: 3,
    name: "Keluarga Ibu Ratna",
    date: "17 Okt 2024",
    session: "Sesi Sore (15:30)",
    timeRange: "15:30 - 17:30",
    badge: "KUNJUNGAN PERSONAL",
    icon: <FaUsers className="text-2xl text-gray-500" />,
    iconBg: "bg-gray-200/70",
    applicant: "Ibu Ratna",
    applicantRole: "Individu",
    details: '"Kunjungan keluarga untuk merayakan ulang tahun anak saya bersama anak-anak panti di akhir pekan."',
    bringsDonation: false,
    capacityAvailable: false,
  }
];

export default function ApprovalKunjunganPage() {
  const [selectedVisit, setSelectedVisit] = useState<typeof MOCK_DATA[0] | null>(null);

  return (
    <div className="flex h-full w-full relative overflow-hidden">
      {/* Main Content Area */}
      <div 
        className={`flex-1 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] p-8 overflow-y-auto ${
          selectedVisit ? 'pr-[450px]' : ''
        }`}
      >
        <div className="max-w-5xl mx-auto w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
              Validasi & Approval Kunjungan
            </h1>
            <p className="text-gray-500 text-lg">
              Tinjau pengajuan jadwal untuk mencegah konflik dan memastikan kenyamanan anak-anak.
            </p>
          </div>

          {/* Filters & Search - Glassmorphism style */}
          <div className="bg-teal-50/30 backdrop-blur-md rounded-2xl p-4 mb-8 shadow-sm">
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400 text-lg" />
              </div>
              <input 
                type="text" 
                placeholder="Cari pengajuan..." 
                className="w-full pl-11 pr-4 py-3 bg-white rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-shadow border-none"
              />
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-gray-600 shadow-[0_2px_10px_rgba(0,0,0,0.02)] text-sm font-medium hover:bg-gray-50 transition-colors">
                <FiCalendar /> Filter Tanggal
              </button>
              <div className="flex items-center gap-2 px-4 py-2 bg-teal-100/50 rounded-full text-teal-700 text-sm font-medium">
                <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                Status: Menunggu (Pending)
                <FiX className="ml-1 cursor-pointer hover:text-teal-900" />
              </div>
            </div>
          </div>

          {/* List Area */}
          <div className="flex flex-col gap-4">
            {MOCK_DATA.map((item) => {
              const isSelected = selectedVisit?.id === item.id;
              return (
                <div 
                  key={item.id}
                  onClick={() => setSelectedVisit(item)}
                  className={`group flex items-center p-5 rounded-2xl cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? "bg-white ring-2 ring-teal-600 shadow-[0_8px_30px_rgb(0,0,0,0.06)]" 
                      : "bg-slate-50 hover:bg-white hover:shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:-translate-y-0.5"
                  }`}
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mr-5 transition-colors ${
                    isSelected ? 'bg-blue-100 text-blue-600' : item.iconBg
                  }`}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h3>
                    <p className={`text-sm ${isSelected ? 'text-teal-700 font-medium' : 'text-gray-500'}`}>
                      {item.date} | {item.session}
                    </p>
                  </div>
                  <div className="flex flex-col items-end justify-center gap-2">
                    <span className="px-3 py-1 bg-gray-200/60 text-gray-600 text-[10px] font-bold tracking-wider rounded-full uppercase">
                      {item.badge}
                    </span>
                    <FiChevronRight className={`text-xl transition-transform duration-300 ${
                      isSelected ? "text-teal-600 translate-x-1" : "text-gray-300 group-hover:text-teal-400 group-hover:translate-x-1"
                    }`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Side Panel (Detail View) */}
      <div 
        className={`fixed top-20 right-0 bottom-0 w-[420px] bg-white/95 backdrop-blur-xl shadow-[-10px_0_40px_rgba(0,0,0,0.06)] transform transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] z-40 flex flex-col ${
          selectedVisit ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {selectedVisit && (
          <>
            <div className="flex items-center justify-between p-6 border-b border-gray-100/50">
              <h2 className="text-xl font-bold text-gray-900">Detail Pengajuan Kunjungan</h2>
              <button 
                onClick={() => setSelectedVisit(null)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {/* Pemohon Info */}
              <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-4">
                <div className="w-14 h-14 bg-gray-800 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                  <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${selectedVisit.applicant}`} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-1">Pemohon</p>
                  <p className="text-base font-bold text-gray-900">{selectedVisit.applicant}</p>
                  <p className="text-xs text-gray-500">{selectedVisit.applicantRole}</p>
                </div>
              </div>

              {/* Tanggal & Waktu */}
              <div className="flex gap-4">
                <div className="flex-1 bg-slate-50 p-4 rounded-2xl">
                  <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-2">Tanggal</p>
                  <div className="flex items-center gap-2 text-gray-900 font-semibold">
                    <FiCalendar className="text-teal-600 text-lg" />
                    {selectedVisit.date}
                  </div>
                </div>
                <div className="flex-1 bg-slate-50 p-4 rounded-2xl">
                  <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-2">Waktu</p>
                  <div className="flex items-center gap-2 text-gray-900 font-semibold">
                    <FiClock className="text-teal-600 text-lg" />
                    {selectedVisit.timeRange}
                  </div>
                </div>
              </div>

              {/* Rincian Kegiatan */}
              <div>
                <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-2">Rincian Kegiatan</p>
                <div className="bg-slate-50 p-5 rounded-2xl text-sm text-gray-600 leading-relaxed italic border-l-2 border-teal-100">
                  {selectedVisit.details}
                </div>
              </div>

              {/* Status Barang Bawaan */}
              <div className={`p-4 rounded-2xl flex items-center justify-between ${selectedVisit.bringsDonation ? 'bg-teal-50/50' : 'bg-slate-50'}`}>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-1">Status Barang Bawaan</p>
                  <p className={`text-sm font-bold ${selectedVisit.bringsDonation ? 'text-teal-800' : 'text-gray-600'}`}>
                    {selectedVisit.bringsDonation ? 'Ya, Membawa Donasi Fisik' : 'Tidak Membawa Barang'}
                  </p>
                </div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedVisit.bringsDonation ? 'bg-teal-600 text-white shadow-[0_4px_12px_rgba(13,148,136,0.3)]' : 'bg-gray-200 text-gray-400'}`}>
                  <FiBox className="text-lg" />
                </div>
              </div>

              {/* Kapasitas Sesi Aktual */}
              <div className="p-4 rounded-2xl flex items-center justify-between bg-white border border-blue-50 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                <div className="pl-2">
                  <p className="text-[10px] font-bold text-blue-500 tracking-wider uppercase mb-1">Kapasitas Sesi Aktual</p>
                  <p className="text-sm font-bold text-slate-800">
                    {selectedVisit.capacityAvailable ? 'Sesi Tersedia' : 'Sesi Penuh / Konflik'}
                  </p>
                </div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedVisit.capacityAvailable ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'}`}>
                   {selectedVisit.capacityAvailable ? <FaCalendarCheck className="text-lg" /> : <FiXCircle className="text-lg" />}
                </div>
              </div>
            </div>

            <div className="p-6 flex items-center gap-4 bg-white border-t border-gray-50/50 mt-auto">
              <button 
                className="flex-1 py-3 text-red-600 font-bold hover:bg-red-50 rounded-xl transition-colors"
                onClick={() => alert("Pengajuan ditolak!")}
              >
                Tolak Pengajuan
              </button>
              <button 
                className="flex-1 py-3 bg-teal-700 text-white font-bold hover:bg-teal-800 rounded-xl shadow-[0_4px_20px_rgba(15,118,110,0.2)] hover:shadow-[0_6px_24px_rgba(15,118,110,0.3)] hover:-translate-y-0.5 transition-all"
                onClick={() => alert("Pengajuan diterima!")}
              >
                Terima Pengajuan
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
