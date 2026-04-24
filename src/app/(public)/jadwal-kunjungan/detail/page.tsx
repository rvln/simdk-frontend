'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GlassContainer } from '@/components/ui/GlassContainer';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import {
  FiCalendar,
  FiClock,
  FiShield,
} from 'react-icons/fi';
import { FaRegHeart, FaRunning } from 'react-icons/fa';
import { MdAddShoppingCart, MdOutlineDeleteOutline, MdArrowBack } from 'react-icons/md';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';

/* ──────────────────────────────────────────
   Stepper
   ────────────────────────────────────────── */
interface StepInfo {
  number: number;
  label: string;
}

const steps: StepInfo[] = [
  { number: 1, label: 'Jadwal' },
  { number: 2, label: 'Detail' },
  { number: 3, label: 'Konfirmasi' },
];

/* ──────────────────────────────────────────
   Identity type tabs
   ────────────────────────────────────────── */
type IdentityType = 'individu' | 'lembaga';

/* ──────────────────────────────────────────
   Visit category cards
   ────────────────────────────────────────── */
interface VisitCategory {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
}

const visitCategories: VisitCategory[] = [
  {
    id: 'biasa',
    label: 'Kunjungan Biasa',
    description: 'Pertemuan santai, perkenalan, dan bermain bersama anak-anak.',
    icon: <FaRegHeart className="text-primary text-lg" />,
    iconBg: 'bg-primary/10',
  },
  {
    id: 'kegiatan',
    label: 'Melakukan Kegiatan',
    description: 'Workshop, donasi formal, hiburan, atau perayaan ulang tahun bersama.',
    icon: <FaRunning className="text-tertiary text-lg" />,
    iconBg: 'bg-tertiary/10',
  },
];

/* ══════════════════════════════════════════
   COMPONENT
   ══════════════════════════════════════════ */
export default function DetailPengunjungPage() {
  const router = useRouter();
  const [identityType, setIdentityType] = useState<IdentityType>('individu');
  const [selectedCategory, setSelectedCategory] = useState<string>('biasa');
  const [bringDonation, setBringDonation] = useState(false);
  const [namaField, setNamaField] = useState('');
  const [whatsappField, setWhatsappField] = useState('');
  const [tujuanField, setTujuanField] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Multistep Logic
  const [formStep, setFormStep] = useState<'detail' | 'cart'>('detail');

  // Mini Smart Cart State
  const [cartItems, setCartItems] = useState<{id: number; name: string; qty: number}[]>([]);
  const [itemName, setItemName] = useState('');
  const [itemQty, setItemQty] = useState('');

  const currentStep = formStep === 'detail' ? 2 : 2; // Keep stepper at 2 for both to imply they are part of "Detail" step, or we could change it.

  const handleNext = () => {
    if (bringDonation && formStep === 'detail') {
      setFormStep('cart');
    } else {
      setShowModal(true);
      // Simulate Unified Payload compilation
      console.log('--- UNIFIED PAYLOAD READY TO SUBMIT ---');
      console.log({
        visit: { identityType, namaField, whatsappField, selectedCategory, tujuanField },
        donations: bringDonation ? cartItems : []
      });
    }
  };

  const handleAddToCart = () => {
    if (itemName.trim() && itemQty) {
      setCartItems([...cartItems, { id: Date.now(), name: itemName, qty: parseInt(itemQty) }]);
      setItemName('');
      setItemQty('');
    }
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="bg-surface min-h-screen">
      {/* ═══════════════════════════════════════
          STEPPER
         ═══════════════════════════════════════ */}
      <section className="pt-8 pb-6 px-6">
        <div className="max-w-xl mx-auto">
          <div className="flex items-center justify-center">
            {steps.map((step, idx) => (
              <React.Fragment key={step.number}>
                <div className="flex items-center gap-2">
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                      step.number <= currentStep
                        ? 'bg-primary text-white'
                        : 'bg-surface-container-low text-on-surface-variant'
                    }`}
                  >
                    {step.number}
                  </span>
                  <span
                    className={`font-sans text-sm font-medium ${
                      step.number === currentStep
                        ? 'text-on-surface font-bold'
                        : step.number < currentStep
                          ? 'text-on-surface-variant'
                          : 'text-on-surface-variant'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>

                {idx < steps.length - 1 && (
                  <div
                    className={`flex-1 h-px mx-4 ${
                      step.number < currentStep
                        ? 'bg-primary'
                        : 'bg-outline-variant/30'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PAGE HEADER
         ═══════════════════════════════════════ */}
      <section className="px-6 pb-10">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-[44px] font-black tracking-tighter leading-[1.08] text-on-surface mb-4">
            Detail Pengunjung &amp; Kegiatan
          </h1>
          <p className="text-on-surface-variant font-sans text-sm md:text-base leading-relaxed max-w-lg mx-auto">
            Lengkapi informasi diri Anda atau lembaga Anda untuk memastikan proses
            kunjungan berjalan selaras dengan rutinitas anak-anak.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FORM SECTION
         ═══════════════════════════════════════ */}
      <section className="px-6 pb-10">
        <div className="max-w-2xl mx-auto">

          {/* ── JENIS IDENTITAS ── */}
          {formStep === 'detail' ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-8">
            <h3 className="font-public-sans text-[11px] font-bold uppercase tracking-[0.18em] text-on-surface-variant text-center mb-4">
              Jenis Identitas
            </h3>
            <div className="flex justify-center">
              <div className="inline-flex bg-surface-container-low rounded-xl p-1">
                <button
                  onClick={() => setIdentityType('individu')}
                  className={`px-8 py-2.5 rounded-lg font-sans text-sm font-semibold transition-all duration-200 ${
                    identityType === 'individu'
                      ? 'bg-surface-container-lowest text-primary shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Individu
                </button>
                <button
                  onClick={() => setIdentityType('lembaga')}
                  className={`px-8 py-2.5 rounded-lg font-sans text-sm font-semibold transition-all duration-200 ${
                    identityType === 'lembaga'
                      ? 'bg-surface-container-lowest text-primary shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Lembaga
                </button>
              </div>
            </div>
          </div>

          {/* ── NAME + WHATSAPP FIELDS ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            {/* Nama */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-public-sans font-semibold text-on-surface/80">
                {identityType === 'individu' ? 'Nama Perwakilan / Lembaga' : 'Nama Lembaga / Organisasi'}
              </label>
              <input
                type="text"
                value={namaField}
                onChange={(e) => setNamaField(e.target.value)}
                placeholder={
                  identityType === 'individu'
                    ? 'Contoh: Budi Santoso / PT. Sinergi'
                    : 'Contoh: Yayasan Peduli Anak'
                }
                className="w-full px-4 py-3 bg-surface-container-lowest rounded-xl transition-colors
                  focus:outline-none focus:ring-0 border border-outline-variant/15 focus:border-primary/40
                  font-sans text-sm text-on-surface placeholder:text-on-surface-variant/40"
              />
            </div>

            {/* WhatsApp */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-public-sans font-semibold text-on-surface/80">
                Nomor WhatsApp (Aktif)
              </label>
              <input
                type="tel"
                value={whatsappField}
                onChange={(e) => setWhatsappField(e.target.value)}
                placeholder="0812-xxxx-xxxx"
                className="w-full px-4 py-3 bg-surface-container-lowest rounded-xl transition-colors
                  focus:outline-none focus:ring-0 border border-outline-variant/15 focus:border-primary/40
                  font-sans text-sm text-on-surface placeholder:text-on-surface-variant/40"
              />
            </div>
          </div>

          {/* ── KATEGORI KUNJUNGAN ── */}
          <div className="mb-8">
            <h3 className="font-public-sans text-[11px] font-bold uppercase tracking-[0.18em] text-on-surface mb-4">
              Kategori Kunjungan
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {visitCategories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`text-left p-5 rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-surface-container-lowest ring-2 ring-primary/30 shadow-ambient'
                        : 'bg-surface-container-lowest border border-outline-variant/10 hover:border-outline-variant/25'
                    }`}
                  >
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-xl ${cat.iconBg} flex items-center justify-center mb-3`}>
                      {cat.icon}
                    </div>
                    {/* Label */}
                    <h4 className="font-sans font-bold text-sm text-on-surface mb-1">
                      {cat.label}
                    </h4>
                    {/* Description */}
                    <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                      {cat.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── RINCIAN TUJUAN / SUSUNAN KEGIATAN ── */}
          <div className="mb-6">
            <label className="block text-sm font-public-sans font-semibold text-on-surface/80 mb-1.5">
              Rincian Tujuan / Susunan Kegiatan
            </label>
            <textarea
              value={tujuanField}
              onChange={(e) => setTujuanField(e.target.value)}
              rows={4}
              placeholder="Ceritakan sedikit rencana kegiatan Anda atau barang apa yang ingin didonasikan..."
              className="w-full px-4 py-3 bg-surface-container-lowest rounded-xl transition-colors resize-none
                focus:outline-none focus:ring-0 border border-outline-variant/15 focus:border-primary/40
                font-sans text-sm text-on-surface placeholder:text-on-surface-variant/40 leading-relaxed"
            />
          </div>

          {/* ── BRING DONATION TOGGLE ── */}
          <div className="mb-10">
            <GlassContainer className="px-5 py-4 flex items-start gap-4">
              <div className="flex-1">
                <p className="font-sans text-sm font-bold text-on-surface leading-snug">
                  Saya berencana membawa buah tangan / donasi fisik saat berkunjung
                </p>
                <p className="font-sans text-xs text-on-surface-variant mt-1 leading-relaxed">
                  Kami akan menyiapkan Resi Penitipan untuk mendata barang bawaan Anda agar transparan.
                </p>
              </div>
              {/* Toggle Switch */}
              <button
                type="button"
                role="switch"
                aria-checked={bringDonation}
                onClick={() => setBringDonation(!bringDonation)}
                className={`relative flex-shrink-0 w-12 h-7 rounded-full transition-colors duration-200 ${
                  bringDonation ? 'bg-primary' : 'bg-surface-dim'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                    bringDonation ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </GlassContainer>
          </div>

          {/* ═══════════════════════════════════════
              RINGKASAN KUNJUNGAN
             ═══════════════════════════════════════ */}
          <GlassContainer className="p-6 md:p-8 bg-surface-container-low/60 mb-6">
            <h3 className="font-sans font-black text-lg text-on-surface mb-5">
              Ringkasan Kunjungan
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Tanggal */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FiCalendar className="text-primary text-base" />
                </div>
                <div>
                  <span className="block font-public-sans text-[10px] font-bold uppercase tracking-[0.14em] text-on-surface-variant">
                    Tanggal Kunjungan
                  </span>
                  <span className="block font-sans text-sm font-bold text-on-surface mt-0.5">
                    Kamis, 12 Desember 2024
                  </span>
                </div>
              </div>

              {/* Sesi */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FiClock className="text-primary text-base" />
                </div>
                <div>
                  <span className="block font-public-sans text-[10px] font-bold uppercase tracking-[0.14em] text-on-surface-variant">
                    Sesi Terpilih
                  </span>
                  <span className="block font-sans text-sm font-bold text-on-surface mt-0.5">
                    Sesi Siang (13:00 - 15:30)
                  </span>
                </div>
              </div>
            </div>
          </GlassContainer>

          {/* ═══════════════════════════════════════
              CTA BUTTON
             ═══════════════════════════════════════ */}
          <PrimaryButton
            onClick={handleNext}
            className="w-full flex items-center justify-center gap-2 py-4 text-base font-bold shadow-md hover:shadow-lg transition-all tracking-wide rounded-xl"
          >
            {bringDonation && formStep === 'detail' ? 'Lanjut Isi Data Barang' : 'Lanjut ke Konfirmasi'}
          </PrimaryButton>
          </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="mb-6 flex items-center gap-4">
                <button onClick={() => setFormStep('detail')} className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-surface-container-highest transition-colors">
                  <MdArrowBack className="text-xl" />
                </button>
                <div>
                  <h3 className="font-sans font-black text-xl text-on-surface">Data Barang Bawaan</h3>
                  <p className="font-sans text-xs text-on-surface-variant mt-1">Tambahkan barang yang akan Anda bawa saat kunjungan.</p>
                </div>
              </div>

              <GlassContainer className="p-6 mb-8">
                <div className="flex gap-3 items-end">
                  <div className="flex-1">
                    <label className="text-xs font-public-sans font-bold uppercase tracking-widest text-on-surface-variant mb-2 block">Nama Barang</label>
                    <input type="text" value={itemName} onChange={(e)=>setItemName(e.target.value)} placeholder="Misal: Buku Cerita Anak" className="w-full px-4 py-3 bg-surface-container-lowest rounded-xl border border-outline-variant/15 focus:border-primary/40 focus:ring-0 font-sans text-sm text-on-surface placeholder:text-on-surface-variant/40 outline-none" />
                  </div>
                  <div className="w-24">
                    <label className="text-xs font-public-sans font-bold uppercase tracking-widest text-on-surface-variant mb-2 block">Jumlah</label>
                    <input type="number" value={itemQty} onChange={(e)=>setItemQty(e.target.value)} placeholder="0" className="w-full px-4 py-3 bg-surface-container-lowest rounded-xl border border-outline-variant/15 focus:border-primary/40 focus:ring-0 font-sans text-sm text-on-surface text-center outline-none" />
                  </div>
                  <button type="button" onClick={handleAddToCart} className="h-[46px] px-6 bg-primary/10 text-primary hover:bg-primary/20 rounded-xl font-bold flex items-center justify-center transition-colors">
                    <MdAddShoppingCart className="text-xl" />
                  </button>
                </div>
                
                <div className="mt-8 space-y-3">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-8 border border-dashed border-outline-variant/20 rounded-xl">
                      <p className="text-sm text-on-surface-variant font-sans">Belum ada barang ditambahkan.</p>
                    </div>
                  ) : (
                    cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/10 shadow-sm">
                        <div>
                          <p className="font-sans font-bold text-on-surface text-sm">{item.name}</p>
                          <p className="font-sans text-xs text-on-surface-variant mt-0.5">{item.qty} item</p>
                        </div>
                        <button onClick={() => handleRemoveItem(item.id)} className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors">
                          <MdOutlineDeleteOutline className="text-lg" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </GlassContainer>
              
              <PrimaryButton
                onClick={handleNext}
                className="w-full flex items-center justify-center gap-2 py-4 text-base font-bold shadow-md hover:shadow-lg transition-all tracking-wide rounded-xl"
              >
                Konfirmasi Seluruh Data
              </PrimaryButton>
            </div>
          )}

          {/* Confirmation Modal */}
          <ConfirmationModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={() => {
              setShowModal(false);
              router.push('/jadwal-kunjungan/konfirmasi');
            }}
            date="24 Okt 2023"
            time="09:00 - 11:00"
          />

          {/* ═══════════════════════════════════════
              TRUST / PRIVACY NOTICE
             ═══════════════════════════════════════ */}
          <div className="mt-5 mb-4">
            <div className="flex items-start gap-3 bg-surface-container-low/50 rounded-xl px-5 py-4">
              <FiShield className="text-primary text-base flex-shrink-0 mt-0.5" />
              <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                Data Anda dienkripsi dan hanya digunakan untuk kepentingan verifikasi kunjungan oleh Empanti. Kami
                menghargai privasi Anda sebagaimana kami menjaga kenyamanan anak-anak.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
