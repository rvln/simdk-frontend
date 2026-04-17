import React from 'react';
import { GlassContainer } from '@/components/ui/GlassContainer';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { InputField } from '@/components/ui/InputField';

export default function KelolaKebutuhanPage() {
  return (
    <main className="flex-1 lg:p-10 px-6 py-6 pb-20">
      {/* Header Section */}
      <header className="mb-10 max-w-6xl">
        <h1 className="text-4xl font-black text-primary tracking-tight mb-2 font-sans">
          Kelola Kebutuhan
        </h1>
        <p className="text-on-surface-variant font-public-sans text-lg">
          Pantau stok logistik dan tambahkan kebutuhan operasional panti (Terhubung langsung ke UI Publik).
        </p>
      </header>

      <section className="max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
        
        {/* Left Column: Inventory List & Grids */}
        <div className="space-y-8">
          
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <GlassContainer className="p-6 border-none shadow-ambient flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-error-container/40 text-error flex items-center justify-center">
                <span className="material-symbols-outlined">warning</span>
              </div>
              <div>
                <p className="font-public-sans text-xs font-bold text-on-surface-variant uppercase tracking-widest">Kritis / Habis</p>
                <h3 className="text-2xl font-black text-error font-sans">3 Barang</h3>
              </div>
            </GlassContainer>

            <GlassContainer className="p-6 border-none shadow-ambient flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-tertiary-container/30 text-tertiary flex items-center justify-center">
                <span className="material-symbols-outlined">inventory_2</span>
              </div>
              <div>
                <p className="font-public-sans text-xs font-bold text-on-surface-variant uppercase tracking-widest">Stok Aman</p>
                <h3 className="text-2xl font-black text-tertiary font-sans">18 Barang</h3>
              </div>
            </GlassContainer>
          </div>

          <GlassContainer className="border-none shadow-ambient flex flex-col h-full">
            <div className="p-6 md:p-8">
              <h3 className="text-xl font-bold text-on-surface font-sans mb-6">Daftar Inventaris Terbuka</h3>
              
              <div className="space-y-4">
                
                {/* Record 1: Critical Item */}
                <div className="p-6 bg-surface-container-low rounded-xl group hover:bg-surface-container transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-none">
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 bg-error/10 text-error rounded-lg flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined">kitchen</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-on-surface font-sans text-lg">Beras Premium 5kg</h4>
                      <p className="text-on-surface-variant font-public-sans text-sm">Kategori: Sembako Dasar</p>
                    </div>
                  </div>
                  <div className="w-full sm:w-auto mt-2 sm:mt-0">
                    <div className="flex justify-between text-xs font-public-sans font-bold uppercase tracking-widest mb-2">
                       <span className="text-error">Sisa 2 Karung</span>
                       <span className="text-on-surface-variant">Target 20</span>
                    </div>
                    <div className="w-full sm:w-48 h-2 bg-surface-container-highest rounded-full overflow-hidden">
                       <div className="h-full bg-error rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Record 2: Active Request */}
                <div className="p-6 bg-surface-container-low rounded-xl group hover:bg-surface-container transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-none">
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined">school</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                         <h4 className="font-bold text-on-surface font-sans text-lg">Buku Tulis Polos</h4>
                         <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] uppercase font-bold tracking-widest rounded">Baru</span>
                      </div>
                      <p className="text-on-surface-variant font-public-sans text-sm">Kategori: Edukasi</p>
                    </div>
                  </div>
                  <div className="w-full sm:w-auto mt-2 sm:mt-0">
                    <div className="flex justify-between text-xs font-public-sans font-bold uppercase tracking-widest mb-2">
                       <span className="text-primary">Terkumpul 10</span>
                       <span className="text-on-surface-variant">Target 50</span>
                    </div>
                    <div className="w-full sm:w-48 h-2 bg-surface-container-highest rounded-full overflow-hidden">
                       <div className="h-full bg-primary rounded-full" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Record 3: Fulfilled */}
                <div className="p-6 bg-surface-container-low rounded-xl group hover:bg-surface-container transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-none">
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 bg-tertiary-container/30 text-tertiary rounded-lg flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined">dry_cleaning</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-on-surface font-sans text-lg text-on-surface-variant line-through">Seragam SD (Pria)</h4>
                      <p className="text-on-surface-variant font-public-sans text-sm">Kategori: Pakaian</p>
                    </div>
                  </div>
                  <div className="w-full sm:w-auto mt-2 sm:mt-0 text-right">
                    <span className="px-3 py-1 bg-tertiary-container/30 text-tertiary font-public-sans text-xs font-bold uppercase tracking-widest rounded-full">
                       Telah Terpenuhi (Target 15)
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </GlassContainer>
        </div>

        {/* Right Column: Static Modal / Form Panel */}
        <div className="relative">
          <GlassContainer className="sticky top-24 p-8 shadow-ambient border-none flex flex-col h-auto min-h-[500px]">
            <div className="flex items-center gap-3 mb-6">
               <div className="bg-primary/10 text-primary w-10 h-10 rounded-full flex items-center justify-center">
                 <span className="material-symbols-outlined">add_task</span>
               </div>
               <h3 className="text-xl font-bold text-primary font-sans">Tambah Kebutuhan</h3>
            </div>
            
            <p className="text-sm font-public-sans text-on-surface-variant mb-6 leading-relaxed">
              Buat permintaan donasi baru. Item ini akan langsung muncul di halaman publik "Transparansi Kebutuhan" setelah di-submit.
            </p>

            <form className="space-y-4 flex-1 flex flex-col">
              <InputField 
                id="item_name"
                label="Nama Barang / Kebutuhan"
                placeholder="Contoh: Susu Bayi (SGM)"
                type="text"
              />

              <div className="space-y-1">
                <label className="text-xs font-bold font-public-sans uppercase tracking-widest text-on-surface-variant ml-1">
                  Kategori
                </label>
                <div className="bg-surface-container-lowest px-4 py-3 rounded-lg shadow-sm border border-outline-variant/20 focus-within:border-primary/50 transition-colors">
                  <select className="w-full bg-transparent border-none focus:ring-0 text-sm font-sans outline-none text-on-surface cursor-pointer">
                    <option>Sembako Dasar</option>
                    <option>Edukasi &amp; Pengetahuan</option>
                    <option>Pakaian &amp; Kenyamanan</option>
                    <option>Obat-obatan</option>
                  </select>
                </div>
              </div>

              <InputField 
                id="target_qty"
                label="Target Kuantitas (Jumlah)"
                placeholder="0"
                type="number"
              />

              <div className="flex items-center gap-3 py-2">
                <input 
                  type="checkbox" 
                  id="flag_urgent" 
                  className="rounded border-outline-variant/50 text-error focus:ring-error-container h-4 w-4 bg-surface-container-lowest flex-shrink-0 cursor-pointer" 
                />
                <label htmlFor="flag_urgent" className="text-sm font-public-sans font-semibold text-error cursor-pointer">
                  Tandai sebagai Kritis (Urgent)
                </label>
              </div>

              <div className="mt-8">
                <PrimaryButton className="w-full flex justify-center py-[16px] text-sm">
                  Publikasikan Kebutuhan
                </PrimaryButton>
              </div>
            </form>
          </GlassContainer>
        </div>

      </section>
    </main>
  );
}
