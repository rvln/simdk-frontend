import React from 'react';
import Link from 'next/link';

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-surface-container-lowest flex flex-col p-6 gap-4 border-r border-outline-variant/10 shadow-sm z-50">
      {/* Brand & Identity Block */}
      <div className="flex items-center gap-3 mb-6 px-2 mt-4">
        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white shadow-ambient">
          <span className="material-symbols-outlined">admin_panel_settings</span>
        </div>
        <div>
          <p className="font-public-sans text-xs font-bold uppercase tracking-widest text-primary">Administrator</p>
          <p className="text-[10px] text-on-surface-variant uppercase tracking-tighter font-sans">Super User</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2 mt-6">
        <Link 
          href="/dashboard" 
          className="flex items-center gap-3 px-4 py-3 bg-surface-container-low text-primary rounded-lg font-public-sans text-sm font-bold uppercase tracking-widest transition-transform duration-200 shadow-sm border border-outline-variant/10"
        >
          <span className="material-symbols-outlined">dashboard</span>
          <span>Overview</span>
        </Link>
        
        <Link 
          href="/approval-kunjungan" 
          className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface hover:text-primary hover:translate-x-1 rounded-lg font-public-sans text-sm font-semibold uppercase tracking-widest transition-all duration-200"
        >
          <span className="material-symbols-outlined">event_upcoming</span>
          <span>Approval Kunjungan</span>
        </Link>
        
        <Link 
          href="/validasi-donasi" 
          className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface hover:text-primary hover:translate-x-1 rounded-lg font-public-sans text-sm font-semibold uppercase tracking-widest transition-all duration-200"
        >
          <span className="material-symbols-outlined">payments</span>
          <span>Validasi Donasi</span>
        </Link>

        <Link 
          href="/kelola-kebutuhan" 
          className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface hover:text-primary hover:translate-x-1 rounded-lg font-public-sans text-sm font-semibold uppercase tracking-widest transition-all duration-200"
        >
          <span className="material-symbols-outlined">inventory_2</span>
          <span>Kelola Kebutuhan</span>
        </Link>

        <Link 
          href="/distribusi" 
          className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface hover:text-primary hover:translate-x-1 rounded-lg font-public-sans text-sm font-semibold uppercase tracking-widest transition-all duration-200"
        >
          <span className="material-symbols-outlined">local_shipping</span>
          <span>Distribusi</span>
        </Link>
      </nav>

      <div className="mt-auto pt-4 border-t border-outline-variant/20 space-y-2 pb-4">
        <Link 
          href="/settings" 
          className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-primary transition-colors font-public-sans text-xs font-semibold uppercase tracking-widest"
        >
          <span className="material-symbols-outlined text-sm">settings</span>
          <span>Settings</span>
        </Link>
        
        <button 
          className="w-full flex items-center gap-3 px-4 py-2 text-error hover:bg-error/5 rounded-lg transition-colors font-public-sans text-xs font-semibold uppercase tracking-widest cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">logout</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
