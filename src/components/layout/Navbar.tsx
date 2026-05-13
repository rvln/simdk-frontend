"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiChevronDown,
  FiDollarSign,
  FiPackage,
  FiUser,
  FiGrid,
} from "react-icons/fi";
import LogoutButton from "@/components/layout/LogoutButton";
import { useAuth } from "@/hooks/useAuth";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/profil", label: "Profil" },
  { href: "/transparansi", label: "Transparansi" },
  { href: "/jadwal-kunjungan", label: "Jadwal Kunjungan" },
  { href: "/kontak", label: "Kontak" },
];

const donasiSubmenus = [
  {
    href: "/donasi/finansial",
    label: "Donasi Finansial",
    desc: "Transfer dana secara aman via Midtrans",
    icon: <FiDollarSign className="text-lg text-primary" />,
  },
  {
    href: "/donasi/barang",
    label: "Donasi Barang",
    desc: "Kirim bantuan fisik ke gudang panti",
    icon: <FiPackage className="text-lg text-primary" />,
  },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [donasiOpen, setDonasiOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Server-authoritative auth state (replaces the old isLoggedIn mock)
  const { user, isLoading, isAuthenticated } = useAuth();

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDonasiOpen(false);
      }
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on route change
  useEffect(() => {
    setDonasiOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href;
  const isDonasiActive = pathname.startsWith("/donasi");

  const linkBase =
    "font-sans font-medium text-on-surface-variant hover:text-primary transition-colors text-base tracking-tight";
  const linkActive =
    "font-sans font-bold text-primary border-b-2 border-primary pb-1 text-base tracking-tight";

  /* ── Derive the dashboard link based on the user's role ── */
  const getDashboardLink = () => {
    if (!user) return null;
    switch (user.role) {
      case "PENGURUS_PANTI":
        return { href: "/dashboard", label: "Dashboard Panti" };
      case "KEPALA_PANTI":
        return { href: "/dashboard-kepala-panti", label: "Dashboard Panti" };
      default:
        return null; // PENGUNJUNG — no dashboard access
    }
  };

  const dashboardLink = getDashboardLink();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-sans font-black text-base text-primary tracking-tighter">
            Panti Asuhan Dr Lucas
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.slice(0, 3).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={isActive(link.href) ? linkActive : linkBase}
            >
              {link.label}
            </Link>
          ))}

          {/* Donasi Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setDonasiOpen((v) => !v)}
              className={`flex items-center gap-1 transition-colors text-base tracking-tight ${
                isDonasiActive
                  ? "font-bold text-primary border-b-2 border-primary pb-1"
                  : "font-medium text-on-surface-variant hover:text-primary"
              }`}
            >
              Donasi
              <FiChevronDown
                className={`text-sm transition-transform duration-200 ${
                  donasiOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown panel */}
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 bg-surface/95 backdrop-blur-xl rounded-xl shadow-ambient border border-outline-variant/10 overflow-hidden transition-all duration-200 origin-top ${
                donasiOpen
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              {donasiSubmenus.map((sub) => (
                <Link
                  key={sub.href}
                  href={sub.href}
                  className="flex items-start gap-3 px-5 py-4 hover:bg-surface-container-low transition-colors group"
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center mt-0.5 group-hover:bg-primary/15 transition-colors">
                    {sub.icon}
                  </div>
                  <div>
                    <span className="block font-sans font-bold text-sm text-on-surface group-hover:text-primary transition-colors">
                      {sub.label}
                    </span>
                    <span className="block font-public-sans text-xs text-on-surface-variant mt-0.5">
                      {sub.desc}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {navLinks.slice(3).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={isActive(link.href) ? linkActive : linkBase}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Auth CTA */}
        <div className="flex items-center gap-4">
          {isLoading ? (
            /* Skeleton loader — prevents layout shift while fetching user */
            <div className="w-32 h-10 rounded-full bg-surface-container-low animate-pulse" />
          ) : isAuthenticated && user ? (
            // DROPDOWN PROFIL (ROLE-AWARE)
            <div ref={profileDropdownRef} className="relative">
              <button
                onClick={() => setProfileOpen((v) => !v)}
                className="flex items-center gap-2 font-sans font-bold text-on-surface hover:text-primary transition-colors text-sm px-3 py-1.5 bg-surface-container-low rounded-full shadow-sm hover:shadow-md"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <FiUser className="text-lg" />
                </div>
                <span className="hidden md:block">
                  {user.name?.split(" ")[0] || "Profil Saya"}
                </span>
                {/* Ikon panah berputar menyesuaikan state */}
                <FiChevronDown
                  className={`text-sm transition-transform duration-200 hidden md:block ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Panel Dropdown Profil */}
              <div
                className={`absolute top-full right-0 mt-3 w-52 bg-surface/95 backdrop-blur-xl rounded-xl shadow-ambient border border-outline-variant/10 overflow-hidden transition-all duration-200 origin-top-right ${
                  profileOpen
                    ? "opacity-100 scale-100 pointer-events-auto"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <div className="py-1">
                  {/* Role badge */}
                  <div className="px-4 py-2.5 border-b border-outline-variant/10">
                    <span className="font-public-sans text-[9px] font-bold uppercase tracking-[0.16em] text-on-surface-variant">
                      {user.role === "PENGUNJUNG"
                        ? "DONATUR"
                        : user.role === "PENGURUS_PANTI"
                          ? "PENGURUS PANTI"
                          : "KEPALA PANTI"}
                    </span>
                  </div>

                  {/* Halaman Profil — ALL roles */}
                  <Link
                    href="/profil-saya"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-on-surface hover:bg-surface-container-low hover:text-primary transition-colors"
                  >
                    <FiUser className="text-base" />
                    Halaman Profil
                  </Link>

                  {/* Dashboard Panti — PENGURUS_PANTI & KEPALA_PANTI only */}
                  {dashboardLink && (
                    <Link
                      href={dashboardLink.href}
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-on-surface hover:bg-surface-container-low hover:text-primary transition-colors"
                    >
                      <FiGrid className="text-base" />
                      {dashboardLink.label}
                    </Link>
                  )}

                  {/* Garis Pembatas (Separator) */}
                  <div className="border-t border-outline-variant/20 my-1 mx-2"></div>

                  {/* INJEKSI KOMPONEN LOGOUT DI SINI */}
                  <div className="px-1">
                    <LogoutButton />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // BLOK GUEST (KODE ANDA SEBELUMNYA TETAP SAMA)
            <>
              <Link
                href="/login"
                className="font-sans text-sm font-medium text-on-surface-variant hover:text-primary transition-colors text-base px-4 py-2"
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className="font-sans text-sm font-bold bg-primary text-white hover:bg-primary-container hover:text-on-primary-container transition-colors rounded-lg px-6 py-2 text-base shadow-sm"
              >
                Daftar
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
