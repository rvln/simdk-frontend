"use client";

import React, { useState, useEffect, useRef, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import {
  FiFileText,
  FiImage,
  FiX,
  FiCheck,
  FiAlertCircle,
  FiChevronDown,
  FiCalendar,
  FiSend,
} from "react-icons/fi";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { useAuth } from "@/hooks/useAuth";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

// ── Client-side file validation constants ────────────────────────────────────
const ALLOWED_MIMES = ["image/jpeg", "image/png", "image/jpg"];
const MAX_FILE_SIZE = 2048 * 1024; // 2048 KB = 2 MB
const MAX_FILES = 5;

interface CompletedVisit {
  id: string;
  status: string;
  capacity: {
    date: string;
    slot: string;
  };
}

function getSlotLabel(slot: string): string {
  const map: Record<string, string> = {
    MORNING: "Pagi (08:00–10:00)",
    AFTERNOON: "Siang (12:00–15:00)",
    EVENING: "Sore (15:00–18:00)",
    NIGHT: "Malam (18:00–20:00)",
  };
  return map[slot] ?? slot;
}

// ── File validation helper ───────────────────────────────────────────────────
function validateFile(file: File): string | null {
  if (!ALLOWED_MIMES.includes(file.type)) {
    return `"${file.name}" — Format tidak didukung. Gunakan JPEG atau PNG.`;
  }
  if (file.size > MAX_FILE_SIZE) {
    const sizeMB = (file.size / 1024 / 1024).toFixed(1);
    return `"${file.name}" — Ukuran ${sizeMB} MB melebihi batas 2 MB.`;
  }
  return null;
}

export default function LaporanKunjunganPage() {
  const router = useRouter();
  const { user, isLoading: authLoading, isAuthenticated } = useAuth();
  const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── State ──────────────────────────────────────────────────────────────────
  const [completedVisits, setCompletedVisits] = useState<CompletedVisit[]>([]);
  const [visitsLoading, setVisitsLoading] = useState(true);

  const [selectedVisitId, setSelectedVisitId] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [fileErrors, setFileErrors] = useState<string[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // ── Auth redirect ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login?callbackUrl=%2Flaporan-kunjungan");
    }
  }, [authLoading, isAuthenticated, router]);

  // ── Fetch user's completed visits ──────────────────────────────────────────
  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        if (!res.ok) return;

        // Fetch visits via a simple approach — we'll filter COMPLETED client-side
        // (The /api/visits endpoint isn't public, so we'll use the dashboard overview
        //  or create a custom query. For now, we fetch from kunjungan/manage endpoint.)
        const visitsRes = await fetch(`${API_BASE}/kunjungan/manage`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (visitsRes.ok) {
          const json = await visitsRes.json();
          const allVisits = Array.isArray(json) ? json : json.data ?? [];
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const completed = allVisits.filter((v: any) => {
            const status = typeof v.status === "object" ? v.status?.value ?? v.status : v.status;
            return status === "COMPLETED" && v.user_id === user?.id;
          });
          setCompletedVisits(completed);
        }
      } catch {
        // Silently fail — visits dropdown will just be empty
      } finally {
        setVisitsLoading(false);
      }
    })();
  }, [token, user?.id]);

  // ── File handling with client-side validation ──────────────────────────────
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    const errors: string[] = [];

    if (files.length + selected.length > MAX_FILES) {
      errors.push(`Maksimal ${MAX_FILES} gambar per laporan.`);
      return setFileErrors(errors);
    }

    const validFiles: File[] = [];
    for (const file of selected) {
      const error = validateFile(file);
      if (error) {
        errors.push(error);
      } else {
        validFiles.push(file);
      }
    }

    setFileErrors(errors);
    if (validFiles.length > 0) {
      setFiles((prev) => [...prev, ...validFiles]);
    }

    // Reset input so same file can be re-selected
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setFileErrors([]);
  };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess(false);

    if (!selectedVisitId) {
      setSubmitError("Pilih kunjungan yang ingin dilaporkan.");
      return;
    }
    if (content.trim().length < 10) {
      setSubmitError("Konten laporan minimal 10 karakter.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Build FormData — DO NOT set Content-Type header (browser sets boundary)
      const formData = new FormData();
      formData.append("visit_id", selectedVisitId);
      formData.append("content", content);
      files.forEach((file) => {
        formData.append("images[]", file);
      });

      const res = await fetch(`${API_BASE}/visit-reports`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          // CRITICAL: No Content-Type header — browser auto-sets multipart boundary
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 422 && data.errors) {
          const msgs = Object.values(data.errors).flat().join(" ");
          throw new Error(msgs);
        }
        throw new Error(data.message ?? `Error ${res.status}`);
      }

      setSubmitSuccess(true);
      setContent("");
      setFiles([]);
      setSelectedVisitId("");
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Gagal mengirim laporan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Loading / Auth gate ────────────────────────────────────────────────────
  if (authLoading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-surface min-h-screen">
      {/* Header */}
      <section className="bg-surface px-6 md:px-12 lg:px-20 pt-20 pb-10">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-on-surface mb-3">
            Tulis Laporan Kunjungan
          </h1>
          <p className="text-on-surface-variant font-sans text-sm leading-relaxed">
            Bagikan pengalaman dan kesan Anda setelah berkunjung ke panti.
            Laporan akan ditinjau oleh pengurus sebelum dipublikasikan.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="px-6 md:px-12 lg:px-20 pb-20">
        <div className="max-w-2xl mx-auto">
          {/* Success State */}
          {submitSuccess && (
            <GlassContainer className="p-8 text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-tertiary/10 flex items-center justify-center mx-auto mb-4">
                <FiCheck className="text-3xl text-tertiary" />
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-2">
                Laporan Terkirim!
              </h3>
              <p className="text-sm text-on-surface-variant mb-6">
                Laporan Anda sedang ditinjau oleh pengurus panti. Laporan yang
                disetujui akan tampil di halaman transparansi.
              </p>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="px-6 py-3 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary-container hover:text-on-primary-container transition-colors"
              >
                Tulis Laporan Lain
              </button>
            </GlassContainer>
          )}

          {!submitSuccess && (
            <GlassContainer className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Visit Selector */}
                <div>
                  <label className="text-[11px] font-public-sans font-bold text-on-surface-variant uppercase tracking-widest block mb-2">
                    Pilih Kunjungan
                  </label>
                  <div className="relative">
                    <select
                      value={selectedVisitId}
                      onChange={(e) => setSelectedVisitId(e.target.value)}
                      disabled={visitsLoading}
                      className="w-full py-3 px-4 bg-surface-container-low text-on-surface rounded-xl appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 font-sans text-sm disabled:opacity-50"
                    >
                      <option value="">
                        {visitsLoading
                          ? "Memuat kunjungan..."
                          : completedVisits.length === 0
                          ? "Tidak ada kunjungan yang dapat dilaporkan"
                          : "Pilih kunjungan..."}
                      </option>
                      {completedVisits.map((visit) => (
                        <option key={visit.id} value={visit.id}>
                          {new Date(visit.capacity?.date).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}{" "}
                          — {getSlotLabel(visit.capacity?.slot)}
                        </option>
                      ))}
                    </select>
                    <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
                  </div>
                </div>

                {/* Content Textarea */}
                <div>
                  <label className="text-[11px] font-public-sans font-bold text-on-surface-variant uppercase tracking-widest block mb-2">
                    Isi Laporan
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={6}
                    placeholder="Ceritakan pengalaman kunjungan Anda, kesan, pesan, atau saran untuk panti..."
                    className="w-full px-4 py-3 bg-surface-container-low text-on-surface rounded-xl placeholder-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/20 font-sans text-sm resize-none leading-relaxed"
                  />
                  <div className="flex justify-between mt-1.5">
                    <span className="text-[10px] text-on-surface-variant font-public-sans">
                      Min. 10 karakter
                    </span>
                    <span
                      className={`text-[10px] font-public-sans font-semibold ${
                        content.length > 5000
                          ? "text-red-500"
                          : "text-on-surface-variant"
                      }`}
                    >
                      {content.length} / 5000
                    </span>
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="text-[11px] font-public-sans font-bold text-on-surface-variant uppercase tracking-widest block mb-2">
                    Lampiran Foto (Opsional)
                  </label>

                  {/* File Error Messages */}
                  {fileErrors.length > 0 && (
                    <div className="mb-3 space-y-1">
                      {fileErrors.map((err, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-red-500">
                          <FiAlertCircle className="text-sm flex-shrink-0 mt-0.5" />
                          <span>{err}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* File Previews */}
                  {files.length > 0 && (
                    <div className="flex flex-wrap gap-3 mb-4">
                      {files.map((file, idx) => (
                        <div key={idx} className="relative group">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${idx + 1}`}
                            className="w-20 h-20 rounded-xl object-cover bg-surface-container-low"
                          />
                          <button
                            type="button"
                            onClick={() => removeFile(idx)}
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <FiX className="text-xs" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {files.length < MAX_FILES && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 px-5 py-3 bg-surface-container-low text-on-surface-variant rounded-xl hover:bg-primary/8 hover:text-primary transition-colors text-sm font-medium"
                    >
                      <FiImage className="text-lg" />
                      Tambah Foto ({files.length}/{MAX_FILES})
                    </button>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  <p className="text-[10px] text-on-surface-variant font-public-sans mt-2">
                    Format: JPEG, PNG. Maks. 2 MB per file. Maks. {MAX_FILES} file.
                  </p>
                </div>

                {/* Submit Error */}
                {submitError && (
                  <div className="flex items-start gap-3 bg-red-50/80 rounded-xl px-5 py-4">
                    <FiAlertCircle className="text-red-500 text-base flex-shrink-0 mt-0.5" />
                    <p className="font-sans text-sm text-red-600 leading-relaxed">
                      {submitError}
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !selectedVisitId || content.trim().length < 10}
                  className={`w-full py-4 rounded-xl font-bold flex justify-center items-center gap-2 text-base transition-all shadow-sm ${
                    isSubmitting || !selectedVisitId || content.trim().length < 10
                      ? "bg-surface-dim text-on-surface-variant cursor-not-allowed"
                      : "bg-primary hover:bg-primary-container text-white hover:text-on-primary-container"
                  }`}
                >
                  {isSubmitting ? (
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
            </GlassContainer>
          )}
        </div>
      </section>
    </div>
  );
}
