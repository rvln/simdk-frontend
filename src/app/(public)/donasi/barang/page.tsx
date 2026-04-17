"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { InputField } from "@/components/ui/InputField";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import {
  FiUser,
  FiClipboard,
  FiCamera,
  FiUploadCloud,
  FiSend,
  FiAlertCircle,
  FiChevronDown,
  FiX,
} from "react-icons/fi";

/* ───── Dropdown options ───── */
const kategoriOptions = [
  "Sembako & Pangan Dasar",
  "Peralatan Pendidikan",
  "Pakaian & Aksesoris",
  "Perlengkapan Bayi",
  "Obat & Suplemen",
  "Lainnya (Non Spesifik)",
];

const kondisiOptions = ["Baru / Segel", "Bekas Layak Pakai", "Perlu Sortir"];

/* ══════════════════════════════════════════
   COMPONENT
   ══════════════════════════════════════════ */
export default function DonasiBarangPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    donor_name: "",
    donor_phone: "",
    donor_email: "",
    item_name: "",
    item_category: "",
    item_qty: "",
    item_expiry: "",
    item_condition: "Baru / Segel",
    item_description: "",
  });

  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const names = Array.from(files)
      .slice(0, 3)
      .map((f) => f.name);
    setUploadedFiles((prev) => [...prev, ...names].slice(0, 3));
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmitInterception = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleFinalConfirm = () => {
    setIsModalOpen(false);
    // Routing to tracking page as requested
    router.push("/donasi/lacak-donasi");
  };

  return (
    <div className="bg-surface">
      <section className="px-6 md:px-12 lg:px-20 py-16 lg:py-24">
        <div className="max-w-2xl mx-auto">
          {/* ── Page header ── */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter leading-[1.1] text-on-surface mb-3 italic">
              Formulir Donasi Barang
            </h1>
            <p className="text-on-surface-variant font-sans text-sm md:text-base">
              Berbagi kebaikan dengan donasi yang berkualitas.
            </p>
          </div>

          <form onSubmit={handleSubmitInterception} className="space-y-8">
            {/* ═══════════════════════════════════════
                CARD 1 — Identitas Donatur
            ═══════════════════════════════════════ */}
            <GlassContainer className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-7">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-container text-white flex items-center justify-center">
                  <FiUser className="text-sm" />
                </span>
                <h2 className="font-bold text-lg text-on-surface font-sans">
                  Identitas Donatur
                </h2>
              </div>

              <div className="space-y-5">
                <InputField
                  id="donor_name"
                  label="Nama Lengkap"
                  placeholder="Masukkan nama sesuai KTP"
                  type="text"
                  required
                  value={formData.donor_name}
                  onChange={handleInputChange}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <InputField
                    id="donor_phone"
                    label="Nomor WhatsApp"
                    placeholder="Contoh: 08123456789"
                    type="tel"
                    required
                    value={formData.donor_phone}
                    onChange={handleInputChange}
                  />
                  <InputField
                    id="donor_email"
                    label="Alamat Gmail"
                    placeholder="nama@gmail.com"
                    type="email"
                    required
                    value={formData.donor_email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </GlassContainer>

            {/* ═══════════════════════════════════════
                CARD 2 — Detail Barang Donasi
            ═══════════════════════════════════════ */}
            <GlassContainer className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-7">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-container text-white flex items-center justify-center">
                  <FiClipboard className="text-sm" />
                </span>
                <h2 className="font-bold text-lg text-on-surface font-sans">
                  Detail Barang Donasi
                </h2>
              </div>

              <div className="space-y-5">
                <InputField
                  id="item_name"
                  label="Nama Barang"
                  placeholder="Misal: Beras Premium, Buku Pelajaran"
                  type="text"
                  required
                  value={formData.item_name}
                  onChange={handleInputChange}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-public-sans font-semibold text-on-surface/80">
                      Kategori
                    </label>
                    <div className="relative">
                      <select
                        id="item_category"
                        required
                        className="w-full px-4 py-3 bg-surface-container-lowest rounded-md transition-colors focus:outline-none focus:ring-0 border border-outline-variant/20 focus:border-primary/50 appearance-none text-sm font-sans text-on-surface cursor-pointer"
                        value={formData.item_category}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>
                          Pilih Kategori
                        </option>
                        {kategoriOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm pointer-events-none" />
                    </div>
                  </div>

                  <InputField
                    id="item_qty"
                    label="Jumlah / Satuan"
                    placeholder="Contoh: 10 kg, 5 Box"
                    type="text"
                    required
                    value={formData.item_qty}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-public-sans font-semibold text-on-surface/80">
                      Tgl Kedaluwarsa
                    </label>
                    <input
                      id="item_expiry"
                      type="date"
                      className="w-full px-4 py-3 bg-surface-container-lowest rounded-md transition-colors focus:outline-none focus:ring-0 border border-outline-variant/20 focus:border-primary/50 text-sm font-sans text-on-surface"
                      value={formData.item_expiry}
                      onChange={handleInputChange}
                    />
                    <div className="flex items-center gap-1 mt-1">
                      <FiAlertCircle className="text-[11px] text-on-surface-variant/60" />
                      <span className="text-[11px] text-on-surface-variant/60 font-sans italic">
                        Wajib diisi untuk kategori bahan pangan/obat.
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-public-sans font-semibold text-on-surface/80">
                      Kondisi
                    </label>
                    <div className="relative">
                      <select
                        id="item_condition"
                        className="w-full px-4 py-3 bg-surface-container-lowest rounded-md transition-colors focus:outline-none focus:ring-0 border border-outline-variant/20 focus:border-primary/50 appearance-none text-sm font-sans text-on-surface cursor-pointer"
                        value={formData.item_condition}
                        onChange={handleInputChange}
                      >
                        {kondisiOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="item_description"
                    className="text-sm font-public-sans font-semibold text-on-surface/80"
                  >
                    Deskripsi Tambahan
                  </label>
                  <textarea
                    id="item_description"
                    rows={4}
                    placeholder="Ceritakan sedikit tentang barang yang didonasikan..."
                    className="w-full px-4 py-3 bg-surface-container-lowest rounded-md transition-colors focus:outline-none focus:ring-0 border border-outline-variant/20 focus:border-primary/50 resize-none text-sm font-sans text-on-surface"
                    value={formData.item_description}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </GlassContainer>

            {/* ═══════════════════════════════════════
                CARD 3 — Foto Barang
            ═══════════════════════════════════════ */}
            <GlassContainer className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-7">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-container text-white flex items-center justify-center">
                  <FiCamera className="text-sm" />
                </span>
                <h2 className="font-bold text-lg text-on-surface font-sans">
                  Foto Barang
                </h2>
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex flex-col items-center justify-center gap-3 py-12 rounded-xl border-2 border-dashed border-outline-variant/25 bg-surface-container-lowest hover:bg-surface-container-low transition-colors cursor-pointer group"
              >
                <FiUploadCloud className="text-4xl text-on-surface-variant/40 group-hover:text-primary transition-colors" />
                <span className="font-sans font-bold text-sm text-on-surface">
                  Unggah Foto Dokumentasi
                </span>
                <span className="font-sans text-xs text-on-surface-variant">
                  Ambil foto yang jelas (Maks. 3 file, 5MB per file)
                </span>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />

              {uploadedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  {uploadedFiles.map((name, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-4 py-2.5 bg-surface-container-lowest rounded-lg"
                    >
                      <span className="text-sm font-sans text-on-surface truncate">
                        {name}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFile(i)}
                        className="flex-shrink-0 text-on-surface-variant hover:text-error transition-colors"
                      >
                        <FiX className="text-base" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </GlassContainer>

            <div className="pt-2">
              <PrimaryButton
                type="submit"
                className="w-full flex items-center justify-center gap-2.5 py-4 text-base font-bold shadow-md hover:shadow-lg transition-all tracking-wide"
              >
                <FiSend className="text-base" />
                Ajukan Donasi Barang
              </PrimaryButton>
              <p className="text-center font-public-sans text-[10px] font-bold uppercase tracking-[0.18em] text-on-surface-variant/50 mt-5">
                Tim kami akan memproses dalam 1–2 hari kerja
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* ── Submission Interception Modal ── */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleFinalConfirm}
        title="Konfirmasi Pengajuan Donasi"
        message="Pastikan data donasi barang Anda sudah benar sebelum dikirimkan ke sistem kami."
        confirmText="Ya, Kirim Pengajuan"
        summaryItems={[
          { label: "Nama Lengkap", value: formData.donor_name || "-" },
          { label: "Nama Barang", value: formData.item_name || "-" },
          { label: "Kategori", value: formData.item_category || "-" },
          { label: "Jumlah", value: formData.item_qty || "-" },
        ]}
      />
    </div>
  );
}
