"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import {
  FiArrowLeft,
  FiTruck,
  FiCheckCircle,
  FiPackage,
  FiMessageCircle,
  FiCopy,
  FiInfo,
} from "react-icons/fi";

export default function LacakDonasiPage() {
  const [copied, setCopied] = useState(false);
  const resi = "TXN-DON-2024-XXXX";

  const handleCopyResi = () => {
    navigator.clipboard.writeText(resi);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    { label: "Menunggu Pengiriman", status: "active", icon: <FiTruck /> },
    {
      label: "Tervalidasi & Diterima",
      status: "pending",
      icon: <FiCheckCircle />,
    },
    { label: "Didistribusikan", status: "pending", icon: <FiPackage /> },
  ];

  return (
    <div className="min-h-screen bg-surface">
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-12 lg:py-16">
        {/* ── Header ── */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary mb-6 group transition-colors"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span>Kembali ke Beranda</span>
          </Link>
          <h1 className="text-3xl md:text-5xl font-black text-on-surface tracking-tighter italic">
            Status Resi: {resi}
          </h1>
        </div>

        {/* ── Stepper: Exactly 3 Steps Horizontal ── */}
        <div className="mb-20">
          <div className="relative flex items-center justify-between max-w-5xl mx-auto">
            {/* Background Line */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-surface-container-high z-0" />

            {steps.map((step, idx) => {
              const isActive = step.status === "active";
              const isPending = step.status === "pending";

              return (
                <div
                  key={idx}
                  className="relative z-10 flex flex-col items-center flex-1"
                >
                  <div
                    className={`
                    w-14 h-14 rounded-full flex items-center justify-center ring-[10px] ring-surface transition-all duration-500
                    ${isActive ? "bg-tertiary text-white shadow-lg shadow-tertiary/30 scale-110" : ""}
                    ${isPending ? "bg-surface-container-highest text-on-surface-variant" : ""}
                  `}
                  >
                    <span className="text-xl">{step.icon}</span>
                  </div>
                  <span
                    className={`mt-5 font-public-sans text-[11px] font-black uppercase tracking-[0.2em] text-center ${isActive ? "text-tertiary" : "text-on-surface-variant"}`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Layout Grid (2 Columns) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
          {/* LEFT COLUMN: Dokumentasi Donatur */}
          <div className="relative group flex flex-col">
            <span className="block font-public-sans text-[10px] font-bold uppercase tracking-[0.25em] text-on-surface-variant mb-6">
              Dokumentasi Donatur
            </span>
            <div className="aspect-square w-full relative rounded-[40px] overflow-hidden bg-surface-container-low shadow-ambient group-hover:shadow-2xl transition-all duration-700">
              <Image
                src="/assets/default-donation-doc.jpg"
                alt="Dokumentasi Barang"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://placehold.co/1200x1200/f7f3ef/4c92c9?text=Dokumentasi+Barang")
                }
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* RIGHT COLUMN: Rincian & Aksi */}
          <div className="flex flex-col">
            <span className="block font-public-sans text-[10px] font-bold uppercase tracking-[0.25em] text-on-surface-variant mb-6">
              Rincian Barang
            </span>

            <GlassContainer className="p-8 md:p-10 border-none shadow-ambient bg-surface-container-lowest flex-1 relative overflow-hidden">
              <div className="space-y-8 relative z-10">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <span className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">
                      Nama
                    </span>
                    <p className="font-bold text-on-surface">
                      Paket Sembako Berkah
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">
                      Kategori
                    </span>
                    <p className="font-bold text-on-surface">
                      Sembako & Pangan
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <span className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">
                      Kondisi
                    </span>
                    <p className="font-bold text-on-surface">Baru / Segel</p>
                  </div>
                  <div className="space-y-1">
                    <span className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">
                      Jumlah
                    </span>
                    <p className="font-bold text-on-surface">5 Paket Besar</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">
                    Deskripsi
                  </span>
                  <p className="text-sm text-on-surface-variant leading-relaxed italic">
                    "Beras premium 5kg, minyak goreng 2L, gula pasir 1kg, dan
                    sarden kaleng. Semua dalam kondisi tersegel baik."
                  </p>
                </div>
              </div>

              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl opacity-50 pointer-events-none" />
            </GlassContainer>

            {/* Info Box: Catatan Pengiriman */}
            <div className="mt-8 p-6 rounded-2xl bg-surface-container-low flex items-start gap-4">
              <FiInfo className="text-primary mt-1 shrink-0" />
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-widest text-primary mb-1">
                  Catatan Pengiriman
                </span>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Paket saat ini sedang menunggu kurir logistik untuk dijemput.
                  Harap pastikan nomor resi terlihat jelas pada kemasan luar.
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-auto pt-12 flex flex-col md:flex-row items-center justify-end gap-6">
              <Link
                href="/kontak"
                className="flex items-center gap-2 text-xs font-bold text-primary hover:text-primary-container transition-colors tracking-widest uppercase"
              >
                <FiMessageCircle />
                <span>Hubungi Petugas</span>
              </Link>
              <PrimaryButton
                onClick={handleCopyResi}
                className="flex items-center gap-3 px-8 py-4 rounded-xl shadow-ambient hover:shadow-lg transition-all w-full md:w-auto justify-center"
              >
                <FiCopy className={copied ? "text-tertiary" : ""} />
                <span>{copied ? "Tersalin" : "Salin Nomor Resi"}</span>
              </PrimaryButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
