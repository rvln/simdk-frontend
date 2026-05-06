import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { InputField } from "@/components/ui/InputField";
import Link from "next/link";
import {
  MdOutlineChildCare,
  MdMenuBook,
  MdHome,
  MdCalendarMonth,
  MdVerifiedUser,
  MdArrowForward,
  MdFavoriteBorder,
} from "react-icons/md";

// Mock Data Jejak Kebaikan
const MOCK_TESTIMONI = [
  {
    id: 1,
    name: "Bapak Budi",
    message:
      "Semoga bantuan kecil ini bisa memberikan senyuman untuk anak-anak panti. Terus semangat belajar!",
  },
  {
    id: 2,
    name: "Hamba Allah",
    message:
      "Titipan doa dan sedikit rezeki untuk keberlangsungan fasilitas pendidikan adik-adik.",
  },
  {
    id: 3,
    name: "Ibu Siti",
    message:
      "Sangat mudah berdonasi lewat sistem ini, transparan dan jelas laporannya. Sehat selalu semuanya.",
  },
];

export default function LandingPage() {
  return (
    <>
      <Navbar />

      <main className="pt-32 space-y-32 pb-32 bg-[#F9FAFB]">
        {/* Hero Section */}
        <section className="max-w-screen-2xl mx-auto px-8 md:px-12 grid grid-cols-1 md:grid-cols-[1.8fr_1fr] gap-12 items-center">
          <div className="space-y-8">
            <span className="inline-block px-4 py-1.5 rounded-full bg-surface-container-low text-gray-600 font-public-sans text-sm font-bold uppercase tracking-widest shadow-sm border-none">
              BERBAGI KEBAIKAN
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-gray-900 leading-[0.9] font-sans">
              <span className="text-teal-700 text-[6rem] tracking-tight block">
                Pelita Kebaikan
              </span>
              untuk Langkah Kecil Mereka.
            </h1>
            <p className="text-xl text-gray-500 max-w-lg leading-relaxed font-light font-sans">
              Membangun ekosistem terbuka dengan pelaporan transparan demi
              memastikan setiap anak terlindungi dan dihargai.
            </p>
            <div className="flex items-center gap-6 pt-4 font-sans">
              <PrimaryButton className="shadow-md">
                Donasi Sekarang
              </PrimaryButton>
              <Link
                href="/misi"
                className="flex items-center gap-2 font-semibold text-teal-700 hover:text-teal-800 transition-colors"
              >
                Jelajahi Misi Kami <MdArrowForward className="text-xl" />
              </Link>
            </div>
          </div>

          <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-md group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt="Two young children playing"
              src="https://images.unsplash.com/photo-1594608661623-aa0bd3a01d44?w=800&q=80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-900/30 to-transparent"></div>
          </div>
        </section>

        {/* Current Needs Section */}
        <section className="max-w-screen-2xl mx-auto px-8 md:px-12 space-y-12">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-4xl font-black font-sans tracking-tighter text-gray-900">
              Transparansi Kebutuhan{" "}
              <span className="text-teal-700">Panti Asuhan.</span>
            </h2>
            <p className="text-2xl text-gray-500 font-light italic font-sans">
              Bawa Harapan dalam Keseharian Mereka.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-10 flex flex-col justify-between space-y-10 group hover:bg-white shadow-sm hover:shadow-md transition-all cursor-pointer border-none">
              <div className="space-y-6">
                <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110">
                  <MdOutlineChildCare className="text-3xl" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold font-sans tracking-tight text-gray-900">
                    Nutrisi &amp; Kesejahteraan
                  </h3>
                  <p className="text-gray-500 leading-relaxed font-sans">
                    Memberikan makanan bergizi dan perawatan khusus yang
                    membangun fondasi bagi masa depan yang sehat dan ceria.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-10 flex flex-col justify-between space-y-10 group hover:bg-white shadow-sm hover:shadow-md transition-all cursor-pointer border-none">
              <div className="space-y-6">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110">
                  <MdMenuBook className="text-3xl" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold font-sans tracking-tight text-gray-900">
                    Perjalanan Pendidikan
                  </h3>
                  <p className="text-gray-500 leading-relaxed font-sans">
                    Menyediakan peralatan, teknologi, dan bimbingan yang
                    dibutuhkan setiap anak untuk membuka potensi unik dan
                    bermimpi.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-10 flex flex-col justify-between space-y-10 group hover:bg-white shadow-sm hover:shadow-md transition-all cursor-pointer border-none">
              <div className="space-y-6">
                <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110">
                  <MdHome className="text-3xl" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold font-sans tracking-tight text-gray-900">
                    Kenyamanan Harian
                  </h3>
                  <p className="text-gray-500 leading-relaxed font-sans">
                    Mengubah ruang menjadi rumah yang hangat dan aman dengan
                    barang-barang esensial yang memberikan rasa memiliki.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tracker & Scheduler */}
        <section className="max-w-screen-2xl mx-auto px-8 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
            {/* Jadwal Kunjungan Action Card */}
            <div className="bg-[#0B648C] text-white rounded-3xl p-12 flex flex-col justify-between relative overflow-hidden min-h-[350px] shadow-md border-none">
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-4">
                  <MdCalendarMonth className="text-4xl" />
                  <h2 className="text-3xl font-black font-sans leading-tight tracking-tight">
                    Jadwalkan Kunjungan
                  </h2>
                </div>
                <p className="text-white/90 text-lg leading-relaxed max-w-sm font-sans">
                  Jadwalkan kunjungan untuk melihat langsung kegiatan kami. Kami
                  percaya transparansi adalah kunci kepercayaan.
                </p>
                <div className="pt-4">
                  <button className="w-full md:w-auto bg-white text-[#0B648C] px-10 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors font-sans shadow-sm cursor-pointer border-none">
                    Mulai Penjadwalan <MdArrowForward className="text-xl" />
                  </button>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute top-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            </div>

            {/* Lacak Resi Action Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 flex flex-col justify-between min-h-[350px] shadow-sm border-none">
              <div className="space-y-8">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold font-sans tracking-tight text-gray-900">
                      Lacak Resi Donasi
                    </h2>
                    <p className="text-gray-500 font-sans">
                      Lihat dampak nyata dari kontribusi Anda secara langsung.
                    </p>
                  </div>
                  <div className="p-4 bg-teal-50 rounded-2xl shadow-sm border-none">
                    <MdVerifiedUser className="text-teal-700 text-3xl" />
                  </div>
                </div>

                <div className="space-y-4 pt-4">
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
            </div>
          </div>
        </section>

        {/* New Section: Dokumentasi Kegiatan (Bento Grid) */}
        <section className="max-w-screen-2xl mx-auto px-8 md:px-12 space-y-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-black font-sans tracking-tighter text-gray-900">
              Dokumentasi Kegiatan
            </h2>
            <p className="text-gray-500 font-sans text-lg">
              Momen bahagia dan edukatif bersama anak-anak panti.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[500px]">
            {/* Kiri: Card Lanskap Panjang */}
            <div className="md:col-span-2 relative rounded-3xl overflow-hidden shadow-sm group bg-gray-200 min-h-[300px]">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent z-10"></div>
              <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                [Placeholder Gambar Lebar]
              </div>
              <div className="absolute bottom-0 left-0 p-8 z-20">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-full uppercase tracking-widest mb-3 inline-block">
                  Pendidikan
                </span>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Kelas Menggambar Bersama Relawan
                </h3>
                <p className="text-white/80 line-clamp-2 max-w-md">
                  Anak-anak mengekspresikan imajinasi mereka melalui warna dan
                  bentuk didampingi kakak relawan dari universitas setempat.
                </p>
              </div>
            </div>

            {/* Kanan: Kumpulan Card Kecil */}
            <div className="flex flex-col gap-6">
              <div className="flex-1 min-h-[200px] md:min-h-0 rounded-3xl overflow-hidden shadow-sm relative group bg-gray-200">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent z-10"></div>
                <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400 text-sm">
                  [Placeholder Gambar 1]
                </div>
                <div className="absolute bottom-0 left-0 p-6 z-20">
                  <h4 className="text-white font-bold">Kunjungan Sekolah</h4>
                </div>
              </div>
              <div className="flex-1 min-h-[200px] md:min-h-0 rounded-3xl overflow-hidden shadow-sm relative group bg-gray-200">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent z-10"></div>
                <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400 text-sm">
                  [Placeholder Gambar 2]
                </div>
                <div className="absolute bottom-0 left-0 p-6 z-20">
                  <h4 className="text-white font-bold">Bantuan Logistik</h4>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* New Section: Jejak Kebaikan Real-Time */}
        <section className="max-w-screen-2xl mx-auto px-8 md:px-12 space-y-12">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-black font-sans tracking-tighter text-gray-900">
              Jejak Kebaikan
            </h2>
            <p className="text-gray-500 font-sans text-lg">
              Pesan dan dukungan mengalir secara real-time dari donatur kami.
            </p>
          </div>

          <div className="flex flex-col gap-4 max-w-4xl mx-auto">
            {MOCK_TESTIMONI.map((testimoni) => (
              <div
                key={testimoni.id}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm border-none flex items-start gap-4 transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 font-bold flex-shrink-0">
                  {testimoni.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-bold text-gray-900">
                      {testimoni.name}
                    </h4>
                    <span className="px-2 py-0.5 bg-teal-50 text-teal-700 text-[10px] font-bold uppercase tracking-wider rounded-md">
                      BARU SAJA
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed italic">
                    "{testimoni.message}"
                  </p>
                </div>
                <div className="flex-shrink-0 text-gray-300 hover:text-red-400 transition-colors cursor-pointer pt-1">
                  <MdFavoriteBorder className="text-2xl" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
