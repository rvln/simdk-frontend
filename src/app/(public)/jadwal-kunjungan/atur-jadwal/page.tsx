"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import {
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiCalendar,
  FiLock,
  FiBell,
  FiUser,
} from "react-icons/fi";
import { FaRegCalendarCheck } from "react-icons/fa";

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
const DAY_FULL = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

interface CalendarDay {
  date: number;
  month: "prev" | "current" | "next";
  fullDate: Date;
}

function buildCalendarGrid(year: number, month: number): CalendarDay[] {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();

  const grid: CalendarDay[] = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    const d = daysInPrev - i;
    grid.push({
      date: d,
      month: "prev",
      fullDate: new Date(year, month - 1, d),
    });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    grid.push({
      date: d,
      month: "current",
      fullDate: new Date(year, month, d),
    });
  }
  const remaining = 14 - (grid.length % 7 === 0 ? 7 : grid.length % 7);
  for (
    let d = 1;
    d <= (grid.length <= 35 ? 35 - grid.length : remaining);
    d++
  ) {
    grid.push({
      date: d,
      month: "next",
      fullDate: new Date(year, month + 1, d),
    });
  }
  return grid;
}

/* ──────────────────────────────────────────
   Session data
   ────────────────────────────────────────── */
interface Session {
  id: string;
  label: string;
  time: string;
  status: "available" | "full";
  capacity: { booked: number; total: number };
}

const sessionsData: Session[] = [
  {
    id: "pagi",
    label: "PAGI",
    time: "09:00 - 11:00",
    status: "available",
    capacity: { booked: 1, total: 4 },
  },
  {
    id: "siang",
    label: "SIANG",
    time: "13:00 - 15:00",
    status: "available",
    capacity: { booked: 2, total: 4 },
  },
  {
    id: "sore",
    label: "SORE",
    time: "15:30 - 17:30",
    status: "available",
    capacity: { booked: 3, total: 4 },
  },
  {
    id: "malam",
    label: "MALAM",
    time: "Penuh",
    status: "full",
    capacity: { booked: 4, total: 4 },
  },
];

/* ──────────────────────────────────────────
   Stepper
   ────────────────────────────────────────── */
interface StepInfo {
  number: number;
  label: string;
}

const steps: StepInfo[] = [
  { number: 1, label: "Jadwal" },
  { number: 2, label: "Detail" },
  { number: 3, label: "Konfirmasi" },
];

/* ══════════════════════════════════════════
   COMPONENT
   ══════════════════════════════════════════ */
export default function AturJadwalPage() {
  const [viewYear, setViewYear] = useState(2024);
  const [viewMonth, setViewMonth] = useState(9); // October
  const [selectedDay, setSelectedDay] = useState<number>(9);
  const [selectedSession, setSelectedSession] = useState<string>("siang");

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

  const activeSession = sessionsData.find((s) => s.id === selectedSession);
  const selectedDate = new Date(viewYear, viewMonth, selectedDay);
  const dayName = DAY_FULL[selectedDate.getDay()];

  const currentStep = 1;

  // Rows for calendar (trim to only needed rows)
  const rows: CalendarDay[][] = [];
  for (let i = 0; i < grid.length; i += 7) {
    rows.push(grid.slice(i, i + 7));
  }

  return (
    <div className="bg-surface min-h-screen">
      {/* ═══════════════════════════════════════
          AUTHENTICATED HEADER BAR
         ═══════════════════════════════════════ */}
      {/* This is already handled by the Navbar in the public layout.
          The authenticated state (bell + avatar) is a conditional render from the Navbar.
          We layer the stepper below it. */}

      {/* ═══════════════════════════════════════
          STEPPER
         ═══════════════════════════════════════ */}
      <section className="pt-8 pb-6 px-6">
        <div className="max-w-xl mx-auto">
          <div className="flex items-center justify-center">
            {steps.map((step, idx) => (
              <React.Fragment key={step.number}>
                {/* Step circle + label */}
                <div className="flex items-center gap-2">
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                      step.number === currentStep
                        ? "bg-primary text-white"
                        : step.number < currentStep
                          ? "bg-primary text-white"
                          : "bg-surface-container-low text-on-surface-variant"
                    }`}
                  >
                    {step.number}
                  </span>
                  <span
                    className={`font-sans text-sm font-medium ${
                      step.number === currentStep
                        ? "text-on-surface font-bold"
                        : "text-on-surface-variant"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>

                {/* Connector line */}
                {idx < steps.length - 1 && (
                  <div
                    className={`flex-1 h-px mx-4 ${
                      step.number < currentStep
                        ? "bg-primary"
                        : "bg-outline-variant/30"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PAGE HEADER
         ═══════════════════════════════════════ */}
      <section className="px-6 pb-10">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-[44px] font-black tracking-tighter leading-[1.08] text-on-surface mb-4">
            Jadwalkan Kunjungan Berharga Anda
          </h1>
          <p className="text-on-surface-variant font-sans text-sm md:text-base leading-relaxed max-w-lg mx-auto">
            Pilih waktu terbaik untuk bertemu dengan anak-anak dan berbagi
            kebahagiaan di Empanti.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CALENDAR
         ═══════════════════════════════════════ */}
      <section className="px-6 pb-8">
        <div className="max-w-xl mx-auto">
          <GlassContainer className="p-6 md:p-8">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={goToPrev}
                aria-label="Bulan sebelumnya"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors"
              >
                <FiChevronLeft className="text-lg" />
              </button>
              <h2 className="text-lg md:text-xl font-bold tracking-tight text-on-surface font-sans">
                {MONTH_NAMES[viewMonth]} {viewYear}
              </h2>
              <button
                onClick={goToNext}
                aria-label="Bulan berikutnya"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors"
              >
                <FiChevronRight className="text-lg" />
              </button>
            </div>

            {/* Day-of-week labels */}
            <div className="grid grid-cols-7 mb-1">
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
              {rows.map((row, rowIdx) => (
                <React.Fragment key={rowIdx}>
                  {row.map((cell, colIdx) => {
                    const isOtherMonth = cell.month !== "current";
                    const isSelected =
                      !isOtherMonth && cell.date === selectedDay;

                    return (
                      <button
                        key={`${rowIdx}-${colIdx}`}
                        onClick={() => {
                          if (!isOtherMonth) setSelectedDay(cell.date);
                        }}
                        className={`
                          relative flex items-center justify-center py-3 md:py-4 rounded-xl
                          transition-all duration-200 text-sm font-sans font-medium
                          ${
                            isOtherMonth
                              ? "text-on-surface-variant/30 cursor-default"
                              : isSelected
                                ? "bg-primary text-white font-bold shadow-ambient"
                                : "text-on-surface hover:bg-surface-container-low cursor-pointer"
                          }
                        `}
                      >
                        {cell.date}
                      </button>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </GlassContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SESI TERSEDIA
         ═══════════════════════════════════════ */}
      <section className="px-6 pb-8">
        <div className="max-w-xl mx-auto">
          {/* Section label */}
          <div className="flex items-center gap-2 mb-4">
            <FiClock className="text-on-surface text-base" />
            <h3 className="font-sans font-bold text-base text-on-surface">
              Sesi Tersedia
            </h3>
          </div>

          {/* Session buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {sessionsData.map((session) => {
              const isActive = selectedSession === session.id;
              const isFull = session.status === "full";

              return (
                <button
                  key={session.id}
                  onClick={() => {
                    if (!isFull) setSelectedSession(session.id);
                  }}
                  disabled={isFull}
                  className={`
                    flex flex-col items-center gap-1 py-4 px-3 rounded-xl text-center transition-all duration-200
                    ${
                      isFull
                        ? "bg-surface-dim/40 text-on-surface-variant/50 cursor-not-allowed"
                        : isActive
                          ? "bg-gradient-to-br from-primary to-primary-container text-white shadow-ambient"
                          : "bg-surface-container-lowest text-on-surface hover:bg-surface-container-low border border-outline-variant/10"
                    }
                  `}
                >
                  <span
                    className={`font-public-sans text-[10px] font-bold uppercase tracking-[0.14em] ${
                      isFull
                        ? "text-on-surface-variant/40"
                        : isActive
                          ? "text-white/70"
                          : "text-on-surface-variant"
                    }`}
                  >
                    {session.label}
                  </span>
                  <span
                    className={`font-sans font-bold text-sm tracking-tight ${
                      isFull ? "text-on-surface-variant/50 italic" : ""
                    }`}
                  >
                    {session.time}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          RINGKASAN KUNJUNGAN
         ═══════════════════════════════════════ */}
      {activeSession && (
        <section className="px-6 pb-10">
          <div className="max-w-xl mx-auto">
            <GlassContainer className="p-6 md:p-8 bg-surface-container-low/60">
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FaRegCalendarCheck className="text-primary text-xl" />
                </div>
              </div>

              {/* Title */}
              <h3 className="font-sans font-black text-lg text-on-surface text-center mb-1">
                Ringkasan Kunjungan
              </h3>

              {/* Date + Time */}
              <p className="font-sans text-sm text-on-surface-variant text-center mb-6">
                {dayName}, {selectedDay} {MONTH_NAMES[viewMonth]} {viewYear}{" "}
                &bull; {activeSession.time} WIB
              </p>

              {/* Capacity bar */}
              <div className="bg-surface-container-lowest rounded-xl p-4 mb-4 border border-outline-variant/10">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="font-sans text-sm text-on-surface-variant">
                    Kapasitas Sesi
                  </span>
                  <span className="font-sans text-sm font-bold text-primary">
                    Tersedia ({activeSession.capacity.booked}/
                    {activeSession.capacity.total})
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-surface-dim/40 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-primary-container transition-all duration-500"
                    style={{
                      width: `${(activeSession.capacity.booked / activeSession.capacity.total) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Recommendation text */}
              <p className="font-sans text-xs text-on-surface-variant text-center italic leading-relaxed">
                &ldquo;Waktu ini sangat disarankan untuk kunjungan keluarga atau
                kelompok kecil.&rdquo;
              </p>
            </GlassContainer>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════
          CTA BUTTON
         ═══════════════════════════════════════ */}
      <section className="px-6 pb-8">
        <div className="max-w-xl mx-auto">
          <Link href="/jadwal-kunjungan/detail">
            <PrimaryButton
              className="w-full flex items-center justify-center gap-2 py-4 text-base font-bold shadow-md hover:shadow-lg transition-all tracking-wide rounded-xl"
              disabled={!selectedSession}
            >
              Ajukan Kunjungan
            </PrimaryButton>
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TRUST BADGE
         ═══════════════════════════════════════ */}
      <section className="px-6 pb-16">
        <div className="max-w-xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <FiLock className="text-on-surface-variant/60 text-sm" />
            <span className="font-public-sans text-[10px] font-bold uppercase tracking-[0.18em] text-on-surface-variant/60">
              Keamanan &amp; Privasi
            </span>
          </div>
          <p className="font-sans text-xs text-on-surface-variant/50 leading-relaxed max-w-sm mx-auto">
            Empanti menjamin data pribadi Anda dienkripsi dan hanya digunakan
            untuk keperluan administrasi kunjungan.
          </p>
        </div>
      </section>
    </div>
  );
}
