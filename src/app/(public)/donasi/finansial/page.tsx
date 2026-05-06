"use client";

import React, { useState } from "react";
import Image from "next/image";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { InputField } from "@/components/ui/InputField";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { FiShield, FiCheckCircle, FiLock, FiChevronDown } from "react-icons/fi";
import Script from "next/script";

/* ───── Amount presets ───── */
interface AmountPreset {
  label: string;
  value: number;
}

const amountPresets: AmountPreset[] = [
  { label: "Sapaan Kebaikan", value: 50000 },
  { label: "Langkah Bersama", value: 100000 },
  { label: "Cahaya Harapan", value: 250000 },
];

/* ───── Privacy options ───── */
interface PrivacyOption {
  id: string;
  label: string;
  description: string;
}

const privacyOptions: PrivacyOption[] = [
  {
    id: "show",
    label: "Tampilkan Nama",
    description: "Nama Anda akan terlihat di daftar donatur",
  },
  {
    id: "hide",
    label: "Sembunyikan Nama",
    description: "Donasi akan tercatat sebagai Hamba Allah",
  },
  {
    id: "anon",
    label: "Identitas Anonim",
    description: "Gunakan sebutan hangat sebagai pengganti nama",
  },
];

const anonAliases = [
  "Sahabat Kemanusiaan",
  "Teman Baik Anak",
  "Pelita Harapan",
  "Cahaya Kasih",
];

/* ───── Format currency ───── */
function formatRp(value: number): string {
  return new Intl.NumberFormat("id-ID").format(value);
}

/* ══════════════════════════════════════════
   COMPONENT
   ══════════════════════════════════════════ */
export default function DonasiFinansialPage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100000);
  const [customAmount, setCustomAmount] = useState("");
  const [privacyMode, setPrivacyMode] = useState("show");
  const [isLoading, setIsLoading] = useState(false);

  const effectiveAmount =
    selectedAmount ?? (customAmount ? parseInt(customAmount, 10) : 0);

  const [formData, setFormData] = useState({
    donorName: "",
    donorEmail: "",
    donorPhone: "",
  });

  // Handler untuk mengubah nilai form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    if (isLoading) return;
    setIsLoading(true);

    // Validasi sederhana
    if (
      !formData.donorName ||
      !formData.donorEmail ||
      !formData.donorPhone ||
      effectiveAmount <= 0
    ) {
      alert("Mohon lengkapi semua data donasi.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/donasi/finansial`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            donorName: formData.donorName,
            donorEmail: formData.donorEmail,
            donorPhone: formData.donorPhone,
            amount: effectiveAmount,
            // Jika kamu ingin mengirim info privasi, bisa ditambahkan di sini
            // privacyMode, anonAlias (jika anon)
          }),
        },
      );

      const result = await res.json();

      if (res.status === 201 && result.status === "success") {
        const snapToken = result.data.snap_token;

        // Panggil Midtrans Snap
        (window as any).snap.pay(snapToken, {
          onSuccess: function (snapResult: any) {
            setIsLoading(false);
            alert("Pembayaran berhasil! Terima kasih.");
            // Redirect ke halaman tracking, atau update UI
          },
          onPending: function (snapResult: any) {
            setIsLoading(false);
            alert("Menunggu pembayaran Anda...");
          },
          onError: function (snapResult: any) {
            setIsLoading(false);
            alert("Pembayaran gagal. Silakan coba lagi.");
          },
          onClose: function () {
            setIsLoading(false);
            // Popup ditutup tanpa menyelesaikan pembayaran
            console.log("Popup pembayaran ditutup.");
          },
        });
      } else {
        alert("Gagal menginisiasi donasi: " + result.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Terjadi kesalahan jaringan. Silakan coba lagi.");
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-surface">
      <section className="px-6 md:px-12 lg:px-20 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-10 lg:gap-16 items-start">
          {/* ── Left Column: Hero image + quote ── */}
          <div className="relative hidden lg:block">
            <div className="sticky top-24">
              {/* Image */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-ambient">
                <Image
                  src="/assets/donasi-finansial-hero.jpg"
                  alt="Anak-anak Panti Asuhan"
                  fill
                  className="object-cover"
                  sizes="420px"
                  priority
                />
                {/* Gradient overlay from bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-on-surface/70 via-on-surface/20 to-transparent" />

                {/* Quote overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <GlassContainer className="p-5 bg-primary/80 backdrop-blur-lg border-none">
                    <span className="block text-white/60 text-2xl font-black leading-none mb-2">
                      &ldquo;&rdquo;
                    </span>
                    <p className="text-white text-sm font-sans italic leading-relaxed">
                      &ldquo;Setiap kontribusi adalah benang yang merajut
                      harmoni dalam ekosistem transparansi kami.&rdquo;
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="w-5 h-px bg-white/50" />
                      <span className="font-public-sans text-[9px] font-bold uppercase tracking-[0.2em] text-white/70">
                        Panti Asuhan Dr Lucas
                      </span>
                    </div>
                  </GlassContainer>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Column: Form ── */}
          <div>
            {/* Headline */}
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-[1.08] text-on-surface mb-3 italic">
              Wujudkan Kepedulian Anda
            </h1>
            <div className="flex items-center gap-2 mb-10">
              <FiCheckCircle className="text-tertiary text-base" />
              <span className="text-on-surface-variant font-sans text-sm">
                Transaksi Anda 100% transparan dan dapat dilacak.
              </span>
            </div>

            {/* ── Step 1: Pilih Nominal ── */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                  1
                </span>
                <h2 className="font-bold text-lg text-on-surface font-sans">
                  Pilih Nominal
                </h2>
              </div>

              {/* Preset grid */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {amountPresets.map((preset) => {
                  const active = selectedAmount === preset.value;
                  return (
                    <button
                      key={preset.value}
                      onClick={() => {
                        setSelectedAmount(preset.value);
                        setCustomAmount("");
                      }}
                      className={`flex flex-col items-center gap-1.5 py-5 px-3 rounded-xl text-center transition-all duration-200 ${
                        active
                          ? "bg-gradient-to-br from-primary to-primary-container text-white shadow-ambient"
                          : "bg-surface-container-lowest text-on-surface hover:bg-surface-container-low border border-outline-variant/10"
                      }`}
                    >
                      <span
                        className={`font-public-sans text-[9px] font-bold uppercase tracking-[0.14em] ${
                          active ? "text-white/70" : "text-on-surface-variant"
                        }`}
                      >
                        {preset.label}
                      </span>
                      <span className="font-sans font-black text-lg tracking-tight">
                        Rp {formatRp(preset.value)}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Custom amount */}
              <div className="flex items-center gap-3 bg-surface-container-lowest rounded-xl px-4 py-3 border border-outline-variant/15 focus-within:border-primary/40 transition-colors">
                <span className="font-sans font-bold text-on-surface-variant text-sm">
                  Rp
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Nominal Lainnya"
                  value={customAmount}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "");
                    setCustomAmount(v);
                    if (v) setSelectedAmount(null);
                  }}
                  className="flex-1 bg-transparent focus:outline-none text-sm font-sans text-on-surface placeholder:text-on-surface-variant/50"
                />
              </div>
            </div>

            {/* ── Step 2: Identitas Donatur ── */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                  2
                </span>
                <h2 className="font-bold text-lg text-on-surface font-sans">
                  Identitas Donatur
                </h2>
              </div>

              <div className="space-y-5">
                {/* Name + Email row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <InputField
                    id="donorName"
                    label="Nama Lengkap"
                    placeholder="Contoh: Ahmad Sulaiman"
                    type="text"
                    value={formData.donorName}
                    onChange={handleInputChange}
                  />
                  <InputField
                    id="donorEmail"
                    label="Email"
                    placeholder="nama@email.com"
                    type="email"
                    value={formData.donorEmail}
                    onChange={handleInputChange}
                  />
                </div>

                {/* WhatsApp */}
                <InputField
                  id="donorPhone"
                  label="Nomor WhatsApp"
                  placeholder="+62 812-xxxx-xxxx"
                  type="tel"
                  value={formData.donorPhone}
                  onChange={handleInputChange}
                />

                {/* Privacy radios */}
                <div>
                  <span className="block font-public-sans text-[11px] font-bold uppercase tracking-[0.16em] text-on-surface-variant mb-3">
                    Privasi Nama
                  </span>

                  <div className="space-y-2">
                    {privacyOptions.map((opt) => {
                      const active = privacyMode === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setPrivacyMode(opt.id)}
                          className={`w-full flex items-start gap-4 p-4 rounded-xl text-left transition-all duration-200 ${
                            active
                              ? "bg-primary/5 ring-2 ring-primary/30"
                              : "bg-surface-container-lowest hover:bg-surface-container-low border border-outline-variant/10"
                          }`}
                        >
                          {/* Custom radio circle */}
                          <span
                            className={`flex-shrink-0 mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                              active
                                ? "border-primary"
                                : "border-outline-variant/40"
                            }`}
                          >
                            {active && (
                              <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                            )}
                          </span>

                          <div>
                            <span className="block font-sans font-bold text-sm text-on-surface">
                              {opt.label}
                            </span>
                            <span className="block font-sans text-xs text-on-surface-variant mt-0.5">
                              {opt.description}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Anon alias dropdown — only when "anon" is selected */}
                  {privacyMode === "anon" && (
                    <div className="mt-3 relative">
                      <div className="bg-surface-container-lowest rounded-xl px-4 py-3 border border-outline-variant/15 flex items-center justify-between">
                        <select className="w-full bg-transparent focus:outline-none text-sm font-sans text-on-surface appearance-none cursor-pointer">
                          {anonAliases.map((alias) => (
                            <option key={alias} value={alias}>
                              {alias}
                            </option>
                          ))}
                        </select>
                        <FiChevronDown className="text-on-surface-variant text-sm flex-shrink-0 pointer-events-none" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ── Submit ── */}
            <PrimaryButton
              className="w-full flex items-center justify-center gap-2 py-4 text-base font-bold shadow-md hover:shadow-lg transition-all tracking-wide"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Memproses..." : "Lanjutkan Pembayaran"}
            </PrimaryButton>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
              <div className="flex items-center gap-1.5 opacity-60">
                <FiLock className="text-sm text-on-surface-variant" />
                <span className="font-public-sans text-[9px] font-bold uppercase tracking-widest text-on-surface-variant">
                  256-bit Encryption
                </span>
              </div>
              <div className="flex items-center gap-1.5 opacity-60">
                <FiShield className="text-sm text-on-surface-variant" />
                <span className="font-public-sans text-[9px] font-bold uppercase tracking-widest text-on-surface-variant">
                  Secure Payment
                </span>
              </div>
              <div className="flex items-center gap-1.5 opacity-60">
                <FiCheckCircle className="text-sm text-on-surface-variant" />
                <span className="font-public-sans text-[9px] font-bold uppercase tracking-widest text-on-surface-variant">
                  Verified by Midtrans
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />
    </div>
  );
}
