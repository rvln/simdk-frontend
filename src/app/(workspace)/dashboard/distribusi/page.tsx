"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FiSearch, FiFilter, FiX } from "react-icons/fi";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  batch: string;
  stock: number;
  unit: string;
}

const MOCK_INVENTORY: InventoryItem[] = [
  { id: "1", name: "Sepatu Sekolah Anak", category: "PAKAIAN / ALAS KAKI", batch: "Aug-2023", stock: 15, unit: "Pasang" },
  { id: "2", name: "Beras Premium 5kg", category: "SEMBAKO", batch: "Sep-2023", stock: 15, unit: "Karung" },
  { id: "3", name: "Buku Tulis A5", category: "ALAT TULIS", batch: "Aug-2023", stock: 150, unit: "Pack" },
  { id: "4", name: "Susu Bayi Tahap 1", category: "NUTRISI", batch: "Oct-2023", stock: 15, unit: "Kaleng" },
  { id: "5", name: "Seragam Sekolah SD", category: "PAKAIAN / ALAS KAKI", batch: "Aug-2023", stock: 15, unit: "Pasang" },
  { id: "6", name: "Gula 5kg", category: "SEMBAKO", batch: "Sep-2023", stock: 6, unit: "Pcs" },
  { id: "7", name: "Buku Gambar A5", category: "ALAT TULIS", batch: "Aug-2023", stock: 20, unit: "Pcs" },
  { id: "8", name: "Telur Ayam", category: "NUTRISI", batch: "Oct-2023", stock: 15, unit: "Pcs" }
];

interface DistributionHistory {
  id: string;
  date: string;
  itemName: string;
  amount: number;
  unit: string;
  recipient: string;
  pic: string;
}

const MOCK_HISTORY: DistributionHistory[] = [
  { id: "H1", date: "24 Apr 2026", itemName: "Beras Premium 5kg", amount: 5, unit: "Karung", recipient: "Dapur Asrama Putra", pic: "Ahmad Sahroni" }
];

type FormInputs = {
  amount_distributed: number;
  recipient: string;
  notes: string;
};

export default function DistribusiPage() {
  const [activeTab, setActiveTab] = useState<"inventaris" | "riwayat">("inventaris");
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [history, setHistory] = useState<DistributionHistory[]>(MOCK_HISTORY);
  const [inventory, setInventory] = useState<InventoryItem[]>(MOCK_INVENTORY);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormInputs>();

  const openPanel = (item: InventoryItem) => {
    setSelectedItem(item);
    reset({ amount_distributed: 0, recipient: "", notes: "" });
    setIsPanelOpen(true);
  };

  const closePanel = () => {
    setIsPanelOpen(false);
    setTimeout(() => setSelectedItem(null), 300); // Tunggu animasi transisi
  };

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    if (!selectedItem) return;

    // Deduksi stok
    setInventory(prev => prev.map(inv => 
      inv.id === selectedItem.id 
        ? { ...inv, stock: inv.stock - data.amount_distributed } 
        : inv
    ));

    // Tambah ke riwayat
    const newLog: DistributionHistory = {
      id: `H${Date.now()}`,
      date: new Date().toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' }),
      itemName: selectedItem.name,
      amount: data.amount_distributed,
      unit: selectedItem.unit,
      recipient: data.recipient,
      pic: "Ahmad Sahroni" // Simulated user
    };
    
    setHistory(prev => [newLog, ...prev]);
    
    alert(`Berhasil mendistribusikan ${data.amount_distributed} ${selectedItem.unit} ${selectedItem.name}`);
    closePanel();
  };

  return (
    <div className="flex h-full w-full relative overflow-hidden bg-[#F9FAFB]">
      <div className={`flex-1 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] p-8 overflow-y-auto ${isPanelOpen ? 'pr-[450px]' : ''}`}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Distribusi Bantuan & Inventaris</h1>
            <p className="text-gray-500 text-lg">Catat pengeluaran barang dari gudang untuk menjaga akurasi stok dan transparansi alokasi publik.</p>
          </div>

          {/* Action Bar */}
          <div className="flex gap-4 mb-8 items-center flex-wrap">
            <div className="relative w-80">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400 text-lg" />
              </div>
              <input 
                type="text" 
                placeholder="Cari di Inventaris..." 
                className="w-full pl-11 pr-4 py-3.5 bg-white rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B648C]/20 shadow-sm border-none"
              />
            </div>
            <button className="flex items-center gap-2 px-6 py-3.5 bg-white rounded-xl text-gray-700 shadow-sm text-sm font-medium hover:bg-gray-50 transition-colors">
              <FiFilter /> Filter Kategori
            </button>
            <button className="flex items-center gap-2 px-6 py-3.5 bg-[#E6F4F1] text-[#0B648C] rounded-xl text-sm font-bold shadow-sm hover:bg-[#d6ebe7] transition-colors">
              Tersedia
            </button>
            
            <div className="ml-auto flex bg-gray-100/80 p-1.5 rounded-xl border border-gray-200/50">
              <button 
                onClick={() => setActiveTab("inventaris")} 
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'inventaris' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Grid Inventaris
              </button>
              <button 
                onClick={() => setActiveTab("riwayat")} 
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'riwayat' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Riwayat Distribusi
              </button>
            </div>
          </div>

          {activeTab === "inventaris" ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {inventory.map(item => (
                <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border-none flex flex-col h-full group">
                  {/* Image Placeholder area */}
                  <div className="bg-gray-200/60 h-40 relative p-4 flex flex-col justify-between">
                    <div className="bg-white/95 backdrop-blur-sm w-max px-3 py-1.5 rounded-md text-[9px] font-bold tracking-widest text-[#0B648C] shadow-sm uppercase">
                      {item.category}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-[17px] font-bold text-gray-900 mb-1 leading-tight group-hover:text-[#0B648C] transition-colors">{item.name}</h3>
                    <p className="text-[13px] text-gray-500 mb-6">Stock Batch: {item.batch}</p>
                    
                    <div className="mt-auto">
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Stok Tersedia</p>
                      <p className="text-xl font-black text-gray-900 mb-5">{item.stock} <span className="text-sm font-medium text-gray-500">{item.unit}</span></p>
                      <button 
                        onClick={() => openPanel(item)}
                        disabled={item.stock <= 0}
                        className="w-full py-2.5 rounded-xl border-2 border-[#0B648C] text-[#0B648C] font-bold text-sm hover:bg-[#0B648C] hover:text-white transition-all disabled:opacity-40 disabled:border-gray-300 disabled:text-gray-400 disabled:bg-transparent disabled:cursor-not-allowed"
                      >
                        {item.stock > 0 ? "Distribusikan" : "Stok Habis"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border-none">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/80 border-b border-gray-100">
                    <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Tanggal</th>
                    <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Item Distribusi</th>
                    <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Jumlah</th>
                    <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Penerima / Tujuan</th>
                    <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider">PIC Pengurus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {history.map(log => (
                    <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-8 py-5 text-sm font-medium text-gray-900">{log.date}</td>
                      <td className="px-8 py-5 text-sm font-semibold text-gray-900">{log.itemName}</td>
                      <td className="px-8 py-5 text-sm font-bold text-[#0B648C]">{log.amount} {log.unit}</td>
                      <td className="px-8 py-5 text-sm text-gray-600">{log.recipient}</td>
                      <td className="px-8 py-5 text-sm text-gray-500">{log.pic}</td>
                    </tr>
                  ))}
                  {history.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-8 py-16 text-center text-gray-400 font-medium text-sm">Belum ada riwayat distribusi yang dicatat.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Right Side Panel */}
      <div className={`fixed top-0 right-0 bottom-0 w-[480px] bg-white/95 backdrop-blur-2xl shadow-[-10px_0_40px_rgba(0,0,0,0.06)] transform transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] z-50 flex flex-col ${isPanelOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-start justify-between p-8 pb-6 border-b border-gray-100/50">
          <div>
            <h2 className="text-[22px] font-bold text-gray-900 tracking-tight mb-1.5">Catat Distribusi Barang</h2>
            <p className="text-sm text-gray-500 leading-relaxed">Formulir alokasi barang inventaris untuk unit panti asuhan.</p>
          </div>
          <button onClick={closePanel} className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors -mr-2">
            <FiX className="text-xl" />
          </button>
        </div>

        {selectedItem && (
          <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-8 pt-6 flex flex-col gap-6">
              
              {/* Info Box */}
              <div className="bg-[#F6F9F9] rounded-2xl p-6 border border-[#E6F0F1]">
                <p className="text-[10px] font-bold text-[#0B648C] tracking-widest uppercase mb-4">Informasi Barang</p>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{selectedItem.name}</h3>
                    <p className="text-[13px] text-gray-500">Kategori: {selectedItem.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-bold text-gray-400 tracking-widest uppercase mb-1">Batas Maksimal</p>
                    <p className="text-base font-bold text-[#0B648C]">{selectedItem.stock} {selectedItem.unit}</p>
                  </div>
                </div>
              </div>

              {/* Amount Input */}
              <div>
                <label className="block text-[11px] font-bold text-gray-800 tracking-wider uppercase mb-3">Jumlah Didistribusikan</label>
                <div className="relative">
                  <input 
                    type="number"
                    {...register("amount_distributed", { 
                      required: "Jumlah distribusi wajib diisi",
                      valueAsNumber: true,
                      min: { value: 1, message: "Jumlah minimal adalah 1" },
                      max: { value: selectedItem.stock, message: `Opps! Maksimal stok tersedia di gudang adalah ${selectedItem.stock}` }
                    })}
                    placeholder="0"
                    className={`w-full bg-white border ${errors.amount_distributed ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-[#0B648C] focus:ring-[#0B648C]'} rounded-xl pl-5 pr-20 py-4 text-base text-gray-900 shadow-sm focus:outline-none focus:ring-1 transition-all`}
                  />
                  <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none">
                    <span className="text-xs font-bold text-gray-300 uppercase">{selectedItem.unit}</span>
                  </div>
                </div>
                {errors.amount_distributed && <p className="text-red-500 text-[13px] font-medium mt-2">{errors.amount_distributed.message}</p>}
              </div>

              {/* Target */}
              <div>
                <label className="block text-[11px] font-bold text-gray-800 tracking-wider uppercase mb-3">Penerima / Alokasi Target</label>
                <select 
                  {...register("recipient", { required: "Pilih target alokasi penerima" })}
                  className={`w-full bg-white border ${errors.recipient ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-[#0B648C] focus:ring-[#0B648C]'} rounded-xl px-5 py-4 text-sm text-gray-800 focus:outline-none focus:ring-1 shadow-sm transition-all appearance-none cursor-pointer`}
                >
                  <option value="">Pilih Target Alokasi...</option>
                  <option value="Dapur Asrama Putra">Dapur Asrama Putra</option>
                  <option value="Dapur Asrama Putri">Dapur Asrama Putri</option>
                  <option value="Fasilitas Umum">Fasilitas Umum</option>
                  <option value="Eksternal / Lainnya">Eksternal / Lainnya</option>
                </select>
                {errors.recipient && <p className="text-red-500 text-[13px] font-medium mt-2">{errors.recipient.message}</p>}
              </div>

              {/* Notes */}
              <div>
                <label className="block text-[11px] font-bold text-gray-800 tracking-wider uppercase mb-3">Keterangan Tambahan</label>
                <textarea 
                  {...register("notes", { required: "Keterangan wajib diisi sebagai audit trail" })}
                  placeholder="Contoh: Digunakan untuk pembagian perlengkapan semester baru unit 4..."
                  className={`w-full bg-white border ${errors.notes ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-[#0B648C] focus:ring-[#0B648C]'} rounded-xl p-5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 shadow-sm transition-all resize-none h-32`}
                ></textarea>
                {errors.notes && <p className="text-red-500 text-[13px] font-medium mt-2">{errors.notes.message}</p>}
              </div>

            </div>

            <div className="p-8 pt-5 flex flex-col gap-3 bg-white mt-auto border-t border-gray-100">
              <button 
                type="submit"
                className="w-full py-4 bg-[#0B648C] text-white font-bold rounded-xl shadow-[0_4px_14px_rgba(11,100,140,0.3)] hover:shadow-[0_6px_24px_rgba(11,100,140,0.4)] hover:-translate-y-0.5 transition-all text-[15px]"
              >
                Catat Distribusi & Kurangi Stok
              </button>
              <button 
                type="button"
                onClick={closePanel}
                className="w-full py-4 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-colors text-[15px]"
              >
                Batal
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
