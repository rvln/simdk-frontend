"use client";

import React from "react";
import Link from "next/link";
import { MdEmail, MdArrowBack } from "react-icons/md";

export default function VerifyEmailPendingPage() {
  return (
    <div className="text-center space-y-8">
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary">
          <MdEmail className="text-5xl" />
        </div>
      </div>
      
      <div className="space-y-3">
        <h1 className="text-3xl font-black text-on-surface tracking-tight font-sans">
          Cek Email Anda
        </h1>
        <p className="text-on-surface-variant leading-relaxed font-sans max-w-sm mx-auto text-sm md:text-base">
          Kami telah mengirimkan tautan verifikasi ke alamat email Anda. 
          Silakan klik tautan tersebut untuk mengaktifkan akun Anda.
        </p>
      </div>

      <div className="pt-6">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 font-bold text-primary hover:underline transition-all"
        >
          <MdArrowBack /> Kembali ke Halaman Masuk
        </Link>
      </div>
    </div>
  );
}
