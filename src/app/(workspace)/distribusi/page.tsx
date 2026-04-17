import React from 'react';
import { GlassContainer } from '@/components/ui/GlassContainer';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { InputField } from '@/components/ui/InputField';

export default function DistribusiBantuanPage() {
  return (
    <main className="flex-1 lg:p-10 px-6 py-6 pb-20">
      {/* Header Section */}
      <header className="mb-10 max-w-6xl">
        <h1 className="text-4xl font-black text-primary tracking-tight mb-2 font-sans">
          Distribusi Bantuan
        </h1>
        <p className="text-on-surface-variant font-public-sans text-lg">
          Log pencatatan penyaluran logistik ke anak panti dan operasional internal.
        </p>
      </header>

      <section className="max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
        
        {/* Left Column: Distribution History */}
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-on-surface font-sans">Riwayat Penyaluran Terakhir</h3>
            <span className="material-symbols-outlined text-outline-variant cursor-pointer hover:text-primary transition-colors">filter_list</span>
          </div>

          <div className="space-y-4">
            
            {/* Record 1 */}
            <div className="p-6 bg-surface-container-lowest rounded-xl group hover:shadow-ambient hover:-translate-y-0.5 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-outline-variant/10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-container text-white rounded-lg flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[18px]">child_care</span>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface font-sans text-lg leading-tight">Disalurkan: Alat Tulis Belajar</h4>
                  <p className="text-on-surface-variant font-public-sans text-sm mt-1">
                    Penerima: Kelompok Belajar Kelas 3-5 (10 Anak)
                  </p>
                  <p className="text-xs text-outline font-public-sans mt-2 font-semibold uppercase tracking-widest">
                    Oleh: Admin Ahmad • Hari Ini, 10:45 WIB
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                 <span className="px-3 py-1 bg-surface-container-low text-on-surface-variant font-public-sans text-[10px] font-bold uppercase tracking-widest rounded-full border border-outline-variant/20">
                    -10 Set
                 </span>
              </div>
            </div>

            {/* Record 2 */}
            <div className="p-6 bg-surface-container-lowest rounded-xl group hover:shadow-ambient hover:-translate-y-0.5 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-outline-variant/10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-tertiary-container text-white rounded-lg flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[18px]">restaurant</span>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface font-sans text-lg leading-tight">Digunakan: Beras Premium</h4>
                  <p className="text-on-surface-variant font-public-sans text-sm mt-1">
                    Penerima: Dapur Umum Yayasan
                  </p>
                  <p className="text-xs text-outline font-public-sans mt-2 font-semibold uppercase tracking-widest">
                    Oleh: Staf Dapur (Siti) • Kemarin, 06:15 WIB
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                 <span className="px-3 py-1 bg-surface-container-low text-on-surface-variant font-public-sans text-[10px] font-bold uppercase tracking-widest rounded-full border border-outline-variant/20">
                    -2 Karung
                 </span>
              </div>
            </div>

            {/* Record 3 */}
            <div className="p-6 bg-surface-container-lowest rounded-xl group hover:shadow-ambient hover:-translate-y-0.5 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-outline-variant/10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-error-container text-error rounded-lg flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[18px]">healing</span>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface font-sans text-lg leading-tight">Disalurkan: Kotak P3K Darurat</h4>
                  <p className="text-on-surface-variant font-public-sans text-sm mt-1">
                    Penerima: Fasilitas Kesehatan Internal
                  </p>
                  <p className="text-xs text-outline font-public-sans mt-2 font-semibold uppercase tracking-widest">
                    Oleh: Admin Ahmad • 12 April 2026
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                 <span className="px-3 py-1 bg-surface-container-low text-on-surface-variant font-public-sans text-[10px] font-bold uppercase tracking-widest rounded-full border border-outline-variant/20">
                    -1 Box
                 </span>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Static Modal / Form Panel */}
        <div className="relative">
          <GlassContainer className="sticky top-24 p-8 shadow-ambient border-none flex flex-col h-auto min-h-[500px]">
            <div className="flex items-center gap-3 mb-6">
               <div className="bg-primary-container text-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm">
                 <span className="material-symbols-outlined">send_to_mobile</span>
               </div>
               <h3 className="text-xl font-bold text-primary font-sans">Proses Distribusi</h3>
            </div>
            
            <p className="text-sm font-public-sans text-on-surface-variant mb-6 leading-relaxed">
              Catat pengeluaran barang dari gudang. Sistem akan secara otomatis memperbarui status stok dan publik tracking donator terkait.
            </p>

            <form className="space-y-5 flex-1 flex flex-col">
              
              <div className="space-y-1">
                <label className="text-xs font-bold font-public-sans uppercase tracking-widest text-on-surface-variant ml-1">
                  Pilih Barang Internal
                </label>
                <div className="bg-surface-container-lowest px-4 py-3 rounded-lg shadow-sm border border-outline-variant/20 focus-within:border-primary-container/50 transition-colors">
                  <select className="w-full bg-transparent border-none focus:ring-0 text-sm font-sans outline-none text-on-surface cursor-pointer">
                    <option>Susu Formula Anak (Stok: 12)</option>
                    <option>Buku Tulis Polos (Stok: 5)</option>
                    <option>Pakaian Pria SD (Stok: 2)</option>
                  </select>
                </div>
              </div>

              <InputField 
                id="qty"
                label="Jumlah Disalurkan"
                placeholder="1"
                type="number"
              />

              <div className="space-y-1">
                <label className="text-xs font-bold font-public-sans uppercase tracking-widest text-on-surface-variant ml-1">
                  Target Penerima / Alokasi
                </label>
                <div className="bg-surface-container-lowest px-4 py-3 rounded-lg shadow-sm border border-outline-variant/20 focus-within:border-primary-container/50 transition-colors">
                  <textarea 
                    rows={3}
                    className="w-full bg-transparent border-none focus:ring-0 text-sm font-sans placeholder:text-outline-variant outline-none resize-none"
                    placeholder="Contoh: Didistribusikan ke Kelompok Belajar A"
                  ></textarea>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <PrimaryButton className="w-full flex justify-center py-[16px] text-sm gap-2">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  Konfirmasi Pengeluaran
                </PrimaryButton>
              </div>
            </form>
          </GlassContainer>
        </div>

      </section>
    </main>
  );
}
