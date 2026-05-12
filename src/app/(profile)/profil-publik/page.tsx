"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import {
  MdOutlineEmail,
  MdOutlinePerson,
  MdOutlinePhone,
  MdCheckCircle,
  MdPendingActions,
  MdHistory,
  MdOutlineCardGiftcard,
  MdAttachMoney,
  MdGroups,
  MdArrowBack,
  MdOutlineAccessTime,
  MdOutlineEventNote,
  MdCancel,
  MdSchedule,
  MdErrorOutline,
  MdTimelapse,
  MdLocalShipping,
  MdEventBusy,
} from "react-icons/md";
import {
  FiImage,
  FiX,
  FiCheck,
  FiAlertCircle,
  FiChevronDown,
  FiSend,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import LogoutButton from "@/components/layout/LogoutButton";
import { useAuth } from "@/hooks/useAuth";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

type TabState =
  | "INFORMASI_UMUM"
  | "RIWAYAT_DONASI"
  | "RIWAYAT_KUNJUNGAN"
  | "RESCHEDULE"
  | "LAPORAN_KUNJUNGAN";

const ALLOWED_MIMES = ["image/jpeg", "image/png", "image/jpg"];
const MAX_FILE_SIZE = 2048 * 1024; // 2 MB
const MAX_FILES = 5;

function validateFile(file: File): string | null {
  if (!ALLOWED_MIMES.includes(file.type))
    return `"${file.name}" — Format tidak didukung. Gunakan JPEG atau PNG.`;
  if (file.size > MAX_FILE_SIZE)
    return `"${file.name}" — Ukuran ${(file.size / 1024 / 1024).toFixed(1)} MB melebihi batas 2 MB.`;
  return null;
}

interface ProfileFormData {
  fullName: string;
  email: string;
  phone: string;
}

/* ── API Response Types ── */
interface ApiCapacity {
  id: string;
  date: string;
  slot: string;
  quota: number;
  booked: number;
}

interface ApiItemDonation {
  id: string;
  itemName_snapshot: string;
  qty: number;
}

interface ApiDonation {
  id: string;
  type: "DANA" | "BARANG";
  amount: string | null;
  status: string;
  tracking_code: string | null;
  created_at: string;
  item_donations: ApiItemDonation[];
}

interface ApiVisit {
  id: string;
  status: string;
  admin_notes: string | null;
  is_rescheduled: boolean;
  created_at: string;
  capacity: ApiCapacity | null;
  donation: { id: string; item_donations: ApiItemDonation[] } | null;
}

type GroupedVisits = Record<string, ApiVisit[]>;

const SLOT_LABELS: Record<string, string> = {
  MORNING: "08:00 – 10:00 WITA",
  AFTERNOON: "13:00 – 15:00 WITA",
  EVENING: "15:30 – 18:00 WITA",
  NIGHT: "19:00 – 20:00 WITA",
};

/* ── Status Badge Config ── */
const VISIT_STATUS_MAP: Record<
  string,
  {
    label: string;
    bg: string;
    text: string;
    Icon: React.ComponentType<{ className?: string }>;
  }
> = {
  PENDING: {
    label: "Menunggu",
    bg: "bg-amber-50",
    text: "text-amber-700",
    Icon: MdPendingActions,
  },
  APPROVED: {
    label: "Disetujui",
    bg: "bg-teal-50",
    text: "text-teal-700",
    Icon: MdCheckCircle,
  },
  REJECTED: {
    label: "Ditolak",
    bg: "bg-red-50",
    text: "text-red-700",
    Icon: MdCancel,
  },
  NEEDS_RESCHEDULE: {
    label: "Perlu Reschedule",
    bg: "bg-orange-50",
    text: "text-orange-700",
    Icon: MdSchedule,
  },
  COMPLETED: {
    label: "Selesai",
    bg: "bg-teal-50",
    text: "text-teal-700",
    Icon: MdCheckCircle,
  },
  NO_SHOW: {
    label: "Tidak Hadir",
    bg: "bg-gray-100",
    text: "text-gray-600",
    Icon: MdEventBusy,
  },
};

const DONATION_STATUS_MAP: Record<
  string,
  {
    label: string;
    bg: string;
    text: string;
    Icon: React.ComponentType<{ className?: string }>;
  }
> = {
  PENDING: {
    label: "Menunggu",
    bg: "bg-amber-50",
    text: "text-amber-700",
    Icon: MdPendingActions,
  },
  SUCCESS: {
    label: "Sukses",
    bg: "bg-teal-50",
    text: "text-teal-700",
    Icon: MdCheckCircle,
  },
  FAILED: {
    label: "Gagal",
    bg: "bg-red-50",
    text: "text-red-700",
    Icon: MdErrorOutline,
  },
  EXPIRED: {
    label: "Kedaluwarsa",
    bg: "bg-gray-100",
    text: "text-gray-600",
    Icon: MdTimelapse,
  },
  PENDING_DELIVERY: {
    label: "Menunggu Pengiriman",
    bg: "bg-blue-50",
    text: "text-blue-700",
    Icon: MdLocalShipping,
  },
  REJECTED: {
    label: "Ditolak",
    bg: "bg-red-50",
    text: "text-red-700",
    Icon: MdCancel,
  },
};

/* ── Calendar Helpers ── */
interface CalendarDay {
  date: number;
  month: "prev" | "current" | "next";
  fullDate: Date;
}

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

function buildCalendarGrid(year: number, month: number): CalendarDay[] {
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
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

export default function ProfilPublikPage() {
  const [activeTab, setActiveTab] = useState<TabState>("INFORMASI_UMUM");
  const router = useRouter();
  const { user } = useAuth();

  /* ── API State ── */
  const [donations, setDonations] = useState<ApiDonation[]>([]);
  const [groupedVisits, setGroupedVisits] = useState<GroupedVisits>({});
  const [capacities, setCapacities] = useState<ApiCapacity[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  /* ── Reschedule State ── */
  const [activeRescheduleVisit, setActiveRescheduleVisit] =
    useState<ApiVisit | null>(null);
  const [viewYear, setViewYear] = useState(new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<ApiCapacity | null>(null);
  const [isSubmittingReschedule, setIsSubmittingReschedule] = useState(false);

  /* ── Report Form State ── */
  const [reportVisitId, setReportVisitId] = useState("");
  const [reportContent, setReportContent] = useState("");
  const [reportFiles, setReportFiles] = useState<File[]>([]);
  const [reportFileErrors, setReportFileErrors] = useState<string[]>([]);
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);
  const [reportSubmitError, setReportSubmitError] = useState("");
  const [reportSubmitSuccess, setReportSubmitSuccess] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const fetchProfileData = () => {
    const token = localStorage.getItem("auth_token");
    if (!token) return;
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    };

    Promise.all([
      fetch(`${API_BASE}/api/user/visits`, { headers }).then((r) =>
        r.ok ? r.json() : { data: {} },
      ),
      fetch(`${API_BASE}/api/user/donations`, { headers }).then((r) =>
        r.ok ? r.json() : { data: [] },
      ),
      fetch(`${API_BASE}/api/capacities`, {
        headers: { Accept: "application/json" },
      }).then((r) => (r.ok ? r.json() : { data: [] })),
    ])
      .then(([visitsJson, donationsJson, capsJson]) => {
        setGroupedVisits(visitsJson.data || {});
        setDonations(donationsJson.data || []);
        setCapacities(capsJson.data || []);
      })
      .catch(() => {})
      .finally(() => setIsLoadingData(false));
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  /* ── Derived metrics ── */
  const allVisits = useMemo(
    () => Object.values(groupedVisits).flat(),
    [groupedVisits],
  );
  const rescheduleVisits = useMemo(
    () => groupedVisits["NEEDS_RESCHEDULE"] || [],
    [groupedVisits],
  );
  const hasReschedule = rescheduleVisits.length > 0;

  const totalDonasi = useMemo(() => {
    return donations
      .filter((d) => d.type === "DANA" && d.status === "SUCCESS")
      .reduce((sum, d) => sum + parseFloat(d.amount || "0"), 0);
  }, [donations]);

  const totalBarang = useMemo(() => {
    return donations
      .filter((d) => d.type === "BARANG")
      .reduce(
        (sum, d) => sum + d.item_donations.reduce((s, it) => s + it.qty, 0),
        0,
      );
  }, [donations]);

  const totalKunjungan = useMemo(
    () => allVisits.filter((v) => v.status === "COMPLETED").length,
    [allVisits],
  );

  /* ── Reschedule Handlers ── */
  const openRescheduleSession = (visit: ApiVisit) => {
    setActiveRescheduleVisit(visit);
    const d = visit.capacity ? new Date(visit.capacity.date) : new Date();
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
    setSelectedDate(null);
    setSelectedSlot(null);
  };

  const handleReSubmit = async () => {
    if (!activeRescheduleVisit || !selectedSlot) return;

    setIsSubmittingReschedule(true);
    const payload = {
      new_capacity_id: selectedSlot.id,
    };

    try {
      const token = localStorage.getItem("auth_token");
      const res = await fetch(
        `${API_BASE}/api/visits/${activeRescheduleVisit.id}/reschedule`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.message || "Gagal melakukan reschedule");

      alert("Reschedule berhasil diajukan!");
      setActiveRescheduleVisit(null);
      fetchProfileData();
      setActiveTab("RIWAYAT_KUNJUNGAN");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSubmittingReschedule(false);
    }
  };

  /* ── Report Handlers ── */
  const completedVisits = useMemo(() => {
    return allVisits.filter((v) => v.status === "COMPLETED");
  }, [allVisits]);

  const handleReportFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    const errors: string[] = [];

    if (reportFiles.length + selected.length > MAX_FILES) {
      errors.push(`Maksimal ${MAX_FILES} gambar per laporan.`);
      return setReportFileErrors(errors);
    }

    const validFiles: File[] = [];
    for (const file of selected) {
      const error = validateFile(file);
      if (error) errors.push(error);
      else validFiles.push(file);
    }

    setReportFileErrors(errors);
    if (validFiles.length > 0)
      setReportFiles((prev) => [...prev, ...validFiles]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setReportSubmitError("");
    setReportSubmitSuccess(false);

    if (!reportVisitId)
      return setReportSubmitError("Pilih kunjungan yang ingin dilaporkan.");
    if (reportContent.trim().length < 10)
      return setReportSubmitError("Konten laporan minimal 10 karakter.");

    setIsSubmittingReport(true);
    try {
      const formData = new FormData();
      formData.append("visit_id", reportVisitId);
      formData.append("content", reportContent);
      reportFiles.forEach((file) => formData.append("images[]", file));

      const token = localStorage.getItem("auth_token");
      const res = await fetch(`${API_BASE}/api/visit-reports`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        if (res.status === 422 && data.errors)
          throw new Error(Object.values(data.errors).flat().join(" "));
        throw new Error(data.message ?? `Error ${res.status}`);
      }

      setReportSubmitSuccess(true);
      setReportContent("");
      setReportFiles([]);
      setReportVisitId("");
    } catch (err: unknown) {
      setReportSubmitError(
        err instanceof Error ? err.message : "Gagal mengirim laporan.",
      );
    } finally {
      setIsSubmittingReport(false);
    }
  };

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

  const dateHasCapacity = useCallback(
    (date: Date): boolean => {
      const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      const day = date.getDay(); // 0 is Sunday, 6 is Saturday
      const isWeekend = day === 0 || day === 6;
      const allowedSlots = isWeekend
        ? ["MORNING", "AFTERNOON", "EVENING"]
        : ["AFTERNOON", "EVENING"];

      return capacities.some((c) => {
        const d = new Date(c.date);
        const localStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
        return (
          localStr === dateStr &&
          c.booked < c.quota &&
          allowedSlots.includes(c.slot)
        );
      });
    },
    [capacities],
  );

  const getAvailableSlots = (date: Date) => {
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    const day = date.getDay();
    const isWeekend = day === 0 || day === 6;
    const allowedSlots = isWeekend
      ? ["MORNING", "AFTERNOON", "EVENING"]
      : ["AFTERNOON", "EVENING"];

    return capacities.filter((c) => {
      const d = new Date(c.date);
      const localStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      return (
        localStr === dateStr &&
        c.booked < c.quota &&
        allowedSlots.includes(c.slot)
      );
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      fullName: user?.name ?? "",
      email: user?.email ?? "",
      phone: "",
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    alert("Data berhasil disimpan:\n" + JSON.stringify(data, null, 2));
  };

  /* ── Helpers ── */
  const formatDate = (iso: string) => {
    const dt = new Date(iso);
    return dt.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatCurrency = (val: number) => {
    if (val >= 1_000_000) return `Rp ${(val / 1_000_000).toFixed(1)}M`;
    if (val >= 1_000) return `Rp ${(val / 1_000).toFixed(0)}K`;
    return `Rp ${val.toLocaleString("id-ID")}`;
  };

  const renderStatusBadge = (status: string, type: "visit" | "donation") => {
    const map = type === "visit" ? VISIT_STATUS_MAP : DONATION_STATUS_MAP;
    const cfg = map[status] || {
      label: status,
      bg: "bg-gray-50",
      text: "text-gray-700",
      Icon: MdHistory,
    };
    const BadgeIcon = cfg.Icon;
    return (
      <span
        className={`px-3 py-1 ${cfg.bg} ${cfg.text} text-xs font-bold rounded-full flex items-center gap-1 w-fit`}
      >
        <BadgeIcon /> {cfg.label}
      </span>
    );
  };

  const HistoryCard = ({
    title,
    subtitleTop,
    date,
    time,
    pax,
    statusBadge,
    icon: Icon,
    iconBg,
    iconColor,
  }: any) => (
    <div className="bg-white/40 backdrop-blur-md p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.05)] border-0 hover:bg-white/60 transition-colors">
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg} ${iconColor}`}
        >
          <Icon className="text-2xl" />
        </div>
        <div>
          {subtitleTop && (
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">
              {subtitleTop}
            </p>
          )}
          <h3 className="font-bold text-gray-900">{title}</h3>
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mt-1">
            {date && (
              <span className="flex items-center gap-1">
                <MdOutlineEventNote className="text-gray-400 text-sm" /> {date}
              </span>
            )}
            {time && (
              <span className="flex items-center gap-1">
                <MdOutlineAccessTime className="text-gray-400 text-sm" /> {time}
              </span>
            )}
            {pax && (
              <span className="flex items-center gap-1">
                <MdOutlinePerson className="text-gray-400 text-sm" /> {pax}{" "}
                Orang
              </span>
            )}
          </div>
        </div>
      </div>
      <div>{statusBadge}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB] pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Tombol Kembali */}
        <button
          type="button"
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-gray-500 hover:text-teal-700 transition-colors font-medium mb-8"
        >
          <MdArrowBack className="text-xl" />
          Kembali
        </button>

        {/* Header Profil */}
        <div className="bg-white/80 backdrop-blur-xl shadow-sm rounded-3xl p-8 flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="w-28 h-28 rounded-full overflow-hidden shadow-sm flex-shrink-0 bg-teal-100 flex items-center justify-center">
            <span className="text-4xl font-bold text-teal-700">
              {user?.name
                ? user.name
                    .split(" ")
                    .map((w: string) => w[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()
                : "?"}
            </span>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-3 mb-2">
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                {user?.name ?? "Pengguna"}
              </h1>
              <span className="px-3 py-1 bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-xs font-bold tracking-wider uppercase rounded-full shadow-sm">
                Pengunjung
              </span>
            </div>
            <p className="text-gray-500 text-sm mb-6">{user?.email ?? ""}</p>
            {/* 3 Metrik Kontribusi */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="bg-teal-50/50 p-4 rounded-2xl flex items-center gap-4 flex-1 min-w-[150px]">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                  <MdAttachMoney className="text-xl" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                    Total Donasi
                  </p>
                  <p className="text-lg font-bold text-teal-800">
                    {isLoadingData ? "..." : formatCurrency(totalDonasi)}
                  </p>
                </div>
              </div>
              <div className="bg-blue-50/50 p-4 rounded-2xl flex items-center gap-4 flex-1 min-w-[150px]">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <MdOutlineCardGiftcard className="text-xl" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                    Barang
                  </p>
                  <p className="text-lg font-bold text-blue-800">
                    {isLoadingData ? "..." : `${totalBarang} Item`}
                  </p>
                </div>
              </div>
              <div className="bg-purple-50/50 p-4 rounded-2xl flex items-center gap-4 flex-1 min-w-[150px]">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                  <MdGroups className="text-xl" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                    Kunjungan
                  </p>
                  <p className="text-lg font-bold text-purple-800">
                    {isLoadingData ? "..." : `${totalKunjungan} Kali`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Aktivitas Saya */}
        <div className="pt-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4 px-2">
            Aktivitas Saya
          </h2>
          {/* Tab Navigation */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setActiveTab("INFORMASI_UMUM")}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all whitespace-nowrap ${activeTab === "INFORMASI_UMUM" ? "bg-teal-700 text-white shadow-md" : "bg-white/80 text-gray-500 hover:bg-white hover:text-teal-700 shadow-sm"}`}
            >
              Informasi Umum
            </button>
            <button
              onClick={() => setActiveTab("RIWAYAT_DONASI")}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all whitespace-nowrap ${activeTab === "RIWAYAT_DONASI" ? "bg-teal-700 text-white shadow-md" : "bg-white/80 text-gray-500 hover:bg-white hover:text-teal-700 shadow-sm"}`}
            >
              Riwayat Donasi
            </button>
            <button
              onClick={() => setActiveTab("RIWAYAT_KUNJUNGAN")}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all whitespace-nowrap ${activeTab === "RIWAYAT_KUNJUNGAN" ? "bg-teal-700 text-white shadow-md" : "bg-white/80 text-gray-500 hover:bg-white hover:text-teal-700 shadow-sm"}`}
            >
              Riwayat Kunjungan
            </button>
            {hasReschedule && (
              <button
                onClick={() => setActiveTab("RESCHEDULE")}
                className={`px-6 py-3 rounded-full text-sm font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${activeTab === "RESCHEDULE" ? "bg-orange-600 text-white shadow-md" : "bg-orange-50 text-orange-700 hover:bg-orange-100 shadow-sm"}`}
              >
                <MdSchedule className="text-base" />
                Reschedule ({rescheduleVisits.length})
              </button>
            )}
            <button
              onClick={() => setActiveTab("LAPORAN_KUNJUNGAN")}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all whitespace-nowrap ${activeTab === "LAPORAN_KUNJUNGAN" ? "bg-teal-700 text-white shadow-md" : "bg-white/80 text-gray-500 hover:bg-white hover:text-teal-700 shadow-sm"}`}
            >
              Tulis Laporan
            </button>
          </div>
          {/* Tab Content Area */}
          <div className="bg-white/80 backdrop-blur-xl shadow-sm rounded-3xl p-8">
            {/* TAB 1: INFORMASI UMUM */}
            {activeTab === "INFORMASI_UMUM" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Data Pribadi
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 tracking-wider uppercase mb-2">
                      Nama Lengkap
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <MdOutlinePerson className="text-gray-400 text-lg" />
                      </div>
                      <input
                        {...register("fullName", {
                          required: "Nama lengkap wajib diisi",
                        })}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-teal-500/20 transition-all shadow-sm"
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  {/* Email - DISABLED */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 tracking-wider uppercase mb-2">
                      Alamat Email (Google Auth)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <MdOutlineEmail className="text-gray-400 text-lg opacity-60" />
                      </div>
                      <input
                        {...register("email")}
                        disabled
                        className="w-full pl-11 pr-4 py-3 bg-slate-100/70 border-none rounded-xl text-sm text-gray-400 cursor-not-allowed select-none shadow-sm"
                      />
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1 italic">
                      Email ini dikelola secara otomatis via login Google dan
                      tidak dapat diubah.
                    </p>
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 tracking-wider uppercase mb-2">
                      Nomor WhatsApp
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <MdOutlinePhone className="text-gray-400 text-lg" />
                      </div>
                      <input
                        {...register("phone", {
                          required: "Nomor WhatsApp wajib diisi",
                        })}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-teal-500/20 transition-all shadow-sm"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="px-8 py-3.5 bg-teal-700 text-white font-bold rounded-xl shadow-[0_4px_14px_rgba(15,118,110,0.3)] hover:-translate-y-0.5 transition-all"
                    >
                      Simpan Perubahan
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 2: RIWAYAT DONASI */}
            {activeTab === "RIWAYAT_DONASI" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-4">
                  {isLoadingData ? (
                    <p className="text-sm text-gray-400 text-center py-8">
                      Memuat riwayat donasi...
                    </p>
                  ) : donations.length === 0 ? (
                    <p className="text-sm text-gray-400 text-center py-8">
                      Belum ada riwayat donasi.
                    </p>
                  ) : (
                    donations.map((donasi) => (
                      <HistoryCard
                        key={donasi.id}
                        title={
                          donasi.type === "DANA"
                            ? `Rp ${parseFloat(donasi.amount || "0").toLocaleString("id-ID")}`
                            : donasi.item_donations
                                .map(
                                  (it) => `${it.itemName_snapshot} (${it.qty})`,
                                )
                                .join(", ") || "Donasi Barang"
                        }
                        subtitleTop={`Donasi ${donasi.type === "DANA" ? "Dana" : "Barang"}`}
                        date={formatDate(donasi.created_at)}
                        statusBadge={renderStatusBadge(
                          donasi.status,
                          "donation",
                        )}
                        icon={
                          donasi.type === "DANA"
                            ? MdAttachMoney
                            : MdOutlineCardGiftcard
                        }
                        iconBg={
                          donasi.type === "DANA"
                            ? "bg-teal-100/50"
                            : "bg-blue-100/50"
                        }
                        iconColor={
                          donasi.type === "DANA"
                            ? "text-teal-600"
                            : "text-blue-600"
                        }
                      />
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: RIWAYAT KUNJUNGAN */}
            {activeTab === "RIWAYAT_KUNJUNGAN" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-4">
                  {isLoadingData ? (
                    <p className="text-sm text-gray-400 text-center py-8">
                      Memuat riwayat kunjungan...
                    </p>
                  ) : allVisits.length === 0 ? (
                    <p className="text-sm text-gray-400 text-center py-8">
                      Belum ada riwayat kunjungan.
                    </p>
                  ) : (
                    allVisits.map((visit) => (
                      <HistoryCard
                        key={visit.id}
                        title={
                          visit.capacity
                            ? `Sesi ${visit.capacity.slot}`
                            : "Kunjungan"
                        }
                        subtitleTop="Pengajuan Kunjungan"
                        date={
                          visit.capacity
                            ? formatDate(visit.capacity.date)
                            : formatDate(visit.created_at)
                        }
                        time={
                          visit.capacity
                            ? SLOT_LABELS[visit.capacity.slot] ||
                              visit.capacity.slot
                            : undefined
                        }
                        statusBadge={renderStatusBadge(visit.status, "visit")}
                        icon={MdGroups}
                        iconBg="bg-purple-100/50"
                        iconColor="text-purple-600"
                      />
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB 4: RESCHEDULE */}
            {activeTab === "RESCHEDULE" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-6">
                  {rescheduleVisits.length === 0 ? (
                    <p className="text-sm text-gray-400 text-center py-8">
                      Tidak ada kunjungan yang perlu dijadwalkan ulang.
                    </p>
                  ) : !activeRescheduleVisit ? (
                    rescheduleVisits.map((visit) => (
                      <div
                        key={visit.id}
                        className="bg-white/40 backdrop-blur-md p-6 rounded-2xl shadow-[0_4px_16px_-4px_rgba(0,0,0,0.05)] space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-orange-100/50 text-orange-600">
                              <MdSchedule className="text-2xl" />
                            </div>
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">
                                Perlu Reschedule
                              </p>
                              <h3 className="font-bold text-gray-900">
                                {visit.capacity
                                  ? `Sesi ${visit.capacity.slot}`
                                  : "Kunjungan"}
                              </h3>
                              <p className="text-xs text-gray-500 mt-0.5">
                                {visit.capacity
                                  ? formatDate(visit.capacity.date)
                                  : formatDate(visit.created_at)}
                                {visit.capacity
                                  ? ` \u2022 ${SLOT_LABELS[visit.capacity.slot] || ""}`
                                  : ""}
                              </p>
                            </div>
                          </div>
                          {renderStatusBadge(visit.status, "visit")}
                        </div>
                        {visit.admin_notes && (
                          <div className="bg-orange-50/80 rounded-xl p-4">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-orange-600 mb-1">
                              Catatan Admin
                            </p>
                            <p className="text-sm text-orange-800 leading-relaxed">
                              {visit.admin_notes}
                            </p>
                          </div>
                        )}
                        {visit.donation &&
                          visit.donation.item_donations.length > 0 && (
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                                Barang Bawaan
                              </p>
                              <div className="space-y-2">
                                {visit.donation.item_donations.map((item) => (
                                  <div
                                    key={item.id}
                                    className="flex items-center justify-between bg-white/60 rounded-lg px-4 py-2.5"
                                  >
                                    <span className="text-sm text-gray-800">
                                      {item.itemName_snapshot}
                                    </span>
                                    <span className="text-xs font-bold text-gray-500">
                                      x{item.qty}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        <button
                          onClick={() => openRescheduleSession(visit)}
                          className="mt-4 w-full py-3 bg-orange-600 text-white font-bold rounded-xl shadow-md hover:bg-orange-700 transition-colors"
                        >
                          Mulai Reschedule
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                      <div className="flex items-center justify-between border-b pb-4">
                        <h3 className="text-xl font-bold text-gray-900">
                          Form Reschedule
                        </h3>
                        <button
                          onClick={() => setActiveRescheduleVisit(null)}
                          className="text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          Batal
                        </button>
                      </div>

                      {/* Calendar Section */}
                      <div>
                        <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">
                          1. Pilih Jadwal Baru
                        </h4>
                        <div className="bg-white/60 rounded-2xl p-6 border shadow-sm">
                          <div className="flex items-center justify-between mb-4">
                            <button
                              type="button"
                              onClick={goToPrev}
                              className="p-2 text-gray-400 hover:text-teal-700"
                            >
                              <MdArrowBack />
                            </button>
                            <span className="font-bold text-gray-900 text-lg uppercase tracking-wide">
                              {MONTH_NAMES[viewMonth]} {viewYear}
                            </span>
                            <button
                              type="button"
                              onClick={goToNext}
                              className="p-2 text-gray-400 hover:text-teal-700"
                            >
                              <MdArrowBack className="rotate-180" />
                            </button>
                          </div>
                          <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2">
                            {DAY_LABELS.map((day) => (
                              <div
                                key={day}
                                className="text-center text-[10px] font-bold text-gray-400"
                              >
                                {day}
                              </div>
                            ))}
                          </div>
                          <div className="grid grid-cols-7 gap-1 md:gap-2">
                            {grid.map((dayObj, i) => {
                              const isCurrentMonth = dayObj.month === "current";
                              const isSelected =
                                selectedDate?.getTime() ===
                                dayObj.fullDate.getTime();
                              const hasSlot = dateHasCapacity(dayObj.fullDate);
                              return (
                                <button
                                  key={i}
                                  onClick={() => {
                                    if (hasSlot) {
                                      setSelectedDate(dayObj.fullDate);
                                      setSelectedSlot(null);
                                    }
                                  }}
                                  disabled={!hasSlot}
                                  className={`aspect-square flex flex-col items-center justify-center rounded-xl md:rounded-2xl text-sm md:text-base font-medium transition-all ${!isCurrentMonth ? "text-gray-300 opacity-50" : ""} ${isSelected ? "bg-teal-700 text-white shadow-lg shadow-teal-700/30 font-bold" : hasSlot ? "bg-teal-50 text-teal-800 hover:bg-teal-100 cursor-pointer" : "bg-gray-50 text-gray-400 cursor-not-allowed"}`}
                                >
                                  {dayObj.date}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Slot Selection */}
                      {selectedDate && (
                        <div className="animate-in fade-in slide-in-from-top-2">
                          <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">
                            Pilih Sesi
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {getAvailableSlots(selectedDate).length === 0 ? (
                              <p className="text-sm text-gray-500 col-span-full">
                                Tidak ada sesi tersedia pada tanggal ini.
                              </p>
                            ) : (
                              getAvailableSlots(selectedDate).map((cap) => (
                                <button
                                  key={cap.id}
                                  onClick={() => setSelectedSlot(cap)}
                                  className={`p-3 rounded-xl border text-left transition-all ${selectedSlot?.id === cap.id ? "border-teal-600 bg-teal-50 ring-1 ring-teal-600" : "border-gray-200 bg-white hover:border-teal-300"}`}
                                >
                                  <p
                                    className={`font-bold text-sm ${selectedSlot?.id === cap.id ? "text-teal-800" : "text-gray-700"}`}
                                  >
                                    Sesi {cap.slot}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {SLOT_LABELS[cap.slot] || ""}
                                  </p>
                                  <p className="text-[10px] text-teal-600 font-bold mt-2">
                                    Tersisa: {cap.quota - cap.booked}
                                  </p>
                                </button>
                              ))
                            )}
                          </div>
                        </div>
                      )}

                      {/* Submit */}
                      <button
                        onClick={handleReSubmit}
                        disabled={!selectedSlot || isSubmittingReschedule}
                        className="mt-6 w-full py-4 bg-teal-700 text-white font-bold rounded-xl shadow-lg hover:bg-teal-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex justify-center items-center gap-2"
                      >
                        {isSubmittingReschedule ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Menyimpan Jadwal...
                          </>
                        ) : (
                          "Konfirmasi Reschedule"
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 5: LAPORAN KUNJUNGAN */}
            {activeTab === "LAPORAN_KUNJUNGAN" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {reportSubmitSuccess ? (
                  <div className="bg-white/40 backdrop-blur-md p-8 text-center rounded-2xl shadow-[0_4px_16px_-4px_rgba(0,0,0,0.05)]">
                    <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-4">
                      <FiCheck className="text-3xl text-teal-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Laporan Terkirim!
                    </h3>
                    <p className="text-sm text-gray-500 mb-6">
                      Laporan Anda sedang ditinjau oleh pengurus panti. Laporan
                      yang disetujui akan tampil di halaman transparansi.
                    </p>
                    <button
                      onClick={() => setReportSubmitSuccess(false)}
                      className="px-6 py-3 bg-teal-700 text-white font-bold text-sm rounded-xl hover:bg-teal-800 transition-colors shadow-md"
                    >
                      Tulis Laporan Lain
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleReportSubmit}
                    className="bg-white/40 backdrop-blur-md p-8 rounded-2xl shadow-[0_4px_16px_-4px_rgba(0,0,0,0.05)] space-y-6"
                  >
                    <div>
                      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block mb-2">
                        Pilih Kunjungan
                      </label>
                      <div className="relative">
                        <select
                          value={reportVisitId}
                          onChange={(e) => setReportVisitId(e.target.value)}
                          className="w-full py-3 px-4 bg-white text-gray-900 rounded-xl appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500/20 font-sans text-sm shadow-sm border border-gray-100"
                        >
                          <option value="">
                            {completedVisits.length === 0
                              ? "Tidak ada kunjungan selesai yang dapat dilaporkan"
                              : "Pilih kunjungan..."}
                          </option>
                          {completedVisits.map((visit) => (
                            <option key={visit.id} value={visit.id}>
                              {visit.capacity
                                ? formatDate(visit.capacity.date)
                                : formatDate(visit.created_at)}{" "}
                              —{" "}
                              {visit.capacity
                                ? SLOT_LABELS[visit.capacity.slot] ||
                                  visit.capacity.slot
                                : ""}
                            </option>
                          ))}
                        </select>
                        <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block mb-2">
                        Isi Laporan
                      </label>
                      <textarea
                        value={reportContent}
                        onChange={(e) => setReportContent(e.target.value)}
                        rows={6}
                        placeholder="Ceritakan pengalaman kunjungan Anda, kesan, pesan, atau saran untuk panti..."
                        className="w-full px-4 py-3 bg-white text-gray-900 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 font-sans text-sm resize-none leading-relaxed shadow-sm border border-gray-100"
                      />
                      <div className="flex justify-between mt-1.5 px-1">
                        <span className="text-[10px] text-gray-400">
                          Min. 10 karakter
                        </span>
                        <span
                          className={`text-[10px] font-bold ${reportContent.length > 5000 ? "text-red-500" : "text-gray-400"}`}
                        >
                          {reportContent.length} / 5000
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block mb-2">
                        Lampiran Foto (Opsional)
                      </label>
                      {reportFileErrors.length > 0 && (
                        <div className="mb-3 space-y-1">
                          {reportFileErrors.map((err, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-2 text-xs text-red-500"
                            >
                              <FiAlertCircle className="text-sm flex-shrink-0 mt-0.5" />
                              <span>{err}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {reportFiles.length > 0 && (
                        <div className="flex flex-wrap gap-3 mb-4">
                          {reportFiles.map((file, idx) => (
                            <div key={idx} className="relative group">
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`Preview ${idx + 1}`}
                                className="w-20 h-20 rounded-xl object-cover shadow-sm"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setReportFiles((prev) =>
                                    prev.filter((_, i) => i !== idx),
                                  );
                                  setReportFileErrors([]);
                                }}
                                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                              >
                                <FiX className="text-xs" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      {reportFiles.length < MAX_FILES && (
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 hover:text-teal-700 transition-colors text-sm font-medium shadow-sm"
                        >
                          <FiImage className="text-lg text-gray-400" />
                          Tambah Foto ({reportFiles.length}/{MAX_FILES})
                        </button>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        multiple
                        onChange={handleReportFileChange}
                        className="hidden"
                      />
                      <p className="text-[10px] text-gray-400 mt-2 px-1">
                        Format: JPEG, PNG. Maks. 2 MB per file. Maks.{" "}
                        {MAX_FILES} file.
                      </p>
                    </div>

                    {reportSubmitError && (
                      <div className="flex items-start gap-3 bg-red-50 rounded-xl px-5 py-4 border border-red-100">
                        <FiAlertCircle className="text-red-500 text-base flex-shrink-0 mt-0.5" />
                        <p className="font-sans text-sm text-red-700 leading-relaxed">
                          {reportSubmitError}
                        </p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={
                        isSubmittingReport ||
                        !reportVisitId ||
                        reportContent.trim().length < 10
                      }
                      className={`w-full py-4 rounded-xl font-bold flex justify-center items-center gap-2 text-sm transition-all shadow-md ${isSubmittingReport || !reportVisitId || reportContent.trim().length < 10 ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none" : "bg-teal-700 hover:bg-teal-800 text-white"}`}
                    >
                      {isSubmittingReport ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Mengirim...
                        </>
                      ) : (
                        <>
                          <FiSend className="text-lg" />
                          Kirim Laporan
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
          <div className="p-8">
            <h1 className="text-2xl font-bold">Pengaturan Akun</h1>
            {/* ... Info akun lainnya ... */}

            <div className="mt-8 pt-4 border-t">
              <h3 className="text-lg font-semibold text-red-600 mb-2">
                Zona Berbahaya
              </h3>
              <div className="w-48">
                {/* Panggil komponen yang sama */}
                <LogoutButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
