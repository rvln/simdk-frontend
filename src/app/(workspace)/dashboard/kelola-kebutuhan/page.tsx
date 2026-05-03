"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  FiSearch,
  FiFilter,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiCheckCircle,
  FiAlertTriangle,
  FiRefreshCw,
} from "react-icons/fi";
import { FaBoxOpen } from "react-icons/fa";
import { GlobalDomainDrawer } from "@/components/workspace/GlobalDomainDrawer";
import {
  KebutuhanData,
  KebutuhanFormInputs,
} from "@/components/workspace/drawer-contents/KebutuhanContent";
import { useAuth } from "@/hooks/useAuth";

// ─── API endpoint constant — swap this single string when the backend is ready ───
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";
const ENDPOINT = `${API_BASE}/kebutuhan`;

// ─── Derived UI helpers ───────────────────────────────────────────────────────

// ─── Status derivation (derived on frontend since DB has no status column) ───
// Removed deriveStatus as backend now returns status_kebutuhan
function getCategoryColor(category: string) {
  switch (category.toLowerCase()) {
    case "fasilitas":
      return "bg-green-800 text-white";
    case "pakaian":
    case "edukasi":
      return "bg-teal-100 text-teal-800";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case "TERPENUHI":
      return "bg-green-100 text-green-700";
    case "SEDANG BERLANGSUNG":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

function getPriorityBadge(priority: string) {
  switch (priority) {
    case "MENDESAK":
      return "bg-red-100 text-red-700";
    case "PENTING":
      return "bg-blue-100 text-blue-700";
    case "OPSIONAL":
      return "bg-slate-100 text-slate-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

// ─── Skeleton loader card ─────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="bg-white p-6 rounded-2xl flex gap-6 items-center shadow-sm animate-pulse">
      <div className="w-24 h-24 rounded-xl bg-slate-200 flex-shrink-0" />
      <div className="flex-1 space-y-3">
        <div className="w-16 h-4 bg-slate-200 rounded-full" />
        <div className="w-48 h-5 bg-slate-200 rounded-full" />
        <div className="w-64 h-3 bg-slate-100 rounded-full" />
      </div>
      <div className="w-52 space-y-2">
        <div className="w-full h-3 bg-slate-100 rounded-full" />
        <div className="w-full h-2 bg-slate-200 rounded-full" />
      </div>
      <div className="flex gap-2 pl-6 ml-2 border-l border-gray-100">
        <div className="w-8 h-8 bg-slate-100 rounded-lg" />
        <div className="w-8 h-8 bg-slate-100 rounded-lg" />
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function KelolaKebutuhanPage() {
  const { user } = useAuth();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;

  // ── Data state ───────────────────────────────────────────────────────────────
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // ── Tab state ──────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<"KATALOG" | "ASET">("KATALOG");

  // ── Filter state ─────────────────────────────────────────────────────────────
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  // ── Drawer state ─────────────────────────────────────────────────────────────
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<KebutuhanData | null>(null);

  // ── Fetch list ───────────────────────────────────────────────────────────────
  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const params = new URLSearchParams();
      if (debouncedSearch) params.append("search", debouncedSearch);
      if (category) params.append("category", category);
      if (statusFilter) params.append("status_kebutuhan", statusFilter);
      if (priorityFilter) params.append("priority", priorityFilter);

      const res = await fetch(`${ENDPOINT}?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      const json = await res.json();
      // Supports both { data: [...] } envelope and bare array
      setItems(Array.isArray(json) ? json : (json.data ?? []));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Gagal memuat data.";
      setFetchError(message);
      // Fallback to mock data so the UI is still functional during development
      setItems(MOCK_FALLBACK);
    } finally {
      setIsLoading(false);
    }
  }, [token, debouncedSearch, category, statusFilter, priorityFilter]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // ── Drawer handlers ───────────────────────────────────────────────────────────
  const openAddForm = () => {
    setEditingItem(null);
    setIsPanelOpen(true);
  };

  const openEditForm = (item: KebutuhanData) => {
    setEditingItem(item);
    setIsPanelOpen(true);
  };

  const closePanel = () => {
    setIsPanelOpen(false);
    // Delay clearing editingItem until after the slide-out animation (500ms)
    setTimeout(() => setEditingItem(null), 500);
  };

  // ── Mutation handler (called by GlobalDomainDrawer → KebutuhanContent) ───────
  const handleMutationSuccess = useCallback(
    async (data: KebutuhanFormInputs) => {
      const isEdit = !!editingItem;
      const url = isEdit ? `${ENDPOINT}/${editingItem!.id}` : ENDPOINT;
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody?.message ?? `HTTP ${res.status}`);
      }

      // Re-fetch the list to keep server state as source of truth
      await fetchItems();
      closePanel();
    },
    [editingItem, token, fetchItems],
  );

  // ─────────────────────────────────────────────────────────────────────────────

  // Client-side segregation logic based on the explicit priority rule
  const filteredItems = items.filter((item) => {
    if (activeTab === "KATALOG") return item.priority !== null;
    return item.priority === null;
  });

  return (
    <div className="flex h-full w-full relative overflow-hidden">
      {/* Main Content Area — shifts left when drawer is open */}
      <div
        className={`flex-1 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] p-8 overflow-y-auto ${
          isPanelOpen ? "pr-[480px]" : ""
        }`}
      >
        <div className="max-w-5xl mx-auto w-full">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
              Kelola Kebutuhan &amp; Inventaris
            </h1>
            <p className="text-gray-500 text-lg">
              Monitor and manage the essential supplies needed for children's
              well-being. Transparently track donations and distribution cycles.
            </p>
          </div>

          {/* ── Tabs ── */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab("KATALOG")}
              className={`pb-4 px-6 text-sm font-bold border-b-2 transition-colors ${
                activeTab === "KATALOG"
                  ? "border-[#0B648C] text-[#0B648C]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Katalog Kebutuhan
            </button>
            <button
              onClick={() => setActiveTab("ASET")}
              className={`pb-4 px-6 text-sm font-bold border-b-2 transition-colors ${
                activeTab === "ASET"
                  ? "border-[#0B648C] text-[#0B648C]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Aset Tambahan (Donasi Bebas)
            </button>
          </div>

          {/* Action Bar */}
          <div className="flex gap-4 mb-8">
            <div className="relative flex-1 max-w-sm">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400 text-lg" />
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari barang..."
                className="w-full pl-11 pr-4 py-3 bg-white rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B648C]/20 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-shadow border-none"
              />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-3 bg-white rounded-xl text-gray-600 shadow-[0_2px_10px_rgba(0,0,0,0.02)] text-sm font-medium border-none focus:outline-none"
            >
              <option value="">Semua Kategori</option>
              <option value="MAKANAN">Makanan</option>
              <option value="PAKAIAN">Pakaian</option>
              <option value="PENDIDIKAN">Pendidikan</option>
              <option value="KESEHATAN">Kesehatan</option>
              <option value="KEBERSIHAN">Kebersihan</option>
              <option value="LAINNYA">Lainnya</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 bg-white rounded-xl text-gray-600 shadow-[0_2px_10px_rgba(0,0,0,0.02)] text-sm font-medium border-none focus:outline-none"
            >
              <option value="">Semua Status</option>
              <option value="SEDANG BERLANGSUNG">Sedang Berlangsung</option>
              <option value="TERPENUHI">Terpenuhi</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-4 py-3 bg-white rounded-xl text-gray-600 shadow-[0_2px_10px_rgba(0,0,0,0.02)] text-sm font-medium border-none focus:outline-none"
            >
              <option value="">Semua Prioritas</option>
              <option value="MENDESAK">Mendesak</option>
              <option value="PENTING">Penting</option>
              <option value="OPSIONAL">Opsional</option>
            </select>
            {activeTab === "KATALOG" ? (
              <button
                onClick={openAddForm}
                className="flex items-center gap-2 px-6 py-3 bg-[#0B648C] text-white rounded-xl text-sm font-bold shadow-[0_4px_14px_rgba(11,100,140,0.3)] hover:bg-[#095273] transition-all hover:-translate-y-0.5 ml-auto whitespace-nowrap"
              >
                <FiPlus className="text-lg" /> Tambah Katalog
              </button>
            ) : (
              <div className="ml-auto flex items-center justify-center px-4 py-3">
                {/* Spacer to push filters to the left when button is hidden */}
              </div>
            )}
          </div>

          {/* ── Fetch Error Banner ── */}
          {fetchError && (
            <div className="mb-6 flex items-center gap-3 px-5 py-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-800 text-sm">
              <FiAlertTriangle className="text-lg flex-shrink-0" />
              <span className="flex-1">
                {fetchError} — Menampilkan data sementara.
              </span>
              <button
                onClick={fetchItems}
                className="flex items-center gap-1.5 text-amber-700 font-bold hover:text-amber-900 transition-colors"
              >
                <FiRefreshCw className="text-base" /> Coba lagi
              </button>
            </div>
          )}

          {/* ── List Area ── */}
          <div className="flex flex-col gap-5">
            {isLoading ? (
              // Loading skeletons — 3 cards
              Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            ) : filteredItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <FaBoxOpen className="text-5xl mb-4" />
                <p className="text-base font-medium">
                  Belum ada data di kategori ini.
                </p>
                {activeTab === "KATALOG" && (
                  <button
                    onClick={openAddForm}
                    className="mt-4 text-sm text-[#0B648C] font-bold hover:underline"
                  >
                    + Tambahkan yang pertama
                  </button>
                )}
              </div>
            ) : (
              filteredItems.map((item) => {
                const isFulfilled = item.status_kebutuhan === "TERPENUHI";
                const terkumpul = item.stock ?? 0;
                const virtualStock = item.virtual_stock ?? 0;
                const effectiveTotal = terkumpul + virtualStock;
                const progressPercentage = Math.min(
                  Math.round((effectiveTotal / item.target_qty) * 100),
                  100,
                );

                return (
                  <div
                    key={item.id}
                    className={`bg-white p-6 rounded-2xl flex gap-6 items-center transition-all duration-300 shadow-sm ${
                      activeTab !== "ASET" && isFulfilled
                        ? "opacity-60 grayscale-[30%] hover:grayscale-0 hover:opacity-100"
                        : "hover:shadow-md hover:-translate-y-0.5"
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 relative shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.itemName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <FaBoxOpen className="text-3xl" />
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      {/* ── Badge hanya ditampilkan di tab KATALOG ── */}
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`px-2.5 py-1 text-[10px] font-bold tracking-wider rounded-full uppercase ${getCategoryColor(item.category)}`}
                          >
                            {item.category.toUpperCase()}
                          </span>
                          {item.priority && (
                            <span
                              className={`px-2.5 py-1 text-[10px] font-bold tracking-wider rounded-full uppercase ${getPriorityBadge(item.priority)}`}
                            >
                              {item.priority}
                            </span>
                          )}
                          {item.status_kebutuhan && (
                            <span
                              className={`px-2.5 py-1 text-[10px] font-bold tracking-wider rounded-full uppercase ${getStatusBadge(item.status_kebutuhan)}`}
                            >
                              {item.status_kebutuhan}
                            </span>
                          )}
                        </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">
                        {item.itemName}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-1">
                        {item.description}
                      </p>
                    </div>

                    {/* Progress */}
                    <div className="w-64 flex-shrink-0 flex flex-col justify-center">
                      {/* Baris atas progress */}
                      <div className="flex justify-between items-end mb-2">
                        {/* ── Tampilan polos untuk tab ASET ── */}
                        {activeTab === "ASET" ? (
                          <span className="text-sm font-medium text-slate-700">
                            Kapasitas Terisi:{" "}
                            <span className="font-bold text-[#0B648C]">
                              {terkumpul}
                            </span>
                          </span>
                        ) : isFulfilled ? (
                          <span className="text-sm font-bold text-green-700 flex items-center gap-1">
                            <FiCheckCircle /> Selesai
                          </span>
                        ) : (
                          <span className="text-sm font-medium text-slate-700">
                            Kapasitas Terisi:{" "}
                            <span className="font-bold text-[#0B648C]">
                              {terkumpul}
                            </span>
                            {virtualStock > 0 && (
                              <span className="text-amber-600 font-semibold text-xs ml-1">
                                (+{virtualStock} Menunggu)
                              </span>
                            )}
                          </span>
                        )}

                        {/* Target hanya di tab KATALOG */}
                        {activeTab !== "ASET" && (
                          <span className="text-xs text-gray-500 font-medium">
                            Target: {item.target_qty}
                          </span>
                        )}
                      </div>

                      {/* Progress bar */}
                      {activeTab === "ASET" ? (
                        /* Track abu‑abu polos tanpa isian */
                        <div className="w-full bg-slate-200 rounded-full h-2" />
                      ) : (
                        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full rounded-full relative"
                            style={{
                              width: `${Math.min(Math.round((effectiveTotal / item.target_qty) * 100), 100)}%`,
                            }}
                          >
                            <div
                              className={`h-full rounded-full transition-all duration-1000 ${
                                isFulfilled ? "bg-green-700" : "bg-[#0B648C]"
                              }`}
                              style={{
                                width: `${effectiveTotal > 0 ? Math.round((terkumpul / effectiveTotal) * 100) : 100}%`,
                              }}
                            />
                            {virtualStock > 0 && !isFulfilled && (
                              <div
                                className="absolute top-0 right-0 h-full bg-amber-400/50 rounded-r-full"
                                style={{
                                  width: `${effectiveTotal > 0 ? Math.round((virtualStock / effectiveTotal) * 100) : 0}%`,
                                }}
                              />
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actions – tetap muncul di kedua tab */}
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
              })
            )}
          </div>
        </div>
      </div>

      {/* ── GlobalDomainDrawer — replaces the old hardcoded side panel ── */}
      <GlobalDomainDrawer
        domain="KEBUTUHAN"
        isOpen={isPanelOpen}
        onClose={closePanel}
        data={editingItem}
        onSubmit={handleMutationSuccess}
      />
    </div>
  );
}

// ─── Mock fallback data (used only when the API is unreachable) ───────────────
const MOCK_FALLBACK: KebutuhanData[] = [
  {
    id: "1",
    itemName: "Sepatu Sekolah Anak",
    category: "PAKAIAN",
    description:
      "Kebutuhan untuk 24 anak panti usia SD - SMP (Ukuran bervariasi).",
    stock: 18,
    target_qty: 24,
    unit: "Pasang",
    priority: "PENTING",
    status_kebutuhan: "SEDANG BERLANGSUNG",
    imageUrl:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "2",
    itemName: "Matras Tidur Baru",
    category: "FASILITAS",
    description: "Penggantian matras busa yang sudah tipis untuk asrama putra.",
    stock: 2,
    target_qty: 10,
    unit: "Pcs",
    priority: "MENDESAK",
    status_kebutuhan: "SEDANG BERLANGSUNG",
    imageUrl:
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "3",
    itemName: "Paket Alat Tulis Lengkap",
    category: "PENDIDIKAN",
    description:
      "Buku tulis, pensil, penghapus, dan penggaris untuk semester baru.",
    stock: 50,
    target_qty: 50,
    unit: "Paket",
    priority: "OPSIONAL",
    status_kebutuhan: "TERPENUHI",
    imageUrl:
      "https://images.unsplash.com/photo-1503694978374-8a2fa686963a?q=80&w=200&auto=format&fit=crop",
  },
];
