"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export interface DistribusiInventoryItem {
  id: string;
  name: string;
  category: string;
  batch: string;
  stock: number;
  unit: string;
}

export type DistribusiFormInputs = {
  amount_distributed: number;
  recipient: string;
  notes: string;
};

interface DistribusiContentProps {
  selectedItem: DistribusiInventoryItem;
  onSubmit: (data: DistribusiFormInputs) => void;
  onClose: () => void;
}

/**
 * DistribusiContent — Distribution form for a specific inventory item.
 * Extracted from (workspace)/dashboard/distribusi/page.tsx.
 *
 * AGENTS.md §3 — Logistics Distribution Auditability (CRITICAL):
 * The `recipient` (maps to target_recipient) and `notes` fields are both
 * MANDATORY (required) to satisfy the legal audit trail requirement.
 */
export function DistribusiContent({ selectedItem, onSubmit, onClose }: DistribusiContentProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<DistribusiFormInputs>();

  const handleFormSubmit: SubmitHandler<DistribusiFormInputs> = (data) => {
    onSubmit(data);
  };

  const borderClass = (hasError: boolean) =>
    `w-full bg-white border ${hasError ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:border-[#0B648C] focus:ring-[#0B648C]"} rounded-xl focus:outline-none focus:ring-1 shadow-sm transition-all`;

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto p-8 pt-6 flex flex-col gap-6">

        {/* Item info box */}
        <div className="bg-[#F6F9F9] rounded-2xl p-6 border border-[#E6F0F1]">
          <p className="text-[10px] font-bold text-[#0B648C] tracking-widest uppercase mb-4">Informasi Barang</p>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{selectedItem.name}</h3>
              <p className="text-[13px] text-gray-500">Kategori: {selectedItem.category}</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] font-bold text-gray-400 tracking-widest uppercase mb-1">Batas Maksimal</p>
              <p className="text-base font-bold text-[#0B648C]">{selectedItem.stock} {selectedItem.unit}</p>
            </div>
          </div>
        </div>

        {/* Amount */}
        <div>
          <label className="block text-[11px] font-bold text-gray-800 tracking-wider uppercase mb-3">Jumlah Didistribusikan</label>
          <div className="relative">
            <input
              type="number"
              {...register("amount_distributed", {
                required: "Jumlah distribusi wajib diisi",
                valueAsNumber: true,
                min: { value: 1, message: "Jumlah minimal adalah 1" },
                max: { value: selectedItem.stock, message: `Opps! Maksimal stok tersedia di gudang adalah ${selectedItem.stock}` },
              })}
              placeholder="0"
              className={`${borderClass(!!errors.amount_distributed)} pl-5 pr-20 py-4 text-base text-gray-900`}
            />
            <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none">
              <span className="text-xs font-bold text-gray-300 uppercase">{selectedItem.unit}</span>
            </div>
          </div>
          {errors.amount_distributed && <p className="text-red-500 text-[13px] font-medium mt-2">{errors.amount_distributed.message}</p>}
        </div>

        {/* Recipient — maps to target_recipient in DB (MANDATORY per AGENTS.md §3) */}
        <div>
          <label className="block text-[11px] font-bold text-gray-800 tracking-wider uppercase mb-3">Penerima / Alokasi Target</label>
          <select
            {...register("recipient", { required: "Pilih target alokasi penerima" })}
            className={`${borderClass(!!errors.recipient)} px-5 py-4 text-sm text-gray-800 appearance-none cursor-pointer`}
          >
            <option value="">Pilih Target Alokasi...</option>
            <option value="Dapur Asrama Putra">Dapur Asrama Putra</option>
            <option value="Dapur Asrama Putri">Dapur Asrama Putri</option>
            <option value="Fasilitas Umum">Fasilitas Umum</option>
            <option value="Eksternal / Lainnya">Eksternal / Lainnya</option>
          </select>
          {errors.recipient && <p className="text-red-500 text-[13px] font-medium mt-2">{errors.recipient.message}</p>}
        </div>

        {/* Notes — MANDATORY audit trail field per AGENTS.md §3 */}
        <div>
          <label className="block text-[11px] font-bold text-gray-800 tracking-wider uppercase mb-3">Keterangan Tambahan</label>
          <textarea
            {...register("notes", { required: "Keterangan wajib diisi sebagai audit trail" })}
            placeholder="Contoh: Digunakan untuk pembagian perlengkapan semester baru unit 4..."
            className={`${borderClass(!!errors.notes)} p-5 text-sm text-gray-800 placeholder-gray-400 resize-none h-32`}
          />
          {errors.notes && <p className="text-red-500 text-[13px] font-medium mt-2">{errors.notes.message}</p>}
        </div>
      </div>

      <div className="p-8 pt-5 flex flex-col gap-3 bg-white mt-auto border-t border-gray-100">
        <button type="submit" className="w-full py-4 bg-[#0B648C] text-white font-bold rounded-xl shadow-[0_4px_14px_rgba(11,100,140,0.3)] hover:shadow-[0_6px_24px_rgba(11,100,140,0.4)] hover:-translate-y-0.5 transition-all text-[15px]">
          Catat Distribusi &amp; Kurangi Stok
        </button>
        <button type="button" onClick={onClose} className="w-full py-4 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-colors text-[15px]">
          Batal
        </button>
      </div>
    </form>
  );
}
