"use client";

import React, { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { MdLoop, MdErrorOutline } from "react-icons/md";
import Link from "next/link";

// Pindahkan logika ke komponen internal
function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { verifyEmail, loading, errors } = useAuth();

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    }
  }, [token, verifyEmail]);

  if (!token) {
    return (
      <div className="text-center space-y-6">
        <MdErrorOutline className="text-6xl text-red-500 mx-auto" />
        <h1 className="text-2xl font-bold text-on-surface font-sans">
          Token Tidak Ditemukan
        </h1>
        <p className="text-on-surface-variant font-sans">
          Tautan verifikasi tidak valid.
        </p>
        <Link href="/login" className="inline-block text-primary font-bold">
          Kembali ke Login
        </Link>
      </div>
    );
  }

  return (
    <div className="text-center space-y-6">
      {loading ? (
        <>
          <MdLoop className="text-6xl text-primary animate-spin mx-auto" />
          <h1 className="text-2xl font-bold text-on-surface font-sans">
            Memverifikasi Akun...
          </h1>
          <p className="text-on-surface-variant font-sans">
            Mohon tunggu sebentar.
          </p>
        </>
      ) : errors ? (
        <>
          <MdErrorOutline className="text-6xl text-red-500 mx-auto" />
          <h1 className="text-2xl font-bold text-on-surface font-sans">
            Verifikasi Gagal
          </h1>
          <p className="text-red-500 font-sans">
            {errors.general?.[0] || "Terjadi kesalahan."}
          </p>
          <Link href="/login" className="inline-block text-primary font-bold">
            Coba Masuk
          </Link>
        </>
      ) : (
        <>
          <MdLoop className="text-6xl text-primary animate-spin mx-auto" />
          <h1 className="text-2xl font-bold text-on-surface font-sans">
            Berhasil!
          </h1>
          <p className="text-on-surface-variant font-sans">
            Mengarahkan Anda ke halaman login...
          </p>
        </>
      )}
    </div>
  );
}

// Komponen utama dengan Suspense
export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center space-y-6">
          <MdLoop className="text-6xl text-primary animate-spin mx-auto" />
          <h1 className="text-2xl font-bold text-on-surface font-sans">
            Memuat Halaman...
          </h1>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
