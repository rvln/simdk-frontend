import React from 'react';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-x-hidden bg-surface">
      {/* Left Column: Visual & Trust Section */}
      <section className="relative w-full md:w-1/2 min-h-[409px] md:min-h-screen">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            alt="Anak-anak belajar bersama" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCS4o4EUy_6rWz5uronUBh-sDnxU96691aagkpJUC-Y9RY01wgnPV7ZNjIJ_EmlD0eUtGqzwUgb819FY0R7YMzzcd83NNtnunMc9UREKiDx192wLew7KssoiF-feQjMOxDV2OtjB7JjsmSUCvZFogbOYvIOPYZCbPE-RAFxxzHgo_EgHIjl9nj_-2eIFwNGRV8hPP7Ieuy7jNLZlIRoFVyZWqgyx9gzyij4MDGVLwz3vzjj78tv75hlHxL4d2P4e4tvxTv6YAcnLDTe"
          />
          <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
        </div>
        
        {/* Glassmorphism Card Overlay */}
        <div className="absolute bottom-8 left-8 right-8 z-10">
          <div className="bg-surface/80 backdrop-blur-md p-8 rounded-xl shadow-ambient max-w-lg">
            <span className="material-symbols-outlined text-primary mb-4 text-3xl">format_quote</span>
            <p className="text-on-surface text-lg md:text-xl font-medium leading-relaxed italic mb-4 font-sans border-none">
              "Memberikan masa depan yang lebih baik dimulai dengan satu langkah kepedulian yang tulus setiap harinya."
            </p>
            <div className="flex items-center gap-3 mt-8">
              <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-secondary-container">account_balance</span>
              </div>
              <div>
                <p className="text-sm font-bold text-on-surface font-public-sans">Yayasan Empanti</p>
                <p className="text-xs text-on-surface-variant font-public-sans">Keluarga untuk setiap anak</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Right Column: Authentication Form Container */}
      <section className="w-full md:w-1/2 flex items-center justify-center px-6 py-16 md:px-20 lg:px-32">
        <div className="w-full max-w-md">
          {children}
        </div>
      </section>
      
      {/* Footer Return Route Standard Header */}
      <div className="absolute top-8 right-8 z-20 hidden md:block">
        <Link href="/" className="text-on-surface-variant hover:text-primary font-public-sans text-sm font-bold tracking-widest uppercase transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined">arrow_back</span>
            Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
