import React from "react";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

export default function LacakDonasiPage() {
  return (
    <div className="min-h-screen py-16 px-6 lg:px-12 bg-surface-container-lowest">
      {/* Portal Search Anchor */}
      <section className="max-w-5xl mx-auto mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-primary tracking-tighter mb-4 font-sans">
          Cari Resi Pengiriman
        </h1>
        <p className="text-on-surface-variant font-public-sans text-lg max-w-2xl mx-auto leading-relaxed mb-8">
          Sistem transparansi empanti melacak barang secara end-to-end; Ketahui
          persis dimana letak donasi Anda.
        </p>

        <div className="max-w-2xl mx-auto relative group">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-outline group-focus-within:text-primary transition-colors text-2xl">
              search
            </span>
          </div>
          <input
            type="text"
            defaultValue="TXN-DON-2026-6182"
            className="w-full bg-surface-container-low border border-outline-variant/30 rounded-full py-5 pl-16 pr-40 text-lg font-sans font-bold text-primary shadow-ambient outline-none focus:ring-4 ring-primary/20 transition-all font-mono tracking-widest uppercase placeholder:text-outline/50 placeholder:font-sans placeholder:tracking-normal placeholder:normal-case placeholder:font-normal"
            placeholder="Masukkan ID Transaksi (Cth: TXN-DON...)"
          />
          <div className="absolute inset-y-2 right-2">
            <PrimaryButton className="h-full rounded-full px-8 text-sm uppercase tracking-widest">
              Lacak Resi
            </PrimaryButton>
          </div>
        </div>
      </section>

      {/* Main Track Payload Block */}
      <section className="max-w-5xl mx-auto">
        <GlassContainer className="shadow-ambient border border-outline-variant/10 overflow-hidden flex flex-col md:flex-row">
          {/* Metadata Frame */}
          <div className="w-full md:w-1/3 bg-primary p-8 md:p-12 flex flex-col text-white justify-center sticky top-0 relative overflow-hidden">
            {/* Decorative circle block */}
            <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

            <span className="material-symbols-outlined text-white/50 text-5xl mb-6 font-light">
              receipt_long
            </span>

            <span className="text-xs font-public-sans font-bold uppercase tracking-[0.2em] text-primary-container mb-2">
              Identitas Dokumen
            </span>
            <h2 className="text-3xl font-black font-sans mb-8 tracking-widest break-words leading-tight">
              TXN-DON <br className="hidden md:block" /> 2026-6182
            </h2>

            <div className="space-y-6">
              <div>
                <p className="text-xs font-public-sans uppercase tracking-widest text-primary-container opacity-80 mb-1">
                  Deskripsi Paket
                </p>
                <p className="font-bold font-sans text-sm">
                  Kebutuhan Medis Darurat, Obat, dan Vitamin C. Total 2 Kardus.
                </p>
              </div>

              <div>
                <p className="text-xs font-public-sans uppercase tracking-widest text-primary-container opacity-80 mb-1">
                  Data Pengirim
                </p>
                <p className="font-bold font-sans text-sm">
                  Keluarga Bpk. Wijaya (Jakarta Selatan)
                </p>
              </div>
            </div>
          </div>

          {/* Stepper Timeline UI mapped via No-Line spacing (margin offsets) */}
          <div className="w-full md:w-2/3 bg-surface-container-lowest p-8 md:p-12 xl:p-16">
            <div className="flex items-center justify-between border-b border-outline-variant/10 pb-6 mb-8">
              <h3 className="text-2xl font-bold font-sans text-primary">
                Status Perjalanan Paket
              </h3>
              <span className="px-4 py-1.5 bg-primary/10 text-primary font-public-sans text-xs font-bold uppercase tracking-widest rounded-full">
                Perjalanan Sedang Aktif
              </span>
            </div>

            <div className="relative space-y-12 pl-2">
              {/* Structural Background Line drawn subtly */}
              <div className="absolute left-6 top-8 bottom-8 w-[2px] bg-surface-container-high z-0"></div>

              {/* Step 1: DONE */}
              <div className="relative flex items-start gap-8 z-10 opacity-70">
                <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center shrink-0 ring-4 ring-white">
                  <span className="material-symbols-outlined text-[18px]">
                    done
                  </span>
                </div>
                <div className="pt-1.5 flex-1 pb-4">
                  <h4 className="font-bold text-on-surface font-sans text-lg">
                    Resi Diterbitkan (Pra-Kedatangan)
                  </h4>
                  <p className="text-on-surface-variant font-public-sans text-sm mt-1">
                    Formulir diisi dan nomor transaksi publik berhasil
                    diamankan.
                  </p>
                  <span className="inline-block mt-3 px-3 py-1 bg-surface-container text-on-surface-variant text-[10px] uppercase font-bold tracking-widest rounded">
                    16 April 2026, 08:30 WIB
                  </span>
                </div>
              </div>

              {/* Step 2: ACTIVE */}
              <div className="relative flex items-start gap-8 z-10 group">
                <div className="w-9 h-9 rounded-full bg-tertiary text-white flex items-center justify-center shrink-0 shadow-lg shadow-tertiary/30 ring-4 ring-white scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[18px]">
                    local_shipping
                  </span>
                </div>
                <div className="pt-1 flex-1">
                  <p className="text-tertiary font-public-sans text-[10px] uppercase tracking-widest font-black mb-1.5 animate-pulse">
                    AKTIF SEKARANG
                  </p>
                  <h4 className="font-bold text-primary font-sans text-2xl -mt-1 mb-2">
                    Menunggu Pengiriman
                  </h4>
                  <div className="p-4 bg-tertiary/5 border border-tertiary/10 rounded-xl">
                    <p className="text-on-surface-variant font-public-sans text-sm leading-relaxed">
                      Resi tervalidasi di cloud. Kami menantikan kurir logistik
                      Bapak/Ibu. Segera antar atau kirim paket menuju alamat
                      Yayasan Panti kami agar proses Check-in fisik dapat
                      dimulai oleh Admin.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3: PENDING */}
              <div className="relative flex items-start gap-8 z-10 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-500">
                <div className="w-9 h-9 rounded-full bg-surface-container-high text-outline flex items-center justify-center shrink-0 ring-4 ring-white">
                  <span className="material-symbols-outlined text-[18px]">
                    inventory
                  </span>
                </div>
                <div className="pt-1.5 flex-1 pb-4">
                  <h4 className="font-bold text-on-surface font-sans text-lg">
                    Check-in Fisik (Verifikasi Admin)
                  </h4>
                  <p className="text-on-surface-variant font-public-sans text-sm mt-1">
                    Estimasi kedatangan dan pengecekan fisik logistik.
                  </p>
                </div>
              </div>

              {/* Step 4: PENDING */}
              <div className="relative flex items-start gap-8 z-10 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-500">
                <div className="w-9 h-9 rounded-full bg-surface-container-high text-outline flex items-center justify-center shrink-0 ring-4 ring-white">
                  <span className="material-symbols-outlined text-[18px]">
                    verified_user
                  </span>
                </div>
                <div className="pt-1.5 flex-1 pb-4">
                  <h4 className="font-bold text-on-surface font-sans text-lg">
                    Proses Distribusi Ke Anak
                  </h4>
                  <p className="text-on-surface-variant font-public-sans text-sm mt-1">
                    Serah terima kepada kelompok atau target operasional
                    internal panti.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </GlassContainer>
      </section>
    </div>
  );
}
