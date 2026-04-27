"use client";

import React, { useState } from "react";
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
} from "react-icons/md";
import { useRouter } from "next/navigation";
import LogoutButton from "@/components/layout/LogoutButton";

type TabState = "INFORMASI_UMUM" | "RIWAYAT_DONASI" | "RIWAYAT_KUNJUNGAN";

interface ProfileFormData {
  fullName: string;
  email: string;
  phone: string;
}

const MOCK_DONASI = [
  {
    id: 1,
    type: "Dana",
    nominal: "Rp 500.000",
    date: "24 Okt 2026",
    status: "Sukses",
  },
  {
    id: 2,
    type: "Barang",
    nominal: "Sepatu Sekolah (2 Pasang)",
    date: "10 Okt 2026",
    status: "Pending",
  },
  {
    id: 3,
    type: "Dana",
    nominal: "Rp 1.000.000",
    date: "01 Sep 2026",
    status: "Sukses",
  },
];

const MOCK_KUNJUNGAN = [
  {
    id: 1,
    purpose: "Kunjungan Personal",
    date: "15 Sep 2026",
    time: "10:00 WITA",
    status: "Sukses",
    pax: 2,
  },
  {
    id: 2,
    purpose: "Acara Syukuran",
    date: "05 Nov 2026",
    time: "14:00 WITA",
    status: "Menunggu Persetujuan",
    pax: 15,
  },
];

export default function ProfilPublikPage() {
  const [activeTab, setActiveTab] = useState<TabState>("INFORMASI_UMUM");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      fullName: "Ahmad Faisal",
      email: "ahmad.faisal@gmail.com",
      phone: "081234567890",
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    alert("Data berhasil disimpan:\n" + JSON.stringify(data, null, 2));
  };

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "Sukses":
        return (
          <span className="px-3 py-1 bg-teal-50 text-teal-700 text-xs font-bold rounded-full flex items-center gap-1 w-fit">
            <MdCheckCircle /> {status}
          </span>
        );
      case "Pending":
      case "Menunggu Persetujuan":
        return (
          <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-full flex items-center gap-1 w-fit">
            <MdPendingActions /> {status}
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 bg-gray-50 text-gray-700 text-xs font-bold rounded-full flex items-center gap-1 w-fit">
            <MdHistory /> {status}
          </span>
        );
    }
  };

  const HistoryCard = ({
    title,
    subtitleTop,
    date,
    time,
    pax,
    status,
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
      <div>{renderStatusBadge(status)}</div>
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
          {/* Avatar */}
          <div className="w-28 h-28 rounded-full overflow-hidden shadow-sm flex-shrink-0 bg-teal-100 flex items-center justify-center">
            <span className="text-4xl font-bold text-teal-700">AF</span>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-3 mb-2">
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                Ahmad Faisal
              </h1>
              <span className="px-3 py-1 bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-xs font-bold tracking-wider uppercase rounded-full shadow-sm">
                Donatur Tetap
              </span>
            </div>
            <p className="text-gray-500 text-sm mb-6">
              Bergabung sejak Januari 2024
            </p>
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
                  <p className="text-lg font-bold text-teal-800">Rp 5.5M</p>
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
                  <p className="text-lg font-bold text-blue-800">45 Item</p>
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
                  <p className="text-lg font-bold text-purple-800">12 Kali</p>
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
                  {MOCK_DONASI.map((donasi) => (
                    <HistoryCard
                      key={donasi.id}
                      title={donasi.nominal}
                      subtitleTop={`Donasi ${donasi.type}`}
                      date={donasi.date}
                      status={donasi.status}
                      icon={
                        donasi.type === "Dana"
                          ? MdAttachMoney
                          : MdOutlineCardGiftcard
                      }
                      iconBg={
                        donasi.type === "Dana"
                          ? "bg-teal-100/50"
                          : "bg-blue-100/50"
                      }
                      iconColor={
                        donasi.type === "Dana"
                          ? "text-teal-600"
                          : "text-blue-600"
                      }
                    />
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: RIWAYAT KUNJUNGAN */}
            {activeTab === "RIWAYAT_KUNJUNGAN" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-4">
                  {MOCK_KUNJUNGAN.map((kunjungan) => (
                    <HistoryCard
                      key={kunjungan.id}
                      title={kunjungan.purpose}
                      subtitleTop="Pengajuan Kunjungan"
                      date={kunjungan.date}
                      time={kunjungan.time}
                      pax={kunjungan.pax}
                      status={kunjungan.status}
                      icon={MdGroups}
                      iconBg="bg-purple-100/50"
                      iconColor="text-purple-600"
                    />
                  ))}
                </div>
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
