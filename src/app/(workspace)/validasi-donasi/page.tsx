import React from 'react';
import { GlassContainer } from '@/components/ui/GlassContainer';
import { PrimaryButton } from '@/components/ui/PrimaryButton';

export default function ValidasiDonasiPage() {
  return (
    <main className="flex-1 lg:p-10 px-6 py-6 pb-20">
      {/* Header Section */}
      <header className="mb-10 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-primary tracking-tight mb-2 font-sans">
              Validasi Donasi Fisik &amp; Logistik
            </h1>
            <p className="text-on-surface-variant font-public-sans text-lg">
              Konfirmasi penerimaan barang dan perbarui inventaris panti (Two-Phase System).
            </p>
          </div>
        </div>
      </header>

      {/* Main Content Using Tonal Offsets & Padding Instead of Borders */}
      <section className="max-w-6xl grid grid-cols-1 md:grid-cols-[1fr_350px] gap-8">
        
        {/* Left Column: List of Validations */}
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-on-surface font-sans">Menunggu Check-in Barang</h3>
            <div className="flex items-center gap-2">
              <span className="px-4 py-1.5 bg-error-container/40 text-error rounded-full text-xs font-public-sans font-bold uppercase tracking-widest shadow-sm">
                12 Pending
              </span>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl shadow-ambient overflow-hidden">
            <div className="p-2 space-y-2">
              
              {/* Record 1 */}
              <div className="p-6 bg-surface-container-low rounded-xl group hover:bg-surface-container transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-2xl">receipt_long</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface font-sans text-lg">TXN-DON-2026-6182</h4>
                    <p className="text-on-surface-variant font-public-sans text-sm mt-1">
                      Indomie Goreng (5 Dus) • Beras 5kg (2 Karung)
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center gap-1 text-xs font-public-sans font-bold uppercase tracking-widest text-primary">
                        <span className="material-symbols-outlined text-[14px]">local_shipping</span>
                        Dikirim via Ekspedisi
                      </div>
                    </div>
                  </div>
                </div>
                <PrimaryButton className="w-full md:w-auto shrink-0">
                  Verifikasi Penerimaan
                </PrimaryButton>
              </div>

              {/* Record 2 */}
              <div className="p-6 bg-surface-container-low rounded-xl group hover:bg-surface-container transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-tertiary/10 text-tertiary rounded-xl flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-2xl">handshake</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface font-sans text-lg">TXN-DON-2026-6199</h4>
                    <p className="text-on-surface-variant font-public-sans text-sm mt-1">
                      Pakaian Layak Pakai Anak-anak (3 Kotak)
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center gap-1 text-xs font-public-sans font-bold uppercase tracking-widest text-tertiary">
                        <span className="material-symbols-outlined text-[14px]">directions_run</span>
                        Diantar Langsung
                      </div>
                      <span className="px-2 py-0.5 bg-surface-container-highest text-outline font-public-sans text-[10px] font-bold rounded uppercase tracking-widest">
                        Tanpa Identitas
                      </span>
                    </div>
                  </div>
                </div>
                <PrimaryButton className="w-full md:w-auto shrink-0">
                  Verifikasi Penerimaan
                </PrimaryButton>
              </div>

              {/* Record 3 */}
              <div className="p-6 bg-surface-container-low rounded-xl group hover:bg-surface-container transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-2xl">receipt_long</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface font-sans text-lg">TXN-DON-2026-6204</h4>
                    <p className="text-on-surface-variant font-public-sans text-sm mt-1">
                      Buku Modul Belajar (20 Buah) • Alat Tulis (5 Set)
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center gap-1 text-xs font-public-sans font-bold uppercase tracking-widest text-primary">
                        <span className="material-symbols-outlined text-[14px]">local_shipping</span>
                        Dikirim via Ekspedisi
                      </div>
                    </div>
                  </div>
                </div>
                <PrimaryButton className="w-full md:w-auto shrink-0">
                  Verifikasi Penerimaan
                </PrimaryButton>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column: Scan / Manual Entry Panel */}
        <div>
          <GlassContainer className="p-8 shadow-ambient sticky top-24 border-none">
            <h3 className="text-xl font-bold text-primary font-sans mb-6">Penarikan Resi Cepat</h3>
            
            <p className="text-on-surface-variant text-sm font-public-sans leading-relaxed mb-6">
              Validasi kedatangan barang instan dengan memasukkan nomor resi (Identifikasi Transaksi) dari paket atau dari donator.
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold font-public-sans uppercase tracking-widest text-on-surface-variant ml-1">
                  Nomor Resi / Transaksi
                </label>
                <div className="bg-surface-container-lowest px-4 py-3 rounded-lg shadow-sm border border-outline-variant/20 focus-within:border-primary/50 transition-colors">
                  <input 
                    type="text" 
                    className="w-full bg-transparent border-none focus:ring-0 text-sm font-sans placeholder:text-outline-variant outline-none"
                    placeholder="Contoh: TXN-DON-2026-..."
                  />
                </div>
              </div>

              <PrimaryButton className="w-full py-4 text-sm mt-2 flex justify-center">
                Tarik Data Resi
              </PrimaryButton>
              
              <button className="w-full py-4 text-sm font-bold font-public-sans text-on-surface-variant hover:text-primary transition-colors bg-surface-container-low hover:bg-surface-container rounded-xl flex justify-center items-center gap-2 mt-4 shadow-sm border-none cursor-pointer">
                <span className="material-symbols-outlined text-lg">qr_code_scanner</span>
                Pindai QR Kode
              </button>
            </div>
          </GlassContainer>
        </div>

      </section>
    </main>
  );
}
