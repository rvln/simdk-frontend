import React from "react";
import Link from "next/link";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { 
  MdOutlineCalendarToday, 
  MdOutlineInventory2, 
  MdOutlineGroup, 
  MdOutlineVolunteerActivism, 
  MdOutlineChevronRight, 
  MdCheckCircle, 
  MdOutlineTask, 
  MdOutlineHistory, 
  MdOutlineVerifiedUser,
  MdOutlineCheckCircle
} from "react-icons/md";

export default function DashboardPage() {
  return (
    <div className="flex h-full w-full relative overflow-hidden">
      <div className="flex-1 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] p-6 lg:p-10 pb-20 overflow-y-auto">
        <div className="max-w-6xl mx-auto w-full">
          {/* Header Section */}
          <header className="mb-10">
            <h1 className="text-4xl font-headline font-extrabold text-primary tracking-tight mb-2 font-sans">
          Dashboard Operasional
        </h1>
        <p className="text-on-surface-variant font-public-sans text-lg">
          Selamat datang kembali, Bapak Ahmad. Pantau aktivitas panti hari ini
          secara real-time.
        </p>
      </header>

      {/* Bento Grid Metric Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Card 1 */}
        <GlassContainer className="p-8 flex flex-col gap-4 group hover:-translate-y-1 transition-transform duration-300 shadow-ambient">
          <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
            <MdOutlineCalendarToday className="text-2xl" />
          </div>
          <div>
            <p className="font-public-sans text-sm font-semibold text-on-surface-variant uppercase tracking-widest mb-1">
              Menunggu Approval
            </p>
            <h2 className="text-5xl font-black text-primary mb-2 font-sans">
              5
            </h2>
            <p className="text-on-surface-variant text-sm font-sans font-light">
              Pengajuan jadwal baru.
            </p>
          </div>
        </GlassContainer>

        {/* Card 2: Signature Gradient */}
        <div className="bg-gradient-to-br from-primary to-primary-container p-8 rounded-xl flex flex-col gap-4 text-white group hover:-translate-y-1 transition-transform duration-300 shadow-ambient border-none">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
            <MdOutlineInventory2 className="text-white text-2xl" />
          </div>
          <div>
            <p className="font-public-sans text-sm font-semibold opacity-80 uppercase tracking-widest mb-1">
              Menunggu Check-in
            </p>
            <h2 className="text-5xl font-black mb-2 font-sans text-white">
              12
            </h2>
            <p className="opacity-90 text-sm font-sans font-light">
              Resi donasi fisik pending.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <GlassContainer className="p-8 flex flex-col gap-4 group hover:-translate-y-1 transition-transform duration-300 shadow-ambient">
          <div className="w-12 h-12 rounded-full bg-tertiary-container/10 flex items-center justify-center text-tertiary">
            <MdOutlineGroup className="text-2xl" />
          </div>
          <div>
            <p className="font-public-sans text-sm font-semibold text-on-surface-variant uppercase tracking-widest mb-1">
              Kapasitas Kunjungan
            </p>
            <h2 className="text-2xl font-bold text-tertiary mb-2 font-sans">
              Sisa 8 Slot Terbuka
            </h2>
            <p className="text-on-surface-variant text-sm font-sans font-light">
              Dari total 18 kuota mingguan.
            </p>
          </div>
        </GlassContainer>
      </section>

      {/* Asymmetrical Lower Section */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Agenda (60%) */}
        <section className="lg:w-[60%]">
          <GlassContainer className="p-8 shadow-ambient flex flex-col h-full">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-primary font-sans">
                Agenda Kunjungan Hari Ini
              </h3>
              <span className="px-4 py-1.5 bg-surface-container rounded-full text-xs font-public-sans font-bold text-on-surface-variant uppercase tracking-widest">
                2 Sesi Terjadwal
              </span>
            </div>

            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-6 p-6 bg-surface-container-low rounded-xl group hover:bg-surface-variant transition-colors cursor-pointer border-none shadow-none">
                <div className="flex flex-col items-center justify-center bg-surface-container-lowest rounded-lg px-4 py-2 shadow-sm min-w-[80px]">
                  <span className="text-primary font-black text-xl font-sans">
                    13:00
                  </span>
                  <span className="text-[10px] font-public-sans font-bold text-on-surface-variant uppercase">
                    WITA
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-on-surface text-lg font-sans">
                    BEM Universitas X
                  </h4>
                  <p className="text-on-surface-variant font-public-sans text-sm flex items-center gap-1 mt-1">
                    <MdOutlineVolunteerActivism className="text-sm" />
                    Kunjungan Sosial
                  </p>
                </div>
                <MdOutlineChevronRight className="text-outline-variant group-hover:text-primary transition-colors text-2xl" />
              </div>

              <div className="flex items-center gap-6 p-6 bg-surface-container-low rounded-xl group hover:bg-surface-variant transition-colors cursor-pointer border-none shadow-none">
                <div className="flex flex-col items-center justify-center bg-surface-container-lowest rounded-lg px-4 py-2 shadow-sm min-w-[80px]">
                  <span className="text-primary font-black text-xl font-sans">
                    15:30
                  </span>
                  <span className="text-[10px] font-public-sans font-bold text-on-surface-variant uppercase">
                    WITA
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-on-surface text-lg font-sans">
                    Keluarga Budi
                  </h4>
                  <p className="text-on-surface-variant font-public-sans text-sm flex items-center gap-1 mt-1">
                    <MdOutlineGroup className="text-sm" />
                    Kunjungan Rutin
                  </p>
                </div>
                <MdOutlineChevronRight className="text-outline-variant group-hover:text-primary transition-colors text-2xl" />
              </div>
            </div>
          </GlassContainer>
        </section>

        {/* Right: Log Aktivitas (40%) */}
        <section className="lg:w-[40%]">
          <GlassContainer className="p-8 shadow-ambient flex flex-col h-full">
            <h3 className="text-2xl font-bold text-primary mb-8 font-sans">
              Log Aktivitas
            </h3>

            <div className="relative flex-1">
              {/* Timeline line */}
              <div className="absolute left-3.5 top-0 bottom-0 w-[2px] bg-outline-variant/20"></div>

              <div className="space-y-8 relative">
                {/* Item 1 */}
                <div className="flex gap-6 items-start relative">
                  <div className="w-7 h-7 rounded-full bg-tertiary-container flex items-center justify-center text-white ring-4 ring-surface-container-lowest z-10 flex-shrink-0">
                    <MdCheckCircle className="text-[14px]" />
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="font-bold text-sm text-on-surface font-sans">
                      Donasi Dana Rp 500.000
                    </p>
                    <p className="text-tertiary font-public-sans text-xs font-bold uppercase tracking-widest mt-1">
                      Sukses
                    </p>
                    <span className="text-[10px] text-on-surface-variant uppercase font-public-sans mt-2 block">
                      10 Menit yang lalu
                    </span>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex gap-6 items-start relative">
                  <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white ring-4 ring-surface-container-lowest z-10 flex-shrink-0">
                    <MdOutlineTask className="text-[14px]" />
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="font-bold text-sm text-on-surface font-sans">
                      Sepatu Anak (Check-in Selesai)
                    </p>
                    <p className="text-primary font-public-sans text-xs font-bold uppercase tracking-widest mt-1">
                      Logistik
                    </p>
                    <span className="text-[10px] text-on-surface-variant uppercase font-public-sans mt-2 block">
                      45 Menit yang lalu
                    </span>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="flex gap-6 items-start relative">
                  <div className="w-7 h-7 rounded-full bg-surface-variant flex items-center justify-center text-outline ring-4 ring-surface-container-lowest z-10 flex-shrink-0">
                    <MdOutlineHistory className="text-[14px]" />
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="font-bold text-sm text-on-surface font-sans">
                      Update Profil Anak Panti
                    </p>
                    <p className="text-on-surface-variant font-public-sans text-xs font-bold uppercase tracking-widest mt-1">
                      Database
                    </p>
                    <span className="text-[10px] text-on-surface-variant uppercase font-public-sans mt-2 block">
                      2 Jam yang lalu
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </GlassContainer>
        </section>
      </div>

      {/* ──────────────────────────────────────────
          Audit Timeline Logistik
          ────────────────────────────────────────── */}
      <section className="mt-8">
        <GlassContainer className="p-8 shadow-ambient flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <h3 className="text-xl font-bold text-primary mb-2 font-sans">
              Audit Trail Logistik
            </h3>
            <p className="text-sm text-on-surface-variant font-public-sans mb-6">
              Lacak histori status dan pergerakan inventaris secara real-time. Memastikan transparansi dari penerimaan hingga distribusi.
            </p>
          </div>
          
          <div className="md:w-2/3 relative pl-6">
            {/* Vertical Line */}
            <div className="absolute left-[35px] top-4 bottom-8 w-[2px] bg-gradient-to-b from-primary via-tertiary to-outline-variant/30"></div>
            
            {/* Step 1 */}
            <div className="flex gap-6 items-start relative mb-8">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white ring-8 ring-surface-container-lowest z-10 flex-shrink-0 shadow-sm">
                <MdOutlineInventory2 className="text-lg" />
              </div>
              <div className="flex-1 pt-1.5 bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-white">
                <h4 className="font-bold text-base text-on-surface font-sans">Barang Diterima & Divalidasi</h4>
                <p className="text-on-surface-variant text-sm mt-1 flex items-center gap-2">
                  <span className="font-semibold text-primary">Ahmad Faisal</span> &bull; 10:00 WITA
                </p>
                <p className="text-primary font-public-sans text-[10px] font-bold uppercase tracking-widest mt-3 bg-primary/10 w-fit px-2 py-1 rounded">Log 1</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-6 items-start relative mb-8">
              <div className="w-10 h-10 rounded-full bg-tertiary flex items-center justify-center text-white ring-8 ring-surface-container-lowest z-10 flex-shrink-0 shadow-sm">
                <MdOutlineTask className="text-lg" />
              </div>
              <div className="flex-1 pt-1.5 bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-white">
                <h4 className="font-bold text-base text-on-surface font-sans">Disortir & Masuk Gudang Utama</h4>
                <p className="text-on-surface-variant text-sm mt-1 flex items-center gap-2">
                  <span className="font-semibold text-tertiary">Kategori Pakaian</span> &bull; 11:30 WITA
                </p>
                <p className="text-tertiary font-public-sans text-[10px] font-bold uppercase tracking-widest mt-3 bg-tertiary/10 w-fit px-2 py-1 rounded">Log 2</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-6 items-start relative">
              <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-outline ring-8 ring-surface-container-lowest z-10 flex-shrink-0">
                <MdOutlineCheckCircle className="text-lg" />
              </div>
              <div className="flex-1 pt-1.5 bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-white">
                <h4 className="font-bold text-base text-on-surface font-sans text-on-surface-variant">Menunggu Distribusi</h4>
                <p className="text-on-surface-variant/60 text-sm mt-1 flex items-center gap-2">
                  <span>Target: Asrama Putra</span> &bull; Menunggu Jadwal
                </p>
                <p className="text-outline font-public-sans text-[10px] font-bold uppercase tracking-widest mt-3 bg-surface-variant/50 w-fit px-2 py-1 rounded">Log 3</p>
              </div>
            </div>
          </div>
        </GlassContainer>
      </section>

      {/* Decorative Trust Badge Bottom */}
      <div className="mt-16 flex justify-center opacity-60 pb-8">
        <div className="flex items-center gap-2 px-6 py-3 bg-secondary-container/50 rounded-full border border-secondary/10">
          <MdOutlineVerifiedUser className="text-secondary text-2xl" />
          <span className="font-public-sans text-xs font-bold uppercase tracking-[0.2em] text-secondary">
            Sistem Terverifikasi Empanti v2.4.0
          </span>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
}
