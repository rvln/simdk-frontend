import React from "react";
import Link from "next/link";
import { FiCheckCircle, FiHome, FiMessageCircle } from "react-icons/fi";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

export default function MenungguValidasiPage() {
  return (
    <div className="bg-surface min-h-[80vh] py-16 px-6 md:px-12 flex items-center justify-center">
      <div className="max-w-2xl mx-auto w-full">
        <GlassContainer className="p-0 overflow-hidden shadow-ambient border-none bg-surface-container-lowest text-center">
          {/* Header */}
          <div className="bg-gradient-to-br from-primary to-primary-container p-12 text-white text-center">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-6">
              <FiCheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-black tracking-tight mb-2">Terima Kasih!</h1>
            <p className="text-white/80 font-medium text-lg">Bukti Transfer Berhasil Diunggah</p>
          </div>

          {/* Body */}
          <div className="p-10 space-y-8">
            <p className="text-on-surface-variant leading-relaxed text-lg">
              Bukti transfer Anda telah diterima dan sedang dalam proses verifikasi oleh Pengurus Panti. Mohon cek halaman ini atau hubungi pengurus jika membutuhkan konfirmasi lebih lanjut.
            </p>
          </div>

          {/* Footer Actions */}
          <div className="p-10 pt-0 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/" className="w-full sm:w-auto">
              <PrimaryButton className="w-full flex items-center justify-center gap-2 py-3 px-8 text-base font-bold shadow-md hover:shadow-lg transition-all">
                <FiHome className="text-lg" />
                Kembali ke Beranda
              </PrimaryButton>
            </Link>
            <Link href="/kontak" className="w-full sm:w-auto">
              <button className="w-full flex items-center justify-center gap-2 py-3 px-8 text-base font-bold rounded-xl text-primary border border-primary/20 hover:bg-primary/5 transition-colors">
                <FiMessageCircle className="text-lg" />
                Hubungi Pengurus
              </button>
            </Link>
          </div>
        </GlassContainer>
      </div>
    </div>
  );
}
