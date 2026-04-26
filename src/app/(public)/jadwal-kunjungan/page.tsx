"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import {
  FiChevronLeft,
  FiChevronRight,
  FiCalendar,
  FiFileText,
  FiCheckCircle,
  FiUsers,
  FiClock,
} from "react-icons/fi";

/* ──────────────────────────────────────────
   Calendar helpers
   ────────────────────────────────────────── */
const DAY_LABELS = ["MIN", "SEN", "SEL", "RAB", "KAM", "JUM", "SAB"];
const MONTH_NAMES = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

interface CalendarDay {
  date: number;
  month: "prev" | "current" | "next";
  fullDate: Date;
}

function buildCalendarGrid(year: number, month: number): CalendarDay[] {
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();

  const grid: CalendarDay[] = [];

  // fill prev-month tail
  for (let i = firstDay - 1; i >= 0; i--) {
    const d = daysInPrev - i;
    grid.push({
      date: d,
      month: "prev",
      fullDate: new Date(year, month - 1, d),
    });
  }
  // current month
  for (let d = 1; d <= daysInMonth; d++) {
    grid.push({
      date: d,
      month: "current",
      fullDate: new Date(year, month, d),
    });
  }
  // next-month head (pad to 42 = 6 rows)
  const remaining = 42 - grid.length;
  for (let d = 1; d <= remaining; d++) {
    grid.push({
      date: d,
      month: "next",
      fullDate: new Date(year, month + 1, d),
    });
  }
  return grid;
}

/* ──────────────────────────────────────────
   Mock upcoming events
   ────────────────────────────────────────── */
interface VisitEvent {
  id: string;
  sessionLabel: string;
  sessionTime: string;
  date: string;
  dateObj: Date;
  title: string;
  status: "booked" | "open";
  statusLabel: string;
  participantsLabel: string;
  participantsIcon: "users" | "check";
}

const upcomingEvents: VisitEvent[] = [
  {
    id: "1",
    sessionLabel: "SESI SIANG (13:00 – 15:00)",
    sessionTime: "13:00 – 15:00",
    date: "Kamis, 15 Okt 2024",
    dateObj: new Date(2024, 9, 15),
    title: "Kunjungan Kasih – BEM Universitas X",
    status: "booked",
    statusLabel: "TELAH DIPESAN",
    participantsLabel: "12 PESERTA TERDAFTAR",
    participantsIcon: "users",
  },
  {
    id: "2",
    sessionLabel: "SESI PAGI (09:00 – 11:30)",
    sessionTime: "09:00 – 11:30",
    date: "Sabtu, 18 Okt 2024",
    dateObj: new Date(2024, 9, 18),
    title: "Kegiatan Mewarnai Bersama – Komunitas Peduli Anak",
    status: "booked",
    statusLabel: "TELAH DIPESAN",
    participantsLabel: "8 RELAWAN TERVERIFIKASI",
    participantsIcon: "check",
  },
];

/* Helper: check if a date has an event */
function dateHasEvent(date: Date): boolean {
  return upcomingEvents.some(
    (evt) =>
      evt.dateObj.getFullYear() === date.getFullYear() &&
      evt.dateObj.getMonth() === date.getMonth() &&
      evt.dateObj.getDate() === date.getDate(),
  );
}

/* ══════════════════════════════════════════
   COMPONENT
   ══════════════════════════════════════════ */
export default function JadwalKunjunganPage() {
  const [viewYear, setViewYear] = useState(2024);
  const [viewMonth, setViewMonth] = useState(9); // October (0-indexed)
  const [selectedDay, setSelectedDay] = useState<number | null>(15);

  const grid = useMemo(
    () => buildCalendarGrid(viewYear, viewMonth),
    [viewYear, viewMonth],
  );

  const goToPrev = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else setViewMonth((m) => m - 1);
  };
  const goToNext = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else setViewMonth((m) => m + 1);
  };

  return (
    <div className="bg-surface">
      {/* ═══════════════════════════════════════════
          SECTION 1 — HERO
      ═══════════════════════════════════════════ */}
      <section className="bg-surface-container-low px-6 md:px-12 lg:px-20 pt-20 pb-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.08] text-on-surface mb-6 italic">
            Agenda Kunjungan &amp; <br className="hidden sm:block" />
            Interaksi Sosial
          </h1>
          <p className="text-on-surface-variant font-sans text-base md:text-lg leading-relaxed max-w-xl">
            Pantau jadwal kegiatan secara real-time. Kami menjaga transparansi
            ruang dan waktu agar setiap kunjungan memberikan dampak maksimal
            tanpa mengganggu rutinitas belajar dan istirahat anak-anak.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2 — CALENDAR + SESSION CARDS
      ═══════════════════════════════════════════ */}
      <section className="bg-surface px-6 md:px-12 lg:px-20 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-14 items-start">
          {/* ── Calendar ── */}
          <GlassContainer className="p-6 md:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl md:text-2xl font-black tracking-tight text-on-surface font-sans">
                {MONTH_NAMES[viewMonth]} {viewYear}
              </h2>
              <div className="flex items-center gap-1">
                <button
                  onClick={goToPrev}
                  aria-label="Bulan sebelumnya"
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors"
                >
                  <FiChevronLeft className="text-lg" />
                </button>
                <button
                  onClick={goToNext}
                  aria-label="Bulan berikutnya"
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors"
                >
                  <FiChevronRight className="text-lg" />
                </button>
              </div>
            </div>

            {/* Day-of-week labels */}
            <div className="grid grid-cols-7 mb-2">
              {DAY_LABELS.map((d) => (
                <div
                  key={d}
                  className="text-center font-public-sans text-[11px] font-bold uppercase tracking-widest text-on-surface-variant py-2"
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Date grid */}
            <div className="grid grid-cols-7">
              {grid.map((cell, i) => {
                const isOtherMonth = cell.month !== "current";
                const isSelected = !isOtherMonth && cell.date === selectedDay;
                const hasEvent = !isOtherMonth && dateHasEvent(cell.fullDate);

                return (
                  <button
                    key={i}
                    onClick={() => {
                      if (!isOtherMonth) setSelectedDay(cell.date);
                    }}
                    className={`
                      relative flex flex-col items-center justify-center py-3 md:py-4 rounded-xl
                      transition-all duration-200 text-sm font-sans font-medium
                      ${
                        isOtherMonth
                          ? "text-on-surface-variant/30 cursor-default"
                          : isSelected
                            ? "bg-primary text-white font-bold shadow-ambient"
                            : hasEvent
                              ? "bg-primary/10 text-primary font-bold hover:bg-primary/20 cursor-pointer"
                              : "text-on-surface hover:bg-surface-container-low cursor-pointer"
                      }
                    `}
                  >
                    {cell.date}
                    {/* Dot indicator for events */}
                    {hasEvent && !isSelected && (
                      <span className="absolute bottom-1.5 w-1 h-1 rounded-full bg-primary" />
                    )}
                    {hasEvent && isSelected && (
                      <span className="absolute bottom-1.5 w-1 h-1 rounded-full bg-white" />
                    )}
                  </button>
                );
              })}
            </div>
          </GlassContainer>

          {/* ── Right Column: Upcoming Sessions ── */}
          <div>
            <h3 className="font-public-sans text-[11px] font-bold uppercase tracking-[0.18em] text-on-surface-variant mb-6">
              Kegiatan Mendatang
            </h3>

            <div className="space-y-5">
              {upcomingEvents.map((evt) => (
                <GlassContainer
                  key={evt.id}
                  className="p-5 flex flex-col gap-3"
                >
                  {/* Top row: session badge + status */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary font-public-sans text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-primary/20">
                      {evt.sessionLabel}
                    </span>
                    <span className="inline-flex items-center gap-1 bg-primary text-white font-public-sans text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                      {evt.statusLabel}
                    </span>
                  </div>

                  {/* Date */}
                  <h4 className="font-bold text-base text-on-surface font-sans">
                    {evt.date}
                  </h4>

                  {/* Title */}
                  <p className="text-sm text-on-surface-variant leading-relaxed font-sans">
                    {evt.title}
                  </p>

                  {/* Participants */}
                  <div className="flex items-center gap-2 pt-1">
                    {evt.participantsIcon === "users" ? (
                      <FiUsers className="text-primary text-sm" />
                    ) : (
                      <FiCheckCircle className="text-primary text-sm" />
                    )}
                    <span className="font-public-sans text-[10px] font-bold uppercase tracking-widest text-on-surface">
                      {evt.participantsLabel}
                    </span>
                  </div>
                </GlassContainer>
              ))}

              {/* Slot availability notice */}
              <div className="flex flex-col items-center justify-center py-8 rounded-xl border border-dashed border-outline-variant/20 text-center">
                <FiClock className="text-3xl text-on-surface-variant/40 mb-3" />
                <p className="text-sm text-on-surface-variant font-sans">
                  Slot tersedia pada 20–25 Oktober
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3 — CTA BANNER
      ═══════════════════════════════════════════ */}
      <section className="bg-surface-container-low px-6 md:px-12 lg:px-20 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text + CTAs */}
          <div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-snug text-on-surface mb-5">
              Rencanakan Momen Berharga Anda
            </h2>
            <p className="text-on-surface-variant font-sans text-base leading-relaxed max-w-md mb-8">
              Bawa kehangatan untuk anak-anak di Empanti. Untuk memastikan
              kenyamanan bersama, setiap kunjungan memerlukan akun terverifikasi
              dan persetujuan jadwal.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/jadwal-kunjungan/atur-jadwal">
                <PrimaryButton className="flex items-center gap-2.5 px-7 py-4 text-sm font-bold tracking-wide">
                  <FiCalendar className="text-base" />
                  Jadwalkan Kunjungan Sekarang
                </PrimaryButton>
              </Link>

              <Link
                href="/panduan-kunjungan"
                className="inline-flex items-center gap-2.5 bg-surface-container-lowest px-7 py-4 rounded-md font-public-sans text-sm font-bold text-on-surface hover:shadow-ambient transition-all border border-outline-variant/15"
              >
                <FiFileText className="text-primary text-base" />
                Pelajari Panduan Kunjungan
              </Link>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-ambient">
            <Image
              src="/assets/kunjungan-cta.jpg"
              alt="Kunjungan ke Panti Asuhan Empanti"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
