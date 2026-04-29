"use client";

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FiLoader, FiAlertCircle } from "react-icons/fi";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

export type DistribusiFormInputs = {
  inventory_id: string;
  qty: number;
  target_recipient: string;
  notes: string;
  distributed_at: string;
};

interface InventoryOption {
  id: string;
  itemName: string;
  stock: number;
  unit: string;
}

interface DistribusiContentProps {
  token: string | null;
  onSuccess: () => void;
  onClose: () => void;
}

/**
 * DistribusiContent — Distribution form with dynamic inventory fetching.
 *
 * AGENTS.md §3 — Logistics Distribution Auditability (CRITICAL):
 * The `target_recipient` and `notes` fields are both
 * MANDATORY (required) to satisfy the legal audit trail requirement.
 */
export function DistribusiContent({ token, onSuccess, onClose }: DistribusiContentProps) {
  const [inventories, setInventories] = useState<InventoryOption[]>([]);
  const [isLoadingInv, setIsLoadingInv] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<DistribusiFormInputs>({
    defaultValues: {
      distributed_at: new Date().toISOString().split("T")[0]
    }
  });

  const selectedInvId = watch("inventory_id");
  const selectedInv = inventories.find(inv => inv.id.toString() === selectedInvId);

  useEffect(() => {
    async function fetchInventory() {
      try {
        const res = await fetch(`${API_BASE}/kebutuhan`, {
          headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
        });
        if (!res.ok) throw new Error("Gagal memuat data inventaris");
        const json = await res.json();
        const data = Array.isArray(json) ? json : json.data ?? [];
        setInventories(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setApiError(err.message);
      } finally {
        setIsLoadingInv(false);
      }
    }
    fetchInventory();
  }, [token]);

  const handleFormSubmit: SubmitHandler<DistribusiFormInputs> = async (data) => {
    setIsSubmitting(true);
    setApiError(null);
    try {
      const res = await fetch(`${API_BASE}/distribusi`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inventory_id: data.inventory_id,
          qty: data.qty,
          target_recipient: data.target_recipient,
          notes: data.notes,
          distributed_at: data.distributed_at
        })
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message ?? `HTTP Error ${res.status}`);
      }
      onSuccess();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setApiError(err.message || "Terjadi kesalahan saat menyimpan distribusi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const borderClass = (hasError: boolean) =>
    `w-full bg-white border ${hasError ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:border-[#0B648C] focus:ring-[#0B648C]"} rounded-xl focus:outline-none focus:ring-1 shadow-sm transition-all`;

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto p-8 pt-6 flex flex-col gap-6">
        {apiError && (
          <div className="flex items-start gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            <FiAlertCircle className="text-lg flex-shrink-0 mt-0.5" />
            <span>{apiError}</span>
          </div>
        )}

        {/* Item Selection */}
        <div>
          <label className="block text-[11px] font-bold text-gray-800 tracking-wider uppercase mb-3">Pilih Barang</label>
          <select
            {...register("inventory_id", { required: "Barang wajib dipilih" })}
            className={`${borderClass(!!errors.inventory_id)} px-5 py-4 text-sm text-gray-800 appearance-none cursor-pointer`}
            disabled={isLoadingInv}
          >
            <option value="">{isLoadingInv ? "Memuat..." : "Pilih Barang Inventaris..."}</option>
            {inventories.map(inv => (
              <option key={inv.id} value={inv.id}>{inv.itemName} (Stok: {inv.stock} {inv.unit})</option>
            ))}
          </select>
          {errors.inventory_id && <p className="text-red-500 text-[13px] font-medium mt-2">{errors.inventory_id.message}</p>}
        </div>

        {/* Info box if selected */}
        {selectedInv && (
          <div className="bg-[#F6F9F9] rounded-2xl p-6 border border-[#E6F0F1]">
            <p className="text-[10px] font-bold text-[#0B648C] tracking-widest uppercase mb-4">Informasi Barang</p>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{selectedInv.itemName}</h3>
              </div>
              <div className="text-right">
                <p className="text-[9px] font-bold text-gray-400 tracking-widest uppercase mb-1">Stok Tersedia</p>
                <p className="text-base font-bold text-[#0B648C]">{selectedInv.stock} {selectedInv.unit}</p>
              </div>
            </div>
          </div>
        )}

        {/* Amount */}
        <div>
          <label className="block text-[11px] font-bold text-gray-800 tracking-wider uppercase mb-3">Jumlah Didistribusikan</label>
          <div className="relative">
            <input
              type="number"
              {...register("qty", {
                required: "Jumlah wajib diisi",
                valueAsNumber: true,
                min: { value: 1, message: "Minimal 1" },
                validate: (val) => {
                  if (selectedInv && val > selectedInv.stock) return `Maksimal stok adalah ${selectedInv.stock}`;
                  return true;
                }
              })}
              placeholder="0"
              className={`${borderClass(!!errors.qty)} pl-5 pr-20 py-4 text-base text-gray-900`}
            />
            <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none">
              <span className="text-xs font-bold text-gray-300 uppercase">{selectedInv?.unit ?? "Unit"}</span>
            </div>
          </div>
          {errors.qty && <p className="text-red-500 text-[13px] font-medium mt-2">{errors.qty.message}</p>}
        </div>

        {/* Date */}
        <div>
          <label className="block text-[11px] font-bold text-gray-800 tracking-wider uppercase mb-3">Tanggal Distribusi</label>
          <input
            type="date"
            {...register("distributed_at", { required: "Tanggal wajib diisi" })}
            className={`${borderClass(!!errors.distributed_at)} px-5 py-4 text-sm text-gray-800`}
          />
          {errors.distributed_at && <p className="text-red-500 text-[13px] font-medium mt-2">{errors.distributed_at.message}</p>}
        </div>

        {/* Recipient */}
        <div>
          <label className="block text-[11px] font-bold text-gray-800 tracking-wider uppercase mb-3">Penerima / Alokasi Target</label>
          <select
            {...register("target_recipient", { required: "Target penerima wajib diisi" })}
            className={`${borderClass(!!errors.target_recipient)} px-5 py-4 text-sm text-gray-800 appearance-none cursor-pointer`}
          >
            <option value="">Pilih Target Alokasi...</option>
            <option value="Dapur Asrama Putra">Dapur Asrama Putra</option>
            <option value="Dapur Asrama Putri">Dapur Asrama Putri</option>
            <option value="Fasilitas Umum">Fasilitas Umum</option>
            <option value="Eksternal / Lainnya">Eksternal / Lainnya</option>
          </select>
          {errors.target_recipient && <p className="text-red-500 text-[13px] font-medium mt-2">{errors.target_recipient.message}</p>}
        </div>

        {/* Notes */}
        <div>
          <label className="block text-[11px] font-bold text-gray-800 tracking-wider uppercase mb-3">Keterangan Tambahan (Audit)</label>
          <textarea
            {...register("notes", { required: "Keterangan wajib diisi sebagai audit trail" })}
            placeholder="Contoh: Digunakan untuk pembagian perlengkapan semester baru unit 4..."
            className={`${borderClass(!!errors.notes)} p-5 text-sm text-gray-800 placeholder-gray-400 resize-none h-32`}
          />
          {errors.notes && <p className="text-red-500 text-[13px] font-medium mt-2">{errors.notes.message}</p>}
        </div>
      </div>

      <div className="p-8 pt-5 flex flex-col gap-3 bg-white mt-auto border-t border-gray-100">
        <button type="submit" disabled={isSubmitting || isLoadingInv} className="w-full py-4 bg-[#0B648C] text-white font-bold rounded-xl shadow-[0_4px_14px_rgba(11,100,140,0.3)] hover:shadow-[0_6px_24px_rgba(11,100,140,0.4)] hover:-translate-y-0.5 transition-all text-[15px] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
          {isSubmitting ? <><FiLoader className="animate-spin" /> Memproses...</> : "Catat Distribusi & Kurangi Stok"}
        </button>
        <button type="button" onClick={onClose} disabled={isSubmitting} className="w-full py-4 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-colors text-[15px] disabled:opacity-50">
          Batal
        </button>
      </div>
    </form>
  );
}
