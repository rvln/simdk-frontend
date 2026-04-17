import React from 'react';
import { GlassContainer } from '@/components/ui/GlassContainer';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { InputField } from '@/components/ui/InputField';
import Link from 'next/link';

export default function FormulirDonasiPage() {
  return (
    <div className="min-h-screen py-16 px-6 lg:px-12 bg-surface-container-lowest">
      
      {/* Container Frame */}
      <div className="max-w-4xl mx-auto">
        <Link href="/transparansi" className="inline-flex items-center gap-2 text-outline hover:text-primary transition-colors font-public-sans font-bold text-xs uppercase tracking-widest mb-10">
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          KEMBALI KE PORTAL TRANSPARANSI
        </Link>
        
        <header className="mb-12">
           <h1 className="text-4xl md:text-5xl font-black text-primary tracking-tighter mb-4 font-sans">
             Formulir Pengajuan <br/>Donasi Barang
           </h1>
           <p className="text-on-surface-variant font-public-sans text-lg max-w-2xl leading-relaxed">
              Anda tidak perlu login untuk mendonasikan barang fisik (Mode Guest). Sistem akan membuat Resi Donasi publik yang transparan secara instan.
           </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-[1fr_350px] gap-10">
          
          {/* Main Form Body */}
          <div className="space-y-8">
            <GlassContainer className="p-8 border-none shadow-ambient flex flex-col space-y-6">
               <h3 className="text-2xl font-bold font-sans text-primary border-b border-outline-variant/10 pb-4">
                 Identitas Pengirim
               </h3>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <InputField 
                    id="guest_name"
                    label="Nama Lengkap / Instansi"
                    placeholder="Contoh: Bpk. Hamba Allah"
                    type="text"
                 />
                 <InputField 
                    id="guest_phone"
                    label="Nomor WhatsApp Aktif"
                    placeholder="0812-3456-7890"
                    type="tel"
                 />
               </div>

               <div className="flex items-start gap-4 p-4 bg-surface-container-low rounded-xl border border-outline-variant/20 mt-2">
                 <input type="checkbox" id="anon" className="mt-1 h-5 w-5 bg-surface-container rounded border-outline-variant/40 text-primary focus:ring-primary-container cursor-pointer" />
                 <div>
                    <label htmlFor="anon" className="font-sans font-bold text-sm text-on-surface cursor-pointer">Sembunyikan Identitas Publik</label>
                    <p className="font-public-sans text-xs text-on-surface-variant mt-1">
                      Nama Anda hanya terlihat pada Resi Internal dan akan ditulis "<i>Anonim</i>" di layar Transparansi Publik.
                    </p>
                 </div>
               </div>
            </GlassContainer>

            <GlassContainer className="p-8 border-none shadow-ambient flex flex-col space-y-6">
               <h3 className="text-2xl font-bold font-sans text-primary border-b border-outline-variant/10 pb-4">
                 Detail Barang Bantuan
               </h3>

               <InputField 
                 id="item_name"
                 label="Nama Barang atau Paket"
                 placeholder="Contoh: Paket Pakaian Anak Layak Pakai"
                 type="text"
               />

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-1">
                    <label className="text-xs font-bold font-public-sans uppercase tracking-widest text-on-surface-variant ml-1">Kategori Utama</label>
                    <div className="bg-surface-container-lowest px-4 py-3 rounded-lg shadow-sm border border-outline-variant/20 focus-within:border-primary/50 transition-colors">
                      <select className="w-full bg-transparent border-none focus:ring-0 text-sm font-sans outline-none text-on-surface cursor-pointer w-full">
                        <option>Sembako &amp; Pangan Dasar</option>
                        <option>Peralatan Pendidikan</option>
                        <option>Pakaian &amp; Aksesoris</option>
                        <option>Lainnya (Non Spesifik)</option>
                      </select>
                    </div>
                 </div>

                 <InputField 
                    id="qty"
                    label="Jumlah Perkiraan (Opsional)"
                    placeholder="Contoh: 2 Kardus / 5 Buah"
                    type="text"
                 />
               </div>
            </GlassContainer>

            <GlassContainer className="p-8 border-none shadow-ambient flex flex-col space-y-6">
               <h3 className="text-2xl font-bold font-sans text-primary border-b border-outline-variant/10 pb-4">
                 Opsi Pengiriman
               </h3>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-xl border-2 border-primary bg-primary/5 cursor-pointer relative overflow-hidden group transition-all">
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white">
                       <span className="material-symbols-outlined text-[14px]">check</span>
                    </div>
                    <span className="material-symbols-outlined text-primary text-3xl mb-3">local_shipping</span>
                    <h4 className="font-bold font-sans mb-1 text-primary">Kirim via Ekspedisi</h4>
                    <p className="font-public-sans text-xs text-on-surface-variant line-clamp-2">Paket dikirim kurir, resi divalidasi setelah paket tiba di Panti.</p>
                  </div>

                  <div className="p-5 rounded-xl border border-outline-variant/20 bg-surface-container-lowest hover:border-outline-variant/50 cursor-pointer relative overflow-hidden transition-all group">
                    <span className="material-symbols-outlined text-outline text-3xl mb-3 group-hover:text-tertiary transition-colors">directions_walk</span>
                    <h4 className="font-bold font-sans mb-1 text-on-surface group-hover:text-tertiary">Drop-off Langsung</h4>
                    <p className="font-public-sans text-xs text-on-surface-variant line-clamp-2">Antar langsung ke lokasi, resi fisik divalidasi manual di gerbang.</p>
                  </div>
               </div>
            </GlassContainer>
            
          </div>

          {/* Right Column Action Sticky */}
          <div className="relative">
            <div className="sticky top-24 pt-2">
               <GlassContainer className="p-8 shadow-ambient border-none flex flex-col">
                  <span className="material-symbols-outlined text-4xl text-primary text-center mb-6">receipt_long</span>
                  <h3 className="font-bold text-center text-xl font-sans mb-2 text-primary">Siap Mendownload Resi?</h3>
                  <p className="text-center font-public-sans text-sm text-on-surface-variant mb-8 line-clamp-3">
                    Pastikan informasi yang diisi lengkap. Menekan tombol dibawah akan menerbitkan `Nomor Lacak Transaksi` secara otomatis.
                  </p>

                  <PrimaryButton className="w-full flex justify-center py-4 text-sm font-bold shadow-md hover:shadow-lg transition-all tracking-widest uppercase">
                    Terbitkan Resi Donasi
                  </PrimaryButton>

                  <div className="flex items-center justify-center gap-2 mt-6 opacity-60">
                     <span className="material-symbols-outlined text-[16px] text-tertiary">lock</span>
                     <span className="text-[10px] font-public-sans font-bold uppercase tracking-widest">Sistem Dua-Fase Terjamin aman</span>
                  </div>
               </GlassContainer>
            </div>
          </div>
        
        </section>

      </div>
    </div>
  );
}
