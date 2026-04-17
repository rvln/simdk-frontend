'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GlassContainer } from '@/components/ui/GlassContainer';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import {
  FiArrowRight,
  FiClock,
  FiEye,
  FiShield,
  FiCheckCircle,
} from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';

/* ══════════════════════════════════════════
   COMPONENT
   ══════════════════════════════════════════ */
export default function KonfirmasiKunjunganPage() {
  /* In production these values come from the form context / API response.
     We use static mock values matching the design reference. */
  const visitData = {
    dayName: 'Selasa',
    date: '15 Oktober 2024',
    time: '09:00 - 11:30',
    sessionLabel: 'Sesi Pagi – Interaksi Sosial',
    category: 'Melakukan Kegiatan Sosial',
    hasDonation: false,
  };

  return (
    <div className="bg-surface min-h-screen">
      {/* ═══════════════════════════════════════
          SUCCESS HERO
         ═══════════════════════════════════════ */}
      <section className="px-6 pt-16 pb-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Animated heart icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute inset-0 w-20 h-20 rounded-full bg-tertiary/10 animate-pulse" />
              <div className="relative w-20 h-20 rounded-full bg-tertiary/15 flex items-center justify-center">
                <FaHeart className="text-[#1B6B3A] text-3xl" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-[44px] font-black tracking-tighter leading-[1.08] text-on-surface mb-5">
            Pengajuan Berhasil Terkirim
          </h1>

          {/* Description */}
          <p className="text-on-surface-variant font-sans text-sm md:text-base leading-relaxed max-w-lg mx-auto">
            Terima kasih atas niat baik Anda. Pengajuan Anda saat ini berstatus{' '}
            <strong className="text-primary font-bold">Menunggu Persetujuan</strong>.
            {' '}Pengurus kami akan meninjau jadwal ini dan mengirimkan konfirmasi serta Tiket Kunjungan melalui email dalam waktu 1×24 jam.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          VISIT SUMMARY CARDS
         ═══════════════════════════════════════ */}
      <section className="px-6 pb-10">
        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Tanggal Kunjungan */}
            <GlassContainer className="p-5">
              <span className="block font-public-sans text-[9px] font-bold uppercase tracking-[0.18em] text-on-surface-variant mb-3">
                Tanggal Kunjungan
              </span>
              <p className="font-sans font-black text-lg text-on-surface leading-tight">
                {visitData.dayName},
              </p>
              <p className="font-sans text-sm text-on-surface-variant mt-0.5">
                {visitData.date}
              </p>
            </GlassContainer>

            {/* Sesi Waktu */}
            <GlassContainer className="p-5">
              <span className="block font-public-sans text-[9px] font-bold uppercase tracking-[0.18em] text-on-surface-variant mb-3">
                Sesi Waktu
              </span>
              <div className="flex items-center gap-2 mb-1">
                <FiClock className="text-on-surface text-base" />
                <span className="font-sans font-black text-lg text-on-surface">
                  {visitData.time}
                </span>
              </div>
              <p className="font-sans text-sm text-on-surface-variant mt-0.5">
                {visitData.sessionLabel}
              </p>
            </GlassContainer>

            {/* Kategori */}
            <GlassContainer className="p-5">
              <span className="block font-public-sans text-[9px] font-bold uppercase tracking-[0.18em] text-on-surface-variant mb-3">
                Kategori
              </span>
              <span className="inline-flex items-center gap-1 bg-primary/10 text-primary font-public-sans text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
                Verified Impact
              </span>
              <p className="font-sans font-bold text-sm text-on-surface leading-snug">
                {visitData.category}
              </p>
            </GlassContainer>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SANCTUARY IMAGE
         ═══════════════════════════════════════ */}
      <section className="px-6 pb-10">
        <div className="max-w-2xl mx-auto">
          <div className="relative aspect-[16/7] rounded-2xl overflow-hidden shadow-ambient">
            <Image
              src="/assets/kunjungan-success.png"
              alt="Empanti — Anak-anak dan relawan bersama"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 672px"
            />
            {/* Overlay badge */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-on-surface/50 backdrop-blur-md rounded-full px-4 py-2">
              <FiCheckCircle className="text-white text-sm" />
              <span className="font-public-sans text-[9px] font-bold uppercase tracking-[0.16em] text-white">
                Sanctuary Trust Protocol
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          DONATION FOLLOW-UP (conditional)
         ═══════════════════════════════════════ */}
      {visitData.hasDonation && (
        <section className="px-6 pb-8">
          <div className="max-w-2xl mx-auto text-center">
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed mb-5">
              Karena Anda berencana membawa donasi fisik, mohon lengkapi detailnya agar kami dapat
              menyiapkan tanda terima yang transparan.
            </p>
            <Link href="/jadwal-kunjungan/konfirmasi/donasi-fisik">
              <PrimaryButton className="w-full md:w-auto inline-flex items-center justify-center gap-2 py-4 px-10 text-base font-bold tracking-wide rounded-xl">
                <FiShield className="text-lg" />
                Lengkapi Data Barang Bawaan (Pra-Submission)
              </PrimaryButton>
            </Link>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════
          CTA BUTTONS
         ═══════════════════════════════════════ */}
      <section className="px-6 pb-10">
        <div className="max-w-2xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4">
          {!visitData.hasDonation && (
            <Link href="/">
              <PrimaryButton className="inline-flex items-center justify-center gap-2 py-4 px-10 text-base font-bold tracking-wide rounded-xl">
                Kembali ke Beranda
                <FiArrowRight className="text-lg" />
              </PrimaryButton>
            </Link>
          )}

          <Link
            href="/jadwal-kunjungan"
            className="inline-flex items-center gap-2 font-sans text-sm font-bold text-on-surface-variant hover:text-primary transition-colors py-3 px-4"
          >
            <FiEye className="text-base" />
            Lihat Status Kunjungan
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TRUST BADGES
         ═══════════════════════════════════════ */}
      <section className="px-6 pb-16">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-1.5 opacity-50">
              <FiShield className="text-sm text-on-surface-variant" />
              <span className="font-public-sans text-[9px] font-bold uppercase tracking-widest text-on-surface-variant">
                End-to-End Encryption
              </span>
            </div>
            <div className="flex items-center gap-1.5 opacity-50">
              <FiCheckCircle className="text-sm text-on-surface-variant" />
              <span className="font-public-sans text-[9px] font-bold uppercase tracking-widest text-on-surface-variant">
                Sustainable Care
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
