"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiChevronDown, FiDollarSign, FiPackage, FiUser } from "react-icons/fi";

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
  const [isLoggedIn, setIsLoggedIn] = useState(true); // MOCK LOGIN STATE
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDonasiOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on route change
  useEffect(() => {
    setDonasiOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href;
  const isDonasiActive = pathname.startsWith("/donasi");

  const linkBase =
    "font-sans font-medium text-on-surface-variant hover:text-primary transition-colors text-base tracking-tight";
  const linkActive =
    "font-sans font-bold text-primary border-b-2 border-primary pb-1 text-base tracking-tight";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-sans font-black text-2xl text-primary tracking-tighter">
            Empanti
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
          {isLoggedIn ? (
            <Link
              href="/profil-publik"
              className="flex items-center gap-2 font-sans font-bold text-on-surface hover:text-primary transition-colors text-sm px-3 py-1.5 bg-surface-container-low rounded-full shadow-sm hover:shadow-md"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <FiUser className="text-lg" />
              </div>
              <span className="hidden md:block">Profil Saya</span>
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="font-sans font-medium text-on-surface-variant hover:text-primary transition-colors text-base px-4 py-2"
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className="font-sans font-bold bg-primary text-white hover:bg-primary-container hover:text-on-primary-container transition-colors rounded-lg px-6 py-2 text-base shadow-sm"
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
