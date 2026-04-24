"use client";

import React from "react";
import { 
  MdOutlineAttachMoney, 
  MdOutlineInventory2, 
  MdOutlineSecurity, 
  MdOutlineFileDownload,
  MdOutlineWarningAmber,
  MdArrowDropDown,
  MdOutlinePerson
} from "react-icons/md";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from "recharts";

const trendData = [
  { month: "Mei", dana: 8000000 },
  { month: "Jun", dana: 12000000 },
  { month: "Jul", dana: 10500000 },
  { month: "Agt", dana: 15000000 },
  { month: "Sep", dana: 13500000 },
  { month: "Okt", dana: 18000000 },
];

const rejectedLog = [
  { id: 1, item: "Pakaian Bekas Dewasa", reason: "Tidak Layak Pakai", by: "Bapak Ahmad", date: "24 Okt 2026" },
  { id: 2, item: "Makanan Kaleng", reason: "Mendekati Expired", by: "Ibu Siti", date: "23 Okt 2026" },
  { id: 3, item: "Mainan Rusak", reason: "Berbahaya untuk Anak", by: "Bapak Ahmad", date: "20 Okt 2026" },
  { id: 4, item: "Buku Bekas Sobek", reason: "Halaman Hilang", by: "Bapak Ahmad", date: "18 Okt 2026" },
];

const arusBarang = [
  { item: "Beras Premium", masuk: 150, keluar: 80, unit: "kg" },
  { item: "Sepatu Anak", masuk: 40, keluar: 35, unit: "pasang" },
  { item: "Susu Formula", masuk: 60, keluar: 15, unit: "kaleng" },
];

export default function LaporanStrategisPage() {
  return (
    <div className="flex h-full w-full relative overflow-hidden">
      <div className="flex-1 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] p-6 lg:p-10 pb-20 overflow-y-auto">
        <div className="max-w-7xl mx-auto w-full space-y-8">
          
          {/* Action Bar (Top Level) */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">Laporan Strategis & Audit Operasional</h1>
              <p className="text-gray-500">Ringkasan performa panti, analitik finansial, dan audit logistik harian.</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white/60 backdrop-blur-md shadow-sm rounded-xl text-sm font-bold text-gray-700 hover:bg-white transition-colors border-none">
                Oktober 2026 <MdArrowDropDown className="text-lg text-gray-400" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white/60 backdrop-blur-md shadow-sm rounded-xl text-sm font-bold text-gray-700 hover:bg-white transition-colors border-none">
                Semua Kategori <MdArrowDropDown className="text-lg text-gray-400" />
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-teal-700 text-white shadow-[0_4px_14px_rgba(15,118,110,0.3)] rounded-xl text-sm font-bold hover:-translate-y-0.5 transition-all border-none">
                <MdOutlineFileDownload className="text-lg" /> Ekspor Laporan (PDF)
              </button>
            </div>
          </div>

          {/* Metric Cards (3 Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Finansial */}
            <div className="bg-white/60 backdrop-blur-xl shadow-md shadow-gray-200/40 rounded-3xl p-6 border-none flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-100 flex items-center justify-center text-teal-700">
                  <MdOutlineAttachMoney className="text-2xl" />
                </div>
                <span className="px-3 py-1 bg-teal-50 text-teal-700 text-[10px] font-bold rounded-full uppercase tracking-wider">Finansial</span>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-1">Total Donasi Dana</p>
                <h2 className="text-2xl font-black text-[#0B648C]">Rp 18.000.000</h2>
              </div>
            </div>

            {/* Logistik */}
            <div className="bg-white/60 backdrop-blur-xl shadow-md shadow-gray-200/40 rounded-3xl p-6 border-none flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700">
                  <MdOutlineInventory2 className="text-2xl" />
                </div>
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-full uppercase tracking-wider">Logistik</span>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-1">Tingkat Distribusi Barang</p>
                <div className="flex items-end gap-3">
                  <h2 className="text-2xl font-black text-gray-900">76%</h2>
                  <p className="text-sm font-bold text-green-500 mb-1">+5% M/M</p>
                </div>
              </div>
            </div>

            {/* Keamanan */}
            <div className="bg-white/60 backdrop-blur-xl shadow-md shadow-gray-200/40 rounded-3xl p-6 border-none flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <MdOutlineSecurity className="text-2xl" />
                </div>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full uppercase tracking-wider">Keamanan</span>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-1">Kunjungan Tervalidasi</p>
                <h2 className="text-2xl font-black text-gray-900">18 Sesi</h2>
              </div>
            </div>
          </div>

          {/* Main Content Area (Split Layout) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Sisi Kiri (Analitik & Arus Barang) */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              
              {/* Section A: Area Chart */}
              <div className="bg-white/60 backdrop-blur-xl shadow-md shadow-gray-200/40 rounded-3xl p-8 border-none flex flex-col">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Tren Donasi Dana (6 Bulan Terakhir)</h3>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorDana" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0B648C" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#0B648C" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                      <XAxis 
                        dataKey="month" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 600 }}
                        dy={10}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#6B7280', fontSize: 12 }}
                        tickFormatter={(value) => `Rp ${value / 1000000}M`}
                      />
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontWeight: 'bold' }}
                        formatter={(value: any) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(Number(value) || 0)}
                      />
                      <Area type="monotone" dataKey="dana" stroke="#0B648C" strokeWidth={3} fillOpacity={1} fill="url(#colorDana)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Section B: Ringkasan Arus Barang */}
              <div className="bg-white/60 backdrop-blur-xl shadow-md shadow-gray-200/40 rounded-3xl p-8 border-none">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Ringkasan Arus Barang (Top 3)</h3>
                <div className="space-y-6">
                  {arusBarang.map((item, idx) => {
                    const total = Math.max(item.masuk, item.keluar);
                    const percentMasuk = (item.masuk / total) * 100;
                    const percentKeluar = (item.keluar / total) * 100;
                    
                    return (
                      <div key={idx}>
                        <div className="flex justify-between items-end mb-2">
                          <h4 className="font-bold text-gray-900">{item.item}</h4>
                          <span className="text-xs font-bold text-gray-400 uppercase">{item.unit}</span>
                        </div>
                        <div className="space-y-2">
                          {/* Masuk */}
                          <div className="flex items-center gap-3">
                            <span className="w-16 text-xs font-bold text-blue-600">IN: {item.masuk}</span>
                            <div className="flex-1 h-3 bg-blue-50 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500 rounded-full" style={{ width: `${percentMasuk}%` }}></div>
                            </div>
                          </div>
                          {/* Keluar */}
                          <div className="flex items-center gap-3">
                            <span className="w-16 text-xs font-bold text-amber-600">OUT: {item.keluar}</span>
                            <div className="flex-1 h-3 bg-amber-50 rounded-full overflow-hidden">
                              <div className="h-full bg-amber-500 rounded-full" style={{ width: `${percentKeluar}%` }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Sisi Kanan (Audit Panel) */}
            <div className="bg-red-50/50 backdrop-blur-xl shadow-md shadow-red-100/50 rounded-3xl p-8 border-none flex flex-col h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                  <MdOutlineWarningAmber className="text-xl" />
                </div>
                <h3 className="text-lg font-bold text-red-900">Audit Penolakan</h3>
              </div>
              
              <p className="text-sm text-red-700/80 mb-6 font-medium">Log riwayat penolakan barang masuk oleh staf validasi.</p>

              <div className="flex-1 space-y-4 overflow-y-auto pr-2 scrollbar-hide">
                {rejectedLog.map((log) => (
                  <div key={log.id} className="bg-white/60 p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-gray-900 text-sm">{log.item}</h4>
                      <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">{log.date}</span>
                    </div>
                    <p className="text-xs text-red-600 font-bold mb-2">Alasan: {log.reason}</p>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <MdOutlinePerson className="text-gray-400" />
                      Oleh: <span className="font-bold">{log.by}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-6 py-3 bg-red-100 text-red-700 font-bold text-sm rounded-xl hover:bg-red-200 transition-colors">
                Lihat Semua Log
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
