"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { 
  FiSearch, 
  FiFilter, 
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiX,
  FiCheckCircle
} from "react-icons/fi";
import { FaBoxOpen } from "react-icons/fa";

type StatusKebutuhan = "Mendesak" | "Berjalan" | "Terpenuhi";

interface KebutuhanItem {
  id: string;
  name: string;
  category: string;
  description: string;
  collected: number;
  target: number;
  unit: string;
  status: StatusKebutuhan;
  imageUrl?: string;
}

const MOCK_DATA: KebutuhanItem[] = [
  {
    id: "1",
    name: "Sepatu Sekolah Anak",
    category: "Pakaian",
    description: "Kebutuhan untuk 24 anak panti usia SD - SMP (Ukuran bervariasi).",
    collected: 18,
    target: 24,
    unit: "Pasang",
    status: "Berjalan",
    imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "2",
    name: "Matras Tidur Baru",
    category: "Fasilitas",
    description: "Penggantian matras busa yang sudah tipis untuk asrama putra.",
    collected: 2,
    target: 10,
    unit: "Pcs",
    status: "Mendesak",
    imageUrl: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "3",
    name: "Paket Alat Tulis Lengkap",
    category: "Edukasi",
    description: "Buku tulis, pensil, penghapus, dan penggaris untuk semester baru.",
    collected: 50,
    target: 50,
    unit: "Paket",
    status: "Terpenuhi",
    imageUrl: "https://images.unsplash.com/photo-1503694978374-8a2fa686963a?q=80&w=200&auto=format&fit=crop"
  }
];

type FormInputs = {
  name: string;
  category: string;
  target: number;
  unit: string;
  description: string;
};

export default function KelolaKebutuhanPage() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<KebutuhanItem | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();

  const openAddForm = () => {
    setEditingItem(null);
    reset({ name: "", category: "", target: 0, unit: "", description: "" });
    setIsPanelOpen(true);
  };

  const openEditForm = (item: KebutuhanItem) => {
    setEditingItem(item);
    reset({
      name: item.name,
      category: item.category,
      target: item.target,
      unit: item.unit,
      description: item.description,
    });
    setIsPanelOpen(true);
  };

  const closeForm = () => {
    setIsPanelOpen(false);
  };

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log("Form Submitted:", data);
    alert(`Data ${editingItem ? 'diperbarui' : 'disimpan'}!`);
    closeForm();
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "fasilitas": return "bg-green-800 text-white";
      case "pakaian": return "bg-teal-100 text-teal-800";
      case "edukasi": return "bg-teal-100 text-teal-800";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="flex h-full w-full relative overflow-hidden">
      {/* Main Content Area */}
      <div 
        className={`flex-1 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] p-8 overflow-y-auto ${
          isPanelOpen ? 'pr-[480px]' : ''
        }`}
      >
        <div className="max-w-5xl mx-auto w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
              Kelola Kebutuhan & Inventaris
            </h1>
            <p className="text-gray-500 text-lg">
              Monitor and manage the essential supplies needed for children's well-being. Transparently track donations and distribution cycles.
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex gap-4 mb-8">
            <div className="relative flex-1 max-w-lg">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400 text-lg" />
              </div>
              <input 
                type="text" 
                placeholder="Cari barang..." 
                className="w-full pl-11 pr-4 py-3 bg-white rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B648C]/20 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-shadow border-none"
              />
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-white rounded-xl text-gray-600 shadow-[0_2px_10px_rgba(0,0,0,0.02)] text-sm font-medium hover:bg-gray-50 transition-colors">
              <FiFilter /> Filter Kategori
            </button>
            <button 
              onClick={openAddForm}
              className="flex items-center gap-2 px-6 py-3 bg-[#0B648C] text-white rounded-xl text-sm font-bold shadow-[0_4px_14px_rgba(11,100,140,0.3)] hover:bg-[#095273] transition-all hover:-translate-y-0.5 ml-auto"
            >
              <FiPlus className="text-lg" /> Tambah Kebutuhan
            </button>
          </div>

          {/* List Area */}
          <div className="flex flex-col gap-5">
            {MOCK_DATA.map((item) => {
              const isFulfilled = item.status === "Terpenuhi";
              // Calculate Progress
              const progressPercentage = Math.min(Math.round((item.collected / item.target) * 100), 100);

              return (
                <div 
                  key={item.id}
                  className={`bg-white p-6 rounded-2xl flex gap-6 items-center transition-all duration-300 shadow-sm ${
                    isFulfilled ? "opacity-60 grayscale-[30%] hover:grayscale-0 hover:opacity-100" : "hover:shadow-md hover:-translate-y-0.5"
                  }`}
                >
                  {/* Image */}
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 relative shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <FaBoxOpen className="text-3xl" />
                      </div>
                    )}
                  </div>
                  
                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="mb-2">
                      <span className={`px-2.5 py-1 text-[10px] font-bold tracking-wider rounded-full uppercase ${getCategoryColor(item.category)}`}>
                        {item.category.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">{item.name}</h3>
                    <p className="text-sm text-gray-500 line-clamp-1">{item.description}</p>
                  </div>

                  {/* Progress */}
                  <div className="w-64 flex-shrink-0 flex flex-col justify-center">
                    <div className="flex justify-between items-end mb-2">
                      {isFulfilled ? (
                        <span className="text-sm font-bold text-green-700 flex items-center gap-1">
                          <FiCheckCircle /> Selesai
                        </span>
                      ) : (
                        <span className="text-sm font-medium text-slate-700">Terkumpul: <span className="font-bold text-[#0B648C]">{item.collected}</span></span>
                      )}
                      <span className="text-xs text-gray-500 font-medium">Target: {item.target}</span>
                    </div>
                    {/* Progress Bar Container */}
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${
                          isFulfilled ? "bg-green-700" : "bg-[#0B648C]"
                        }`}
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 border-l border-gray-100 pl-6 ml-2">
                    <button 
                      onClick={() => openEditForm(item)}
                      className="p-2 text-gray-400 hover:text-[#0B648C] hover:bg-teal-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <FiEdit2 className="text-lg" />
                    </button>
                    <button 
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Hapus"
                    >
                      <FiTrash2 className="text-lg" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Side Panel (Form Action) */}
      <div 
        className={`fixed top-0 right-0 bottom-0 w-[450px] bg-white/95 backdrop-blur-xl shadow-[-10px_0_40px_rgba(0,0,0,0.06)] transform transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] z-50 flex flex-col pt-20 ${
          isPanelOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 pb-4">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            {editingItem ? "Edit Kebutuhan" : "Tambah Kebutuhan Baru"}
          </h2>
          <button 
            onClick={closeForm}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 pt-2 flex flex-col gap-6">
            {/* Nama Barang */}
            <div>
              <label className="block text-xs font-bold text-gray-600 tracking-wider uppercase mb-2">Nama Barang</label>
              <input 
                {...register("name", { required: "Nama barang wajib diisi" })}
                placeholder="Misal: Beras Premium"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#0B648C] focus:ring-1 focus:ring-[#0B648C] shadow-sm transition-all"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            {/* Kategori */}
            <div>
              <label className="block text-xs font-bold text-gray-600 tracking-wider uppercase mb-2">Kategori</label>
              <select 
                {...register("category", { required: "Kategori wajib dipilih" })}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#0B648C] focus:ring-1 focus:ring-[#0B648C] shadow-sm transition-all appearance-none"
              >
                <option value="">Pilih Kategori</option>
                <option value="Pangan">Pangan</option>
                <option value="Pakaian">Pakaian</option>
                <option value="Fasilitas">Fasilitas</option>
                <option value="Edukasi">Edukasi</option>
              </select>
              {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
            </div>

            <div className="flex gap-4">
              {/* Jumlah Target */}
              <div className="flex-1">
                <label className="block text-xs font-bold text-gray-600 tracking-wider uppercase mb-2">Jumlah Target</label>
                <input 
                  type="number"
                  {...register("target", { required: "Target wajib diisi", min: 1 })}
                  placeholder="0"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#0B648C] focus:ring-1 focus:ring-[#0B648C] shadow-sm transition-all text-center"
                />
                {errors.target && <p className="text-red-500 text-xs mt-1">Isi angka &gt; 0</p>}
              </div>

              {/* Satuan */}
              <div className="flex-1">
                <label className="block text-xs font-bold text-gray-600 tracking-wider uppercase mb-2">Satuan</label>
                <input 
                  {...register("unit", { required: "Satuan wajib diisi" })}
                  placeholder="Kg, Pcs, Box"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#0B648C] focus:ring-1 focus:ring-[#0B648C] shadow-sm transition-all"
                />
                {errors.unit && <p className="text-red-500 text-xs mt-1">{errors.unit.message}</p>}
              </div>
            </div>

            {/* Deskripsi Spesifik */}
            <div>
              <label className="block text-xs font-bold text-gray-600 tracking-wider uppercase mb-2">Deskripsi Spesifik</label>
              <textarea 
                {...register("description")}
                placeholder="Detail spesifikasi barang yang dibutuhkan..."
                className="w-full bg-white border border-gray-200 rounded-xl p-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#0B648C] focus:ring-1 focus:ring-[#0B648C] shadow-sm transition-all resize-none h-32"
              ></textarea>
            </div>
          </div>

          <div className="p-6 flex flex-col gap-3 bg-[#F9FAFB] border-t border-gray-100 mt-auto">
            <button 
              type="submit"
              className="w-full py-3.5 bg-[#0B648C] text-white font-bold rounded-xl shadow-[0_4px_14px_rgba(11,100,140,0.3)] hover:shadow-[0_6px_20px_rgba(11,100,140,0.4)] hover:-translate-y-0.5 transition-all"
            >
              Simpan
            </button>
            <button 
              type="button"
              onClick={closeForm}
              className="w-full py-3.5 bg-white text-gray-700 font-bold border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
