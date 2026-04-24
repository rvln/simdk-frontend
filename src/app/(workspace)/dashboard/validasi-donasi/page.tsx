"use client";

import React, { useState } from "react";
import { 
  FiSearch, 
  FiFilter, 
  FiX, 
  FiChevronRight,
  FiBox,
  FiImage
} from "react-icons/fi";
import { FaMoneyBillWave, FaClock, FaCheckCircle } from "react-icons/fa";

type DonationType = "BARANG" | "DANA";

interface DonationItem {
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

const MOCK_BARANG: DonationItem[] = [
  {
    id: "1",
    resi: "TXN-DON-2026-8842",
    name: "Sepatu Sekolah Anak",
    type: "BARANG",
    donor: "Budi Santoso",
    timeInfo: "Tiba hari ini",
    statusBadge: "MENUNGGU KEDATANGAN",
    category: "Pakaian/Alas Kaki",
    condition: "Baru",
    quantity: "2 Pasang",
    imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "3",
    resi: "TXN-DON-2026-8844",
    name: "Buku Tulis & Alat Lukis",
    type: "BARANG",
    donor: "Ahmad Faisal",
    timeInfo: "Sedang Dikirim",
    statusBadge: "MENUNGGU KEDATANGAN",
    category: "Pendidikan",
    condition: "Baru",
    quantity: "1 Dus",
    imageUrl: "https://images.unsplash.com/photo-1503694978374-8a2fa686963a?q=80&w=400&auto=format&fit=crop"
  }
];

const MOCK_DANA: DonationItem[] = [
  {
    id: "2",
    resi: "TXN-DON-2026-8843",
    name: "Donasi Operasional Panti",
    type: "DANA",
    donor: "Siti Aminah",
    timeInfo: "Diunggah 2 jam lalu",
    statusBadge: "TERKONFIRMASI SISTEM",
    amount: "Rp 5.000.000",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=400&auto=format&fit=crop" // Mock receipt image
  }
];

export default function ValidasiDonasiPage() {
  const [activeTab, setActiveTab] = useState<DonationType>("BARANG");
  const [selectedDonation, setSelectedDonation] = useState<DonationItem | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const handleClose = () => {
    setSelectedDonation(null);
    setRejectReason("");
  };

  const handleTabSwitch = (tab: DonationType) => {
    setActiveTab(tab);
    handleClose(); // Close right panel on tab switch
  };

  const currentData = activeTab === "BARANG" ? MOCK_BARANG : MOCK_DANA;

  return (
    <div className="flex h-full w-full relative overflow-hidden">
      {/* Main Content Area */}
      <div 
        className={`flex-1 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] p-8 overflow-y-auto ${
          selectedDonation ? 'pr-[450px]' : ''
        }`}
      >
        <div className="max-w-5xl mx-auto w-full">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
              Validasi & Check-in Barang
            </h1>
            <p className="text-gray-500 text-lg">
              Cocokkan kedatangan fisik barang atau pantau riwayat donasi finansial.
            </p>
          </div>

          {/* Toggle Tab (Pill Style) */}
          <div className="flex items-center bg-white/60 backdrop-blur-md p-1.5 rounded-full shadow-sm border-none w-fit mb-8">
            <button
              onClick={() => handleTabSwitch("BARANG")}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border-none ${
                activeTab === "BARANG" 
                  ? "bg-teal-700 text-white shadow-md" 
                  : "bg-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Validasi Donasi Barang
            </button>
            <button
              onClick={() => handleTabSwitch("DANA")}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border-none ${
                activeTab === "DANA" 
                  ? "bg-teal-700 text-white shadow-md" 
                  : "bg-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Riwayat Transaksi Dana
            </button>
          </div>

          {/* Filters & Search - Glassmorphism style */}
          <div className="bg-teal-50/30 backdrop-blur-md rounded-2xl p-4 mb-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border-none">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400 text-lg" />
                </div>
                <input 
                  type="text" 
                  placeholder="Cari Nomor Resi (TXN-DON)..." 
                  className="w-full pl-11 pr-4 py-3 bg-white rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 shadow-sm border-none"
                />
              </div>
              <button className="flex items-center gap-2 px-6 py-3 bg-white rounded-xl text-gray-600 shadow-sm text-sm font-medium hover:bg-gray-50 transition-colors border-none">
                <FiFilter /> Filter Kategori
              </button>
              <div className="flex items-center gap-2 px-6 py-3 bg-teal-100/50 rounded-xl text-teal-700 text-sm font-medium cursor-pointer hover:bg-teal-100 transition-colors border-none">
                {activeTab === "BARANG" ? "Status: Menunggu Kedatangan" : "Status: Semua"}
                <FiX className="ml-1 hover:text-teal-900" />
              </div>
            </div>
          </div>

          {/* List Area */}
          <div className="flex flex-col gap-4">
            {currentData.map((item) => {
              const isSelected = selectedDonation?.id === item.id;
              const isBarang = item.type === "BARANG";
              
              return (
                <div 
                  key={item.id}
                  onClick={() => {
                    setSelectedDonation(item);
                    setRejectReason("");
                  }}
                  className={`group flex items-center p-5 rounded-2xl cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? "bg-white ring-2 ring-teal-600 shadow-[0_8px_30px_rgb(0,0,0,0.06)]" 
                      : "bg-slate-50/70 backdrop-blur-md border-none hover:bg-white hover:shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:-translate-y-0.5"
                  }`}
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mr-5 transition-colors ${
                    isSelected 
                      ? 'bg-blue-100 text-blue-600' 
                      : isBarang ? 'bg-teal-50 text-teal-600' : 'bg-green-50 text-green-600'
                  }`}>
                    {isBarang ? <FiBox className="text-2xl" /> : <FaMoneyBillWave className="text-2xl" />}
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-[10px] font-bold tracking-wider text-teal-600 uppercase mb-1">
                      RESI: {item.resi}
                    </p>
                    <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
                      {item.name}
                      {!isBarang && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[9px] uppercase rounded-md tracking-wider">
                          DANA
                        </span>
                      )}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <span className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center text-[8px] text-gray-600">👤</span> 
                        {item.donor}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaClock className="text-gray-400 text-xs" /> 
                        {item.timeInfo}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end justify-center gap-2">
                    <span className={`px-3 py-1 text-[10px] font-bold tracking-wider rounded-full uppercase ${
                      isBarang ? 'bg-gray-200/60 text-gray-600' : 'bg-green-100 text-green-700'
                    }`}>
                      {item.statusBadge}
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

      {/* Right Side Panel (Detail & Validation) */}
      <div 
        className={`fixed top-20 right-0 bottom-0 w-[420px] bg-white/95 backdrop-blur-xl shadow-[-10px_0_40px_rgba(0,0,0,0.06)] border-none transform transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] z-40 flex flex-col ${
          selectedDonation ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {selectedDonation && (
          <>
            <div className="flex items-center justify-between p-6 border-b border-gray-100/50">
              <h2 className="text-xl font-bold text-gray-900">
                {selectedDonation.type === "BARANG" ? "Inspeksi Pra-Submission" : "Detail Transaksi Sistem"}
              </h2>
              <button 
                onClick={handleClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors border-none bg-transparent"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {/* Photo Evidence Placeholder */}
              <div className="w-full h-48 bg-slate-100 rounded-2xl overflow-hidden relative shadow-sm">
                {selectedDonation.imageUrl ? (
                  <img src={selectedDonation.imageUrl} alt="Bukti" className="w-full h-full object-cover" />
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
                <p className="text-base font-bold text-gray-900 mb-4">{selectedDonation.resi}</p>

                <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-1">Donatur</p>
                <p className="text-base font-bold text-gray-900 mb-4">{selectedDonation.donor}</p>

                <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-1">Nama {selectedDonation.type === "BARANG" ? "Barang" : "Donasi"}</p>
                <p className="text-base font-bold text-gray-900">{selectedDonation.name}</p>
                {selectedDonation.category && (
                  <p className="text-sm text-teal-700 font-medium mt-1">Kategori: {selectedDonation.category}</p>
                )}
              </div>

              {/* Conditional Block based on Type */}
              {selectedDonation.type === "BARANG" ? (
                <>
                  <div className="bg-slate-50 p-4 rounded-2xl border-none shadow-sm">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-gray-500">Kondisi</span>
                      <span className="text-sm font-bold text-green-600">{selectedDonation.condition}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Jumlah</span>
                      <span className="text-sm font-bold text-gray-900">{selectedDonation.quantity}</span>
                    </div>
                  </div>
                  
                  {/* Rejection Field */}
                  <div className="mt-2">
                    <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-2">Alasan Penolakan (Opsional)</p>
                    <textarea 
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                      placeholder="Alasan Penolakan (Jika barang tidak layak/rusak)..."
                      className="w-full bg-slate-50 border-none shadow-sm rounded-xl p-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all resize-none h-28"
                    ></textarea>
                  </div>
                </>
              ) : (
                <div className="bg-green-50 p-4 rounded-2xl border border-green-100">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-green-800 font-medium">Nominal Transfer</span>
                    <span className="text-lg font-bold text-green-700">{selectedDonation.amount}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons conditionally rendered */}
            <div className="p-6 flex flex-col gap-3 bg-white border-t border-gray-50/50 mt-auto">
              {selectedDonation.type === "BARANG" ? (
                <>
                  <button 
                    className="w-full py-3.5 bg-teal-700 text-white font-bold rounded-xl shadow-[0_4px_20px_rgba(15,118,110,0.2)] hover:shadow-[0_6px_24px_rgba(15,118,110,0.3)] hover:-translate-y-0.5 border-none transition-all"
                    onClick={() => {
                      alert("Donasi Divalidasi & Disetujui!");
                      handleClose();
                    }}
                  >
                    Validasi & Masukkan Inventaris
                  </button>
                  <button 
                    className="w-full py-3.5 text-red-600 bg-transparent border-none font-bold hover:bg-red-50 rounded-xl transition-colors"
                    onClick={() => {
                      if(!rejectReason.trim()) {
                        alert("Mohon isi alasan penolakan terlebih dahulu!");
                        return;
                      }
                      alert(`Donasi Ditolak. Alasan tercatat di RejectedLog:\n${rejectReason}`);
                      handleClose();
                    }}
                  >
                    Tolak & Catat Log
                  </button>
                </>
              ) : (
                <div className="w-full py-3.5 bg-green-50 text-green-700 font-bold text-center rounded-xl border border-green-200">
                  <FaCheckCircle className="inline-block mr-2 text-lg mb-0.5" /> Selesai / Terkonfirmasi Sistem
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
