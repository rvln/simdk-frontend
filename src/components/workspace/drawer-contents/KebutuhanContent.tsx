"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FiLoader, FiAlertCircle, FiCheckCircle } from "react-icons/fi";

export interface KebutuhanData {
  id: string;
  itemName: string;
  category: string;
  description: string;
  stock: number;
  target_qty: number;
  unit: string;
  status?: "Mendesak" | "Berjalan" | "Terpenuhi";
  imageUrl?: string;
}

export type KebutuhanFormInputs = {
  itemName: string;
  category: string;
  target_qty: number;
  unit: string;
  description: string;
};

interface KebutuhanContentProps {
  /** Pre-fills form for edit mode; undefined / null = add-new mode */
  editingItem?: KebutuhanData | null;
  /**
   * Async mutation handler provided by the parent page.
   * The parent owns the token and the fetch call.
   * If this throws, we show an inline error.
   */
  onSubmit: (data: KebutuhanFormInputs) => Promise<void>;
  onClose: () => void;
}

/**
 * KebutuhanContent — Add / Edit form for a supply need item.
 *
 * Responsibilities:
 *   - Manages react-hook-form lifecycle (validation, reset on editingItem change)
 *   - Tracks isSubmitting, success, and error states for inline feedback
 *   - Delegates the actual HTTP request to the parent via the async `onSubmit` prop
 *
 * This keeps the component transport-agnostic: the parent can swap the fetch
 * implementation (REST → SWR → tRPC) without touching this component.
 */
export function KebutuhanContent({
  editingItem,
  onSubmit,
  onClose,
}: KebutuhanContentProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<KebutuhanFormInputs>();

  /* ── Sync form when the editing target changes ── */
  useEffect(() => {
    setSubmitError(null);
    setSubmitSuccess(false);
    if (editingItem) {
      reset({
        itemName:    editingItem.itemName,
        category:    editingItem.category,
        target_qty:  editingItem.target_qty,
        unit:        editingItem.unit,
        description: editingItem.description,
      });
    } else {
      reset({ itemName: "", category: "", target_qty: 0, unit: "", description: "" });
    }
  }, [editingItem, reset]);

  /* ── Form submit — calls parent async handler ── */
  const handleFormSubmit: SubmitHandler<KebutuhanFormInputs> = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    try {
      await onSubmit(data);
      setSubmitSuccess(true);
      // Parent closes the panel after re-fetching; success flash is brief
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Terjadi kesalahan. Coba lagi.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBase =
    "w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#0B648C] focus:ring-1 focus:ring-[#0B648C] shadow-sm transition-all";

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex-1 flex flex-col overflow-hidden"
    >
      {/* ── Scrollable fields ── */}
      <div className="flex-1 overflow-y-auto p-6 pt-2 flex flex-col gap-6">

        {/* Inline error banner */}
        {submitError && (
          <div className="flex items-start gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm animate-in fade-in slide-in-from-top-2">
            <FiAlertCircle className="text-lg flex-shrink-0 mt-0.5" />
            <span>{submitError}</span>
          </div>
        )}

        {/* Inline success flash */}
        {submitSuccess && (
          <div className="flex items-center gap-3 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm animate-in fade-in slide-in-from-top-2">
            <FiCheckCircle className="text-lg flex-shrink-0" />
            <span>Berhasil disimpan!</span>
          </div>
        )}

        {/* Nama Barang */}
        <div>
          <label className="block text-xs font-bold text-gray-600 tracking-wider uppercase mb-2">
            Nama Barang
          </label>
          <input
            {...register("itemName", { required: "Nama barang wajib diisi" })}
            placeholder="Misal: Beras Premium"
            className={inputBase}
            disabled={isSubmitting}
          />
          {errors.itemName && (
            <p className="text-red-500 text-xs mt-1">{errors.itemName.message}</p>
          )}
        </div>

        {/* Kategori */}
        <div>
          <label className="block text-xs font-bold text-gray-600 tracking-wider uppercase mb-2">
            Kategori
          </label>
          <select
            {...register("category", { required: "Kategori wajib dipilih" })}
            className={`${inputBase} appearance-none`}
            disabled={isSubmitting}
          >
            <option value="">Pilih Kategori</option>
            <option value="MAKANAN">Makanan</option>
            <option value="PAKAIAN">Pakaian</option>
            <option value="PENDIDIKAN">Pendidikan</option>
            <option value="KESEHATAN">Kesehatan</option>
            <option value="KEBERSIHAN">Kebersihan</option>
            <option value="LAINNYA">Lainnya</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>
          )}
        </div>

        {/* Jumlah Target + Satuan */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-xs font-bold text-gray-600 tracking-wider uppercase mb-2">
              Jumlah Target
            </label>
            <input
              type="number"
              {...register("target_qty", { required: true, min: 1 })}
              placeholder="0"
              className={`${inputBase} text-center`}
              disabled={isSubmitting}
            />
            {errors.target_qty && (
              <p className="text-red-500 text-xs mt-1">Isi angka &gt; 0</p>
            )}
          </div>
          <div className="flex-1">
            <label className="block text-xs font-bold text-gray-600 tracking-wider uppercase mb-2">
              Satuan
            </label>
            <input
              {...register("unit", { required: "Satuan wajib diisi" })}
              placeholder="Kg, Pcs, Box"
              className={inputBase}
              disabled={isSubmitting}
            />
            {errors.unit && (
              <p className="text-red-500 text-xs mt-1">{errors.unit.message}</p>
            )}
          </div>
        </div>

        {/* Deskripsi Spesifik */}
        <div>
          <label className="block text-xs font-bold text-gray-600 tracking-wider uppercase mb-2">
            Deskripsi Spesifik
          </label>
          <textarea
            {...register("description")}
            placeholder="Detail spesifikasi barang yang dibutuhkan..."
            className="w-full bg-white border border-gray-200 rounded-xl p-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#0B648C] focus:ring-1 focus:ring-[#0B648C] shadow-sm transition-all resize-none h-32"
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* ── Sticky footer ── */}
      <div className="p-6 flex flex-col gap-3 bg-[#F9FAFB] border-t border-gray-100 mt-auto">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 bg-[#0B648C] text-white font-bold rounded-xl shadow-[0_4px_14px_rgba(11,100,140,0.3)] hover:shadow-[0_6px_20px_rgba(11,100,140,0.4)] hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <FiLoader className="animate-spin text-lg" />
              Menyimpan...
            </>
          ) : (
            <>{editingItem ? "Simpan Perubahan" : "Tambah Kebutuhan"}</>
          )}
        </button>
        <button
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          className="w-full py-3.5 bg-white text-gray-700 font-bold border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Batal
        </button>
      </div>
    </form>
  );
}
