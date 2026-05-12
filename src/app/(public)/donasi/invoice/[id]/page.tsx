"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FiCheckCircle, FiDownload, FiLoader } from "react-icons/fi";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { GlassContainer } from "@/components/ui/GlassContainer";

interface InvoiceData {
  id: string;
  tracking_code: string;
  amount: string;
  payment_type: string;
  created_at: string;
  donorName: string;
  donorEmail: string | null;
  donorPhone: string | null;
}

export default function InvoicePage() {
  const params = useParams();
  const id = params?.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [data, setData] = useState<InvoiceData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    let timeoutId: NodeJS.Timeout;

    const fetchInvoice = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/public/donations/${id}/invoice`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Accept': 'application/json'
          }
        });

        if (res.status === 202) {
          setIsProcessing(true);
          setIsLoading(false);
          timeoutId = setTimeout(fetchInvoice, 3000);
          return;
        }

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.message || "Faktur tidak ditemukan atau terjadi kesalahan.");
        }

        const result = await res.json();
        setData(result.data);
        setIsProcessing(false);
        setIsLoading(false);
      } catch (err: any) {
        setError(err.message || "Terjadi kesalahan koneksi.");
        setIsProcessing(false);
        setIsLoading(false);
      }
    };

    fetchInvoice();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [id]);

  const handleDownload = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/public/donations/${id}/invoice/download`;
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-surface">
        <div className="flex flex-col items-center gap-4 text-on-surface-variant">
          <FiLoader className="w-8 h-8 animate-spin text-primary" />
          <p className="font-sans text-sm font-medium">Memuat data faktur...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-surface px-6">
        <GlassContainer className="p-8 max-w-md w-full text-center border border-error/20">
          <h2 className="text-xl font-bold text-error mb-2">Gagal Memuat Faktur</h2>
          <p className="text-on-surface-variant mb-6">{error}</p>
        </GlassContainer>
      </div>
    );
  }

  if (isProcessing) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-surface px-6">
        <GlassContainer className="p-10 max-w-md w-full text-center flex flex-col items-center shadow-ambient">
          <FiLoader className="w-12 h-12 animate-spin text-primary mb-4" />
          <h2 className="text-xl font-bold text-on-surface mb-2">Memverifikasi Pembayaran Anda...</h2>
          <p className="text-on-surface-variant text-sm max-w-xs leading-relaxed">
            Sistem kami sedang menunggu konfirmasi dari gerbang pembayaran. Halaman ini akan termuat otomatis.
          </p>
        </GlassContainer>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="bg-surface min-h-screen py-16 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <GlassContainer className="p-0 overflow-hidden shadow-ambient border-none bg-surface-container-lowest">
          {/* Header */}
          <div className="bg-gradient-to-br from-primary to-primary-container p-10 text-white text-center">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-6">
              <FiCheckCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-black tracking-tight mb-2">Terima Kasih!</h1>
            <p className="text-white/80 font-medium">Donasi finansial Anda telah berhasil kami terima.</p>
          </div>

          {/* Body */}
          <div className="p-10 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/15 pb-6">
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">
                  ID Transaksi / Order ID
                </span>
                <span className="font-mono text-lg text-on-surface font-semibold">
                  {data.tracking_code}
                </span>
              </div>
              <div className="md:text-right">
                <span className="inline-block px-4 py-1.5 rounded-full bg-success/10 text-success text-sm font-bold tracking-wide">
                  LUNAS / PAID
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <span className="block text-xs font-medium text-on-surface-variant mb-1">Tanggal Pembayaran</span>
                <span className="block text-on-surface font-semibold">{new Date(data.created_at).toLocaleString('id-ID')}</span>
              </div>
              <div>
                <span className="block text-xs font-medium text-on-surface-variant mb-1">Metode Pembayaran</span>
                <span className="block text-on-surface font-semibold capitalize">{data.payment_type?.replace(/_/g, ' ') || 'Online Payment'}</span>
              </div>
              <div>
                <span className="block text-xs font-medium text-on-surface-variant mb-1">Nama Donatur</span>
                <span className="block text-on-surface font-semibold">{data.donorName}</span>
              </div>
              <div>
                <span className="block text-xs font-medium text-on-surface-variant mb-1">Kontak Donatur</span>
                <span className="block text-on-surface font-semibold">{data.donorEmail || data.donorPhone || '-'}</span>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-2xl p-6 mt-8 flex items-center justify-between">
              <span className="font-bold text-on-surface-variant">Total Donasi</span>
              <span className="text-2xl font-black text-primary">
                Rp {parseInt(data.amount).toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-10 pt-0">
            <PrimaryButton
              className="w-full py-4 text-base font-bold flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all"
              onClick={handleDownload}
            >
              <FiDownload className="text-xl" />
              Unduh PDF Bukti Transfer
            </PrimaryButton>
          </div>
        </GlassContainer>
      </div>
    </div>
  );
}
