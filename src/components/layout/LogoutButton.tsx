"use client"; // WAJIB ada karena kita menggunakan onClick, localStorage, dan useRouter

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiLogOut, FiAlertTriangle, FiX } from "react-icons/fi";
import { createPortal } from "react-dom";

export default function LogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // State untuk memastikan Portal hanya dirender di sisi Client (menghindari error Hydration Next.js)
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    const token = localStorage.getItem("auth_token");

    if (token) {
      try {
        // Beritahu server untuk menghapus token
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
      } catch (error) {
        console.error("Gagal logout dari server:", error);
      }
    }

    // Bersihkan memori peramban
    localStorage.removeItem("auth_token");

    // Trik Pro: Paksa peramban memicu event 'storage' agar Navbar di tab saat ini langsung sadar
    window.dispatchEvent(new Event("storage"));

    // Tutup modal dan arahkan ke login
    setShowModal(false);

    // Kembalikan ke halaman login
    router.push("/");
  };

  // Konten Modal dipisahkan ke dalam variabel untuk kebersihan kode
  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="absolute inset-0"
        onClick={() => setShowModal(false)}
      ></div>

      <div className="relative bg-surface rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200 border border-outline-variant/20">
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <FiAlertTriangle className="text-xl" />
            </div>
            <h3 className="text-lg font-bold text-on-surface">
              Konfirmasi Keluar
            </h3>
          </div>
          <button
            onClick={() => setShowModal(false)}
            className="text-on-surface-variant hover:text-on-surface transition-colors p-1"
          >
            <FiX className="text-lg" />
          </button>
        </div>

        <div className="px-6 pb-6 text-sm text-on-surface-variant">
          Apakah Anda yakin ingin keluar dari sesi saat ini? Anda harus
          memasukkan kredensial kembali untuk mengakses dasbor.
        </div>

        <div className="bg-surface-container-low px-6 py-4 flex items-center justify-end gap-3 border-t border-outline-variant/10">
          <button
            onClick={() => setShowModal(false)}
            disabled={isLoggingOut}
            className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors rounded-lg"
          >
            Batal
          </button>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center justify-center min-w-[100px] px-4 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 transition-colors rounded-lg shadow-sm"
          >
            {isLoggingOut ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Keluar...
              </span>
            ) : (
              "Ya, Keluar"
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          setShowModal(true);
        }}
        className="flex items-center gap-3 w-full px-4 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 rounded-md transition-colors"
      >
        <FiLogOut className="text-base" />
        Keluar Akun
      </button>

      {/* Eksekusi Portal: Memindahkan modal ke akhir tag <body> */}
      {showModal && mounted && createPortal(modalContent, document.body)}
    </>
  );
}
