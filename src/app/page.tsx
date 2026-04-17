import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { GlassContainer } from '@/components/ui/GlassContainer';
import { InputField } from '@/components/ui/InputField';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <>
      <Navbar />

      <main className="pt-32 space-y-24 pb-32">
        {/* Hero Section */}
        <section className="max-w-screen-2xl mx-auto px-8 md:px-12 grid grid-cols-1 md:grid-cols-[1.8fr_1fr] gap-12 items-center">
          <div className="space-y-8">
            <span className="inline-block px-4 py-1.5 rounded-full bg-surface-container-low text-on-surface-variant font-public-sans text-sm font-bold uppercase tracking-widest border border-outline-variant/15 shadow-sm">
              BERBAGI KEBAIKAN
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-on-surface leading-[0.9] font-sans">
              <span className="text-primary text-[6rem] tracking-tight block">Pelita Kebaikan</span>
              untuk Langkah Kecil Mereka.
            </h1>
            <p className="text-xl text-on-surface-variant max-w-lg leading-relaxed font-light font-sans">
              Membangun ekosistem terbuka dengan pelaporan transparan demi memastikan setiap anak terlindungi dan dihargai.
            </p>
            <div className="flex items-center gap-6 pt-4 font-sans">
              <PrimaryButton>Donasi Sekarang</PrimaryButton>
              <Link href="/misi" className="flex items-center gap-2 font-semibold text-primary hover:text-primary-container transition-colors">
                Jelajahi Misi Kami <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          </div>
          
          <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-ambient group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              alt="Two young children playing" 
              src="https://images.unsplash.com/photo-1594608661623-aa0bd3a01d44?w=800&q=80" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
          </div>
        </section>

        {/* Current Needs Section */}
        <section className="max-w-screen-2xl mx-auto px-8 md:px-12 space-y-12">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-4xl font-black font-sans tracking-tighter text-on-surface">
              Transparansi Kebutuhan <span className="text-tertiary">Empanti.</span>
            </h2>
            <p className="text-2xl text-on-surface-variant font-light italic font-sans">
              Bawa Harapan dalam Keseharian Mereka.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <GlassContainer className="p-10 flex flex-col justify-between space-y-10 group hover:bg-surface transition-colors cursor-pointer">
              <div className="space-y-6">
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110">
                  <span className="material-symbols-outlined text-3xl">child_care</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold font-sans tracking-tight text-on-surface">Nutrisi &amp; Kesejahteraan</h3>
                  <p className="text-on-surface-variant leading-relaxed font-sans">
                    Memberikan makanan bergizi dan perawatan khusus yang membangun fondasi bagi masa depan yang sehat dan ceria.
                  </p>
                </div>
              </div>
            </GlassContainer>

            <GlassContainer className="p-10 flex flex-col justify-between space-y-10 group hover:bg-surface transition-colors cursor-pointer">
              <div className="space-y-6">
                <div className="w-14 h-14 bg-tertiary/10 text-tertiary rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110">
                  <span className="material-symbols-outlined text-3xl">auto_stories</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold font-sans tracking-tight text-on-surface">Perjalanan Pendidikan</h3>
                  <p className="text-on-surface-variant leading-relaxed font-sans">
                    Menyediakan peralatan, teknologi, dan bimbingan yang dibutuhkan setiap anak untuk membuka potensi unik dan bermimpi.
                  </p>
                </div>
              </div>
            </GlassContainer>

            <GlassContainer className="p-10 flex flex-col justify-between space-y-10 group hover:bg-surface transition-colors cursor-pointer">
              <div className="space-y-6">
                <div className="w-14 h-14 bg-error/10 text-error rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110">
                  <span className="material-symbols-outlined text-3xl">home</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold font-sans tracking-tight text-on-surface">Kenyamanan Harian</h3>
                  <p className="text-on-surface-variant leading-relaxed font-sans">
                    Mengubah ruang menjadi rumah yang hangat dan aman dengan barang-barang esensial yang memberikan rasa memiliki.
                  </p>
                </div>
              </div>
            </GlassContainer>
          </div>
        </section>

        {/* Tracker & Scheduler */}
        <section className="max-w-screen-2xl mx-auto px-8 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
            <div className="bg-gradient-to-br from-primary to-primary-container text-white rounded-3xl p-12 flex flex-col justify-between relative overflow-hidden min-h-[350px] shadow-ambient">
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-4xl">calendar_month</span>
                  <h2 className="text-3xl font-black font-sans leading-tight tracking-tight">Jadwalkan Kunjungan</h2>
                </div>
                <p className="text-white/80 text-lg leading-relaxed max-w-sm font-sans">
                  Jadwalkan kunjungan untuk melihat langsung kegiatan kami. Kami percaya transparansi adalah kunci kepercayaan.
                </p>
                <div className="pt-4">
                  <button className="w-full md:w-auto bg-white text-primary px-10 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform font-sans shadow-sm cursor-pointer">
                    Mulai Penjadwalan <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
              </div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white rounded-full blur-3xl opacity-10"></div>
            </div>

            <GlassContainer className="p-12 flex flex-col justify-between min-h-[350px]">
              <div className="space-y-8">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold font-sans tracking-tight text-on-surface">Lacak Resi Donasi</h2>
                    <p className="text-on-surface-variant font-sans">Lihat dampak nyata dari kontribusi Anda secara langsung.</p>
                  </div>
                  <div className="p-4 bg-surface-container-lowest rounded-2xl shadow-ambient border border-outline-variant/10">
                    <span className="material-symbols-outlined text-primary text-3xl">verified_user</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <div className="flex-1 w-full">
                      <InputField 
                        label="IDENTIFIKASI TRANSAKSI" 
                        placeholder="TXN-DON-2026-XXXX" 
                        id="tracking-input"
                      />
                    </div>
                    <PrimaryButton className="w-full sm:w-auto py-[13px]">
                      Lacak
                    </PrimaryButton>
                  </div>
                </div>
              </div>
            </GlassContainer>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
