"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

/* ═══════════════════════════════════════════
   TypeScript Interfaces — API Response Shapes
   ═══════════════════════════════════════════ */

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

/** Donation item within a BARANG-type donation */
export interface DonationItem {
  name: string;
  qty: number;
  unit: string;
}

/** A single donation entry from the public transparency API */
export interface TransparencyDonation {
  id: string;
  masked_name: string;
  type: "DANA" | "BARANG";
  status: string;
  created_at: string;
  updated_at: string;
  amount?: string;
  items?: DonationItem[];
}

/** A single distribution entry */
export interface TransparencyDistribution {
  id: string;
  item_name: string;
  category: string;
  qty: number;
  unit: string;
  target_recipient: string;
  distributed_at: string;
}

/** A single inventory/need entry */
export interface TransparencyNeed {
  id: string;
  name: string;
  description: string;
  category: string;
  priority: string;
  stock: number;
  target_qty: number;
  unit: string;
}

/** A single visit entry */
export interface TransparencyVisit {
  id: string;
  visitor_name: string;
  status: string;
  visit_date: string;
  slot: string;
  updated_at: string;
}

/** A published visit report (UGC) */
export interface TransparencyReport {
  id: string;
  visitor_name: string;
  content: string;
  image_path: string[] | null;
  visit_date: string | null;
  created_at: string;
}

/* ═══════════════════════════════════════════
   API Response Wrappers
   ═══════════════════════════════════════════ */

interface PaginatedResponse<T> {
  status: string;
  data: T[];
  meta: PaginationMeta;
}

interface ListResponse<T> {
  status: string;
  data: T[];
}

/* ═══════════════════════════════════════════
   SWR Hooks — URL Query Param Driven
   ═══════════════════════════════════════════ */

function buildQuery(
  params: Record<string, string | number | undefined>,
): string {
  const parts: string[] = [];
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") {
      parts.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
      );
    }
  }
  return parts.length > 0 ? `?${parts.join("&")}` : "";
}

/**
 * Fetch paginated donation logs for the transparency page.
 * Driven by page number and optional type filter.
 */
export function useTransparencyDonations(page: number, type?: string) {
  const query = buildQuery({ page, type, per_page: 10 });
  const { data, error, isLoading } = useSWR<
    PaginatedResponse<TransparencyDonation>
  >(`/api/public/transparansi/donasi${query}`, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 30_000,
  });

  return {
    donations: data?.data ?? [],
    meta: data?.meta ?? null,
    isLoading,
    isError: !!error,
  };
}

/**
 * Fetch paginated distribution logs for the transparency page.
 * Driven by page number and optional category filter.
 */
export function useTransparencyDistributions(page: number, category?: string) {
  const query = buildQuery({ page, category, per_page: 10 });
  const { data, error, isLoading } = useSWR<
    PaginatedResponse<TransparencyDistribution>
  >(`/api/public/transparansi/distribusi${query}`, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 30_000,
  });

  return {
    distributions: data?.data ?? [],
    meta: data?.meta ?? null,
    isLoading,
    isError: !!error,
  };
}

/**
 * Fetch inventory needs for the transparency page.
 * Optionally filterable by category.
 */
export function useTransparencyNeeds(category?: string) {
  const query = buildQuery({ category });
  const { data, error, isLoading } = useSWR<ListResponse<TransparencyNeed>>(
    `/api/public/transparansi/kebutuhan${query}`,
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 60_000 },
  );

  return {
    needs: data?.data ?? [],
    isLoading,
    isError: !!error,
  };
}

/**
 * Fetch visits for the transparency page.
 */
export function useTransparencyVisits(page: number) {
  const query = buildQuery({ page, per_page: 6 });
  const { data, error, isLoading } = useSWR<
    PaginatedResponse<TransparencyVisit>
  >(`/api/public/transparansi/kunjungan${query}`, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 30_000,
  });

  return {
    visits: data?.data ?? [],
    meta: data?.meta ?? null,
    isLoading,
    isError: !!error,
  };
}

/**
 * Fetch published visit reports for the transparency page (UGC section).
 */
export function useTransparencyReports(page: number) {
  const query = buildQuery({ page, per_page: 6 });
  const { data, error, isLoading } = useSWR<
    PaginatedResponse<TransparencyReport>
  >(`/api/public/transparansi/laporan${query}`, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 30_000,
  });

  return {
    reports: data?.data ?? [],
    meta: data?.meta ?? null,
    isLoading,
    isError: !!error,
  };
}
