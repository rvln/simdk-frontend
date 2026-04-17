import React from 'react';
import Image from 'next/image';
import { GlassContainer } from '@/components/ui/GlassContainer';
import { InputField } from '@/components/ui/InputField';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiSend,
} from 'react-icons/fi';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontak Kami | Empanti - Panti Asuhan Dr. J. Lucas',
  description:
    'Hubungi Panti Asuhan Dr. J. Lucas (Empanti) Manado. Kirim pesan, kunjungi lokasi, atau hubungi kami via telepon dan email.',
};

/* ───── Contact info items ───── */
const contactItems = [
  {
    icon: <FiMapPin className="text-xl text-primary" />,
    title: 'Alamat Utama',
    lines: [
      'Jl. Karombasan Ling No. 2, Tikala Baru,',
      'Kec. Tikala, Kota Manado,',
      'Sulawesi Utara.',
    ],
  },
  {
    icon: <FiPhone className="text-xl text-primary" />,
    title: 'Telepon',
    lines: [
      '0431-864749',
      'Senin – Jumat, 09:00',
      '– 17:00 WITA',
    ],
  },
  {
    icon: <FiMail className="text-xl text-primary" />,
    title: 'Email',
    lines: ['halo@empanti.org', 'donasi@empanti.org'],
  },
];

export default function KontakPage() {
  return (
    <div className="bg-surface">
      {/* ═══════════════════════════════════════════
          SECTION 1 — HERO
      ═══════════════════════════════════════════ */}
      <section className="px-6 md:px-12 lg:px-20 pt-20 pb-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.05] text-on-surface mb-6">
            Hubungi Kami
          </h1>
          <p className="text-on-surface-variant font-sans text-base md:text-lg leading-relaxed max-w-lg">
            Kami hadir untuk mendengar, membantu, dan berkolaborasi. Jangan ragu
            untuk meninggalkan pesan atau mengunjungi panti kami untuk melihat
            langsung transparansi operasional.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2 — HERO IMAGE / MAP BANNER
      ═══════════════════════════════════════════ */}
      <section className="px-6 md:px-12 lg:px-20 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="relative w-full aspect-[16/7] md:aspect-[16/6] rounded-2xl overflow-hidden shadow-ambient">
            <Image
              src="/assets/kontak-hero.jpg"
              alt="Lokasi Empanti - Panti Asuhan Dr. J. Lucas"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-on-surface/70 via-transparent to-transparent" />

            {/* Location label */}
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
              <span className="font-public-sans text-[10px] font-bold uppercase tracking-[0.18em] text-white/70 block mb-1">
                Lokasi Kami
              </span>
              <h3 className="text-white text-lg md:text-xl font-bold font-sans">
                Panti Asuhan Dr. J. Lucas, Manado
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3 — CONTACT INFO + FORM
      ═══════════════════════════════════════════ */}
      <section className="px-6 md:px-12 lg:px-20 pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* ── Left Column: Contact Details ── */}
          <div className="space-y-10">
            {/* Contact items */}
            <div className="space-y-8">
              {contactItems.map((item, i) => (
                <div key={i} className="flex items-start gap-5">
                  {/* Icon circle */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/8 flex items-center justify-center">
                    {item.icon}
                  </div>
                  {/* Text */}
                  <div>
                    <h4 className="font-bold text-sm text-on-surface font-sans mb-1">
                      {item.title}
                    </h4>
                    {item.lines.map((line, j) => (
                      <p
                        key={j}
                        className="text-sm text-on-surface-variant leading-relaxed font-sans"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom illustration */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-ambient max-w-sm">
              <Image
                src="/assets/kontak-illustration.jpg"
                alt="Ilustrasi Empanti"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="font-public-sans text-[9px] font-bold uppercase tracking-[0.16em] text-white/60 block mb-0.5">
                  Lokasi Kami
                </span>
                <span className="text-white text-xs font-bold font-sans">
                  Panti Asuhan Dr. J. Lucas, Manado
                </span>
              </div>
            </div>
          </div>

          {/* ── Right Column: Contact Form ── */}
          <div>
            <GlassContainer className="p-8 md:p-10">
              <form className="space-y-6">
                <InputField
                  id="contact_name"
                  label="Nama Lengkap"
                  placeholder="Masukkan nama Anda"
                  type="text"
                />

                <InputField
                  id="contact_email"
                  label="Alamat Email"
                  placeholder="nama@email.com"
                  type="email"
                />

                <InputField
                  id="contact_subject"
                  label="Subjek"
                  placeholder="Tujuan pesan Anda"
                  type="text"
                />

                {/* Textarea — styled to match InputField aesthetic */}
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="contact_message"
                    className="text-sm font-public-sans font-semibold text-on-surface/80"
                  >
                    Pesan Anda
                  </label>
                  <textarea
                    id="contact_message"
                    rows={5}
                    placeholder="Jelaskan secara detail..."
                    className="w-full px-4 py-3 bg-surface-container-lowest rounded-md transition-colors focus:outline-none focus:ring-0 border border-outline-variant/20 focus:border-primary/50 resize-none text-sm font-sans"
                  />
                </div>

                <PrimaryButton className="w-full flex items-center justify-center gap-2.5 py-4 text-sm font-bold shadow-md hover:shadow-lg transition-all tracking-wide uppercase">
                  Kirim Pesan
                  <FiSend className="text-base" />
                </PrimaryButton>
              </form>
            </GlassContainer>
          </div>
        </div>
      </section>
    </div>
  );
}
