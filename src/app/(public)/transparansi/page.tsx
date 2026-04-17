import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GlassContainer } from '@/components/ui/GlassContainer';
import {
  FiShield,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiPackage,
  FiUser,
  FiBox,
  FiTruck,
} from 'react-icons/fi';
import {
  MdOutlineSchool,
  MdOutlineRestaurant,
  MdOutlineMedicalServices,
} from 'react-icons/md';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portal Transparansi | Empanti - Panti Asuhan Dr. J. Lucas',
  description:
    'Jejak kebaikan real-time. Pantau secara langsung bagaimana setiap donasi dan kunjungan membawa dampak nyata di Panti Asuhan Dr. J. Lucas.',
};

/* ───── Needs data ───── */
interface NeedItem {
  icon: React.ReactNode;
  name: string;
  description: string;
  current: number;
  target: number;
  unit: string;
  priority: 'high' | 'fulfilled' | 'moderate';
  priorityLabel: string;
}

const needsData: NeedItem[] = [
  {
    icon: <MdOutlineSchool className="text-2xl text-primary" />,
    name: 'Pakaian Sekolah',
    description: 'Seragam dan kelengkapan edukasi untuk tahun ajaran baru.',
    current: 12,
    target: 20,
    unit: 'Setel',
    priority: 'high',
    priorityLabel: 'Prioritas Tinggi',
  },
  {
    icon: <MdOutlineRestaurant className="text-2xl text-primary" />,
    name: 'Beras Premium',
    description: 'Stok bahan pangan pokok untuk konsumsi bulanan anak asuh.',
    current: 50,
    target: 50,
    unit: 'Karung',
    priority: 'fulfilled',
    priorityLabel: 'Tercapai',
  },
  {
    icon: <MdOutlineMedicalServices className="text-2xl text-primary" />,
    name: 'Vitamin & Nutrisi',
    description: 'Suplemen kesehatan harian untuk menjaga daya tahan tubuh.',
    current: 85,
    target: 100,
    unit: 'Paket',
    priority: 'moderate',
    priorityLabel: 'Rutin',
  },
];

function getPriorityStyle(priority: NeedItem['priority']) {
  switch (priority) {
    case 'high':
      return {
        badge: 'bg-primary/10 text-primary border border-primary/20',
        bar: 'bg-primary',
      };
    case 'fulfilled':
      return {
        badge: 'bg-tertiary/10 text-tertiary border border-tertiary/20',
        bar: 'bg-tertiary',
      };
    case 'moderate':
      return {
        badge: 'bg-surface-container-low text-on-surface-variant border border-outline-variant/15',
        bar: 'bg-primary',
      };
  }
}

/* ───── Donation log data ───── */
interface DonationLog {
  id: string;
  name: string;
  description: string;
  timeAgo: string;
  statusLabel: string;
  statusColor: 'green' | 'blue' | 'amber';
  icon: React.ReactNode;
}

const donationLogs: DonationLog[] = [
  {
    id: '1',
    name: 'Hamba Allah',
    description: 'Donasi Dana (Sukses)',
    timeAgo: '10 Menit Lalu',
    statusLabel: 'TERVALIDASI SISTEM',
    statusColor: 'green',
    icon: <FiUser className="text-primary" />,
  },
  {
    id: '2',
    name: 'Bapak Ahmad',
    description: 'Sepatu Anak (Tervalidasi di Gudang)',
    timeAgo: '2 Jam Lalu',
    statusLabel: 'STOK MASUK',
    statusColor: 'blue',
    icon: <FiBox className="text-primary" />,
  },
  {
    id: '3',
    name: 'Ibu Maria S.',
    description: 'Perlengkapan Bayi (Selesai Sortir)',
    timeAgo: '5 Jam Lalu',
    statusLabel: 'SIAP DISTRIBUSI',
    statusColor: 'amber',
    icon: <FiTruck className="text-primary" />,
  },
  {
    id: '4',
    name: 'Anonim – Jakarta',
    description: 'Donasi Dana Pendidikan',
    timeAgo: 'Kemarin',
    statusLabel: 'TERVALIDASI SISTEM',
    statusColor: 'green',
    icon: <FiUser className="text-primary" />,
  },
];

function getStatusStyle(color: DonationLog['statusColor']) {
  switch (color) {
    case 'green':
      return 'text-tertiary';
    case 'blue':
      return 'text-primary';
    case 'amber':
      return 'text-[#b8860b]';
  }
}

/* ───── Visit event data ───── */
interface VisitEvent {
  id: string;
  image: string;
  status: 'completed' | 'upcoming';
  statusLabel: string;
  title: string;
  description: string;
  date: string;
}

const visitEvents: VisitEvent[] = [
  {
    id: '1',
    image: '/assets/visit-1.jpg',
    status: 'completed',
    statusLabel: 'SELESAI',
    title: 'Kunjungan BEM Universitas X',
    description: 'Sesi berbagi motivasi dan bantuan alat tulis untuk seluruh penghuni panti.',
    date: '15 Okt 2024',
  },
  {
    id: '2',
    image: '/assets/visit-2.jpg',
    status: 'upcoming',
    statusLabel: 'MENDATANG',
    title: 'Pesta Makan Siang Komunitas',
    description: 'Acara ramah tamah tahunan bersama lingkungan sekitar panti.',
    date: '22 Nov 2024',
  },
  {
    id: '3',
    image: '/assets/visit-3.jpg',
    status: 'completed',
    statusLabel: 'SELESAI',
    title: 'Pemeriksaan Kesehatan Rutin',
    description: 'Skrining kesehatan berkala oleh tim dokter relawan RSUD setempat.',
    date: '05 Nov 2024',
  },
];

/* ══════════════════════════════════════════
   COMPONENT
   ══════════════════════════════════════════ */
export default function TransparansiPage() {
  return (
    <div className="bg-surface">
      {/* ═══════════════════════════════════════════
          SECTION 1 — HERO
      ═══════════════════════════════════════════ */}
      <section className="bg-surface px-6 md:px-12 lg:px-20 pt-20 pb-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.08] text-on-surface mb-6 italic">
            Jejak Kebaikan Real-Time
          </h1>
          <p className="text-on-surface-variant font-sans text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Komitmen mutlak kami pada keterbukaan arsitektural. Pantau secara langsung
            bagaimana setiap donasi dan kunjungan membawa dampak nyata.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2 — KEBUTUHAN OPERASIONAL
      ═══════════════════════════════════════════ */}
      <section className="bg-surface-container-low px-6 md:px-12 lg:px-20 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <span className="font-public-sans text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant block mb-2">
                Kebutuhan Operasional
              </span>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-on-surface">
                Transparansi Kebutuhan Panti
              </h2>
            </div>
            <span className="font-public-sans text-[11px] font-semibold text-on-surface-variant italic">
              Data diperbarui otomatis setiap 1 jam
            </span>
          </div>

          {/* Needs cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {needsData.map((item, i) => {
              const style = getPriorityStyle(item.priority);
              const pct = Math.round((item.current / item.target) * 100);
              return (
                <GlassContainer key={i} className="p-6 flex flex-col gap-5">
                  {/* Top: icon + priority badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span
                      className={`inline-flex items-center font-public-sans text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${style.badge}`}
                    >
                      {item.priorityLabel}
                    </span>
                  </div>

                  {/* Info */}
                  <div>
                    <h4 className="font-bold text-base text-on-surface font-sans mb-1">
                      {item.name}
                    </h4>
                    <p className="text-sm text-on-surface-variant leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>

                  {/* Progress */}
                  <div className="mt-auto">
                    <div className="flex items-center justify-between text-xs font-public-sans font-semibold mb-2">
                      <span className="text-on-surface">
                        {item.current} / {item.target} {item.unit}
                      </span>
                      <span className="text-on-surface-variant">{pct}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-surface-container-lowest overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${style.bar}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </GlassContainer>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3 — LOG TRANSPARANSI DONASI
      ═══════════════════════════════════════════ */}
      <section className="bg-surface px-6 md:px-12 lg:px-20 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20">
          {/* Left: Headline + privacy note */}
          <div>
            <span className="font-public-sans text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant block mb-2">
              Arus Dana &amp; Barang
            </span>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-on-surface mb-5">
              Log Transparansi Donasi Terkini
            </h2>
            <p className="text-on-surface-variant font-sans text-sm leading-relaxed max-w-md mb-8">
              Sistem kami secara otomatis memvalidasi setiap bantuan yang masuk baik
              melalui transfer digital maupun serah terima barang di gudang logistik.
            </p>

            {/* Privacy notice */}
            <div className="bg-surface-container-low rounded-xl p-5 border-l-4 border-primary/40 max-w-md">
              <p className="text-sm text-on-surface-variant leading-relaxed font-sans italic">
                Kami menjaga privasi donatur dengan sistem masking nama otomatis pada
                tampilan publik sesuai dengan kebijakan etis panti.
              </p>
            </div>
          </div>

          {/* Right: Log entries */}
          <div className="space-y-4">
            {donationLogs.map((log) => (
              <GlassContainer key={log.id} className="px-5 py-4 flex items-center gap-4">
                {/* Avatar */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/8 flex items-center justify-center">
                  {log.icon}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-on-surface font-sans truncate">
                    {log.name}
                  </h4>
                  <p className="text-xs text-on-surface-variant font-sans truncate">
                    {log.description}
                  </p>
                </div>

                {/* Time + Status */}
                <div className="flex-shrink-0 text-right">
                  <span className="block text-xs font-sans font-semibold text-on-surface">
                    {log.timeAgo}
                  </span>
                  <span
                    className={`font-public-sans text-[9px] font-bold uppercase tracking-widest ${getStatusStyle(log.statusColor)}`}
                  >
                    {log.statusLabel}
                  </span>
                </div>
              </GlassContainer>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 4 — AGENDA & KUNJUNGAN TERKINI
      ═══════════════════════════════════════════ */}
      <section className="bg-surface-container-low px-6 md:px-12 lg:px-20 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <span className="font-public-sans text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant block mb-2">
              Interaksi Sosial
            </span>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-on-surface">
              Agenda &amp; Kunjungan Terkini
            </h2>
          </div>

          {/* Visit cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visitEvents.map((evt) => (
              <div key={evt.id} className="group">
                {/* Image */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-ambient mb-4">
                  <Image
                    src={evt.image}
                    alt={evt.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-on-surface/50 via-transparent to-transparent" />
                  {/* Status badge */}
                  <div className="absolute bottom-3 left-3">
                    <span
                      className={`inline-flex items-center font-public-sans text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                        evt.status === 'completed'
                          ? 'bg-primary text-white'
                          : 'bg-tertiary text-white'
                      }`}
                    >
                      {evt.statusLabel}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <h4 className="font-bold text-base text-on-surface font-sans mb-1.5">
                  {evt.title}
                </h4>
                <p className="text-sm text-on-surface-variant leading-relaxed font-sans mb-3">
                  {evt.description}
                </p>

                {/* Date */}
                <div className="flex items-center gap-2">
                  <FiCalendar className="text-primary text-sm" />
                  <span className="font-public-sans text-xs font-semibold text-primary">
                    {evt.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
