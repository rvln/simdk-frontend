import React from 'react';
import { GlassContainer } from '@/components/ui/GlassContainer';
import { PrimaryButton } from '@/components/ui/PrimaryButton';

export default function ApprovalKunjunganPage() {
  return (
    <main className="flex-1 lg:p-10 px-6 py-6 pb-20">
      {/* Header Section */}
      <header className="mb-10 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-primary tracking-tight mb-2 font-sans">
              Approval Kunjungan
            </h1>
            <p className="text-on-surface-variant font-public-sans text-lg">
              Validasi dan kelola pengajuan jadwal kunjungan yayasan.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="px-4 py-1.5 bg-surface-container-highest rounded-full text-xs font-public-sans font-bold text-on-surface-variant uppercase tracking-widest shadow-sm">
              Senin, 16 April 2026
            </span>
          </div>
        </div>
      </header>

      {/* Metrics Row */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-6xl">
        <GlassContainer className="p-6 flex items-center gap-4 group hover:-translate-y-1 transition-transform duration-300 shadow-ambient border-none">
          <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shadow-sm">
             <span className="material-symbols-outlined">pending_actions</span>
          </div>
          <div>
            <p className="font-public-sans text-xs font-bold text-on-surface-variant uppercase tracking-widest leading-tight">Menunggu Approval</p>
            <h2 className="text-3xl font-black text-primary font-sans">5 <span className="text-sm font-normal text-on-surface-variant tracking-normal">Sesi</span></h2>
          </div>
        </GlassContainer>
        
        <GlassContainer className="p-6 flex items-center gap-4 group hover:-translate-y-1 transition-transform duration-300 shadow-ambient border-none">
          <div className="w-12 h-12 rounded-full bg-tertiary-container/20 flex items-center justify-center text-tertiary shadow-sm">
             <span className="material-symbols-outlined">event_available</span>
          </div>
          <div>
            <p className="font-public-sans text-xs font-bold text-on-surface-variant uppercase tracking-widest leading-tight">Terjadwal Berjalan</p>
            <h2 className="text-3xl font-black text-tertiary font-sans">2 <span className="text-sm font-normal text-on-surface-variant tracking-normal">Sesi</span></h2>
          </div>
        </GlassContainer>

        <GlassContainer className="p-6 flex items-center gap-4 group hover:-translate-y-1 transition-transform duration-300 shadow-ambient border-none">
          <div className="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center text-outline shadow-sm">
             <span className="material-symbols-outlined">group</span>
          </div>
          <div>
            <p className="font-public-sans text-xs font-bold text-on-surface-variant uppercase tracking-widest leading-tight">Sisa Kuota Harian</p>
            <h2 className="text-3xl font-black text-on-surface font-sans">8 <span className="text-sm font-normal text-on-surface-variant tracking-normal">Slot Terbuka</span></h2>
          </div>
        </GlassContainer>
      </section>

      {/* Main Approval Payload */}
      <section className="max-w-6xl">
        <GlassContainer className="p-8 shadow-ambient flex flex-col h-full border-none">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h3 className="text-2xl font-bold text-primary font-sans">Permintaan Penjadwalan</h3>
            
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-surface-container text-on-surface-variant text-sm font-bold font-public-sans rounded-lg hover:bg-surface-container-highest transition-colors cursor-pointer">
                Semua Filter
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Iterative Record: Pending Request */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-surface-container-low rounded-xl group hover:bg-surface-variant transition-colors border-none">
              <div className="flex items-start gap-6">
                <div className="flex flex-col items-center justify-center bg-surface-container-lowest rounded-lg px-4 py-2 shadow-sm min-w-[90px]">
                  <span className="text-on-surface-variant font-public-sans text-[10px] font-bold uppercase tracking-wider mb-1">Rencana</span>
                  <span className="text-primary font-black text-xl font-sans">18 Apr</span>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-bold text-on-surface text-lg font-sans">Himpunan Mahasiswa Psikologi</h4>
                    <span className="px-3 py-1 bg-secondary-container/50 text-on-secondary-container rounded-full text-xs font-public-sans font-bold uppercase tracking-widest">
                       Verifikasi Otomatis
                    </span>
                  </div>
                  <p className="text-on-surface-variant font-public-sans text-sm">
                    Kunjungan Sosialisasi • 15 Orang • Sesi Pagi (09:00 WIB)
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 mt-6 md:mt-0 w-full md:w-auto justify-end">
                <button className="px-5 py-2.5 bg-surface-container-lowest text-error font-public-sans text-sm font-bold rounded-lg shadow-sm hover:bg-error/5 transition-colors cursor-pointer">
                  Tolak
                </button>
                <PrimaryButton className="px-6 py-[11px] text-sm">
                  Setujui Jadwal
                </PrimaryButton>
              </div>
            </div>

            {/* Iterative Record: Pending Request */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-surface-container-low rounded-xl group hover:bg-surface-variant transition-colors border-none">
              <div className="flex items-start gap-6">
                <div className="flex flex-col items-center justify-center bg-surface-container-lowest rounded-lg px-4 py-2 shadow-sm min-w-[90px]">
                  <span className="text-on-surface-variant font-public-sans text-[10px] font-bold uppercase tracking-wider mb-1">Rencana</span>
                  <span className="text-primary font-black text-xl font-sans">19 Apr</span>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-bold text-on-surface text-lg font-sans">Keluarga Bpk. Wijaya</h4>
                    <span className="px-3 py-1 bg-error-container/30 text-error rounded-full text-xs font-public-sans font-bold uppercase tracking-widest">
                       Butuh Cek Manual
                    </span>
                  </div>
                  <p className="text-on-surface-variant font-public-sans text-sm">
                    Silaturahmi Keluarga • 4 Orang • Sesi Sore (15:00 WIB)
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 mt-6 md:mt-0 w-full md:w-auto justify-end">
                <button className="px-5 py-2.5 bg-surface-container-lowest text-error font-public-sans text-sm font-bold rounded-lg shadow-sm hover:bg-error/5 transition-colors cursor-pointer">
                  Tolak
                </button>
                <PrimaryButton className="px-6 py-[11px] text-sm">
                  Setujui Jadwal
                </PrimaryButton>
              </div>
            </div>

            {/* Iterative Record: Pending Request */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-surface-container-low rounded-xl group hover:bg-surface-variant transition-colors border-none">
              <div className="flex items-start gap-6">
                <div className="flex flex-col items-center justify-center bg-surface-container-lowest rounded-lg px-4 py-2 shadow-sm min-w-[90px]">
                  <span className="text-on-surface-variant font-public-sans text-[10px] font-bold uppercase tracking-wider mb-1">Rencana</span>
                  <span className="text-primary font-black text-xl font-sans">20 Apr</span>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-bold text-on-surface text-lg font-sans">Ibu Rina Nasution</h4>
                    <span className="px-3 py-1 bg-secondary-container/50 text-on-secondary-container rounded-full text-xs font-public-sans font-bold uppercase tracking-widest">
                       Verifikasi Otomatis
                    </span>
                  </div>
                  <p className="text-on-surface-variant font-public-sans text-sm">
                    Distribusi Donasi Fisik • 2 Orang • Sesi Siang (13:00 WIB)
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 mt-6 md:mt-0 w-full md:w-auto justify-end">
                <button className="px-5 py-2.5 bg-surface-container-lowest text-error font-public-sans text-sm font-bold rounded-lg shadow-sm hover:bg-error/5 transition-colors cursor-pointer">
                  Tolak
                </button>
                <PrimaryButton className="px-6 py-[11px] text-sm">
                  Setujui Jadwal
                </PrimaryButton>
              </div>
            </div>

          </div>
        </GlassContainer>
      </section>
    </main>
  );
}
