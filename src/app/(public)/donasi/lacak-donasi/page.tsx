"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import {
  MdArrowBack,
  MdLocalShipping,
  MdCheckCircle,
  MdInventory2,
  MdChat,
  MdContentCopy,
  MdInfoOutline,
  MdExpandMore,
  MdExpandLess,
} from "react-icons/md";

export default function LacakDonasiPage() {
  const [copied, setCopied] = useState(false);
  const [expandedItemId, setExpandedItemId] = useState<string | null>("item-1");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const resi = "TXN-DON-2024-XXXX";

  const slideshowImages = [
    "/example_img/unsplash1.png",
    "/example_img/unsplash2.png",
    "/example_img/unsplash3.png",
    "/example_img/unsplash4.png",
    "/example_img/unsplash5.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % slideshowImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slideshowImages.length]);

  const MOCK_TRACKING_ITEMS = [
    {
      id: "item-1",
      name: "Paket Sembako Berkah",
      category: "Sembako & Pangan",
      condition: "Baru / Segel",
      quantity: "5 Paket",
      description: "Beras premium 5kg, minyak goreng 2L, gula pasir 1kg, dan sarden kaleng. Semua dalam kondisi tersegel baik."
    },
    {
      id: "item-2",
      name: "Buku Tulis Sinar Dunia",
      category: "Pendidikan",
      condition: "Baru",
      quantity: "10 Lusin",
      description: "Buku tulis 38 lembar untuk keperluan sekolah anak-anak panti."
    },
    {
      id: "item-3",
      name: "Pakaian Layak Pakai",
      category: "Sandang",
      condition: "Bekas Layak Pakai",
      quantity: "2 Dus",
      description: "Pakaian untuk anak usia 5-12 tahun, sudah dicuci dan disetrika rapi."
    },
    {
      id: "item-4",
      name: "Mainan Edukatif",
      category: "Hiburan & Edukasi",
      condition: "Baru",
      quantity: "3 Set",
      description: "Puzzle balok kayu dan lego set untuk melatih kreativitas."
    },
    {
      id: "item-5",
      name: "Susu Bubuk Dancow",
      category: "Nutrisi",
      condition: "Baru / Segel",
      quantity: "10 Kotak",
      description: "Susu bubuk ukuran 800g rasa cokelat dan vanila."
    }
  ];

  const handleCopyResi = () => {
    navigator.clipboard.writeText(resi);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    { label: "Menunggu Pengiriman", status: "active", icon: <MdLocalShipping /> },
    {
      label: "Tervalidasi & Diterima",
      status: "pending",
      icon: <MdCheckCircle />,
    },
    { label: "Didistribusikan", status: "pending", icon: <MdInventory2 /> },
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
            <MdArrowBack className="group-hover:-translate-x-1 transition-transform" />
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
            <div className="aspect-square w-full relative rounded-2xl overflow-hidden bg-surface-container-low shadow-sm transition-all duration-700">
              
              {/* Slideshow Images */}
              {slideshowImages.map((src, index) => {
                const isActive = index === currentImageIndex;
                return (
                  <div
                    key={src}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      isActive ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`Dokumentasi Barang ${index + 1}`}
                      fill
                      className="object-cover"
                      onError={(e) =>
                        (e.currentTarget.src =
                          "https://placehold.co/1200x1200/f7f3ef/4c92c9?text=Dokumentasi+Barang")
                      }
                    />
                  </div>
                );
              })}

              {/* Gradient Overlay for better contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-20 pointer-events-none" />

              {/* Top-Left Label (Glassmorphism) */}
              <div className="absolute top-4 left-4 z-30">
                <div className="px-4 py-2 rounded-xl bg-white/20 backdrop-blur-md border-none shadow-sm">
                  <span className="block font-public-sans text-[10px] font-bold uppercase tracking-[0.25em] text-white">
                    Dokumentasi Donatur
                  </span>
                </div>
              </div>

              {/* Bottom Dots Indicator */}
              <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center items-center gap-2">
                {slideshowImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      index === currentImageIndex
                        ? "w-8 bg-white shadow-sm"
                        : "w-2 bg-white/50 hover:bg-white/80"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Rincian & Aksi */}
          <div className="flex flex-col">
            <span className="block font-public-sans text-[10px] font-bold uppercase tracking-[0.25em] text-on-surface-variant mb-6">
              Rincian Barang
            </span>

            <GlassContainer className="p-6 md:p-8 border-none shadow-ambient bg-surface-container-lowest flex-1 relative overflow-hidden flex flex-col">
              <div className="relative z-10 flex-1 flex flex-col">
                <div className="max-h-[400px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-surface-container-high [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-on-surface-variant/30 transition-all space-y-2">
                  {MOCK_TRACKING_ITEMS.map((item) => {
                    const isExpanded = expandedItemId === item.id;
                    return (
                      <div key={item.id} className="border-b border-gray-100 last:border-none pb-4 mb-4 last:mb-0 last:pb-0">
                        {/* Header */}
                        <button
                          onClick={() => setExpandedItemId(isExpanded ? null : item.id)}
                          className="w-full flex items-center justify-between text-left group"
                        >
                          <div className="flex flex-col pr-4">
                            <span className="font-bold text-on-surface group-hover:text-primary transition-colors text-sm md:text-base">
                              {item.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <span className="text-xs md:text-sm font-bold text-on-surface-variant bg-surface-container-low px-3 py-1 rounded-full">
                              {item.quantity}
                            </span>
                            {isExpanded ? (
                              <MdExpandLess className="text-xl text-primary" />
                            ) : (
                              <MdExpandMore className="text-xl text-on-surface-variant group-hover:text-primary transition-colors" />
                            )}
                          </div>
                        </button>

                        {/* Body (Expanded Content) */}
                        <div
                          className={`grid transition-all duration-300 ease-in-out ${
                            isExpanded ? "grid-rows-[1fr] opacity-100 mt-5" : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div className="grid grid-cols-2 gap-4 md:gap-6 mb-5">
                              <div className="space-y-1">
                                <span className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">
                                  Kategori
                                </span>
                                <p className="font-bold text-on-surface text-xs md:text-sm">
                                  {item.category}
                                </p>
                              </div>
                              <div className="space-y-1">
                                <span className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">
                                  Kondisi
                                </span>
                                <p className="font-bold text-on-surface text-xs md:text-sm">{item.condition}</p>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <span className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">
                                Deskripsi
                              </span>
                              <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed italic">
                                "{item.description}"
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl opacity-50 pointer-events-none" />
            </GlassContainer>

            {/* Info Box: Catatan Pengiriman */}
            <div className="mt-8 p-6 rounded-2xl bg-surface-container-low flex items-start gap-4">
              <MdInfoOutline className="text-primary mt-1 shrink-0 text-lg" />
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
                <MdChat className="text-lg" />
                <span>Hubungi Petugas</span>
              </Link>
              <PrimaryButton
                onClick={handleCopyResi}
                className="flex items-center gap-3 px-8 py-4 rounded-xl shadow-ambient hover:shadow-lg transition-all w-full md:w-auto justify-center"
              >
                <MdContentCopy className={`text-lg ${copied ? "text-tertiary" : ""}`} />
                <span>{copied ? "Tersalin" : "Salin Nomor Resi"}</span>
              </PrimaryButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
