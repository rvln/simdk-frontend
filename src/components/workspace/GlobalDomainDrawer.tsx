"use client";

import React from "react";
import { FiX } from "react-icons/fi";

import { ApprovalContent, ApprovalData } from "./drawer-contents/ApprovalContent";
import { ValidasiContent, ValidasiData } from "./drawer-contents/ValidasiContent";
import { KebutuhanContent, KebutuhanData, KebutuhanFormInputs } from "./drawer-contents/KebutuhanContent";
import { DistribusiContent, DistribusiInventoryItem, DistribusiFormInputs } from "./drawer-contents/DistribusiContent";

/* ──────────────────────────────────────────────────────────────────────────────
   Domain-discriminated data union.
   The `domain` field acts as the discriminant — switch on it to get the
   correctly-typed data without casting at the call site.
   ────────────────────────────────────────────────────────────────────────────── */
export type DrawerDomain =
  | { domain: "APPROVAL"; data: ApprovalData; onApprove: () => void; onReject: () => void }
  | { domain: "VALIDASI"; data: ValidasiData; onValidate: () => void; onReject: (reason: string) => void }
  | { domain: "KEBUTUHAN"; data?: KebutuhanData | null; onSubmit: (data: KebutuhanFormInputs) => Promise<void> }
  | { domain: "DISTRIBUSI"; data: DistribusiInventoryItem; onSubmit: (data: DistribusiFormInputs) => void };

/** Base props shared by every drawer instance */
interface GlobalDomainDrawerBaseProps {
  isOpen: boolean;
  onClose: () => void;
}

export type GlobalDomainDrawerProps = GlobalDomainDrawerBaseProps & DrawerDomain;

/* ──────────────────────────────────────────────────────────────────────────────
   Header titles per domain
   ────────────────────────────────────────────────────────────────────────────── */
function resolveTitle(props: DrawerDomain): string {
  switch (props.domain) {
    case "APPROVAL":
      return "Detail Pengajuan Kunjungan";
    case "VALIDASI":
      return props.data.type === "BARANG"
        ? "Inspeksi Pra-Submission"
        : "Detail Transaksi Sistem";
    case "KEBUTUHAN":
      return props.data ? "Edit Kebutuhan" : "Tambah Kebutuhan Baru";
    case "DISTRIBUSI":
      return "Catat Distribusi Barang";
  }
}

/* ──────────────────────────────────────────────────────────────────────────────
   Subtitle copy (only for DISTRIBUSI — matches original page)
   ────────────────────────────────────────────────────────────────────────────── */
function resolveSubtitle(props: DrawerDomain): string | null {
  if (props.domain === "DISTRIBUSI") {
    return "Formulir alokasi barang inventaris untuk unit panti asuhan.";
  }
  return null;
}

/* ──────────────────────────────────────────────────────────────────────────────
   Factory — renders the correct content component based on the `domain` prop.
   ────────────────────────────────────────────────────────────────────────────── */
function DrawerContentFactory(
  props: DrawerDomain & { onClose: () => void }
): React.ReactNode {
  switch (props.domain) {
    case "APPROVAL":
      return (
        <ApprovalContent
          data={props.data}
          onApprove={props.onApprove}
          onReject={props.onReject}
        />
      );
    case "VALIDASI":
      return (
        <ValidasiContent
          data={props.data}
          onValidate={props.onValidate}
          onReject={props.onReject}
          onClose={props.onClose}
        />
      );
    case "KEBUTUHAN":
      return (
        <KebutuhanContent
          editingItem={props.data}
          onSubmit={props.onSubmit}
          onClose={props.onClose}
        />
      );
    case "DISTRIBUSI":
      return (
        <DistribusiContent
          selectedItem={props.data}
          onSubmit={props.onSubmit}
          onClose={props.onClose}
        />
      );
  }
}

/* ──────────────────────────────────────────────────────────────────────────────
   GlobalDomainDrawer — the reusable shell.

   Common anatomy extracted from all four existing domain pages:
   - Fixed positioning: `fixed top-20 right-0 bottom-0` (or `top-0` for KEBUTUHAN/DISTRIBUSI
     which include pt-20 to clear the workspace header)
   - Width: `w-[420px]` to `w-[480px]` across domains — normalised to `w-[450px]`
   - Slide-in: `translate-x-0` / `translate-x-full` with 500ms cubic-bezier easing
   - Backdrop: `bg-white/95 backdrop-blur-xl shadow-[-10px_0_40px_rgba(0,0,0,0.06)]`
   - Header: title + FiX close button
   ────────────────────────────────────────────────────────────────────────────── */
export function GlobalDomainDrawer(props: GlobalDomainDrawerProps) {
  const { isOpen, onClose, domain } = props;
  const title = resolveTitle(props);
  const subtitle = resolveSubtitle(props);

  /* KEBUTUHAN and DISTRIBUSI drawers start from top-0 with pt-20 padding
     (they contain forms that scroll and need the full viewport height).
     APPROVAL and VALIDASI start from top-20 (below the workspace header). */
  const topClass =
    domain === "KEBUTUHAN" || domain === "DISTRIBUSI"
      ? "top-0 pt-20"
      : "top-20";

  return (
    <>
      {/* Backdrop overlay — matches the visual pattern of all four pages */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/5 z-40 transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sliding panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`
          fixed ${topClass} right-0 bottom-0 w-[450px] z-50 flex flex-col
          bg-white/95 backdrop-blur-xl shadow-[-10px_0_40px_rgba(0,0,0,0.06)]
          transform transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* ── Generic Header ── */}
        <div className="flex items-start justify-between p-6 border-b border-gray-100/50 flex-shrink-0">
          <div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-sm text-gray-500 leading-relaxed mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup panel"
            className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0 -mr-1"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        {/* ── Domain-specific content via factory ── */}
        <DrawerContentFactory {...props} onClose={onClose} />
      </div>
    </>
  );
}
