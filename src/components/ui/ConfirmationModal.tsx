'use client';

import React, { useEffect, useRef } from 'react';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { FiCalendar, FiClock } from 'react-icons/fi';
import { FaRegCalendarCheck } from 'react-icons/fa';
import { FaShieldHeart } from 'react-icons/fa6';

interface SummaryItem {
  label: string;
  value: string;
}

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  summaryItems?: SummaryItem[];
  // Legacy support for backward compatibility
  date?: string;
  time?: string;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Konfirmasi Kunjungan?',
  message = 'Harap tinjau kembali jadwal kunjungan yang telah Anda pilih sebelum melanjutkan.',
  confirmText = 'Ya, Ajukan Kunjungan',
  summaryItems,
  date,
  time,
}: ConfirmationModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Adapt legacy date/time to summaryItems if needed
  const items = summaryItems || [
    { label: 'Tanggal', value: date || '-' },
    { label: 'Waktu', value: time || '-' },
  ];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative bg-surface/95 backdrop-blur-xl rounded-2xl shadow-ambient max-w-md w-full p-8 border border-outline-variant/10 animate-in">
        {/* Decorative icons */}
        <div className="flex justify-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
            <FaRegCalendarCheck className="text-primary text-2xl" />
          </div>
          <div className="w-14 h-14 rounded-2xl bg-outline-variant/10 flex items-center justify-center">
            <FaShieldHeart className="text-on-surface-variant/40 text-2xl" />
          </div>
        </div>

        {/* Title */}
        <h2 className="font-sans font-black text-2xl text-on-surface text-center mb-3">
          {title}
        </h2>

        {/* Description */}
        <p className="font-sans text-sm text-on-surface-variant text-center leading-relaxed mb-6">
          {message}
        </p>

        {/* Summary grid */}
        <div className={`grid ${items.length > 2 ? 'grid-cols-1' : 'grid-cols-2'} gap-3 mb-6`}>
          {items.map((item, idx) => (
            <div key={idx} className="bg-surface-container-low rounded-xl p-4">
              <span className="block font-public-sans text-[9px] font-bold uppercase tracking-[0.18em] text-on-surface-variant mb-2">
                {item.label}
              </span>
              <div className="flex items-center gap-2">
                <span className="font-sans text-sm font-bold text-on-surface truncate">
                  {item.value}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Confirm button */}
        <PrimaryButton
          onClick={onConfirm}
          className="w-full flex items-center justify-center gap-2 py-4 text-base font-bold tracking-wide rounded-xl"
        >
          {confirmText}
        </PrimaryButton>

        {/* Cancel */}
        <button
          onClick={onClose}
          className="w-full mt-3 py-3 text-center font-sans text-sm font-bold text-on-surface-variant hover:text-on-surface transition-colors"
        >
          Batal
        </button>
      </div>
    </div>
  );
}

