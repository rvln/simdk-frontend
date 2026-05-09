"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
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
import { MdMailOutline, MdArrowForward } from "react-icons/md";

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

interface Capacity {
  id: string;
  date: string;
  slot: string;
  quota: number;
  booked: number;
  is_active: boolean;
}

const SLOT_DEF = [
  { id: "MORNING", label: "PAGI", time: "08:00 - 10:00" },
  { id: "AFTERNOON", label: "SIANG", time: "13:00 - 15:00" },
  { id: "EVENING", label: "SORE", time: "15:30 - 18:00" },
  { id: "NIGHT", label: "MALAM", time: "19:00 - 20:00" },
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
  // --- VERIFICATION GATE SIMULATION ---
  // Default false to show the verification gate for audit purposes
  const [isVerified, setIsVerified] = useState(false);

  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedSession, setSelectedSession] = useState<string>("");

  const [capacities, setCapacities] = useState<Capacity[]>([]);

  // H+1 lead time: strip time so today is fully disabled
  const todayMidnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );

  // State leakage fix: reset session when date context changes
  useEffect(() => {
    setSelectedSession("");
  }, [selectedDay, viewMonth, viewYear]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/capacities`, {
      headers: { Accept: "application/json" },
    })
      .then((res) => (res.ok ? res.json() : { data: [] }))
      .then((json) => setCapacities(json.data || []))
      .catch(() => setCapacities([]));
  }, []);

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

  const selectedDateStr = selectedDay
    ? `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`
    : "";
  const slotsForDate = selectedDay
    ? capacities.filter((c) => {
        // Convert ISO timestamp to local WITA date string for accurate comparison
        const d = new Date(c.date);
        const localStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
        return localStr === selectedDateStr;
      })
    : [];

  const selectedDate = selectedDay
    ? new Date(viewYear, viewMonth, selectedDay)
    : null;
  const dayName = selectedDate ? DAY_FULL[selectedDate.getDay()] : "";

  const currentStep = 1;

  // Rows for calendar (trim to only needed rows)
  const rows: CalendarDay[][] = [];
  for (let i = 0; i < grid.length; i += 7) {
    rows.push(grid.slice(i, i + 7));
  }

  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Cek token di memori peramban
    const token = localStorage.getItem("auth_token");

    if (!token) {
      // Jika tidak ada token, tendang ke halaman login dengan membawa parameter tujuan
      // encodeURIComponent memastikan karakter '/' aman di dalam URL
      router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
    } else {
      setIsAuthorized(true);
    }
  }, [pathname, router]);

  // Mencegah kedipan UI (FOUC) saat sedang mengecek token
  if (!isAuthorized) {
    return (
      <div className="flex justify-center items-center h-screen">
        Memeriksa otorisasi...
      </div>
    );
  }

  return (
    <div className="bg-surface min-h-screen">
      {/* ═══════════════════════════════════════
          VERIFICATION GATE OVERLAY
         ═══════════════════════════════════════ */}
      {!isVerified && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-surface/60 backdrop-blur-md">
          <div className="bg-surface-container-lowest p-8 md:p-12 rounded-2xl shadow-ambient max-w-lg w-full text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <MdMailOutline className="text-3xl text-primary" />
            </div>
            <h2 className="text-2xl font-black text-on-surface mb-3 font-sans">
              Verifikasi Email Diperlukan
            </h2>
            <p className="text-on-surface-variant font-sans text-sm leading-relaxed mb-8">
              Untuk menjaga transparansi dan kenyamanan bersama, setiap
              pengajuan jadwal kunjungan mewajibkan Anda untuk memverifikasi
              alamat email terlebih dahulu.
            </p>
            <PrimaryButton
              onClick={() => setIsVerified(true)}
              className="w-full flex items-center justify-center gap-2 py-4"
            >
              Kirim Ulang Verifikasi Email
              <MdArrowForward className="text-lg" />
            </PrimaryButton>

            <button
              onClick={() => setIsVerified(true)}
              className="mt-6 text-xs text-on-surface-variant/50 hover:text-primary transition-colors cursor-pointer italic font-public-sans uppercase tracking-widest"
            >
              [DEV] Lewati Simulasi Ini
            </button>
          </div>
        </div>
      )}

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
            kebahagiaan di Panti Asuhan.
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
                    const isPast = cell.fullDate <= todayMidnight;
                    const isDisabledCell = isOtherMonth || isPast;
                    const isSelected =
                      !isDisabledCell && cell.date === selectedDay;

                    return (
                      <button
                        key={`${rowIdx}-${colIdx}`}
                        onClick={() => {
                          if (!isDisabledCell) setSelectedDay(cell.date);
                        }}
                        disabled={isDisabledCell}
                        className={`
                          relative flex items-center justify-center py-3 md:py-4 rounded-xl
                          transition-all duration-200 text-sm font-sans font-medium
                          ${
                            isDisabledCell
                              ? "text-on-surface-variant/30 cursor-not-allowed"
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
            {SLOT_DEF.map((def) => {
              const cap = slotsForDate.find((c) => c.slot === def.id);
              let isDisabled = true;
              let isFull = false;
              let isClosed = false;
              let statusLabel = "Tidak Tersedia";

              if (cap) {
                if (!cap.is_active) {
                  isDisabled = true;
                  isClosed = true;
                  statusLabel = "Tutup";
                } else if (cap.booked >= cap.quota) {
                  isDisabled = true;
                  isFull = true;
                  statusLabel = "Penuh";
                } else {
                  isDisabled = false;
                  statusLabel = "Tersedia";
                }
              }

              const isActive = cap && selectedSession === cap.id;

              return (
                <button
                  key={def.id}
                  onClick={() => {
                    if (!isDisabled && cap) setSelectedSession(cap.id);
                  }}
                  disabled={isDisabled}
                  className={`
                    flex flex-col items-center gap-1 py-4 px-3 rounded-xl text-center transition-all duration-200
                    ${
                      isDisabled
                        ? "bg-surface-dim/40 text-on-surface-variant/50 cursor-not-allowed"
                        : isActive
                          ? "bg-gradient-to-br from-primary to-primary-container text-white shadow-ambient"
                          : "bg-surface-container-lowest text-on-surface hover:bg-surface-container-low border border-outline-variant/10"
                    }
                  `}
                >
                  <span
                    className={`font-public-sans text-[10px] font-bold uppercase tracking-[0.14em] ${
                      isDisabled
                        ? "text-on-surface-variant/40"
                        : isActive
                          ? "text-white/70"
                          : "text-on-surface-variant"
                    }`}
                  >
                    {def.label}
                  </span>
                  <span
                    className={`font-sans font-bold text-sm tracking-tight ${
                      isDisabled ? "text-on-surface-variant/50 italic" : ""
                    }`}
                  >
                    {isDisabled ? statusLabel : def.time}
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
      {(() => {
        const activeCap = capacities.find((c) => c.id === selectedSession);
        const activeDef = activeCap
          ? SLOT_DEF.find((d) => d.id === activeCap.slot)
          : null;
        if (!activeCap || !activeDef) return null;

        return (
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
                  &bull; {activeDef.time} WIB
                </p>

                {/* Capacity bar */}
                <div className="bg-surface-container-lowest rounded-xl p-4 mb-4 border border-outline-variant/10">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="font-sans text-sm text-on-surface-variant">
                      Kapasitas Sesi
                    </span>
                    <span className="font-sans text-sm font-bold text-primary">
                      Tersedia ({activeCap.booked}/{activeCap.quota})
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-surface-dim/40 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-primary-container transition-all duration-500"
                      style={{
                        width: `${(activeCap.booked / activeCap.quota) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Recommendation text */}
                <p className="font-sans text-xs text-on-surface-variant text-center italic leading-relaxed">
                  &ldquo;Waktu ini sangat disarankan untuk kunjungan keluarga
                  atau kelompok kecil.&rdquo;
                </p>
              </GlassContainer>
            </div>
          </section>
        );
      })()}

      {/* ═══════════════════════════════════════
          CTA BUTTON
         ═══════════════════════════════════════ */}
      <section className="px-6 pb-8">
        <div className="max-w-xl mx-auto">
          {(() => {
            const activeCap = capacities.find((c) => c.id === selectedSession);
            const activeDef = activeCap
              ? SLOT_DEF.find((d) => d.id === activeCap.slot)
              : null;

            return (
              <Link
                href={`/jadwal-kunjungan/detail?capacity_id=${activeCap?.id ?? ""}&date=${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}&session_label=${encodeURIComponent(activeDef?.label ?? "")}&session_time=${encodeURIComponent(activeDef?.time ?? "")}`}
              >
                <PrimaryButton
                  className="w-full flex items-center justify-center gap-2 py-4 text-base font-bold shadow-md hover:shadow-lg transition-all tracking-wide rounded-xl"
                  disabled={!selectedSession}
                >
                  Ajukan Kunjungan
                </PrimaryButton>
              </Link>
            );
          })()}
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
            Panti Asuhan Dr Lucas menjamin data pribadi Anda dienkripsi dan
            hanya digunakan untuk keperluan administrasi kunjungan.
          </p>
        </div>
      </section>
    </div>
  );
}
